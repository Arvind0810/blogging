"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({children}){
    const {data: session, status} = useSession()
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
          router.push("/login");
        }
      }, [status]);
    
      if (status === "loading") {
        return <p className="text-center mt-10">Loading...</p>;
      }
    
      if (status === "unauthenticated") {
        return null; // stop rendering until redirect
      }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-500 text-white p-4 space-y-4">
                <Link href="/dashboard" ><h2 className="text-xl font-bold">Dashboard</h2></Link>
                <nav className="flex flex-col space-y-2">
                    <Link href="/dashboard/posts" className="hover:underline">
                        My Posts
                    </Link>
                    <Link href="/dashboard/posts/create" className="hover:underline">
                        New Post
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 p-6">
                {children}
            </main>
        </div>
    )
}