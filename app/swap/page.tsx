"use client";
import React from "react";
import Swap from "../components/swap";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

function Page() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Sidebar />
      <div className={`${isDarkMode ? "bg-black" : "bg-white"} `}>
        <Swap />
      </div>
    </>
  );
}

export default Page;
