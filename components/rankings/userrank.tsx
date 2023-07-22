import React from "react"
import { Flame } from "lucide-react"

type Props = {
  imageUrl: string
  name: string
  points: number
}

export default function UserRank({ imageUrl, name, points }: Props) {
  return (
    <div className="flex w-full min-w-[300px] items-center gap-3">
      <div className="flex flex-1 items-center justify-between gap-3 rounded-xl bg-slate-900 p-2 px-3">
        <div className="flex items-center gap-3">
          <div
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="h-8 w-8 rounded-full bg-yellow-500"
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
