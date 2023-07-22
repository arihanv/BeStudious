import supabaseClient from "@/constants/constants.jsx"
import moment from "moment"

import TriviaQuestion from "@/components/trivia/triviaQuestion"

const fetchQuestion = async () => {
  const { data, error } = await supabaseClient
    .from("trivia_questions")
    .select()
    .limit(1)
    .order("created_at", { ascending: false })

  if (error || data === null || data.length === 0) {
    return null
  } else {
    return data[0].questions
  }
}

export default async function Trivia() {
  const questions = await fetchQuestion()

  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full max-w-[480px] flex-1 flex-col gap-10 tracking-tight">
        <div className="flex w-full justify-center text-3xl font-bold">
          Daily Trivia Questions
        </div>
        {questions !== null &&
          questions.map((question: any, index: number) => {
            return <TriviaQuestion question={question} key={index} />
          })}
      </div>
    </section>
  )
}
