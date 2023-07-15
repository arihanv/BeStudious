import React from "react"
import { Flame } from "lucide-react"

type Props = {}

export default function UserRank({}: Props) {
  return (
    <div className="flex w-full min-w-[300px] items-center gap-3">
      <div className="flex flex-1 items-center justify-between gap-3 rounded-xl bg-slate-900 p-2 px-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-yellow-500"></div>
          <div className="text-sm">Your Rank</div>
        </div>
        <div className="flex items-center gap-1">
          <Flame /> 5
        </div>
      </div>
    </div>
  )
}
