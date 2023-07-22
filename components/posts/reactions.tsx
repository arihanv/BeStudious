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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
  imgUrl: string
}

async function getEmojis(imgUrl: string) {
  const { data, error } = await supabaseClient
    .from("images")
    .select() // Specify the columns you want to retrieve
    .eq("href", imgUrl)
  return data[0]
}

export default function Reactions({ imgUrl }: Props) {
  const { user } = useUser()
  const [emojiData, setEmojiData] = React.useState<any>([])

  useEffect(() => {
    const fetchEmojis = async () => {
      const data = await getEmojis(imgUrl)
      setEmojiData(data)
      console.log(data)
    }
    fetchEmojis()
  }, [])

  const handleEmojis = async (emoji) => {
    const { data: fetchData, error: fetchError } = await supabaseClient
      .from("images")
      .select(emoji)
      .eq("href", imgUrl)
    if (fetchData[0][emoji] === null) {
      const { data: insertData, error: insertError } = await supabaseClient
        .from("images")
        .update([{ [emoji]: [ user.first_name ] }])
        .eq("href", imgUrl)
        .select()
      if (insertError) {
        console.error("Error occured...", insertError)
      }
    } else if (!(fetchData[0][emoji]).includes(user.first_name)) {
      let array = [...fetchData[0][emoji]];
      array.push(user.first_name);
      const { data: insertData, error: insertError } = await supabaseClient 
        .from("images")
        .update([{ [emoji]: array }])
        .eq("href", imgUrl)
        .select()
      if (insertError) {
        console.error("Error occured...", insertError)
      }
    } else {
      let array = [...fetchData[0][emoji]];
      const i = array.indexOf(user.first_name);
      array.splice(i, 1);
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
          <MenubarContent side="top" className="!min-w-0 flex flex-col">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <MenubarItem onClick={() => handleEmojis("thumbsup")}>
                    👍
                  </MenubarItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{emojiData.thumbsup}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <MenubarItem onClick={() => handleEmojis("fire")}>
                    🔥
                  </MenubarItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{emojiData.fire}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <MenubarItem onClick={() => handleEmojis("nerd")}>
                    🤓
                  </MenubarItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{emojiData.nerd}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
