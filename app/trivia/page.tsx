"use client"

import { useEffect, useState } from "react"
import supabaseClient from "@/constants/constants.jsx"

import { Button } from "@/components/ui/button"
import TriviaQuestion from "@/components/trivia/triviaQuestion"

export default function Trivia() {
  // const questions = await fetchQuestion()
  const [questions, setQuestions] = useState([])
  const [userAnswers, setUserAnswers] = useState([null, null, null, null])

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
        return data[0].questions
      }
    }
    fetchQuestion()
  }, [])

  const handleSubmit = () => {
    alert("Submmited! Check Leaderboard")
    console.log(userAnswers)
  }

  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full max-w-[480px] flex-1 flex-col gap-10 tracking-tight">
        <div className="flex w-full justify-center text-3xl font-bold">
          Daily Trivia Questions
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
      <Button size={"sm"} onClick={() => handleSubmit()}>
        Submit
      </Button>
    </section>
  )
}
