import React from "react"
import supabaseClient from "@/constants/constants"
import { currentUser } from "@clerk/nextjs"

import ProfileHeader from "@/components/profile/profileHeader"
import UserPosts from "@/components/profile/userPosts"

type User = {
  friend_code: string
}

async function getUserPosts() {
  const user = await currentUser()

  try {
    const { data, error } = await supabaseClient
      .from("images")
      .select()
      .order("created_at", { ascending: false })
      .eq("userId", user?.id)

    if (error || data === null) {
      console.error("Error fetching posts:", error?.message)
      return { data: [], user, numPosts: 0 }
    }

    const numPosts = data.length
    return { data, user, numPosts }
  } catch (error) {
    console.error("Error fetching posts:", error)
    return { data: [], user, numPosts: 0 }
  }
}

async function getFriendCode() {
  const user = await currentUser()

  try {
    const { data, error } = await supabaseClient
      .from("users")
      .select()
      .eq("id", user?.id)

    if (error || data === null) {
      console.error("Error fetching friend code:", error?.message)
      return { friendCode: "123456" }
    }

    const friendCode: string = (data[0] as User).friend_code
    return { friendCode }
  } catch (error) {
    console.error("Error fetching friend code:", error)
    return { friendCode: "123456" }
  }
}

export default async function Profile() {
  const { data, user, numPosts } = await getUserPosts()
  const { friendCode } = await getFriendCode()

  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full max-w-[480px] flex-1 flex-col gap-10">
        <ProfileHeader numPosts={numPosts} user={user} friendCode={friendCode} />
        <div className="flex flex-col items-center gap-12">
          <UserPosts posts={data} />
        </div>
      </div>
    </section>
  )
}
