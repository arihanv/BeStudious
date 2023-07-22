"use client"

import { useEffect } from "react"
import supabaseClient from "@/constants/constants"
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs"
import { UserPlus } from "lucide-react"

import MenuNav from "@/components/menu-nav"

import { Button } from "./ui/button"

const generateFriendCode = async () => {
  const friendCode = Math.floor(100000 + Math.random() * 900000)

  const { error, data } = await supabaseClient
    .from("users")
    .select()
    .eq("friend_code", friendCode)

  if (error) {
    console.error("Error when querying existing friendCode", error)
    return
  }

  if (data.length) {
    console.debug(friendCode, "friendCode already exists")
    // friendCodeExists
    return generateFriendCode()
  }

  return friendCode
}

export function SiteHeader() {
  const { user, isSignedIn } = useUser()

  useEffect(() => {
    const upsertUser = async () => {
      const { data, error } = await supabaseClient
        .from("users")
        .select()
        .eq("id", user?.id)

      // User does not already exist
      if (!data?.length) {
        console.debug("User does not already exist.")

        const friendCode = await generateFriendCode()

        console.debug("Friend Code:", friendCode)

        const { error } = await supabaseClient.from("users").insert({
          id: user?.id,
          full_name: user?.fullName,
          image_url: user?.imageUrl,
          last_login: user?.createdAt,
          email: user?.emailAddresses[0].emailAddress,
          friend_code: friendCode,
        })

        if (error !== null) {
          console.error("Error when creating user:", error?.message)
        }
      }
    }

    if (isSignedIn) {
      upsertUser()
    }
  }, [isSignedIn])

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
