import React from "react";
import { Flame } from "lucide-react";
type Props = {}

export default function Rank({}: Props) {
  return (
    <div className="flex w-full max-w-[400px] items-center gap-3">
      <div className="flex  h-6 w-6 items-center justify-center rounded-full bg-slate-900 p-3 font-medium text-slate-600">
        1
      </div>
      <div className="flex flex-1 items-center justify-between gap-3 rounded-xl bg-slate-900 p-2 px-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-red-500"></div>
          <div className="text-sm">Tom Cruise</div>
        </div>
        <div className="flex items-center gap-1">
          <Flame /> 5
        </div>
      </div>
    </div>
  )
}
