"use client";
import { useState } from "react";
import {
  ChevronDown,
  Settings,
  ArrowUpDown,
  Wallet2,
  AlarmClock,
  FuelIcon,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "../ThemeContext";
import { useAccount } from "@starknet-react/core";

const tokens = ["ETH", "SOL"];

const Swap = () => {
  const [fromValue, setFromValue] = useState("0.00034");
  const [toValue, setToValue] = useState("5.79");
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("SOL");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const { isDarkMode } = useTheme();
  const {isConnected} = useAccount();

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  return (
    <div
      className={`font-[family-name:var(--font-manrope)] flex flex-col items-center justify-center w-full min-h-screen h-fit mx-auto relative `}
    >
      {isConnected ? (
        <div className="flex items-start gap-4 w-fit mx-auto 2xl:scale-150">
          <div
            className={`${
              isDarkMode ? "bg-[#332646]" : "bg-[#f8f4fe]"
            } w-[90vw] md:w-[92vw] lg:w-[500px] relative p-6 rounded-[1.25rem] shadow-lg text-white border-[0.4px] border-transparent before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#1F1333] before:to-[#614199] before:rounded-[1.25rem] before:-z-10 before:w-full before:h-full before:border-[0.4px] before:border-transparent`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-[1rem] font-bold ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Swap Tokens
              </h2>
              <button
                className={`flex items-center text-[0.75rem]  border-[0.4px] border-[#8B8B8B] text-[#8B8B8B] px-4 py-2 rounded-full ${
                  isDarkMode ? "" : "bg-[#6c5d92] text-gray-100"
                } `}
              >
                Slippage 0.5% <Settings size={11.45} className="ml-1" />
              </button>
            </div>

            <div
              className={`border-[0.4px] border-[#8B8B8B] ${
                isDarkMode ? "bg-[#1F1333]" : "bg-[#e6d9ff]"
              }  p-4 rounded-lg mb-2 relative"`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <input
                    type="text"
                    value={fromValue}
                    onChange={(e) => setFromValue(e.target.value)}
                    className={`bg-transparent text-xl font-semibold w-full focus:outline-none ${
                      isDarkMode ? "text-white" : "text-[#1F1333]"
                    }`}
                  />
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-800"
                    }`}
                  >
                    - $3.85 USD
                  </p>
                  <div className="flex items-center gap-x-1">
                    <Wallet2
                      className={`${
                        isDarkMode ? "text-[#8B8B8B]" : "text-[#1F1333]"
                      } w-[10.94px] h-[9.63px]`}
                    />
                    <p
                      className={`text-[0.75rem] ${
                        isDarkMode ? "text-[#8B8B8B]" : "text-[#1F1333]"
                      }`}
                    >
                      7.04{" "}
                      <span
                        className={`${
                          isDarkMode ? "text-white" : "text-[#1F1333]"
                        } font-bold`}
                      >
                        MAX
                      </span>
                    </p>
                  </div>
                </div>

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
                    <span
                      className={`${
                        isDarkMode ? "" : "text-[#1F1333]"
                      } font-medium text-[1.125rem] w-12 text-center`}
                    >
                      {fromToken}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`"ml-1 flex-shrink-0 ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    />
                  </button>

                  {showFromDropdown && (
                    <div
                      className={`absolute right-0 mt-2 ${
                        isDarkMode ? "" : "bg-[#6c5d92]"
                      } bg-[#2D1B42] p-2 rounded-lg shadow-md z-20`}
                    >
                      {tokens.map((token) => (
                        <div
                          key={token}
                          className={`"cursor-pointer p-2 rounded ${
                            isDarkMode
                              ? "hover:bg-gray-600"
                              : "hover:bg-[#e6d9ff] hover:text-black"
                          }`}
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
            </div>

            <div className="flex justify-center my-2">
              <button onClick={handleSwap} className="p-2 ">
                <ArrowUpDown
                  size={30}
                  className={`${
                    isDarkMode ? "text-[#D2B9FF]" : "text-[#1F1333]"
                  }`}
                />
              </button>
            </div>

            <div
              className={`${
                isDarkMode ? "bg-[#1F1333]" : "bg-[#e6d9ff]"
              } p-4 rounded-lg mb-2 relative`}
            >
              <div className="flex justify-between items-center">
                <div>
                <input
                  type="text"
                  value={toValue}
                  onChange={(e) => setToValue(e.target.value)}
                  className={`${isDarkMode ? "text-white" : "text-[#1F1333]"}
                 bg-transparent text-xl font-semibold w-full focus:outline-none`}
                />
                 <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-800"
                }`}
              >
                - $3.9 USD (-1.24%)
              </p>

              <div className="flex items-center gap-x-1">
                <Wallet2
                  className={`${
                    isDarkMode ? "text-[#8B8B8B]" : "text-[#1F1333]"
                  } w-[10.94px] h-[9.63px]`}
                />
                <p
                  className={`text-[0.75rem] ${
                    isDarkMode ? "text-[#8B8B8B]" : "text-[#1F1333]"
                  }`}
                >
                  0.00{" "}
                </p>
              </div>
                </div>
               
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
                    <span
                      className={`${
                        isDarkMode ? "" : "text-[#1F1333]"
                      } font-medium text-[1.125rem] w-12 text-center`}
                    >
                      {toToken}
                    </span>{" "}
                    {/* Fixed width */}
                    <ChevronDown
                      size={16}
                      className={`ml-1 flex-shrink-0 ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    />
                  </button>

                  {showToDropdown && (
                    <div className="absolute right-0 mt-2 bg-[#2D1B42] p-2 rounded-lg shadow-md z-20">
                      {tokens.map((token) => (
                        <div
                          key={token}
                          className={`"cursor-pointer p-2 rounded ${
                            isDarkMode
                              ? "hover:bg-gray-600"
                              : "hover:bg-[#e6d9ff] hover:text-black"
                          }`}
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
             
            </div>

            <div
              className={`${
                isDarkMode
                  ? "bg-[#1F1333] text-[#888888]"
                  : "bg-[#e6d9ff] text-[#1F1333]"
              } p-2 rounded-lg mb-2 relative  text-[12px]`}
            >
              <div className="w-ful flex justify-between items-center">
                <p>Price:</p> <p> -0.7785 USDT per Eth</p>
              </div>
              <div className="w-ful flex justify-between items-center">
                <p>Frontend Fee:</p> <p> $0</p>
              </div>
            </div>

            <div
              className={`${
                isDarkMode ? "bg-[#1F1333]" : "bg-[#e6d9ff]"
              } lg:hidden w-full mb-[3rem] h-[58.76px] flex items-center justify-between p-2 rounded-xl`}
            >
              <div className="flex gap-2 items-center">
                <Image
                  src={`/${toToken.toLowerCase()}-icon.png`}
                  alt={toToken}
                  width={28}
                  height={24}
                  className="w-[27.91px] h-[24px] object-contain"
                />
                <span
                  className={`font-medium text-[1.125rem] ${
                    isDarkMode ? "text-[#D4D4D4]" : "text-black"
                  }`}
                >
                  $70
                </span>
              </div>

              <div className="flex items-center gap-1">
                <AlarmClock className={`text-[#3ECD96] w-[16px] h-[16px]`} />
                <FuelIcon
                  className={`${
                    isDarkMode ? "text-[#8B8B8B]" : "text-black"
                  } w-[16px] h-[16px]`}
                />
                <p
                  className={`${isDarkMode ? "text-[#8B8B8B]" : "text-black"}`}
                >
                  ~$0.01
                </p>
              </div>
            </div>

            <div
              className={`${
                isDarkMode ? "text-[#D4D4D4]" : "text-[#1F1333]"
              } text-[12px] flex w-full justify-center gap-x-1 mb-[1.2rem] items-center`}
            >
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
                className="absolute inset-0 rounded-[16px] p-[2px]"
                style={{
                  background:
                    "linear-gradient(180deg, #A26DFF 0%, #12081D 100%)",
                  maskImage: "linear-gradient(white, white)",
                  WebkitMaskImage: "linear-gradient(white, white)",
                }}
              />
              <span className="relative z-10">Swap</span>
            </button>
          </div>

          <div
            className={`${
              isDarkMode ? "bg-[#332646]" : "bg-[#f8f4fe]"
            } hidden lg:flex flex-col gap-4 w-[450px] h-[157px] relative p-6 rounded-[1.25rem] shadow-lg text-white border-[0.4px] border-transparent before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#1F1333] before:to-[#614199] before:rounded-[1.25rem] before:-z-10 before:w-full before:h-full before:border-[0.4px] before:border-transparent`}
          >
            <p
              className={`${
                isDarkMode ? "text-white" : "text-black"
              } font-medium`}
            >
              Routes
            </p>
            <div
              className={`${
                isDarkMode ? "bg-[#3B285B]" : "bg-[#C9B4FF]"
              } w-full h-[58.76px] flex items-center justify-between p-2 rounded-xl`}
            >
              <div className="flex gap-2 items-center">
                <Image
                  src={`/${toToken.toLowerCase()}-icon.png`}
                  alt={toToken}
                  width={28}
                  height={24}
                  className="w-[27.91px] h-[24px] object-contain"
                />
                <span
                  className={`font-medium text-[1.125rem] ${
                    isDarkMode ? "text-[#D4D4D4]" : "text-black"
                  }`}
                >
                  $70
                </span>
              </div>

              <div className="flex items-center gap-1">
                <AlarmClock className={`text-[#3ECD96] w-[16px] h-[16px]`} />
                <FuelIcon
                  className={`${
                    isDarkMode ? "text-[#8B8B8B]" : "text-black"
                  } w-[16px] h-[16px]`}
                />
                <p
                  className={`${isDarkMode ? "text-[#8B8B8B]" : "text-black"}`}
                >
                  ~$0.01
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`${
            isDarkMode ? "bg-[#332646]" : "bg-[#f8f4fe]"
          } 2xl:scale-150 w-[85vw] md:w-[93vw] lg:w-[500px] mx-auto relative p-6 rounded-[1.25rem] shadow-lg text-white border-[0.4px] border-transparent before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#1F1333] before:to-[#614199] before:rounded-[1.25rem] before:-z-10 before:w-full before:h-full before:border-[0.4px] before:border-transparent`}
        >
          <div
            className={`border-[0.4px] border-[#8B8B8B] ${
              isDarkMode ? "bg-[#1F1333]" : "bg-[#ede2fe]"
            }  py-4 px-3 rounded-lg mb-2 relative`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[#8B8B8B] text-[0.75rem] font-normal">
                  From
                </p>
                <p
                  className={`${
                    isDarkMode ? "text-[#D4D4D4]" : "text-black"
                  } text-[1rem] font-semibold`}
                >
                  $10
                </p>
              </div>

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
                  <span
                    className={`font-medium text-[1.125rem] ${
                      isDarkMode ? "text-[#D4D4D4]" : "text-black"
                    } w-12 text-center`}
                  >
                    {fromToken}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`${
                      isDarkMode ? "" : "text-[#1F1333]"
                    } ml-1 flex-shrink-0`}
                  />
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
          </div>

          <div className="flex justify-center my-2">
            <button onClick={handleSwap} className="p-2 ">
              <ArrowUpDown size={30} className="text-[#D2B9FF]" />
            </button>
          </div>

          <div
            className={`border-[0.4px] border-[#8B8B8B] ${
              isDarkMode ? "bg-[#1F1333]" : "bg-[#ede2fe]"
            } py-4 px-3 rounded-lg mb-2 relative`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[#8B8B8B] text-[0.75rem] font-normal">To</p>
                <p
                  className={`text-[1rem] ${
                    isDarkMode ? "text-[#D4D4D4]" : "text-black"
                  } font-semibold`}
                >
                  $70
                </p>
              </div>

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
                  <span
                    className={`font-medium text-[1.125rem] w-12 text-center ${
                      isDarkMode ? "text-[#D4D4D4]" : "text-black"
                    }`}
                  >
                    {toToken}
                  </span>{" "}
                  {/* Fixed width */}
                  <ChevronDown
                    size={16}
                    className={`ml-1 flex-shrink-0 ${
                      isDarkMode ? "" : "text-[#1F1333]"
                    }`}
                  />
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
          </div>

          <button
            className="w-full py-3 mt-7 rounded-full text-lg font-semibold text-white bg-gradient-to-t from-[#12081D] to-[#A26DFF] relative mb-4"
            style={{
              border: "0.7px solid transparent",
              backgroundClip: "padding-box",
              position: "relative",
            }}
            onClick={handleConnectWallet}
          >
            <span
              className="absolute inset-0 rounded-[16px] p-[2px]"
              style={{
                background: "linear-gradient(180deg, #A26DFF 0%, #12081D 100%)",
                maskImage: "linear-gradient(white, white)",
                WebkitMaskImage: "linear-gradient(white, white)",
              }}
            />
            <span className="relative z-10">Connect Wallet</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Swap;
