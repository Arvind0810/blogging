"use client";

import Input from "@/Components/public/form/input";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
    const router = useRouter()
    const [form, setForm] = useState({
        username:"",
        email: "",
        password: "",
        role:"admin"
    })
    const [error, setError] = useState("")

    const handleChange = async (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        try {
            console.log(form)
            await axios.post("/auth/register", form)
            router.push("/login")
        } catch (error) {
            console.error(error)
            setError(error.response?.data?.error || "Registration failed")
        }
    }

    return (
        <div key="signup-form" className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-semibold text-center text-black">Sign Up</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <Input
                    label="Userame"
                    type="text"
                    placeholder="Enter your name"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />    
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:cursor-pointer">Sign Up</button>
                <p className="text-center text-sm text-gray-500">
                    Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log In</Link>
                </p>
            </form>
        </div>
    )
}