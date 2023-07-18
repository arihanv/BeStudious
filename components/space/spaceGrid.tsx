import React from "react"

import Space from "./space"

type Props = {}

export default function SpaceGrid({}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-cols-auto w-full max-w-[900px] flex-wrap gap-5">
      <Space />
      <Space />
      <Space />
    </div>
  )
}
