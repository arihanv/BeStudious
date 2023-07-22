import React from "react"
import supabaseClient from "@/constants/constants.jsx"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import AddFriends from "./addFriends"
import NumFriends from "./numFriends"

type Props = {
  user: any
  numPosts: number
  friendCode: string
}

const fetchFriends = async (user: any) => {
  const { data, error } = await supabaseClient
    .from("users")
    .select()
    .eq("id", user?.id)
    .limit(1)

  if (error || data === null || data.length === 0) {
    return null
  } else {
    return data[0].friends
  }
}

export default async function ProfileHeader({
  user,
  numPosts,
  friendCode,
}: Props) {
  const friends = await fetchFriends(user)
  console.log(friends)
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
              <NumFriends friends={friends} />
            </div>
          </div>
        </div>
      </div>
      <AddFriends friendCode={friendCode} />
    </div>
  )
}
