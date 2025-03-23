"use client";
import React, { useState } from "react";
import WalletCard from "../components/walletcard";
import TokenClaim from "../components/tokenclaim";
import Analytictable from "../components/analyticgraph";
import LiquidityLockTable from "../components/lock-liquidity";
import TradingChartComponent from "../components/TradingChart/trading-chart";
import { useTheme } from '../ThemeContext';

const DashboardPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState("-,--");
  const { isDarkMode } = useTheme();

  const handleConnect = () => {
    setIsConnected(true);
    setBalance("1,234.56");
  };

  return (
    <div className={`flex flex-col items-center w-full h-full mt-4 relative ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="flex flex-col h-full w-full px-6">
        <div className={`w-full grid grid-cols-1 lg:grid-cols-5 gap-6 mt-12 mb-8 pb-12 border-b ${isDarkMode ? 'border-[#A26DFF]' : 'border-purple-300'}`}>
          <div className="lg:col-span-2 flex flex-col gap-4">
            <WalletCard isConnected={isConnected} balance={balance} isDarkMode={isDarkMode} />
            <TokenClaim isConnected={isConnected} onConnect={handleConnect} isDarkMode={isDarkMode} />
          </div>
          <div className="lg:col-span-3 overflow-auto">
            <Analytictable isDarkMode={isDarkMode} />
          </div>
        </div>

        <div className={`border-b ${isDarkMode ? 'border-[#A26DFF]' : 'border-purple-300'} pb-6`}>
          <LiquidityLockTable isDarkMode={isDarkMode} />
        </div>

        <div className="w-full mt-8">
          <TradingChartComponent isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
