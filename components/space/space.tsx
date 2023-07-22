import React from "react"
import { User, UserPlus } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import supabaseClient from "@/constants/constants"

type Props = {
  spaceId: number,
  spaceName: string,
  spaceLocation: string,
  users: Array<any>
}

export default function Space({ spaceId, spaceName, spaceLocation, users }: Props) {
  const { user } = useUser();

  const joinSpace = async () => {
    // Fetch latest users again
    let { data, error } = await supabaseClient
      .from('spaces')
      .select()
      .eq('id', spaceId);

    if (error) {
      console.error(`Error when refetching space: ${error}`)
    }

    ({ data, error } = await supabaseClient
      .from('spaces')
      .update({ users: [...data![0].users, user?.fullName] })
      .eq('id', spaceId))

    window.location.reload();
  }

  let usersList = [];
  for (let index in users) {
    usersList.push(<li key={index}>{users[index]}</li>);
  }

  // if user already in space
  const inSpace = users.includes(user?.fullName);

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-1.5 rounded-lg border border-gray-800 bg-gray-900 p-2">
      <div className="flex flex-1 flex-col gap-1.5">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{spaceName}</h1>
        <p className="text-xs text-gray-400">{inSpace ? spaceLocation : ""}</p>
      </div>
      <hr></hr>
      <div className="pl-5 text-sm">
        <ul className="list-disc">
          {usersList}
        </ul>
      </div>
      </div>
      <hr></hr>
      <div className="flex w-full justify-center">
        <button className="w-fit rounded-xl border-2 bg-blue-800 px-2.5 py-1 text-sm font-semibold">
          {" "}
           <div className="flex items-center gap-1.5" onClick={() => { if (!inSpace) joinSpace(); }}>
            {inSpace ? <><User /> Joined</> : <><UserPlus width={20} /> Join</>}
          </div>
        </button>
      </div>
    </div>
  )
}
