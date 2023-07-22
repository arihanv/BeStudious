"use client"

import Rank from "./rank"
import UserRank from "./userrank"
import supabaseClient from "@/constants/constants"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"

type Props = {}

export default async function Leaderboard({}: Props) {
  const [currentPoints, setCurrentPoints] = useState(0);
  const { user } = useUser();

  const { data, error } = await supabaseClient
    .from('users')
    .select()
    .order("points", { ascending: false })
    .limit(10)
  
  let rankElements = [];
  for (let index in data) {
    if (data[index].id == user.id) {
      setCurrentPoints(data[index].points)
    }

    let user = data[index];
    const rankComponent = <Rank key={index} index={parseInt(index)+1} imageUrl={user.image_url} points={user.points} name={user.full_name} />
    rankElements.push(rankComponent);
  }

  return (
    <div className="flex w-full flex-col items-center gap-3">
      {rankElements}
      <div className="fixed bottom-0 mb-5 w-fit rounded-xl p-2 shadow-sm shadow-black backdrop-blur-sm">
        <UserRank name={user?.fullName} imageUrl={user.imageUrl} points={currentPoints} />
      </div>
    </div>
  )
}
