/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import XZBInterface from "@/app/components/claim-burn";
import { useTheme } from "@/app/ThemeContext";
import { useAccount, useReadContract } from "@starknet-react/core";
import { useEffect, useState } from "react";

const Index = () => {
  const { isConnected } = useAccount();
  const { isDarkMode } = useTheme();
  const [xzbSupplyRate, setXzbSupplyRate] = useState("");
  const [dynamicRate, setDynamicRate] = useState("");

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

  const address = `0x${""}`;

  // Proper hook to read data from a Cairo function
  const {
    data: supplyRate,
    isLoading,
    isError,
  } = useReadContract({
    address: address, // Replace with actual contract address
    abi: [
      {
        // Define the ABI for the Cairo function
        name: "get_current_xzb_supply",
        type: "function",
        state_mutability: "view",
        inputs: [],
        outputs: [{ type: "uint256" }],
      },
    ],
    functionName: "get_current_xzb_supply",
    args: undefined,
    watch: true,
  });

  // Function to handle the supply rate data
  const getSupplyRate = () => {
    if (!isLoading && !isError && supplyRate !== undefined) {
      setXzbSupplyRate(supplyRate);
      console.log("xzb supply rate", xzbSupplyRate);
    }
  };

  const { data: dynamic_Rate } = useReadContract({
    address: address, // Replace with actual contract address
    abi: [
      {
        // Define the ABI for the Cairo function
        name: "get_dynamic_rate",
        type: "function",
        state_mutability: "view",
        inputs: [],
        outputs: [{ type: "uint256" }],
      },
    ],
    functionName: "get_dynamic_rate",
    args: undefined,
    watch: true,
  });

  // Function to handle the supply rate data
  const getDynamicRate = () => {
    if (dynamic_Rate !== undefined) {
      setDynamicRate(dynamic_Rate);
      console.log("xzb dynamic rate", dynamicRate);
    }
  };

  // Call getSupplyRate when supplyRate changes
  useEffect(() => {
    getSupplyRate();
    getDynamicRate();
  }, [supplyRate, dynamicRate]);

  return (
    <div
      className={`flex flex-col items-center w-full h-full py-[4rem] relative ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      <div
        className={`${
          isDarkMode ? "bg-black" : "bg-white"
        } flex items-center justify-center h-full`}
      >
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
