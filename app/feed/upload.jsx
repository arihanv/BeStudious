"use client";
import { useState } from "react";
import supabaseClient from "@/constants/constants.jsx"


export default function Upload() {
    console.log(supabaseClient);
    const [ file, setFile ] = useState([]);
    const handleSubmit = async (e) => {
        // Prevent form submission
        e.preventDefault();
        if (!file) {
            return;
        }
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
        
        // const { data, _error } = await supabase.storage.from("images")
        //   .upload(filename, file, {
        //     cacheControl: "3600",
        //     upsert: false,
        // });
        const { error } = await supabaseClient
            .from("images")
            .insert({ name: "null", href: imageUrl, user: "null", img_src: "wh"})

            if (error) {
                console.error("Error inserting data:", error.message);
            } else {
                console.log("Insertion successful");
            }

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