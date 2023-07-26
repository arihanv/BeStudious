//@ts-nocheck
"use client"

import { useEffect, useState } from "react"
import supabaseClient from "@/constants/constants.jsx"
import { useUser } from "@clerk/nextjs"
import moment from "moment"

import { Button } from "@/components/ui/button"
import TriviaQuestion from "@/components/trivia/triviaQuestion"

export default function Trivia() {
  const [questions, setQuestions] = useState([])
  const [triviaData, setTriviaData] = useState([])
  const [userAnswers, setUserAnswers] = useState([null, null, null, null])
  const { user } = useUser()

  const nineteenPmUtc = moment
    .utc()
    .set({ hour: 19, minute: 0, second: 0, millisecond: 0 })
  const triviaGenerateTime = moment(nineteenPmUtc).local().format("h:mm A")

  useEffect(() => {
    const fetchQuestion = async () => {
      const { data, error } = await supabaseClient
        .from("trivia_questions")
        .select()
        .limit(1)
        .order("created_at", { ascending: false })

      if (error || data === null || data.length === 0) {
        console.error("Error when fetching question", error)
        return null
      } else {
        setQuestions(data[0].questions)
        setTriviaData(data[0])
        return data[0].questions
      }
    }
    fetchQuestion()
  }, [])

  const handleSubmit = async () => {
    let correctPoints = 0
    for (let index in questions) {
      if (userAnswers[index] == questions[index].correctAnswer) {
        correctPoints += 1
      }
    }

    let { data, error } = await supabaseClient
      .from("trivia_questions")
      .select()
      .eq("id", triviaData.id)

    if (error) {
      console.error(`Error when fetching trivia object: ${error}`)
      return
    }

    const currentTriviaUsers = data![0].users

    if (currentTriviaUsers.includes(user?.id)) {
      alert(
        `Sorry! You have already answered today's trivia. Come back tomorrow at ${triviaGenerateTime} for more trivia questions!`
      )
      window.location.href = "/leaderboard"
      return
    }

    ;({ data, error } = await supabaseClient
      .from("trivia_questions")
      .update({ users: [...currentTriviaUsers, user?.id] })
      .eq("id", triviaData.id))

    if (error) {
      console.error(`Error when updating trivia users: ${error}`)
      return
    }

    ;({ data } = await supabaseClient.from("users").select().eq("id", user?.id))

    let currentPoints = data[0].points

    ;({ error } = await supabaseClient
      .from("users")
      .update({ points: currentPoints + correctPoints })
      .eq("id", user.id))

    if (error) {
      console.error(`Error updating points: ${error}`)
      return
    }

    window.location.href = "/leaderboard"
  }

  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full max-w-[480px] flex-1 flex-col gap-10 tracking-tight">
        <div className="flex w-full justify-center text-3xl font-bold">
          Daily Trivia Questions
        </div>
        <div className="text-sm text-slate-600">
          Each correct answer is worth 1 point.
          <br />
          Trivia questions are automatically generated every day at{" "}
          {triviaGenerateTime}!
        </div>
        {questions !== null &&
          questions.map((question: any, index: number) => {
            return (
              <TriviaQuestion
                setUserAnswers={setUserAnswers}
                question={question}
                num={index}
                key={index}
              />
            )
          })}
      </div>
      {userAnswers.filter((x) => x != null).length == questions.length && (
        <Button size={"sm"} onClick={() => handleSubmit()}>
          Submit
        </Button>
      )}
    </section>
  )
}
