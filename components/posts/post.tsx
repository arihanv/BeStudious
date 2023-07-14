import React from "react"
import { MoreVertical } from "lucide-react"

type Props = {}

export default function Post({}: Props) {
  return (
    <div className="w-full max-w-[400px] gap-2 flex flex-col">
      <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 bg-red-500 rounded-full">

        </div>
      
          <div className="flex flex-col gap-1 text-xs">
            <div>James Bond</div>
            <div>8:00 AM • 2h late</div>
          </div>
        </div>
        <div><MoreVertical/></div>
      </div>
      <div className=" bg-slate-800 h-[450px] rounded-xl border-2 border-black ring-2 ring-slate-900 p-2">
        "Image Here"
      </div>
    </div>
  )
}
