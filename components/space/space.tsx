import React from "react"
import { PlusCircle, UserPlus, MapPin } from "lucide-react"

type Props = {
  spaceName: string,
  spaceLocation: string,
  users: Array<any>
}

export default function Space({ spaceName, spaceLocation, users }: Props) {
  let usersList = [];
  for (let index in users) {
    usersList.push(<li key={index}>{users[index]}</li>);
  }
  
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-1.5 rounded-lg border border-gray-800 bg-gray-900 p-2">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{spaceName}</h1>
        <p className="text-xs text-gray-400"><MapPin /> {spaceLocation}</p>
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
          <div className="flex items-center gap-1.5">
            <UserPlus width={20} /> Request To Join
          </div>
        </button>
      </div>
    </div>
  )
}
