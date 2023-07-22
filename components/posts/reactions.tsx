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
      .select()
      .eq('thumbsup', user.id)
    
    console.log(fetchData);

    const { data: insertData, error: insertError } = await supabaseClient 
      .from("images")
      .update([{ thumbsup: [ user.id ] }])
      .eq("href", imgUrl)
      .select()
      if (insertError) {
        console.error("Error occured", insertError);
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
