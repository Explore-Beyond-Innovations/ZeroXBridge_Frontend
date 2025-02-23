"use client";
import { useState } from "react";
import XZBInterface from "../components/claim-burn";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);

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
    <div className="min-h-screen bg-black flex items-center justify-center">
      <XZBInterface
        tokenData={tokenData}
        onClaim={handleClaim}
        onBurn={handleBurn}
        onConnect={handleConnect}
        isConnected={isConnected}
      />
    </div>
  );
};

export default Index;
