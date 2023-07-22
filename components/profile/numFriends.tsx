"use client"

import React from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
  friends: any
}

export default function NumFriends({ friends }: Props) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className="!cursor-default">
          {" "}
          <div className="pl-0.5">{Object.keys(friends).length} Friends</div>
        </TooltipTrigger>
        <TooltipContent side="right">
          {friends.map((friend: any, index: number) => {
            return <p key={index}>{friend.full_name}</p>
          })}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
