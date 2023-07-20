"use client"

import { useState } from "react"
import supabaseClient from "@/constants/constants.jsx"
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@clerk/nextjs"


import Post from "@/components/posts/post"

export default function Upload({ posts, setPosts }) {
  const { isLoaded, userId, sessionId, getToken } = useAuth()
  const [file, setFile] = useState([])
  const handleSubmit = async (e) => {
    // Prevent form submission
    e.preventDefault()
    if (!file) {
      return
    }

    const form = new FormData()
    form.append("file", file)

    const response = await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL, {
      method: "POST",
      body: form,
    })
    const json = await response.json()
    const imageUrl = json.attachments[0].url

    const { data, error } = await supabaseClient
      .from("images")
      .insert([
        {
          name: "Anonymous",
          href: imageUrl,
          username: "Anonymous",
        },
      ])
      .select()

    if (error) {
      console.error("Error inserting data:", error.message)
      return
    }

    let newPost = (
      <Post
        name={data[0].name}
        imageUrl={data[0].href}
        createdAt={data[0].created_at}
        key={posts.length}
      />
    )
    setPosts([newPost, ...posts])
  }

  const handleFiles = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={handleFiles} />
        <button type="submit">Upload Picture</button>
      </form>
    </div>
  )
}
