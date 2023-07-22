"use client"

import React, { useState } from "react"
import supabaseClient from "@/constants/constants"
import { useUser } from "@clerk/nextjs"
import { UserPlus } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

type Props = {
  friendCode: string
}

export default function AddFriends({ friendCode }: Props) {
  const [newFriendCode, setNewFriendCode] = useState("")
  const [serverResponse, setServerResponse] = useState("")
  const { user } = useUser()

  const addFriend = async () => {
    setServerResponse("")

    let { data, error } = await supabaseClient
      .from("users")
      .select()
      .eq("friend_code", newFriendCode)

    let friendData = data[0]

    if (error) {
      console.error(`Error fetching friend: ${error}`)
      setServerResponse(`Error fetching friend: ${error}`)
      return
    }

    if (!friendData) {
      setServerResponse("Invalid friend code.")
      return
    }

    if (friendData.id == user?.id) {
      setServerResponse("You cannot add yourself!")
      return
    }

    ;({ data, error } = await supabaseClient
      .from("users")
      .select()
      .eq("id", user?.id))

    if (error) {
      console.error(`Error fetching current friends: ${error}`)
      setServerResponse(`Error fetching current friends: ${error}`)
      return
    }

    const oldFriends = data[0].friends.map(user => user.id)

    if (oldFriends.includes(friendData.id)) {
      setServerResponse(`You are already friends with ${friendData.full_name}!`)
      return
    }

    ;({ data, error } = await supabaseClient
      .from("users")
      .update({ friends: [...oldFriends, {id: friendData?.id, full_name: friendData.full_name}] })
      .eq("id", user?.id))

    if (error) {
      console.error(`Error adding friend: ${error}`)
      setServerResponse(`Error adding friend: ${error}`)
      return
    }

    setServerResponse(`Added ${friendData.full_name}.`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, "").slice(0, 6)
    setNewFriendCode(input)
  }

  return (
    <div className="flex flex-1 justify-center rounded-xl py-2">
      <Tabs defaultValue="friendCode" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="friendCode" className="w-1/2">
            Your Friend Code
          </TabsTrigger>
          <TabsTrigger value="addFriend" className="w-1/2">
            Add Friends
          </TabsTrigger>
        </TabsList>
        <TabsContent value="friendCode">
          {" "}
          <div className="mt-3 flex h-[50px] items-center justify-center rounded-lg bg-slate-900 px-1 py-2">
            {!friendCode ? (
              <Button size={"sm"}>Generate Friend Code</Button>
            ) : (
              <div className="flex items-center gap-2">
                Friend Code: <Badge className="text-sm">{friendCode}</Badge>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="addFriend">
          <div className="mt-3 flex h-[50px] items-center justify-center gap-2 rounded-lg bg-slate-900 px-1 py-2">
            <Input
              placeholder="Enter Friend Code"
              className="flex-1"
              value={newFriendCode}
              onChange={handleInputChange}
            />
            <Button
              size={"sm"}
              className="flex min-w-fit gap-2"
              onClick={() => {
                addFriend()
              }}
            >
              <UserPlus size={18} />
              Add Friend
            </Button>
          </div>
          {serverResponse}
        </TabsContent>
      </Tabs>
    </div>
  )
}
