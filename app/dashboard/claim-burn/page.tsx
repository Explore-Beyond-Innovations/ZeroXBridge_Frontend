"use client";
import XZBInterface from "@/app/components/claim-burn";
import { useTheme } from "@/app/ThemeContext";
import { useAccount, useContract } from "@starknet-react/core";
import { useState } from "react";
import { shortString } from "starknet";

const Index = () => {
  const { isConnected, address, account } = useAccount();
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const tokenData = {
    available: 2468,
    balance: 12468,
    usdValue: 2475,
  };

  // Contract address - replace with your actual deployed contract address
  const contractAddress = "0x06799866e50962817ce737ed1c2611e64fdfd34a1934edd3960322e79a22fd96"; // Example address, replace with actual

  // Initialize contract
  const { contract } = useContract({
    address: contractAddress,
    abi: [
      {
        name: "burn",
        type: "function",
        inputs: [
          { name: "amount", type: "felt" },
          { name: "asset", type: "felt" }
        ],
        outputs: [],
        state_mutability: "external"
      }
    ]
  });

  const handleClaim = async (asset: string) => {
    try {
      setIsLoading(true);
      // Implement claim logic here
      console.log("Claiming with asset:", asset);
    } catch (error) {
      console.error("Error claiming:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBurn = async (amount: string, asset: string) => {
    try {
      setIsLoading(true);
      if (!address) {
        throw new Error("No wallet connected");
      }

      if (!contract) {
        throw new Error("Contract not initialized");
      }

      if (!account) {
        throw new Error("No account available");
      }

      // Validate amount
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new Error("Invalid amount");
      }

      // Convert amount to the correct format for the contract
      const amountInWei = BigInt(Math.floor(parsedAmount * 1e18)).toString();

      // Validate asset
      if (!asset) {
        throw new Error("No asset selected");
      }

      // Convert asset to felt
      const assetFelt = shortString.encodeShortString(asset);

      // Call the burn function using the account
      const result = await account.execute({
        contractAddress,
        entrypoint: "burn",
        calldata: [amountInWei, assetFelt]
      });

      console.log("Burn transaction:", result);
    } catch (error) {
      console.error("Error burning tokens:", error);
      // You might want to show this error to the user
    } finally {
      setIsLoading(false);
    }
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
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;
