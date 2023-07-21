"use client";

import React, { useState, useEffect } from 'react'
import Post from '../posts/post'
import supabaseClient from '@/constants/constants'

type Props = {
  user: any
}

type DataItem = {
  name: string
  href: string
  created_at: string
  profileUrl: string
}

export default function UserPosts({ user }: Props) {
  const [fetchedPosts, setFetchedPosts] = useState([]);

  useEffect(() => {
    let tempPostsArray: Array<any> = [];

    supabaseClient
      .from("images")
      .select()
      .order("created_at", { ascending: false })
      .eq("userId", user.id).then(result => {
        const { data, error } = result;

        if (error || data === null) {
          return console.error("Error fetching posts:", error.message)
        }

        for (let index in data as DataItem[]) {
          tempPostsArray.push(
            <Post
              name={data[index].name}
              imageUrl={data[index].href}
              createdAt={data[index].created_at}
              profileImgUrl={data[index].profileUrl}
              key={index}
            />
          )
        }

        setFetchedPosts(tempPostsArray);
      })
  }, [])

  return (
    <>
      {fetchedPosts}
    </>
  )
}