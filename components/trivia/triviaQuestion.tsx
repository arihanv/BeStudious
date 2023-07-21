"use client"

import React from "react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "../ui/button"

type Props = {}

export default function TriviaQuestion({}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-medium text-xl">
        Q: What is the capital of the United States?
      </div>
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
      </RadioGroup>
      <div className="flex justify-center mt-2">
      <Button size={"sm"}>Submit</Button>
      </div>
    </div>
  )
}
