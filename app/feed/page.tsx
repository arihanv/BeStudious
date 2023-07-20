"use client"

import { useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Posts from "@/components/posts/posts"

import Upload from "./upload"

// const { Configuration, OpenAIApi } = require("openai")

// const config = new Configuration({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// })

// const openai = new OpenAIApi(config)

// const runPrompt = async () => {
//   const response = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       {
//         role: 'system',
//         content: 'triva application prompt creator'
//       },
//       {
//         role: 'user',
//         content: `for a trivia application, everyday you will create a prompt that encourages the reader to be more studious. make the prompt a task that the reader can post a picture online that shows that completing the task to prove that they are studying. for an example a prompt could be: "go to the library to study". your prompt will give users new ideas on how to boost their productivity and change up their way of studying. generate 1 prompts with simple vocabulary that are easy and accessible to do in 1 sentence each. don't use a phrase similar to "post it online" or "share a picture"  since the users already know to do that.`
//       }
//     ]
//   })
// }

// runPrompt();

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
