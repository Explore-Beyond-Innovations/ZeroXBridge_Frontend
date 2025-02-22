"use client";
import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <div className={`${isDarkMode ? "bg-[#09050e]" : "bg-white"} h-screen flex flex-col`}>
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
            <div className="flex flex-1">
                <Sidebar isDarkMode={isDarkMode} />
                <main className="flex-1">
                    {/* Main content goes here */}
                </main>
            </div>
        </div>
    );
}