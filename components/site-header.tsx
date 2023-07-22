"use client"

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { UserPlus } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import supabaseClient from "@/constants/constants"

import MenuNav from "@/components/menu-nav"

import { Button } from "./ui/button"

export function SiteHeader() {
  const { user, isSignedIn } = useUser();
  if (isSignedIn) {
    supabaseClient
      .from('users')
      .upsert({
        id: user.id,
        full_name: user.fullName,
        image_url: user.imageUrl,
        last_login: user.createdAt,
        email: user.emailAddresses[0].emailAddress
      }).then(response => {
        const { error } = response;

        if (error !== null) {
          console.log("Error when upserting user.", error?.message);
        }
      });
  }

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
                <UserPlus className="h-4 w-4" />
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
