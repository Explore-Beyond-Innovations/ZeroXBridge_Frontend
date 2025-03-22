"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

const LockTokensPage = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isConnected, setIsConnected] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnect = () => {
    setIsConnected(true);
  };

  if (!mounted) return null;

  return (
    <div className={`flex w-full h-screen ${isDarkMode ? "bg-[#09050E]" : "bg-white"}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-full ml-80">
        <Navbar 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
          handleConnect={handleConnect}
          isConnected={isConnected}
        />

        <div className="flex flex-col w-full px-6 py-4">
          <h1 className={`text-2xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Lock your Ethereum Assets to receive xZB Tokens on Starknet L2
          </h1>
          <p className={`text-sm mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            All you have to do is to take the following steps
          </p>

          {/* Steps Section */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { title: "1. Select & Lock", desc: "Choose your assets and lock amount on Ethereum L1." },
              { title: "2. ZK Proof Generation", desc: "System generates and verifies ZK proof of your deposit" },
              { title: "3. Receive xZB", desc: "Get xZB tokens on Starknet based on your locked amount." },
              { title: "4. Use your xZB Tokens", desc: "Use Tokens for DeFi activities on Starknet (trade, lend & stake)." },
            ].map((step, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? "bg-[#1E1E2E] text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="font-medium mb-2">{step.title}</div>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Lock Liquidity Section */}
          <div className="mb-8">
            <h2 className={`text-xl font-medium mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              Lock Liquidity by making a deposit
            </h2>
            <div className={`p-4 rounded-lg bg-opacity-20 ${isDarkMode ? "bg-purple-900" : "bg-purple-100"}`}>
              <table className="w-full text-left">
                <thead>
                  <tr className={`border-b ${isDarkMode ? "border-purple-800 text-gray-300" : "border-purple-200 text-gray-700"}`}>
                    <th className="py-3 px-2">Token</th>
                    <th className="py-3 px-2">Current Liquidity</th>
                    <th className="py-3 px-2">xZB Token Rate</th>
                    <th className="py-3 px-2">Lock Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(5).fill(null).map((_, index) => (
                    <tr key={index} className={`border-b ${isDarkMode ? "border-purple-800 text-white" : "border-purple-200 text-gray-800"}`}>
                      <td className="py-4 px-2 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                        <span>SOL</span>
                        <span className="text-gray-500 text-sm">$177.08</span>
                      </td>
                      <td className="py-4 px-2">$500,000</td>
                      <td className="py-4 px-2">{isDarkMode ? "$1" : "xZB= 0.01"}</td>
                      <td className="py-4 px-2">
                        <button className="bg-purple-900 text-white px-4 py-2 rounded-md hover:bg-purple-800">
                          Connect Wallet
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LockTokensPage;
