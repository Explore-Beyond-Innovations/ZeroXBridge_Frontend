"use client";
import { useState } from "react";
import { ChevronDown, Settings, ArrowUpDown, Wallet2 } from "lucide-react";
import Image from "next/image";

const tokens = ["ETH", "SOL"];

const Swap = () => {
  const [fromValue, setFromValue] = useState("0.00034");
  const [toValue, setToValue] = useState("5.79");
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("SOL");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  return (
    <div className="font-[family-name:var(--font-manrope)] max-w-[31.25rem] mx-auto relative p-6 rounded-[1.25rem] shadow-lg text-white bg-[#21192F] border-[0.4px] border-transparent before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#1F1333] before:to-[#614199] before:rounded-[1.25rem] before:-z-10 before:w-full before:h-full before:border-[0.4px] before:border-transparent">
      {isWalletConnected ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[1rem] font-bold">Swap Tokens</h2>
            <button className="flex items-center text-[0.75rem]  border-[0.4px] border-[#8B8B8B] text-[#8B8B8B] px-4 py-2 rounded-full">
              Slippage 0.5% <Settings size={11.45} className="ml-1" />
            </button>
          </div>

          <div className="border-[0.4px] border-[#8B8B8B] bg-[#1F1333] p-4 rounded-lg mb-2 relative">
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="bg-transparent text-xl font-semibold w-full focus:outline-none"
              />
              <div className="relative">
                <button
                  className="flex items-center pr-2 min-w-[90px] justify-between"
                  onClick={() => setShowFromDropdown(!showFromDropdown)}
                >
                  <Image
                    src={`/${fromToken.toLowerCase()}-icon.png`}
                    alt={fromToken}
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px] object-contain mr-2"
                  />
                  <span className="font-medium text-[1.125rem] w-12 text-center">
                    {fromToken}
                  </span>
                  <ChevronDown size={16} className="ml-1 flex-shrink-0" />
                </button>

                {showFromDropdown && (
                  <div className="absolute right-0 mt-2 bg-[#2D1B42] p-2 rounded-lg shadow-md z-20">
                    {tokens.map((token) => (
                      <div
                        key={token}
                        className="cursor-pointer p-2 hover:bg-gray-600 rounded"
                        onClick={() => {
                          setFromToken(token);
                          setShowFromDropdown(false);
                        }}
                      >
                        {token}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-400">- $3.85 USD</p>
            <div className="flex items-center gap-x-1">
              <Wallet2 className="w-[10.94px] h-[9.63px] text-[#8B8B8B]" />
              <p className="text-[0.75rem] text-[#888888] ">
                7.04 <span className="text-white font-bold">MAX</span>
              </p>
            </div>
          </div>

          <div className="flex justify-center my-2">
            <button onClick={handleSwap} className="p-2 ">
              <ArrowUpDown size={20} className="text-[#D2B9FF]" />
            </button>
          </div>

          <div className=" bg-[#1F1333] p-4 rounded-lg mb-2 relative">
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={toValue}
                onChange={(e) => setToValue(e.target.value)}
                className="bg-transparent text-xl font-semibold w-full focus:outline-none"
              />
              <div className="relative">
                <button
                  className="flex items-center pr-2 min-w-[90px] justify-between"
                  onClick={() => setShowToDropdown(!showToDropdown)}
                >
                  <Image
                    src={`/${toToken.toLowerCase()}-icon.png`}
                    alt={toToken}
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px] object-contain mr-2"
                  />
                  <span className="font-medium text-[1.125rem] w-12 text-center">
                    {toToken}
                  </span>{" "}
                  {/* Fixed width */}
                  <ChevronDown size={16} className="ml-1 flex-shrink-0" />
                </button>

                {showToDropdown && (
                  <div className="absolute right-0 mt-2 bg-[#2D1B42] p-2 rounded-lg shadow-md z-20">
                    {tokens.map((token) => (
                      <div
                        key={token}
                        className="cursor-pointer p-2 hover:bg-gray-600 rounded"
                        onClick={() => {
                          setToToken(token);
                          setShowToDropdown(false);
                        }}
                      >
                        {token}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-400">- $3.9 USD (-1.24%)</p>

            <div className="flex items-center gap-x-1">
              <Wallet2 className="w-[10.94px] h-[9.63px] text-[#8B8B8B]" />
              <p className="text-[0.75rem] text-[#888888] ">0.00 </p>
            </div>
          </div>

          <div className=" bg-[#1F1333] p-2 rounded-lg mb-[3rem] relative text-[#888888] text-[12px]">
            <div className="w-ful flex justify-between items-center">
              <p>Price:</p> <p> -0.7785 USDT per Eth</p>
            </div>
            <div className="w-ful flex justify-between items-center">
              <p>Frontend Fee:</p> <p> $0</p>
            </div>
          </div>

          <div className="text-[#D4D4D4] text-[12px] flex w-full justify-center gap-x-1 mb-[1.2rem] items-center">
            <p>Advanced Option</p>
            <ChevronDown size={16} className="ml-1 flex-shrink-0" />
          </div>

          <button
            className="w-full py-3 rounded-full text-lg font-semibold text-white bg-gradient-to-t from-[#12081D] to-[#A26DFF] relative"
            style={{
              border: "0.7px solid transparent",
              backgroundClip: "padding-box",
              position: "relative",
            }}
          >
            <span
              className="absolute inset-0 rounded-full p-[2px]"
              style={{
                background: "linear-gradient(180deg, #A26DFF 0%, #12081D 100%)",
                maskImage: "linear-gradient(white, white)",
                WebkitMaskImage: "linear-gradient(white, white)",
              }}
            />
            <span className="relative z-10">Swap</span>
          </button>
        </>
      ) : (
        <>
          <div className="border-[0.4px] border-[#8B8B8B] bg-[#1F1333] p-4 rounded-lg mb-2 relative">
            <div className="flex justify-between items-center">
              <p className="text-[#8B8B8B] text-[0.75rem] font-normal">From</p>
              <div className="relative">
                <button
                  className="flex items-center pr-2 min-w-[90px] justify-between"
                  onClick={() => setShowFromDropdown(!showFromDropdown)}
                >
                  <Image
                    src={`/${fromToken.toLowerCase()}-icon.png`}
                    alt={fromToken}
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px] object-contain mr-2"
                  />
                  <span className="font-medium text-[1.125rem] w-12 text-center">
                    {fromToken}
                  </span>
                  <ChevronDown size={16} className="ml-1 flex-shrink-0" />
                </button>

                {showFromDropdown && (
                  <div className="absolute right-0 mt-2 bg-[#2D1B42] p-2 rounded-lg shadow-md z-20">
                    {tokens.map((token) => (
                      <div
                        key={token}
                        className="cursor-pointer p-2 hover:bg-gray-600 rounded"
                        onClick={() => {
                          setFromToken(token);
                          setShowFromDropdown(false);
                        }}
                      >
                        {token}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="text-[1rem] text-[#D4D4D4] font-semibold">$10</p>
          </div>

          <div className="flex justify-center my-2">
            <button onClick={handleSwap} className="p-2 ">
              <ArrowUpDown size={20} className="text-[#D2B9FF]" />
            </button>
          </div>

          <div className="border-[0.4px] border-[#8B8B8B] bg-[#1F1333] p-4 rounded-lg mb-2 relative">
            <div className="flex justify-between items-center">
              <p className="text-[#8B8B8B] text-[0.75rem] font-normal">To</p>

              <div className="relative">
                <button
                  className="flex items-center pr-2 min-w-[90px] justify-between"
                  onClick={() => setShowToDropdown(!showToDropdown)}
                >
                  <Image
                    src={`/${toToken.toLowerCase()}-icon.png`}
                    alt={toToken}
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px] object-contain mr-2"
                  />
                  <span className="font-medium text-[1.125rem] w-12 text-center">
                    {toToken}
                  </span>{" "}
                  {/* Fixed width */}
                  <ChevronDown size={16} className="ml-1 flex-shrink-0" />
                </button>

                {showToDropdown && (
                  <div className="absolute right-0 mt-2 bg-[#2D1B42] p-2 rounded-lg shadow-md z-20">
                    {tokens.map((token) => (
                      <div
                        key={token}
                        className="cursor-pointer p-2 hover:bg-gray-600 rounded"
                        onClick={() => {
                          setToToken(token);
                          setShowToDropdown(false);
                        }}
                      >
                        {token}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="text-[1rem] text-[#D4D4D4] font-semibold">$70</p>
          </div>

          <button
            className="w-full py-3 rounded-full text-lg font-semibold text-white bg-gradient-to-t from-[#12081D] to-[#A26DFF] relative mb-4"
            style={{
              border: "0.7px solid transparent",
              backgroundClip: "padding-box",
              position: "relative",
            }}
            onClick={handleConnectWallet}
          >
            <span
              className="absolute inset-0 rounded-full p-[2px]"
              style={{
                background: "linear-gradient(180deg, #A26DFF 0%, #12081D 100%)",
                maskImage: "linear-gradient(white, white)",
                WebkitMaskImage: "linear-gradient(white, white)",
              }}
            />
            <span className="relative z-10">Connect Wallet</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Swap;
