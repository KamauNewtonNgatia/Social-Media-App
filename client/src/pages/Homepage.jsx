import React, { useContext } from "react";
import HeroSection from "../components/HeroSection";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "./Dashboard";

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Dashboard /> : <HeroSection />;
};

export default HomePage;
