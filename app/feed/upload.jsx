"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";


export default function Upload() {
    const [ file, setFile ] = useState([]);
    const handleSubmit = async (e) => {
        // prevents submitting nothing...
        e.preventDefault();
        const filename = `${uuidv4()}-${file.name}`;
    
        const { data, error } = await supabase.storage
          .from("images")
          .upload(filename, file, {
            cacheControl: "3600",
            upsert: false,
          });
    
        const filepath = data.path;
    };
    const handleFiles = (e) => {
        setFile(e.target.files[0]);
    };
    return (
        <div>
            <form onsubmit={handleSubmit}>
                <input type="file" name="image" onChange={handleFiles}/>
                <button type="submit">Upload Picture</button>
            </form>
        </div>
    );
}