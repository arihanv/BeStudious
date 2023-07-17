"use client";
import { useState } from "react";

export default function Upload() {
    const [ file, setFile ] = useState([]);
    const handleSubmit = async (e) => {
        // prevents submitting nothing...
        e.preventDefault();
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