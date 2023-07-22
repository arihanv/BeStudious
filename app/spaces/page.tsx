"use client"

import SpaceGrid from "@/components/space/spaceGrid"
import UploadButton from "@/components/space/uploadButton"
import { useState } from "react"

export default function IndexPage() {
  const [spaces, setSpaces] = useState([]);

  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[480px] flex-col items-center gap-2 text-3xl font-bold tracking-tight">
        Studious Spaces
      </div>
      <SpaceGrid spaces={spaces} setSpaces={setSpaces} />
      <UploadButton spaces={spaces} setSpaces={setSpaces} />
    </section>
  )
}
