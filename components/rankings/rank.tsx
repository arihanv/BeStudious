import React from "react"
import { Flame } from "lucide-react"

type Props = {
  index: number
  imageUrl: string
  name: string
  points: string
}

export default function Rank({ index, imageUrl, name, points }: Props) {
  const rankColours: any = {
    1: "text-amber-300",
    2: "text-slate-400",
    3: "text-yellow-800",
  }

  return (
    <div className="flex w-full max-w-[400px] items-center gap-3">
      <div
        className={
          "flex  h-6 w-6 items-center justify-center rounded-full bg-slate-900 p-3 font-medium " +
          (rankColours[index] || "text-slate-600")
        }
      >
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
          <div
            className={
              "text-sm" +
              (index === 1
                ? " bg-gradient-to-r from-pink-400 to-blue-600 bg-clip-text font-extrabold text-transparent"
                : "")
            }
          >
            {name}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Flame /> {points}
        </div>
      </div>
    </div>
  )
}
