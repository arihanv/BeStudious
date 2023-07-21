"use client"

import { useState, useEffect } from "react"

import { Badge } from "@/components/ui/badge"
import Posts from "@/components/posts/posts"

import Upload from "./upload"
import supabaseClient from "@/constants/constants"

export default function IndexPage() {
  const [posts, setPosts] = useState([])
  const [dailyPrompt, setDailyPrompt] = useState("")

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
        setDailyPrompt(data[0].prompt);
      }
    }

    fetchPrompt();
  }, [])

  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[480px] flex-col items-center gap-2">
        <Badge className="" variant={"outline"}>
          {"Today's Prompt"}
        </Badge>
        <h1 className="text-2xl font-bold">
          {dailyPrompt}
        </h1>
        <div className="flex w-full flex-1 border-b"></div>
      </div>
      <div className="w-fit rounded-xl border-2 bg-blue-800 px-2.5 py-1 text-sm font-semibold">
        <Upload posts={posts} setPosts={setPosts} />
      </div>
      <Posts posts={posts} setPosts={setPosts} />
    </section>
  )
}
