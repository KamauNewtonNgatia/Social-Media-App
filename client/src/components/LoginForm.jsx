import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import useUserStore from "../store/userStore";

function LoginForm({ onClose = () => {} }) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.addUser);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (userObj) => {
      const response = await fetch(`http://localhost:4000/auth/login`, {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Ensure cookies are sent with the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setUser(data);
      // Ensure the success toast is displayed before closing or navigating
      toast.success("Login successful!", { duration: 3000 });
      setTimeout(() => {
        onClose();
        navigate("/dashboard");
      }, 300); // Allow the toast to be shown before navigating
    },
    onError: (error) => {
      toast.error(error.message || "An unexpected error occurred", {
        duration: 3000,
      });
    },
  });

  // Input validation function
  const validateInputs = () => {
    if (!emailAddress) {
      toast.error("Email address is required", { duration: 3000 });
      return false;
    }
    if (!password) {
      toast.error("Password is required", { duration: 3000 });
      return false;
    }
    return true;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    mutate({ email: emailAddress, password });
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
            aria-label="Close Login Form"
          >
            X
          </button>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Sign In to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Toaster position="bottom-center" richColors />

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="example@gmail.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full ${
                isLoading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white font-semibold py-2 rounded-md`}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Sign In"}
            </button>

            {/* Link to Sign-Up */}
            <Link
              to="/signup"
              className="block text-center text-sm text-blue-500 hover:text-blue-700"
            >
              Don’t have an account? Sign up
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
