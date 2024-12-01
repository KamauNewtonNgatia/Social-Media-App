import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import {QueryClient, QueryClientProvider} from "react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./components/CreatePost";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
``;
import Header from "./components/Header";
import Layout from "./components/Layout/Layout";

// Initialize QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* Home Page Route */}
            <Route path="/" element={<HomePage />} />

            <Route
              path="/login"
              element={
                <Layout>
                  <LoginForm />
                </Layout>
              }
            />
            <Route path="/signup" element={<SignupForm />} />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/create"
              element={
                <Layout>
                  <CreatePost />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            <Route
              path="/editprofile"
              element={
                <Layout>
                  <EditProfile />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
