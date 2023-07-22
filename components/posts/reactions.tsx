//@ts-nocheck
import React, { useEffect } from "react"
import supabaseClient from "@/constants/constants.jsx"
import { useUser } from "@clerk/nextjs"
import { Smile } from "lucide-react"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

type Props = {
  imgUrl: string
}

export default function Reactions({ imgUrl }: Props) {
  const { user } = useUser()

  const handleEmojis = async (emoji: string) => {
    const { data: fetchData, error: fetchError } = await supabaseClient
      .from("images")
      .select(emoji)
      .eq("href", imgUrl)
    if (fetchData == null) {
      console.error("Error occured...", fetchError)
      return
    }
    if (fetchData[0][emoji] === null) {
      const { data: insertData, error: insertError } = await supabaseClient
        .from("images")
        .update([{ [emoji]: [user.fullName] }])
        .eq("href", imgUrl)
        .select()
      if (insertError) {
        console.error("Error occured...", insertError)
      }
    } else if (!fetchData[0][emoji].includes(user.fullName)) {
      let array = [...fetchData[0][emoji]]
      array.push(user?.fullName)
      const { data: insertData, error: insertError } = await supabaseClient
        .from("images")
        .update([{ [emoji]: array }])
        .eq("href", imgUrl)
        .select()
      if (insertError) {
        console.error("Error occured...", insertError)
      }
    } else {
      let array = [...fetchData[0][emoji]]
      const i = array.indexOf(user.fullName)
      array.splice(i, 1)
      if (array.length === 0) {
        array = null
      }
      const { data: insertData, error: insertError } = await supabaseClient
        .from("images")
        .update([{ [emoji]: array }])
        .eq("href", imgUrl)
        .select()
      if (insertError) {
        console.error("Error occured...", insertError)
      }
    }
  }

  return (
    <div className="absolute bottom-0 right-0 rounded-tl-xl bg-black p-0">
      <Menubar loop={true}>
        <MenubarMenu>
          <MenubarTrigger className="px-1">
            <Smile />
          </MenubarTrigger>
          <MenubarContent side="top" className="flex !min-w-0 flex-col">
            <MenubarItem
              className="cursor-pointer"
              onClick={() => handleEmojis("thumbsup")}
            >
              👍
            </MenubarItem>

            <MenubarItem
              className="cursor-pointer"
              onClick={() => handleEmojis("fire")}
            >
              🔥
            </MenubarItem>

            <MenubarItem
              className="cursor-pointer"
              onClick={() => handleEmojis("nerd")}
            >
              🤓
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
