import React from "react";

function PostCard({
  username,
  profileImage,
  title,
  excerpt,
  body,
  image,
  createdAt,
}) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
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
        <p>Posted on: {createdAt}</p>
        <div className="flex justify-around mt-2">
          <button
            onClick={() => {
              runme;
            }}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Like
          </button>
          <button className="text-blue-500 hover:text-blue-700 font-medium">
            Comment
          </button>
          <button className="text-blue-500 hover:text-blue-700 font-medium">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
