import React, { useEffect, useState } from "react";
import apiBase from "../utils/apiBase";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch posts on component mount
    async function fetchPosts() {
      try {
        const response = await fetch(`${apiBase}/posts`, {
          credentials: "include", // Include cookies for authenticated requests
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        console.log(data)
        setPosts(data.reverse());
      } catch (err) {
        setError("Failed to load posts. Please log in.");
        console.error(err.message);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Feed</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow p-4 rounded">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.body}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
