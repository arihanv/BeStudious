"use client"

import React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

import { UserPlus } from "lucide-react"

type Props = {
  friendCode: string
}

export default function AddFriends({ friendCode }: Props) {
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
            <Input placeholder="Enter Friend Code" className="flex-1"/>
            <Button size={"sm"} className="flex min-w-fit gap-2"><UserPlus size={18}/>Add Friend</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
