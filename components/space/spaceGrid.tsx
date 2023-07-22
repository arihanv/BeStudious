"use client"

import React, { useEffect, useState } from "react"
import supabaseClient from "@/constants/constants"

import Space from "./space"

type Props = {
  spaces: Array<any>
  setSpaces(arg0: any): void
}

export default function SpaceGrid({ spaces, setSpaces }: Props) {
  useEffect(() => {
    const getSpaces = async () => {
      let tempSpaces = []

      const { data, error } = await supabaseClient.from("spaces").select()

      if (!error) {
        for (let space of data) {
          tempSpaces.push(
            <Space
              spaceId={space.id}
              users={space.users}
              spaceName={space.name}
              spaceLocation={space.location}
            />
          )
        }
      } else {
        console.error(`Error when fetching spaces: ${error}`)
      }
      setSpaces(tempSpaces)
    }

    getSpaces()
  }, [])

  return (
    <div className="flex w-full max-w-[900px] grid-cols-1 flex-wrap justify-center gap-5 pb-16 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:justify-start">
      {spaces}
    </div>
  )
}
