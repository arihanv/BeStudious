import React from "react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Badge } from "../ui/badge"

type Props = {
  question: any
  setUserAnswers: any
  num: number
}

export default function TriviaQuestion({
  question,
  setUserAnswers,
  num,
}: Props) {
  const [value, setValue] = React.useState("")

  const handleOptionChange = (value: string) => {
    setUserAnswers((prev: any) => {
      const newAnswers = [...prev]
      newAnswers[num] = value
      return newAnswers
    })
    setValue(value)
  }

  return (
    <div className="flex flex-col gap-2 border-b border-gray-800 pb-5">
      <div>
        <Badge>{question["topic"]}</Badge>
      </div>
      <div className="text-xl font-medium">{question["question"]}</div>
      <RadioGroup onValueChange={(value: string) => handleOptionChange(value)}>
        {Object.keys(question["choices"]).map((key) => (
          <div className="flex items-center space-x-2" key={key}>
            <RadioGroupItem value={key} id={`q${num}-${key}`} />
            <Label className="cursor-pointer" htmlFor={`q${num}-${key}`}>
              {question["choices"][key]}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
