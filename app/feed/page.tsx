import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Posts from "@/components/posts/posts"

export default function IndexPage() {
  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-center gap-2">
        <Badge className="" variant={"outline"}>
            Today's Prompt
        </Badge>
        <h1 className="text-2xl font-bold">Study In Some Place Different</h1>
      </div>
      <Posts/>
    </section>
  )
}
