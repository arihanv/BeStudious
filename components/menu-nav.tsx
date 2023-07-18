"use client"

import React from "react"
import Link from "next/link"
import { Home, Medal, Rss, Settings, Users } from 'lucide-react';

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
              <div className="flex gap-1.5 items-center">
                <Home width={15} /> Home
              </div>
            </Link>
          </MenubarItem>
          <MenubarItem>
            {" "}
            <Link className="w-full" href="/feed">
            <div className="flex gap-1.5 items-center">
                <Rss width={15} /> Feed
              </div>
            </Link>
          </MenubarItem>
          <MenubarItem>
            {" "}
            <Link className="w-full" href="/leaderboard">
            <div className="flex gap-1.5 items-center">
                <Medal width={15} /> Leaderboard
              </div>
            </Link>
          </MenubarItem>
          <MenubarItem>
            {" "}
            <Link className="w-full" href="/spaces">
            <div className="flex gap-1.5 items-center">
                <Users width={15} /> Spaces
              </div>
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem> <div className="flex gap-1.5 items-center">
                <Settings width={15} /> Settings
              </div></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
