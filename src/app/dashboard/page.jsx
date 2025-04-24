"use client"; // 👈 this is mandatory here

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios"; // make sure this exists

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    /* if (status === "unauthenticated") {
      router.push("/login");
    }
 */
    if (status === "authenticated" && session?.user?.accessToken) {
      fetchPosts();
    }
    }, [status, session]);

const fetchPosts = async () => {
    try {
      const res = await axios.get("/posts/me", {
          headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          withCredentials: true,
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
};

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Blogs</h1>
        {posts.length === 0 ? (
            <p>No Blogs found.</p>
        ):(
            <ul className="space-y-2" >
                {posts.map((post) => (
                    <li key={post.ID} className="p-4 bg-white shadow rounded">
                        <h2 className="text-lg font-semibold">{post.Title}</h2>
                        <p className="text-sm text-gray-500 ">{post.Status}</p>
                    </li>
                ))}
            </ul>
        )}
    </div>
  );
}
