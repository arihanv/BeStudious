//@ts-nocheck
"use client"

import { useEffect, useState } from "react"
import supabaseClient from "@/constants/constants"
import { useUser } from "@clerk/nextjs"

import Rank from "./rank"
import UserRank from "./userrank"

type Props = {}

export default function Leaderboard({ }: Props) {
  const { user, isSignedIn } = useUser()
  const [currentUser, setCurrentUser] = useState({
    full_name: "",
    image_url: "",
    points: 0,
  })
  const [rankElements, setRankElements] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      let { data } = await supabaseClient
        .from("users")
        .select()
        .order("points", { ascending: false })
        .limit(10)

      let tempRankElements = []
      for (let index in data) {
        let user = data[index]
        const rankComponent = (
          <Rank
            key={index}
            index={parseInt(index) + 1}
            imageUrl={user.image_url}
            points={user.points}
            name={user.full_name}
          />
        )
        tempRankElements.push(rankComponent)
      }

      setRankElements(tempRankElements);

      (
        ({ data } = await supabaseClient
          .from("users")
          .select()
          .order("points", { ascending: false })
          .eq("id", user?.id))
      )

      setCurrentUser(data[0]);
    }

    fetchUser()
  }, [isSignedIn])

  return (
    <div className="flex w-full flex-col items-center gap-3">
      {rankElements}
      <div className="fixed bottom-0 mb-5 w-fit rounded-xl p-2 shadow-sm shadow-black backdrop-blur-sm">
        {currentUser &&
          <UserRank
            name={currentUser?.full_name}
            imageUrl={currentUser?.image_url}
            points={currentUser?.points}
          />
        }
      </div>
    </div>
  )
}
