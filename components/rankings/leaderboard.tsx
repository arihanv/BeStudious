import React from "react"

import Rank from "./rank"
import UserRank from "./userrank"

type Props = {}

export default function Leaderboard({}: Props) {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <Rank />
      <Rank />
      <Rank />
      <Rank />
      <Rank />
      <Rank />
      <Rank />
      <Rank />
      <Rank />
      <Rank />
      <Rank />
      <div className="fixed bottom-0 mb-5 w-fit rounded-xl p-2 shadow-sm shadow-black backdrop-blur-sm">
        <UserRank />
      </div>
    </div>
  )
}
