import React, { useEffect } from "react"
import supabaseClient from "@/constants/constants.jsx"
import Post from "./post"


type Props = {
  posts: any
  setPosts(arg0: any): void,
}

type DataItem = {
  name: string
  href: string
  created_at: string
  profileUrl: string
}

export default function Posts({ posts, setPosts }: Props) {
  useEffect(() => {
    const fetchPosts = async () => {
      let fetchedPosts = []

      const { data, error } = await supabaseClient
        .from("images")
        .select()
        .order("created_at", { ascending: false })
        .limit(10)

      if (error || data === null) {
        console.error("Error fetching posts:", error.message)
      }
      if (data === null) return
      for (let index in data as DataItem[]) {
        fetchedPosts.push(
          <Post
            posts={posts}
            setPosts={setPosts}
            postId={data[index].id}
            name={data[index].name}
            imageUrl={data[index].href}
            createdAt={data[index].created_at}
            profileImgUrl={data[index].profileUrl}
            userId={data[index].userId}
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
