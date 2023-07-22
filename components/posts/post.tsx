"use client"

import React from "react"
import { MoreVertical, Flag } from "lucide-react"
import moment from "moment"
import { useUser } from "@clerk/nextjs"
import supabaseClient from "@/constants/constants"


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
  // posts: any
  // setPosts(arg0: any): void,
  postId: Number,
  name: string
  imageUrl: string
  createdAt: string
  profileImgUrl: string,
  userId: string,
}

export default function Post({
  // posts,
  // setPosts,
  postId,
  name,
  imageUrl,
  createdAt,
  profileImgUrl,
  userId,
}: Props) {
  const deletePost = async (postId: any) => {
    const { error } = await supabaseClient
      .from('images')
      .delete()
      .eq('id', postId)

    if (error) {
      console.error("Error when deleting post", error)
    } else {
      console.log("Post deleted.")

      // let tempPosts = [...posts];
      // tempPosts.filter(post => {
      //   return post.props.postId != postId;
      // });

      // setPosts(tempPosts)
    }
  }
  
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
              {userId === user?.id ?
                (<div>
                  <MenubarItem onClick={() => { deletePost(postId) }}>
                    <div className="flex items-center gap-2" ><Delete /></div>
                  </MenubarItem>
                </div>)
                :
                (<div>
                  <MenubarItem>
                    <div className="flex items-center gap-2" ><Flag size={20} color="red" /> Report</div>
                  </MenubarItem>
                </div>)

              }

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
    </div >
  )
}
