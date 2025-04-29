"use client";
import XZBInterface from "@/app/components/claim-burn";
import { useTheme } from "@/app/ThemeContext";
import { useAccount } from "@starknet-react/core";


const Index = () => {
  const {isConnected} = useAccount()
  const { isDarkMode } = useTheme();

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



  return (
    <div
      className={`flex flex-col items-center w-full h-full py-[4rem] relative ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} flex items-center justify-center h-full`}>
        <XZBInterface
          tokenData={tokenData}
          onClaim={handleClaim}
          onBurn={handleBurn}
          isConnected={isConnected}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default Index;
