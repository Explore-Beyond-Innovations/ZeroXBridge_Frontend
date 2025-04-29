import React, { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import Image from "next/image";

interface TokenData {
  available: number;
  balance: number;
  usdValue: number;
}

interface Asset {
  id: string;
  name: string;
  symbol: string;
  icon: string;
}

interface XZBInterfaceProps {
  tokenData: TokenData;
  onClaim: (asset: string) => void;
  onBurn: (amount: string, asset: string) => void;
  isConnected: boolean | undefined;
  isDarkMode: boolean;
}

const SAMPLE_ASSETS: Asset[] = [
  {
    id: "1",
    name: "Ethereum",
    symbol: "ETH",
    icon: "/token.svg",
  },
  {
    id: "2",
    name: "USD Coin",
    symbol: "USDC",
    icon: "/token.svg",
  },
  {
    id: "3",
    name: "Tether",
    symbol: "USDT",
    icon: "/token.svg",
  },
];

const XZBInterface: React.FC<XZBInterfaceProps> = ({
  tokenData,
  onClaim,
  onBurn,
  isConnected,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<"claim" | "burn">("claim");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [burnAmount, setBurnAmount] = useState<string>("");
  const [isAssetSelectorOpen, setIsAssetSelectorOpen] = useState(false);

  const calculateRedemptionAmount = (amount: string) => {
    const value = parseFloat(amount) || 0;
    return (value * 0.97).toFixed(2); // 3% fee
  };

  const handleAssetSelect = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsAssetSelectorOpen(false);
  };

  return (
    <div
      className={` w-full lg:w-[500px] 2xl:scale-150 rounded-3xl p-6 ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      {/* Tab Buttons */}
      <div
        className={`flex rounded-xl font-bold ${
          isDarkMode ? "bg-[#21192F]" : "bg-[#ECE1FF]"
        } p-1 mb-3 lg:mb-6`}
      >
        <button
          className={`flex-1 py-[6.5px] lg:py-3 px-6 rounded-xl transition-all ${
            activeTab === "claim"
              ? "bg-[#7D53C4] text-white"
              : `${
                  isDarkMode
                    ? "text-[#8B8B8B] hover:text-white"
                    : "text-[#53436D]"
                }`
          }`}
          onClick={() => setActiveTab("claim")}
        >
          Claim xZB
        </button>
        <button
          className={`flex-1 py-[6.5px] lg:py-3 px-6 rounded-xl transition-all ${
            activeTab === "burn"
              ? "bg-[#7D53C4] font-bold text-white"
              : `${
                  isDarkMode
                    ? "text-[#8B8B8B] hover:text-white"
                    : "text-[#53436D]"
                }`
          }`}
          onClick={() => setActiveTab("burn")}
        >
          Burn xZB
        </button>
      </div>

      <div
        className={`space-y-5 lg:space-y-6 ${
          isDarkMode ? "bg-[#21192F]" : "bg-[#F8F4FF]"
        } rounded-3xl lg:px-[37px] lg:pt-5 pb-[30px] pt-[30px] px-6 w-full`}
      >
        {/* Title */}
        <h2 className="text-sm lg:text-lg font-medium">
          {activeTab === "claim"
            ? "Claim Your xZB Tokens Now"
            : "Burn Your xZB Tokens Now"}
        </h2>

        {/* Balance Display */}
        <div>
          <p
            className={`${
              isDarkMode ? "text-gray-400" : "text-[#09050E]"
            } text-xs md:text-sm`}
          >
            {activeTab === "claim" ? "Available to claim" : "xZB Balance"}
          </p>
          <p className="text-2xl font-bold lg:text-3xl lg:font-medium lg:mt-[3px] mt-[6px]">
            {activeTab === "claim"
              ? tokenData.available.toLocaleString()
              : tokenData.balance.toLocaleString()}{" "}
            xZB
          </p>
          <p
            className={`${
              isDarkMode ? "text-gray-400" : "text-[#09050E]"
            } text-[10px] md:text-sm`}
          >
            -${tokenData.usdValue.toLocaleString()}
          </p>
        </div>

        {activeTab === "burn" && (
          <div>
            <p
              className={`${
                isDarkMode ? "text-gray-400" : "text-[#53436D]"
              } text-xs mb:text-sm mb-2 lg:mb-1`}
            >
              Enter amount to Burn
            </p>
            <div className="relative">
              <input
                type="text"
                value={burnAmount}
                onChange={(e) => setBurnAmount(e.target.value)}
                className={`w-full font-semibold ${
                  isDarkMode
                    ? "bg-[#1F1333] text-[#8B8B8B] placeholder:text-[#8B8B8B]"
                    : "bg-[#ECE1FF] text-[#09050E] placeholder:text-[#09050E]"
                } border border-[#8B8B8B] rounded-xl p-4 pr-16`}
                placeholder="Enter Amount"
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6c5dd3] text-xs lg:text-sm"
                onClick={() => setBurnAmount(tokenData.balance.toString())}
              >
                MAX
              </button>
            </div>
          </div>
        )}

        {/* Asset Selector */}
        <div className="relative">
          <p
            className={`${
              isDarkMode ? "text-gray-400" : "text-[#53436D]"
            } text-xs mb:text-sm mb-2 lg:mb-1`}
          >
            {activeTab === "burn" ? "Receive Asset" : "Select Asset"}
          </p>
          <button
            className={`w-full ${
              isDarkMode ? "bg-[#1F1333]" : "bg-[#ECE1FF]"
            } rounded-lg lg:rounded-xl p-4 lg:p-4 flex justify-between items-center border-[.2px] lg:border border-[#8B8B8B]`}
            onClick={() => setIsAssetSelectorOpen(!isAssetSelectorOpen)}
          >
            {selectedAsset ? (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden relative bg-purple-500">
                  <Image
                    src={selectedAsset.icon}
                    alt={selectedAsset.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className={`${isDarkMode ? "text-white" : "text-black"}`}>
                  {selectedAsset.symbol}
                </span>
              </div>
            ) : (
              <span
                className={`font-semibold ${
                  isDarkMode ? "text-[#8B8B8B]" : "text-[#09050E]"
                }`}
              >
                Select Asset
              </span>
            )}
            <ChevronDown
              className={`text-gray-400 transition-transform ${
                isAssetSelectorOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isAssetSelectorOpen && (
            <div className="absolute w-full mt-2 py-2 bg-[#1F1333] border border-[#8B8B8B] rounded-xl z-10 shadow-lg">
              {SAMPLE_ASSETS.map((asset) => (
                <button
                  key={asset.id}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#2A1C40] transition-colors"
                  onClick={() => handleAssetSelect(asset)}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden relative bg-purple-500">
                    <Image
                      src={asset.icon}
                      alt={asset.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-white">{asset.symbol}</span>
                    <span className="text-gray-400 text-sm">{asset.name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="rounded-xl lg:space-y-[10px] space-y-3">
          {activeTab === "claim" ? (
            <div
              className={`flex items-center gap-2 ${
                isDarkMode
                  ? "bg-[#53436D] border border-dashed border-white"
                  : "bg-[#9584B0]"
              } rounded-xl py-[9px] lg:py-4 px-6 w-full`}
            >
              <p
                className={`${
                  isDarkMode ? "text-[#D4D4D4]" : "text-[#53436D]"
                } text-xs md:text-sm text-center lg:font-semibold font-light`}
              >
                You will receive xZB Tokens on Starknet after claiming
              </p>
            </div>
          ) : (
            <>
              <div
                className={`${
                  isDarkMode
                    ? "bg-[#53436D] border border-dashed border-white"
                    : "bg-[#9584B0]"
                } rounded-xl px-5 lg:py-3 py-2 text-[13px] mb:text-sm`}
              >
                <div className="flex justify-between mb-2">
                  <span
                    className={`${
                      isDarkMode ? "text-[#B9B9B9]" : "text-[#53436D]"
                    }`}
                  >
                    Redemption Fee
                  </span>
                  <span>3%</span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`${
                      isDarkMode ? "text-[#B9B9B9]" : "text-[#53436D]"
                    }`}
                  >
                    You will receive
                  </span>
                  <span>{calculateRedemptionAmount(burnAmount)} ETH</span>
                </div>
              </div>
              <div
                className={`mt-4 bg-[#E25876] ${
                  isDarkMode
                    ? "text-[#B9B9B9] border border-dashed border-white"
                    : "text-[#D4D4D4]"
                } rounded-xl  py-[9px] lg:py-6 px-4 text-center text-[12px] `}
              >
                Burning xZB is irreversible and subject to a 3% redemption fee
              </div>
            </>
          )}
          {/* Learn More */}
          <button
            className={`flex items-center gap-1 ${
              isDarkMode ? "text-[#8B8B8B]" : "text-[#53436D]"
            } text-sm`}
          >
            <Info size={16} />
            Learn More
          </button>
        </div>

        {/* Action Button */}
        {isConnected ? (
          <button
            className={`w-full bg-gradient-to-b from-[#A26DFF] to-[#09050E] hover:bg-[#5a4eb8] rounded-2xl p-[14px] lg:p-4 font-bold lg:font-medium transition-colors ${
              !isDarkMode && "text-white"
            }`}
            onClick={() =>
              activeTab === "claim"
                ? onClaim(selectedAsset?.id || "")
                : onBurn(burnAmount, selectedAsset?.id || "")
            }
          >
            {activeTab === "claim" ? "Claim xZB" : "Burn xZB"}
          </button>
        ) : (
          <button
            className={`w-full bg-gradient-to-b from-[#A26DFF] to-[#09050E] hover:bg-[#5a4eb8] rounded-2xl p-[14px] lg:p-4 font-bold lg:font-medium transition-colors ${
              !isDarkMode && "text-white"
            }`}
            onClick={()=>{return}}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default XZBInterface;
