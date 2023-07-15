import React from "react"
import { MoreVertical } from "lucide-react"

import Reactions from "./reactions"

type Props = {
  name: string
}

export default function Post({ name }: Props) {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-3">
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-red-500"></div>

          <div className="flex flex-col gap-1 text-xs">
            <div>{name}</div>
            <div>8:00 AM • 2h late</div>
          </div>
        </div>
        <div>
          <MoreVertical />
        </div>
      </div>
      <div className=" relative flex h-[450px] items-center justify-center rounded-xl border-2 border-black bg-slate-800 p-2 ring-2 ring-slate-900">
        {"[Image Here]"}
        <div className="absolute bottom-0 right-0 p-3">
          <Reactions />
        </div>
      </div>
    </div>
  )
}
