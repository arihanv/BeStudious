"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import Posts from "@/components/posts/posts"

import Upload from "./upload"

export default function IndexPage() {
  const [posts, setPosts] = useState([])

  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[480px] flex-col items-center gap-2">
        <Badge className="" variant={"outline"}>
          {"Today's Prompt"}
        </Badge>
        <h1 className="text-2xl font-bold">
          Study in a library with your best buds.
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
