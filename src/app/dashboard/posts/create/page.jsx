"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import axios from "@/lib/axios"
import { slugify } from "@/helpers"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {ssr: false})

export default function CreatePosts(){
    const { data: session } = useSession();
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post("/posts", {
                title,
                slug,
                content,
                status: "published"
            },
            {
                headers: {
                    Authorization: `Bearer ${session?.user?.accessToken}`
                },
                withCredentials: true
            })

            router.push("/dashboard")
        } catch (err) {
            console.error("Error while creating post", err)
        }
    }

    const handleChange = (e) => {
        setTitle(e.target.value)
        setSlug(slugify(e.target.value))
    }
    return (
        <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <input 
                    type="text" 
                    placeholder="Post Title"
                    className="w-full p-3 border rounded"
                    value={title}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Post Slug"
                    className="w-full p-3 border rounded"
                    value={slug}
                    onChange={(e) => setSlug(slugify(e.target.value))}
                    readOnly
                />

                <div data-color-mode="light">
                    <MDEditor value={content} onChange={setContent} height={400} />
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">Publish</button>
            </form>
        </div>
    )
}