import React from "react"

import Space from "./space"

type Props = {}

export default function SpaceGrid({}: Props) {
  return (
    <div className="flex w-full max-w-[900px] grid-cols-1 flex-wrap justify-center gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:justify-start">
      <Space />
      <Space />
      <Space />
    </div>
  )
}
