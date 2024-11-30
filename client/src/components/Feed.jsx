import React, { useEffect, useState } from "react";
import apiBase from "../utils/apiBase";
import PostCard from "./PostCard";

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
        console.log(data);
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
        {posts.map((post, i) => (
          <PostCard
            key={i}
            title={post.title}
            excerpt={post.excerpt}
            body={post.body}
            image={post.image}
            profileImage={post.profileImage}
            username={post.username}
          />
          // <div key={post.id} className="bg-white shadow p-4 rounded">
        ))}
      </div>
    </div>
  );
}

export default Feed;
