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

  const handleThumbsUp = async (e) => {
    const { data: fetchData, error: fetchError } = await supabaseClient
      .from('images')
      .select("thumbsup")
      .eq('href', imgUrl)

    if (!fetchData[0].thumbsup.find(user.id)) {
      if (fetchData[0].thumbsup === null) {
        const { data: insertData, error: insertError } = await supabaseClient 
          .from("images")
          .update([{ thumbsup: [ user.id ] }])
          .eq("href", imgUrl)
          .select()
        if (insertError) {
          console.error("Error occured...", insertError);
        }
      } else {
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
      }
      console.log("registered!");
    } else {
      console.log("already registered......");
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
