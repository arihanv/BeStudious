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
  postId: Number,
  postReactions: Array<any>,
  setPostReactions(reactions: any): void
}

async function getEmojis(postId: Number) {
  const { data, error } = await supabaseClient
    .from("images")
    .select() // Specify the columns you want to retrieve
    .eq("id", postId)
  console.log("data,", data)
  return data[0]
}

export default function Reactions({ postId, postReactions, setPostReactions }: Props) {
  const { user } = useUser()
  const [emojiData, setEmojiData] = React.useState<any>([])

  useEffect(() => {
    const fetchEmojis = async () => {
      const data = await getEmojis(postId)
      setEmojiData(data)
      console.log(data)
    }
    fetchEmojis()
  }, [])

  const handleEmojis = async (emoji: string) => {
    const { data: fetchData, error: fetchError } = await supabaseClient
      .from("images")
      .select(emoji)
      .eq("id", postId)
    if (fetchData == null) {
      console.error("Error when fetching post: ", fetchError)
      return
    }
    if (fetchData[0][emoji] === null) {
      const { data: insertData, error: insertError } = await supabaseClient
        .from("images")
        .update([{ [emoji]: [user.fullName] }])
        .eq("id", postId)
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
        .eq("id", postId)
        .select()
      if (insertError) {
        console.error("Error occured...", insertError)
        return;
      }

      let tempReactions = { ...postReactions }
      tempReactions[emoji].push(user?.fullName);
      setPostReactions(tempReactions);
    } else {
      let array = [...fetchData[0][emoji]]
      const i = array.indexOf(user?.fullName)
      array.splice(i, 1)
      if (array.length === 0) {
        array = [];
      }
      const { data: insertData, error: insertError } = await supabaseClient
        .from("images")
        .update([{ [emoji]: array }])
        .eq("id", postId)
        .select()
      if (insertError) {
        console.error("Error occured...", insertError)
      }

      let tempReactions = { ...postReactions }
      tempReactions[emoji].filter(fullName => {
        console.log(fullName, user?.fullName)
        return fullName != user?.fullName;
      });
      setPostReactions(tempReactions);
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
