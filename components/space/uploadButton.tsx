"use client"

import React from "react"
import { Users } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "../ui/button"

import { Input } from "../ui/input"

type Props = {}

export default function UploadButton({}: Props) {
  return (
    <div className="fixed bottom-0 mb-5 w-fit rounded-xl p-2 shadow-sm shadow-black backdrop-blur-sm">
      <Dialog>
        <DialogTrigger>
          <div className="flex w-full items-center gap-3">
            <button className="flex flex-1 items-center justify-between gap-3 rounded-xl border-4 border-slate-900 bg-blue-800 p-2 px-3 transition ease-in-out hover:scale-110">
              <div className="flex items-center gap-3 px-2">
                <Users />
                <div className="text-lg font-semibold">Make A Space</div>
              </div>
            </button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make A Space</DialogTitle>
            <DialogDescription className="pt-2 flex flex-col gap-5">
              <div>
                <label className="text-sm font-medium mb-10">Name</label>
                <Input />
              </div>
              <div>
                <label className="text-sm font-medium mb-10">Location</label>
                <Input />
              </div>
            </DialogDescription>
            <DialogFooter className="flex justify-center items-center w-full flex-1 pt-2">
              <div className="m-auto"><Button>Make Space</Button></div>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
