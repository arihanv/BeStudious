"use client"

import { useState } from "react"
import supabaseClient from "@/constants/constants.jsx"
import { useUser } from "@clerk/nextjs"
import moment from "moment"
import { v4 as uuidv4 } from "uuid"

import Post from "@/components/posts/post"

export default function Upload({ posts, setPosts }) {
  const { user } = useUser()
  const [file, setFile] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    const form = new FormData();
    form.append("file", file)
    const response = await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL, {
      method: "POST",
      body: form,
    })
    const json = await response.json();
    const imageUrl = json.attachments[0].url;

    let { data, error } = await supabaseClient
      .from("images")
      .insert([
        {
          name: `${user.firstName} ${user.lastName}`,
          href: imageUrl,
          userId: user.id,
          profileUrl: user.imageUrl,
         },
      ])
      .select()

    const { data: countData, error: countError } = await supabaseClient
      .from("users")
      .select("points")
      .eq("id", user.id)
    console.log(countData);

    let newPost = (
      <Post
        // posts={posts}
        // setPosts={setPosts}
        postId={data[0].id}
        name={data[0].name}
        imageUrl={data[0].href}
        createdAt={data[0].created_at}
        profileImgUrl={data[0].profileUrl}
        userId={data[0].userId}
        key={data.length}
      />
    )
    setPosts([newPost, ...posts]);
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
