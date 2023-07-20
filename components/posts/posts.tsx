import React, { useEffect } from "react"
import supabaseClient from "@/constants/constants.jsx"

import Post from "./post"

type Props = {
  posts: any
  setPosts(arg0: any): void
}
type Image = {
  id: Number
  created_at: String
  name: String
  href: String
  username: String
  img_src: null
}

const createPost = (
  created_at: string,
  name: string,
  href: string,
  key: Number
) => {}

export default function Posts({ posts, setPosts }: Props) {
  useEffect(() => {
    const fetchPosts = async () => {
      let fetchedPosts = []

      const { data, error } = await supabaseClient
        .from("images")
        .select()
        .order("created_at", { ascending: false })
        .limit(10)

      if (error) {
        console.error("Error fetching posts:", error.message)
      }

      for (let index in data) {
        fetchedPosts.push(
          <Post
            name={data[index].name}
            imageUrl={data[index].href}
            createdAt={data[index].created_at}
            key={index}
          />
        )
      }

      setPosts(fetchedPosts)
    }

    fetchPosts()
  }, [])

  return <div className="flex w-full flex-col items-center gap-12">{posts}</div>
}
