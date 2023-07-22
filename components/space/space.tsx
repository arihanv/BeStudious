import React from "react"
import { PlusCircle, UserPlus } from "lucide-react"

type Props = {
  spaceId: number,
  spaceName: string,
  spaceLocation: string,
  users: Array<any>
}

export default function Space({ spaceId, spaceName, spaceLocation, users }: Props) {
  const joinSpace = async () => {
    console.log(spaceId)
  }

  let usersList = [];
  for (let index in users) {
    usersList.push(<li key={index}>{users[index]}</li>);
  }
  
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-1.5 rounded-lg border border-gray-800 bg-gray-900 p-2">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{spaceName}</h1>
        <p className="text-xs text-gray-400">{spaceLocation}</p>
      </div>
      <hr></hr>
      <div className="pl-5 text-sm">
        <ul className="list-disc">
          {usersList}
        </ul>
      </div>
      <hr></hr>
      <div className="flex w-full justify-center">
        <button className="w-fit rounded-xl border-2 bg-blue-800 px-2.5 py-1 text-sm font-semibold">
          {" "}
          <div className="flex items-center gap-1.5" onClick={() => {joinSpace()}}>
            <UserPlus width={20} /> Join
          </div>
        </button>
      </div>
    </div>
  )
}
