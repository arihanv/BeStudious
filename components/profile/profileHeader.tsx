import React from "react"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import AddFriends from "./addFriends"

type Props = {
  user: any
  numPosts: number,
}

export default function ProfileHeader({ user, numPosts }: Props) {
  const friendCode = "123456"
  // user.imageUrl
  return (
    <div className="flex h-full flex-1 flex-col gap-5">
      <div className="flex items-center gap-4">
        <img
          className="h-20 w-20 rounded-full bg-gray-900"
          src={user?.imageUrl}
        ></img>
        <div className="flex h-full flex-1 flex-col gap-1">
          <div className="text-left text-3xl font-bold">
            {user?.firstName} {user?.lastName}
          </div>
          <div className="flex flex-wrap">
            <div className="flex flex-wrap items-center gap-4 font-medium">
              <div className="pl-0.5">{numPosts} Posts</div>
              <div className="pl-0.5">0 Friends</div>
            </div>
          </div>
        </div>
      </div>
     <AddFriends friendCode={friendCode}/>
    </div>
  )
}
