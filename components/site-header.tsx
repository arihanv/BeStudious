import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { UserPlus } from "lucide-react"

import MenuNav from "@/components/menu-nav"

import { Button } from "./ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-around space-x-4 sm:space-x-0">
        <div className="w-28"></div>
        <div className="w-fit text-lg font-bold">
          <MenuNav />
        </div>
        <div className="w-28">
          <SignedOut>
            <SignInButton>
              <Button className="flex w-full flex-row gap-2">
                Sign in
                <UserPlus className="w-4 h-4" />
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
