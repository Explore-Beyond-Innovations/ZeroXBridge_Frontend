"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import WalletCard from "../components/walletcard";
import TokenClaim from "../components/tokenclaim";
import Analytictable from "../components/analyticgraph";
import LiquidityLockTable from "../components/lock-liquidity";
import TradingChartComponent from "../components/TradingChart/trading-chart";

const DashboardPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState("-,--");

  const handleConnect = () => {
    setIsConnected(true);
    setBalance("1,234.56");
  };
  return (
    <div className="flex flex-col items-center w-full h-full relative">
        <Navbar isDarkMode={true} toggleDarkMode={() => {}} />
      <div className="flex flex-col h-full w-full px-6">
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-6 mt-12 mb-8 pb-12 border-b border-[#A26DFF] ">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <WalletCard isConnected={isConnected} balance={balance} />
            <TokenClaim isConnected={isConnected} onConnect={handleConnect} />
          </div>
          <div className="lg:col-span-3 overflow-auto">
            <Analytictable />
          </div>
        </div>

        <div className="border-b border-[#A26DFF] pb-6">
        <LiquidityLockTable />
        </div>

        <div className=" w-full mt-8">
            <TradingChartComponent />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
