import React from "react"
import { currentUser } from "@clerk/nextjs"

import ProfileHeader from "@/components/profile/profileHeader"
import UserPosts from "@/components/profile/userPosts"

export default async function Profile() {
  const user = await currentUser()
  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full max-w-[480px] flex-1 flex-col gap-10 tracking-tight">
        <ProfileHeader user={user} />
        <UserPosts user={user} />
      </div>
    </section>
  )
}
