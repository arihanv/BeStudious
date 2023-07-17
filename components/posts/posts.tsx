import React from 'react'
import Post from './post'
import { createClient } from "@supabase/supabase-js";

const sbAdmin = createClient(
  process.env.PROJECT_URL || '',
  process.env.SERVICE_ROLE_KEY || ''
);

type Props = {}

export default function Posts({}: Props) {


  return (
    <div className='flex w-full flex-col items-center gap-12'>
        <Post name={"James Bond"}/>
        <Post name={"Ben Dover"}/>
    </div>
  )
}