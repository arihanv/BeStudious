import React from 'react'
import Post from './post'
import supabaseClient from "@/constants/constants.jsx"

type Props = {}

export default function Posts({}: Props) {

  return (
    <div className='flex w-full flex-col items-center gap-12'>
        <Post name={"James Bond"}/>
        <Post name={"Ben Dover"}/>
    </div>
  )
}