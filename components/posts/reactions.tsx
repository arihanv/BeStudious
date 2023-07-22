import React from "react"
import { Smile } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import supabaseClient from "@/constants/constants.jsx"

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

export default function Reactions({imgUrl}: Props) {
  const { user } = useUser()

  const handleThumbsUp = async (emoji) => {
    const { data: fetchData, error: fetchError } = await supabaseClient
      .from('images')
      .select(emoji)
      .eq('href', imgUrl);

    if (fetchData[0][emoji] === null) {
      const { data: insertData, error: insertError } = await supabaseClient 
        .from("images")
        .update([{ [emoji]: [ user.id ] }])
        .eq("href", imgUrl)
        .select()
      if (insertError) {
        console.error("Error occured...", insertError);
      }
    } else if (!(fetchData[0][emo]).includes(user.id)) {
      let array = fetchData[0].thumbsup;
      array.push(user.id);
      const { data: insertData, error: insertError } = await supabaseClient 
        .from("images")
        .update([{ thumbsup: array }])
        .eq("href", imgUrl)
        .select()
      if (insertError) {
        console.error("Error occured...", insertError);
      }     
    } else {
      let array = fetchData[0].thumbsup;
      const i = array.indexOf(user.id);
      array.splice(i, 1);
      if (array.length === 0) {
        array = null;
      }
      const { data: insertData, error: insertError } = await supabaseClient 
        .from("images")
        .update([{ thumbsup: array }])
        .eq("href", imgUrl)
        .select()
      if (insertError) {
        console.error("Error occured...", insertError);
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
          <MenubarContent side="top" className="!min-w-0">
            <MenubarItem onClick={handleThumbsUp}>👍</MenubarItem>
            <MenubarItem>🔥</MenubarItem>
            <MenubarItem>🤓</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
