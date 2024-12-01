import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Mutation to update password
  const updatePasswordMutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await fetch("http://localhost:4000/update-password", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include", // Include credentials (cookies)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update password");
        }

        return await response.json();
      } catch (error) {
        throw new Error(error.message || "Error making request");
      }
    },
    onSuccess: () => {
      toast.success("Password updated successfully", { duration: 3000 });
      // navigate("/profile");
    },
    onError: (error) => {
      toast.error(
        error.message || "Error updating password. Please try again.",
        { duration: 3000 },
      );
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword.trim(), // Trim before sending data
      confirmPassword: formData.confirmPassword.trim(), // Send confirmPassword as well
    };

    // Trigger the mutation
    updatePasswordMutation.mutate(data);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-12">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Update Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter current password"
            required
          />
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter new password"
            required
          />
        </div>

        {/* Confirm New Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Confirm new password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full ${isLoading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"} text-white font-semibold py-2 rounded-md`}
          disabled={isLoading}
        >
          {isLoading ? "Updating password..." : "Update Password"}
        </button>
      </form>

      <Toaster position="bottom-center" richColors />
    </div>
  );
};

export default UpdatePassword;
