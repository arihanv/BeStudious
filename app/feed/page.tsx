"use client"

import { useEffect, useState } from "react"
import supabaseClient from "@/constants/constants"
import { useUser } from "@clerk/nextjs"
import moment from "moment"

import { Badge } from "@/components/ui/badge"
import Posts from "@/components/posts/posts"

import UploadButton from "./upload"

export default function IndexPage() {
  const { user, isSignedIn } = useUser()
  const [posts, setPosts] = useState([])
  const [dailyPrompt, setDailyPrompt] = useState("")
  const [canUpload, setCanUpload] = useState(false)

  useEffect(() => {
    if (!isSignedIn) return

    const fetchCanSubmit = async () => {
      const { data } = await supabaseClient
        .from("images")
        .select("created_at")
        .eq("userId", user.id)

      if (data?.length) {
        const lastPostTimestamp = moment(
          data[0].created_at,
          moment.ISO_8601,
          true
        )
        const twelvePmUtc = moment
          .utc()
          .set({ hour: 12, minute: 0, second: 0, millisecond: 0 })

        if (lastPostTimestamp.isBefore(twelvePmUtc)) {
          setCanUpload(true)
        }
      } else {
        setCanUpload(true)
      }
    }

    fetchCanSubmit()
  }, [isSignedIn])

  useEffect(() => {
    const fetchPrompt = async () => {
      const { data, error } = await supabaseClient
        .from("daily_prompt")
        .select()
        .order("created_at", { ascending: false })
        .limit(1)

      if (error || data === null) {
        console.error("Error fetching posts:", error.message)
      } else {
        setDailyPrompt(data[0].prompt)
      }
    }

    fetchPrompt()
  }, [])

  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[480px] flex-col items-center gap-2">
        <Badge className="" variant={"outline"}>
          {"Today's Prompt"}
        </Badge>
        <h1 className="text-2xl font-bold text-center">{dailyPrompt}</h1>
        <div className="flex w-full flex-1 border-b"></div>
      </div>
      {canUpload && (
        <div className="fixed bottom-0 z-20 mb-5 w-fit rounded-xl p-2 shadow-sm shadow-black backdrop-blur-sm">
          <div className="w-fit rounded-xl px-2.5 py-1 text-sm font-semibold">
            <UploadButton
              posts={posts}
              setPosts={setPosts}
              canUpload={canUpload}
              setCanUpload={setCanUpload}
            />
          </div>
        </div>
      )}
      <Posts posts={posts} setPosts={setPosts} />
    </section>
  )
}
