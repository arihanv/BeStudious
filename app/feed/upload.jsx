"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@clerk/nextjs"



export default function Upload() {
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    const [ file, setFile ] = useState([]);
    const handleSubmit = async (e) => {
        // Prevent form submission
        e.preventDefault();

        //const filename = uuidv4();
        
        const form = new FormData();
        form.append('file', file);

        const response = await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL, {
            method: 'POST',
            body: form
        });
        const json = await response.json();

        const imageUrl = json.attachments[0].url;
        console.log(imageUrl);

        const file = event.target.files[0];
        const { data, error } = await supabase
            .storage
            .from('images')
            .upload(imageUrl, file, {
            cacheControl: '3600',
            upsert: false
        });
        
        // const { data, _error } = await supabase.storage
        //   .from("images")
        //   .upload(filename, file, {
        //     cacheControl: "3600",
        //     upsert: false,
        //   });
    
        // const filepath = data.path;
    };

    const handleFiles = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" name="image" onChange={handleFiles}/>
                <button type="submit">Upload Picture</button>
            </form>
        </div>
    );
}