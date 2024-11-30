import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import HeroImg from "../assets/Hero-img.webp";

const HeroSection = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleLoginClose = () => setIsLoginOpen(false);
  const handleSignupOpen = () => setIsSignupOpen(true);
  const handleSignupClose = () => setIsSignupOpen(false);

  return (
    <div
      className="relative bg-no-repeat bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Your Social Media App
        </h1>
        <p className="text-lg mb-8">
          Connect with friends and share your moments.
        </p>
        <div className="space-x-4">
          <button
            onClick={handleLoginOpen}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full text-white font-semibold"
          >
            Log In
          </button>
          <button
            onClick={handleSignupOpen}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full text-white font-semibold"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Modals for login and signup */}
      {isLoginOpen && <LoginForm onClose={handleLoginClose} />}
      {isSignupOpen && <SignupForm onClose={handleSignupClose} />}
    </div>
  );
};

export default HeroSection;
