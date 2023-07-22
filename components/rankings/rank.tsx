import React from "react"
import { Flame } from "lucide-react"

type Props = {
  index: number
  imageUrl: string
  name: string
  points: string
}

export default function Rank({ index, imageUrl, name, points }: Props) {
  return (
    <div className="flex w-full max-w-[400px] items-center gap-3">
      <div className="flex  h-6 w-6 items-center justify-center rounded-full bg-slate-900 p-3 font-medium text-slate-600">
        {index}
      </div>
      <div className="flex flex-1 items-center justify-between gap-3 rounded-xl bg-slate-900 p-2 px-3">
        <div className="flex items-center gap-3">
          <div
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="h-8 w-8 rounded-full bg-red-500"
          ></div>
          <div className="text-sm">{name}</div>
        </div>
        <div className="flex items-center gap-1">
          <Flame /> {points}
        </div>
      </div>
    </div>
  )
}
