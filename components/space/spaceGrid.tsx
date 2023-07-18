import React from "react"

import Space from "./space"

type Props = {}

export default function SpaceGrid({}: Props) {
  return (
    <div className="grid w-full max-w-[900px] auto-cols-auto grid-cols-1 flex-wrap gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Space />
      <Space />
      <Space />
    </div>
  )
}
