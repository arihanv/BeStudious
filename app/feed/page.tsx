import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Posts from "@/components/posts/posts"
import Upload from "./upload"

const {Configuration, OpenAIApi} = require("openai")

const config = new Configuration({
   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

const openai = new OpenAIApi(config);



export default function IndexPage() {
  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[480px] flex-col items-center gap-2">
        <Badge className="" variant={"outline"}>
          {"Today's Prompt"}
        </Badge>
        <h1 className="text-2xl font-bold">Study In Some Place Different</h1>
        <div className="flex w-full flex-1 border-b"></div>
      </div>
      <div className="w-fit rounded-xl border-2 bg-blue-800 px-2.5 py-1 text-sm font-semibold">
          <Upload/>
        </div>
      <Posts />
    </section>
  )
}
