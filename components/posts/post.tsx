"use client"

import React, { useState } from "react"
import supabaseClient from "@/constants/constants"
import { useUser } from "@clerk/nextjs"
import { Flag, MoreVertical } from "lucide-react"
import moment from "moment"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import Delete from "./delete"
import Reactions from "./reactions"

type Props = {
  postId: Number
  name: string
  imageUrl: string
  createdAt: string
  profileImgUrl: string
  userId: string
  reactions?: any
}

export default function Post({
  postId,
  name,
  imageUrl,
  createdAt,
  profileImgUrl,
  userId,
  reactions,
}: Props) {
  const deletePost = async (postId: any) => {
    const { error } = await supabaseClient
      .from("images")
      .delete()
      .eq("id", postId)

    if (error) {
      console.error("Error when deleting post", error)
    } else {
      console.log("Post deleted.")
      window.location.reload();
    }
  }

  const [postReactions, setPostReactions] = useState(
    reactions || {
      thumbsup: [],
      fire: [],
      nerd: [],
    }
  )
  const { user } = useUser()

  const currentTime = moment()
  const postedTime = moment(createdAt, moment.ISO_8601, true)

  const differenceInMinutes = currentTime.diff(postedTime, "minutes")
  let timeUnit, timeDiff

  if (differenceInMinutes < 1) {
    timeDiff = currentTime.diff(postedTime, "seconds")
    timeUnit = "s"
  } else if (differenceInMinutes < 60) {
    timeDiff = differenceInMinutes
    timeUnit = "m"
  } else {
    timeDiff = currentTime.diff(postedTime, "hours")
    timeUnit = "h"
  }

  const formattedTime = `${Math.abs(timeDiff)}${timeUnit} ago`

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-3">
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <img className="h-8 w-8 rounded-full" src={profileImgUrl}></img>
          <div className="flex flex-col gap-1 text-xs">
            <div>{name}</div>
            <div>{formattedTime}</div>
          </div>
        </div>
        <Menubar loop={true}>
          <MenubarMenu>
            <MenubarTrigger className="px-1">
              <MoreVertical />
            </MenubarTrigger>
            <MenubarContent side="bottom">
              {userId === user?.id ? (
                <div>
                  <MenubarItem
                    onClick={() => {
                      deletePost(postId)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Delete />
                    </div>
                  </MenubarItem>
                </div>
              ) : (
                <div>
                  <MenubarItem>
                    <div className="flex items-center gap-2">
                      <Flag size={20} color="red" /> Report
                    </div>
                  </MenubarItem>
                </div>
              )}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="relative flex h-[450px] items-center justify-center rounded-xl border-2 border-black bg-slate-800 p-2 ring-2 ring-slate-900"
      >
        <Reactions
          postId={postId}
          postReactions={postReactions}
          setPostReactions={setPostReactions}
        />
        {postReactions && (
          <div className="absolute bottom-0 left-0 rounded-tr-xl bg-black p-2 text-sm">
            <div className="flex flex-col gap-1">
              {postReactions.thumbsup && postReactions.thumbsup.length > 0 && (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="!cursor-default">
                      <div>👍 x {postReactions.thumbsup.length}</div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {postReactions.thumbsup.map((name: string) => (
                        <p>{name}</p>
                      ))}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {postReactions.fire && postReactions.fire.length > 0 && (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="!cursor-default">
                      <div>🔥 x {postReactions.fire.length}</div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {postReactions.fire.map((name: string) => (
                        <p>{name}</p>
                      ))}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {postReactions.nerd && postReactions.nerd.length > 0 && (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="!cursor-default">
                      <div>🤓 x {postReactions.nerd.length}</div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {postReactions.nerd.map((name: string) => (
                        <p>{name}</p>
                      ))}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
