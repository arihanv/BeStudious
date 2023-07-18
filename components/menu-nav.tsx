"use client"

import React from "react"
import Link from "next/link"

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

export default function MenuNav({}: Props) {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          {" "}
          <div className="w-fit text-lg font-bold">BeStudious.</div>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            {" "}
            <Link className="w-full" href="/">
              Home{" "}
            </Link>
          </MenubarItem>
          <MenubarItem>
            {" "}
            <Link className="w-full" href="/feed">
              Feed{" "}
            </Link>
          </MenubarItem>
          <MenubarItem>
            {" "}
            <Link className="w-full" href="/leaderboard">
              Leaderboard{" "}
            </Link>
          </MenubarItem>
          <MenubarItem>
            {" "}
            <Link className="w-full" href="/spaces">
              Spaces{" "}
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Settings</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
