import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { uploadCloudinary } from "../utils/uploading";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const postData = async (data) => {
    try {
      const response = await axios.post(`http://localhost:4000/posts`, data, {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      toast.success("Post created successful!", { duration: 3000 });
      navigate("/dashboard");
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // if (!validateInputs()) return;
    console.log("uploading");
    const imageUrl = await uploadCloudinary(image);
    // console.log(res)

    if (imageUrl) {
      const data = {
        image: imageUrl,
        title,
        excerpt,
        body,
      };
      postData(data);
    }
  };

  return (
    <div>
      <Header />
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto bg-fuchsia-50"
      >
        {/* Title Input */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </div>

        {/* Excerpt Input */}
        <div className="flex flex-col">
          <label
            htmlFor="excerpt"
            className="text-sm font-medium text-gray-700"
          >
            Excerpt
          </label>
          <input
            type="text"
            id="excerpt"
            placeholder="Enter the excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </div>

        {/* Body Input */}
        <div className="flex flex-col">
          <label htmlFor="body" className="text-sm font-medium text-gray-700">
            Body
          </label>
          <textarea
            id="body"
            placeholder="Enter the body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 h-32 resize-none"
          />
        </div>

        {/* Image Input */}
        <div className="flex flex-col">
          <label
            htmlFor="image"
            className="text-sm font-medium text-gray-700 object-cover rounded-md"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full ${
            isLoading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold py-2 rounded-md shadow-md transition`}
          disabled={isLoading}
        >
          {isLoading ? "Creating Post..." : "Post"}
        </button>

        {/* Toaster for notifications */}
        <Toaster position="bottom-center" richColors />
      </form>
    </div>
  );
};

export default CreatePost;
