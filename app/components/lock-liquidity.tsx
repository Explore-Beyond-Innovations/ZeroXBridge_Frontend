"use client";
import React from "react";
import Image from "next/image";

const LiquidityLockTable = () => {
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

  return (
    <div className="bg-[#1F1333] text-white px-8 py-6 rounded-xl w-[85%] max-w-7xl my-6  mx-auto">
      <h2 className="text-[16px] font-bold mt-4 mb-8">
        Lock Liquidity by making a deposit
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-none ">
          <thead className="bg-[#3B2A65]">
            <tr className="text-center rounded-3xl  p-4">
              <th className="p-3 text-left rounded-tl-2xl">Token</th>
              <th className="p-3 ">Current Liquidity</th>
              <th className="p-3 ">xZB Token Rate</th>
              <th className="p-3 text-right rounded-tr-2xl">Lock Amount</th>
            </tr>
          </thead>
          <tbody>
            {liquidityRows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-[#8280FF] transition-colors text-center"
              >
                <td className="p-3 flex items-center">
                  <Image
                    src="/solana.svg"
                    alt="Token icon"
                    width={500}
                    height={500}
                    className="w-6 h-6 mr-2 rounded-full"
                  />
                  {row.token}
                </td>
                <td className="p-3">
                  {row.currentLiquidity}
                  <div className="text-gray-400 text-sm">
                    {row.currentPrice}
                  </div>
                </td>
                <td className="p-3">{row.xzTokenRate}</td>
                <td className="p-3 text-right">
                  <button
                    className="bg-[#09050E] text-white px-4 py-2 rounded-full flex items-center justify-center ml-auto"
                    onClick={() => alert("Connect Wallet clicked")}
                  >
                    Connect Wallet
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiquidityLockTable;
