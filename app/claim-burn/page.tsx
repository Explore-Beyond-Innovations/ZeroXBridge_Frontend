"use client";
import { useState } from "react";
import Navbar from "../components/navbar";
import XZBInterface from "../components/claim-burn";
import { useTheme } from "../context/ThemeContext";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const tokenData = {
    available: 2468,
    balance: 12468,
    usdValue: 2475,
  };

  const handleClaim = (asset: string) => {
    console.log("Claiming with asset:", asset);
  };

  const handleBurn = (amount: string, asset: string) => {
    console.log("Burning amount:", amount, "for asset:", asset);
  };

  const handleConnect = () => {
    setIsConnected(true);
  };

  return (
    <div
      className={`flex flex-col items-center w-full h-full relative ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} flex items-center justify-center h-full`}>
        <XZBInterface
          tokenData={tokenData}
          onClaim={handleClaim}
          onBurn={handleBurn}
          onConnect={handleConnect}
          isConnected={isConnected}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default Index;
