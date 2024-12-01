import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import Updatebioprofile from "./updateBioProfile";
import UpdatePassword from "./Passwordupdate";

function EditProfile() {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Mutation for updating personal info
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:4000/edit-personal-info", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Include credentials (cookies)
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the profile",
      );
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter out empty fields
    const updates = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value.trim() !== ""),
    );

    // Check if there is anything to update
    if (Object.keys(updates).length === 0) {
      toast("No fields to update.");
      return;
    }

    // Trigger the mutation
    mutation.mutate(updates);
  };

  return (
    <>
      <Toaster position="bottom-center" richColors />

      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Edit Personal Information
        </h2>

        {/* Personal Info Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {mutation.isLoading ? "Updating..." : "Save Changes"}
          </button>
        </form>

        {/* Bio Profile Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Update Bio Information
          </h3>
          <Updatebioprofile />
        </div>

        {/* Password update */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Update Password Information
          </h3>
          <UpdatePassword />
        </div>
      </div>
    </>
  );
}

export default EditProfile;
