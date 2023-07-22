import React from "react"
import { MoreVertical, Flag } from "lucide-react"
import moment from "moment"
import { useUser } from "@clerk/nextjs"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

import Reactions from "./reactions"
import Delete from "./delete"

type Props = {
  postId: Number,
  name: string
  imageUrl: string
  createdAt: string
  profileImgUrl: string,
  userId: string,
  deletePost(postId: any): void
}

export default function Post({
  postId,
  name,
  imageUrl,
  createdAt,
  profileImgUrl,
  userId,
  deletePost
}: Props) {
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
              <MenubarItem>
                <div className="flex items-center gap-2">
                  {userId === user?.id ? <Delete postId={postId} userId={userId} deletePost={deletePost} /> : <><Flag size={20} color="red" /> Report</>}
                </div>
              </MenubarItem>
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
        <Reactions imgUrl={imageUrl} />
      </div>
    </div>
  )
}
