"use client"

import React from "react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

type Props = {
  question: any
}

export default function TriviaQuestion({ question }: Props) {
  const [value, setValue] = React.useState("")

  const handleOptionChange = (value: string) => {
    setValue(value)
  }

  const handleSubmit = () => {
    if (value === question["correctAnswer"]) {
      alert("Correct!")
    } else {
      alert("Incorrect :(")
    }
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
            <RadioGroupItem value={key} id={key} />
            <Label htmlFor={key}>{question["choices"][key]}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="mt-2 flex justify-center">
        <Button size={"sm"} onClick={() => handleSubmit()}>
          Submit
        </Button>
      </div>
    </div>
  )
}
