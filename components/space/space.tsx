import React from "react"
import { PlusCircle } from "lucide-react"

type Props = {}

export default function Space({}: Props) {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-1.5 rounded-lg border border-gray-800 bg-gray-900 p-2">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">Title</h1>
        <p className="text-xs text-gray-400">Studying @ The White House</p>
      </div>
      <hr></hr>
      <div className="pl-5 text-sm">
        <ul className="list-disc">
          <li>James Bond</li>
          <li>Joe Biden</li>
          <li>Post Malone</li>
        </ul>
      </div>
      <hr></hr>
      <div className="flex w-full justify-center">
        <button className="w-fit rounded-lg bg-blue-800 px-2 py-1 text-sm font-semibold">
          {" "}
          <div className="flex items-center gap-1">
            <PlusCircle width={20} /> Request To Join
          </div>
        </button>
      </div>
    </div>
  )
}
