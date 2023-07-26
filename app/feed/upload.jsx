"use client"

import { useEffect, useRef, useState } from "react"
import supabaseClient from "@/constants/constants.jsx"
import { useUser } from "@clerk/nextjs"
import { Upload } from "lucide-react"

import Post from "@/components/posts/post"

export default function UploadButton({
  posts,
  setPosts,
  canUpload,
  setCanUpload,
}) {
  const { user } = useUser()
  const fileInputRef = useRef(null)
  const [file, setFile] = useState([])

  const handleSubmit = async () => {
    if (!canUpload) {
      alert("You can only post once per prompt!")
      return
    }

    if (!file.size) return

    const form = new FormData()
    form.append("file", file)
    let response = await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL, {
      method: "POST",
      body: form,
    })
    let json = await response.json()
    let imageUrl

    try {
      imageUrl = json.attachments[0].url
    } catch (e) {
      response = await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL, {
        method: "POST",
        body: form,
      })
      json = await response.json()
      imageUrl = json.attachments[0].url
    }

    const { data: fetchData, error: fetchError } = await supabaseClient
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

    await supabaseClient
      .from("users")
      .update({ points: countData[0].points + 3 })
      .eq("id", user.id)

    let newPost = (
      <Post
        postId={fetchData[0].id}
        name={fetchData[0].name}
        imageUrl={fetchData[0].href}
        createdAt={fetchData[0].created_at}
        profileImgUrl={fetchData[0].profileUrl}
        userId={fetchData[0].userId}
        key={fetchData.length}
      />
    )
    setPosts([newPost, ...posts])
    setCanUpload(false)
  }

  const handleFiles = (e) => {
    const selectedFile = e.target.files[0]

    if (!selectedFile) {
      return
    }

    if (
      selectedFile.type !== "image/jpeg" &&
      selectedFile.type !== "image/png"
    ) {
      alert("Please select a JPG or PNG image.")
      return
    }

    setFile(selectedFile)
  }

  useEffect(() => {
    if (file) {
      handleSubmit()
    }
  }, [file])

  return (
    <div title="Upload">
      <form onSubmit={handleSubmit}>
        <label htmlFor="imageUpload">
          <Upload />
        </label>
        <input
          id="imageUpload"
          name="imageUpload"
          style={{ display: "none", visibility: "hidden", cursor: "pointer" }}
          type="file"
          accept=".jpg, .jpeg, .png"
          ref={fileInputRef}
          onChange={handleFiles}
        />
      </form>
    </div>
  )
}
