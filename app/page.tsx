import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex gap-4">
        <Link
          href="/feed"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Go To Feed
        </Link>
        <Link
          rel="noreferrer"
          href="/leaderboard"
          className={buttonVariants()}
        >
          Leaderboard
        </Link>
        <Link
          href="/feed"
          rel="noreferrer"
          className={buttonVariants({ variant: "outline" })}
        >
          Github
        </Link>
        <Link
          href="/studiousspaces"
          rel="noreferrer"
          className={buttonVariants({ variant: "outline" })}
        >
           <img src="/assets/studious_spaces_logo.png" alt="Studious Spaces Logo" width="40"/>
        </Link>
      </div>
    </section>
  )
}
