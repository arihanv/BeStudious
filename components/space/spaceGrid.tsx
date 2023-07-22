"use client"

import React, { useState, useEffect } from "react"

import Space from "./space"
import supabaseClient from "@/constants/constants"

type Props = {}

export default function SpaceGrid({ }: Props) {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const getSpaces = async () => {
      let tempSpaces = [];

      const { data, error } = await supabaseClient
        .from("spaces")
        .select()

      if (!error) {
        for (let space of data) {
          tempSpaces.push(<Space users={space.users} spaceName={space.name} spaceLocation={space.location} />)
        }
      } else {
        console.error(`Error when fetching spaces: ${error}`)
      }

      setSpaces(tempSpaces);
    }

    getSpaces();
  }, [])

  return (
    <div className="flex w-full max-w-[900px] grid-cols-1 flex-wrap justify-center gap-5 pb-16 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:justify-start">
      {spaces}
    </div>
  )
}
