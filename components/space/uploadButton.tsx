"use client"

import React, { useState } from "react";
import supabaseClient from "@/constants/constants";
import { useUser } from "@clerk/nextjs";
import { Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {};

export default function UploadButton({}: Props) {
  const { user, isSignedIn } = useUser();
  const [spaceName, setSpaceName] = useState<string>("");
  const [spaceLocation, setSpaceLocation] = useState<string>("");

  const createSpace = async () => {
    if (!isSignedIn) return;

    const { data, error } = await supabaseClient
      .from('spaces')
      .insert({
        location: spaceLocation,
        name: spaceName,
        users: [user?.fullName]
      });
    
    if (error) {
      console.error("Error creating space:", error);
    }

    console.log("Created space.")
  };

  return (
    <div className="fixed bottom-0 mb-5 w-fit rounded-xl p-2 shadow-sm shadow-black backdrop-blur-sm">
      <Dialog>
        <DialogTrigger>
          <div className="flex w-full items-center gap-3">
            <button className="flex flex-1 items-center justify-between gap-3 rounded-xl border-4 border-slate-900 bg-blue-800 p-2 px-3 transition ease-in-out hover:scale-110">
              <div className="flex items-center gap-3 px-2">
                <Users />
                <div className="text-lg font-semibold">Make A Space</div>
              </div>
            </button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make A Space</DialogTitle>
            <DialogDescription className="flex flex-col gap-5 pt-2">
              <div>
                <label className="mb-10 text-sm font-medium">Name</label>
                <Input
                  value={spaceName}
                  onChange={(e) => setSpaceName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-10 text-sm font-medium">Location</label>
                <Input
                  value={spaceLocation}
                  onChange={(e) => setSpaceLocation(e.target.value)}
                />
              </div>
            </DialogDescription>
            <DialogFooter className="flex w-full flex-1 items-center justify-center pt-2">
              <div className="m-auto">
                <Button onClick={() => {createSpace()}}>Make Space</Button>
              </div>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
