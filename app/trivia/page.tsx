import TriviaQuestion from "@/components/trivia/triviaQuestion"

export default function Trivia() {
  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full max-w-[480px] flex-1 flex-col gap-10 tracking-tight">
        <div className="flex w-full justify-center font-bold text-3xl">
        Trivia Question
        </div>
        <TriviaQuestion />
      </div>
    </section>
  )
}
