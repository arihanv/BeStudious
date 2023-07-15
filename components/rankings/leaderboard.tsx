import React from 'react'
import Rank from './rank'

type Props = {}

export default function Leaderboard({}: Props) {
  return (
    <div className='flex w-full flex-col items-center gap-3'>
        <Rank/>
        <Rank/>
        <Rank/>
        <Rank/>
        <Rank/>
        <Rank/>
        <Rank/>
        <Rank/>
        <Rank/>
        <Rank/>
        <Rank/>
    </div>
  )
}