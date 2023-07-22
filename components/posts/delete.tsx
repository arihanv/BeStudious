import React from "react"
import { Trash } from "lucide-react"

type Props = {
}

export default function Delete({}: Props) {
  return <span className="inline-flex"><Trash size={20} color="red" />&nbsp;Delete</span>
}
