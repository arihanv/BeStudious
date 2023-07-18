import React from "react"
import { PackagePlus } from "lucide-react"

type Props = {}

export default function UploadButton({}: Props) {
  return (
    <div className="fixed bottom-0 mb-5 w-fit rounded-xl p-2 shadow-sm shadow-black backdrop-blur-sm">
      <div className="flex w-full items-center gap-3">
        <button className="flex flex-1 items-center justify-between gap-3 rounded-xl bg-blue-800 border-slate-900 border-4 p-2 px-3 transition ease-in-out hover:scale-110">
          <div className="flex items-center gap-3 px-2">
            <PackagePlus />
            <div className="text-lg font-semibold">Make A Space</div>
          </div>
        </button>
      </div>
    </div>
  )
}
