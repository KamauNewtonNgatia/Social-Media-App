import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white shadow fixed top-0 left-0 w-full z-50 ">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold text-gray-800">
          <Link to="/dashboard">MySocial</Link>
        </h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link
                to="/create"
                className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition"
              >
                Create Post
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition"
              >
                Feed
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/notifications"
                className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition"
              >
                Notifications
              </Link>
            </li>
            <li>
              <Link
                to="/messaging"
                className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition"
              >
                Messaging
              </Link>
            </li>
          </ul>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
