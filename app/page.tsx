import Link from "next/link"
import { Github, Medal, Users } from "lucide-react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex gap-4">
        <Link href="/feed" rel="noreferrer" className={buttonVariants()}>
          Go To Feed
        </Link>
        <Link
          rel="noreferrer"
          href="/leaderboard"
          className={buttonVariants({ variant: "outline" })}
        >
          <Medal />
        </Link>
        <Link
          href="https://github.com/arihanv/BeStudious"
          rel="noreferrer"
          className={buttonVariants({ variant: "outline" })}
        >
          <Github />
        </Link>
        <Link
          href="/spaces"
          rel="noreferrer"
          className={buttonVariants({ variant: "outline" })}
        >
          <Users />
        </Link>
      </div>
    </section>
  )
}
