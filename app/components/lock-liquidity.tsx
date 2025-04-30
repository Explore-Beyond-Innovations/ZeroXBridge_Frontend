"use client";
import { useAccount } from "@starknet-react/core";
import Image from "next/image";
import { useState } from "react";
import Deposit from "./deposit";

interface LiquidityLockTableProps {
  isDarkMode: boolean;
  className?: string;
}

const LiquidityLockTable = ({
  isDarkMode,
  className,
}: LiquidityLockTableProps) => {
  const { isConnected } = useAccount()
  const [depositToken, setDepositToken] = useState('SOL');
  const [DepositModal, setDepositModal] = useState(false);
  const liquidityRows = [
    {
      token: "SOL",
      currentPrice: "$177.08",
      currentLiquidity: "$500,000",
      xzTokenRate: "0.01",
    },
    {
      token: "SOL",
      currentPrice: "$177.08",
      currentLiquidity: "$500,000",
      xzTokenRate: "0.01",
    },
    {
      token: "SOL",
      currentPrice: "$177.08",
      currentLiquidity: "$500,000",
      xzTokenRate: "0.01",
    },
    {
      token: "SOL",
      currentPrice: "$177.08",
      currentLiquidity: "$500,000",
      xzTokenRate: "0.01",
    },
    {
      token: "SOL",
      currentPrice: "$177.08",
      currentLiquidity: "$500,000",
      xzTokenRate: "0.01",
    },
    {
      token: "SOL",
      currentPrice: "$177.08",
      currentLiquidity: "$500,000",
      xzTokenRate: "0.01",
    },
  ];

  const showDepositModal = (token: string) => {
    setDepositToken(token);
    setDepositModal(true);
  };

  const handleClose = () => {
    setDepositModal(false);
  }

  return (
    <div
      className={`${className} ${
        isDarkMode ? "bg-[#1F1333] text-white" : "bg-[#F8F4FF] text-black"
      } px-8 py-6 rounded-xl w-[702px] md:w-full my-6 relative`}
    >
      <h2
        className={`text-[16px] font-bold mt-4 mb-8 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Lock Liquidity by making a deposit
      </h2>
      {/* This div handles the overflow internally */}
      <div className="overflow-x-auto max-w-full custom-scrollbar">
        <table className="w-full min-w-[400px] border-none">
          <thead
            className={`${
              isDarkMode ? "bg-[#3B2A65] text-white" : "bg-[#ECE1FF] text-black"
            }`}
          >
            <tr className="text-center rounded-3xl p-4">
              <th className="p-3 text-left rounded-tl-2xl whitespace-nowrap">
                Token
              </th>
              <th className="p-3 whitespace-nowrap">Current Liquidity</th>
              <th className="p-3 whitespace-nowrap">xZB Token Rate</th>
              <th className="p-3 text-right rounded-tr-2xl whitespace-nowrap">
                Lock Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {liquidityRows.map((row, index) => (
              <tr
                key={index}
                className={`border-b ${
                  isDarkMode
                    ? "border-[#8280FF] text-gray-400"
                    : "border-[#ECE1FF] text-black bg-transparent"
                } transition-colors text-center`}
              >
                <td className="p-3 flex items-center whitespace-nowrap">
                  <Image
                    src="/solana.svg"
                    alt="Token icon"
                    width={24}
                    height={24}
                    className="w-6 h-6 mr-2 rounded-full"
                  />
                  {row.token}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {row.currentLiquidity}
                  <div className="text-sm">{row.currentPrice}</div>
                </td>
                <td className="p-3 whitespace-nowrap">{row.xzTokenRate}</td>
                <td className="p-3 text-right whitespace-nowrap">
                  <button
                    className="bg-[#09050E] text-white px-4 py-2 rounded-full flex items-center justify-center ml-auto"
                    onClick={() => {showDepositModal(row.token)}}
                  >
                    {isConnected ?  "Select" : "Connect Wallet" }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        
        </table>

        {DepositModal && (
            <Deposit token={depositToken} onClose={handleClose} />
          )}
      </div>
    </div>
  );
};

export default LiquidityLockTable;
