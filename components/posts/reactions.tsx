import React from "react"
import { Smile } from "lucide-react"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

type Props = {}

export default function Reactions({}: Props) {
  return (
    <div className="absolute bottom-0 right-0 rounded-tl-xl bg-black p-0">
      <Menubar loop={true}>
        <MenubarMenu>
          <MenubarTrigger className="px-1">
            <Smile />
          </MenubarTrigger>
          <MenubarContent side="top" className="!min-w-0">
            <MenubarItem>👍</MenubarItem>
            <MenubarItem>🔥</MenubarItem>
            <MenubarItem>🤓</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
