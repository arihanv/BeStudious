"use client"

import React from 'react'
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

export default async function UserPosts({user}: Props) {
  let fetchedPosts = []

  const { data, error } = await supabaseClient
    .from("images")
    .select()
    .order("created_at", { ascending: false })
    .eq("userId", user.id)

  if (error || data === null) {
    return console.error("Error fetching posts:", error.message)
  }

  for (let index in data as DataItem[]) {
    fetchedPosts.push(
      <Post
        name={data[index].name}
        imageUrl={data[index].href}
        createdAt={data[index].created_at}
        profileImgUrl={data[index].profileUrl}
        key={index}
      />
    )
  }

  return (
    <>
    {fetchedPosts}
    </>
  )
}