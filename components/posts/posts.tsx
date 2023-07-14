import React from 'react'
import Post from './post'

type Props = {}

export default function Posts({}: Props) {
  return (
    <div className='w-full flex flex-col items-center gap-12'>
        <Post name={"James Bond"}/>
        <Post name={"Ben Dover"}/>
    </div>
  )
}