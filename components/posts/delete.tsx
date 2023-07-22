import React from "react"
import { Trash } from "lucide-react"

type Props = {
  postId: Number,
  userId: string,
  deletePost(postId: any): void
}

export default function Delete({
  postId,
  userId,
  deletePost
}: Props) {
  return <span onClick={() => {deletePost(postId, userId)}} className="inline-flex"><Trash size={20} color="red" />&nbsp;Delete</span>
}
