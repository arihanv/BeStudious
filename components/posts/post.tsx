import React from "react"
import { MoreVertical } from "lucide-react"
import moment from "moment"

import Reactions from "./reactions"

type Props = {
  name: string
  imageUrl: string
  createdAt: string
  profileImgUrl: string,
}

export default function Post({ name, imageUrl, createdAt, profileImgUrl}: Props) {
  const currentTime = moment()
  const postedTime = moment(createdAt, moment.ISO_8601, true)

  const differenceInMinutes = currentTime.diff(postedTime, "minutes")
  let timeUnit, timeDiff

  if (differenceInMinutes < 1) {
    timeDiff = currentTime.diff(postedTime, "seconds")
    timeUnit = "s"
  } else if (differenceInMinutes < 60) {
    timeDiff = differenceInMinutes
    timeUnit = "m"
  } else {
    timeDiff = currentTime.diff(postedTime, "hours")
    timeUnit = "h"
  }

  const formattedTime = `${Math.abs(timeDiff)}${timeUnit} ago`

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-3">
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <img className="h-8 w-8 rounded-full" src={profileImgUrl}></img>

          <div className="flex flex-col gap-1 text-xs">
            <div>{name}</div>
            <div>{formattedTime}</div>
          </div>
        </div>
        <div>
          <MoreVertical />
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="relative flex h-[450px] items-center justify-center rounded-xl border-2 border-black bg-slate-800 p-2 ring-2 ring-slate-900"
      >
        <div className="absolute bottom-0 right-0 p-3">
          <Reactions />
        </div>
      </div>
    </div>
  )
}
