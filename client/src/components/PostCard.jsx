import React, { useState } from "react";
import { FcLike } from "react-icons/fc";
import { MdMessage, MdDelete } from "react-icons/md";
import { FaShareAlt, FaRegEdit } from "react-icons/fa";
import Comment from "./Commentform";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useUserStore from "../store/userStore";

function PostCard({
  postId,
  owner,
  username,
  profileImage,
  title,
  excerpt,
  body,
  image,
  createdAt,
}) {
  const formattedDateTime = new Date(createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  const [comment, setComment] = useState(false);
  const { user } = useUserStore();

  // Mutation for deleting a post
  const deletePostMutation = useMutation({
    mutationFn: async (postId) => {
      const response = await axios.delete(
        `http://localhost:4000/posts/postId/${postId}`,
        { withCredentials: true },
      );
      if (response.status !== 200) {
        throw new Error("Failed to delete post");
      }
      return postId;
    },
    onSuccess: (deletedPostId) => {
      // Optionally, you could call a method here to remove the post from the parent's state (if passed via props)
      console.log(`Post with ID: ${deletedPostId} deleted successfully`);
      // You can use a callback function to notify the parent component to remove the post from the UI
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });

  const handleDeletePost = () => {
    deletePostMutation.mutate(postId); // Trigger the delete mutation
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {owner && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            paddingInline: "2rem",
            paddingBlock: ".5rem",
          }}
          className="post-events"
        >
          <button
            onClick={handleDeletePost}
            className="text-red-500 hover:text-red-700"
          >
            <MdDelete style={{ fontSize: "1.5rem" }} />
          </button>
          <button className="text-blue-500 hover:text-blue-700">
            <FaRegEdit style={{ fontSize: "1.5rem" }} />
          </button>
        </div>
      )}
      <div className="flex items-center px-6 py-4 border-b">
        <img
          src={profileImage}
          alt={`${username}'s profile`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <h4 className="ml-4 text-lg font-bold text-gray-800">{username}</h4>
      </div>

      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{excerpt}</p>
      </div>

      <img
        src={image}
        alt="Post Image"
        className="text-sm font-medium text-gray-700 object-cover rounded-md mx-auto block"
      />

      <div className="px-6 py-4">
        <p className="text-gray-700">{body}</p>
      </div>

      <div className="px-6 py-4 text-sm text-gray-500 border-t">
        <p>Posted on: {formattedDateTime}</p>
        <div className="flex justify-around mt-2">
          <button
            onClick={() => {
              console.log("Like clicked");
            }}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            <FcLike size={24} /> {/* Set size to 24px */}
          </button>
          <button
            className="text-blue-500 hover:text-blue-700 font-medium"
            onClick={() => setComment(!comment)}
          >
            <MdMessage size={24} /> {/* Set size to 24px */}
          </button>
          <button className="text-blue-500 hover:text-blue-700 font-medium">
            <FaShareAlt size={24} /> {/* Set size to 24px */}
          </button>
        </div>
      </div>
      {comment && <Comment />}
    </div>
  );
}

export default PostCard;
