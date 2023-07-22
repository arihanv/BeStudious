"use client"

import { useState } from "react";
import supabaseClient from "@/constants/constants.jsx";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import Post from "@/components/posts/post"

export default function Upload({ posts, setPosts, deletePost }) {
  const { user } = useUser()
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

    if (error) {
      console.error("Error inserting data:", error.message)
      return
    }

    ({ data, error } = await supabaseClient
      .from("images")
      .select()
      .order("created_at", { ascending: false })
      .eq("userId", user.id)
      .limit(2)
    )
    
    if (error) {
      console.error("Error...", error);
    } 
    
    const createdAtTime = data[1].created_at;

    const today = moment().startOf('day');
    const time = moment('08:00:00', 'HH:mm:ss').utcOffset('-05:00');

    const momentWithHardTime = moment(today).set({
      hour: time.hour(),
      minute: time.minute(),
      second: time.second()
    });

    // const startTime = momentWithHardTime.format();
    // const postedTime = moment(createdAtTime, moment.ISO_8601, true);
    // const hourDiff = Math.abs(startTime.diff(postedTime, "hours"));
    // console.log(hourDiff);


    let newPost = (
      <Post
        deletePost={deletePost}
        postId={data[0].id}
        name={data[0].name}
        imageUrl={data[0].href}
        createdAt={data[0].created_at}
        profileImgUrl={data[0].profileUrl}
        userId={data[0].userId}
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
