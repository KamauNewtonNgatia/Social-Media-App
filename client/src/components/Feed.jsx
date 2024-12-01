import React, { useEffect, useState } from "react";
import apiBase from "../utils/apiBase";
import PostCard from "./PostCard";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${apiBase}/posts`, {
          credentials: "include",
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
        {posts.map((post, i) => {
          const profileImage =
            post.user?.profile?.profileImage || "/images/default-profile.png";
          const username = post.user?.username || "Unknown User";

          return (
            <PostCard
              owner={false}
              key={i}
              title={post.title}
              excerpt={post.excerpt}
              body={post.body}
              image={post.image}
              profileImage={profileImage}
              username={username}
              createdAt={post.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Feed;
