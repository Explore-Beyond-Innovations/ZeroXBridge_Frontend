/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { ChevronDown, Info } from "lucide-react";
import Image from "next/image";
import { useEthereum } from "./Ethereum-provider";
import { ethers } from "ethers";

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
  address?: string;
}

interface XZBInterfaceProps {
  tokenData: TokenData;
  onClaim: (asset: string) => void;
  onBurn: (amount: string, asset: string) => void;
  isConnected: boolean | undefined;
  isDarkMode: boolean;
  isLoading?: boolean;
}

const SAMPLE_ASSETS: Asset[] = [
  {
    id: "1",
    name: "Ethereum",
    symbol: "ETH",
    icon: "/token.svg",
    address: "0x0000000000000000000000000000000000000000" // ETH address
  },
  {
    id: "2",
    name: "USD Coin",
    symbol: "USDC",
    icon: "/token.svg",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" // USDC address
  },
  {
    id: "3",
    name: "Tether",
    symbol: "USDT",
    icon: "/token.svg",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" // USDT address
  },
];

const XZBInterface: React.FC<XZBInterfaceProps> = ({
  tokenData,
  onClaim,
  onBurn,
  isConnected,
  isDarkMode,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<"claim" | "burn">("claim");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [burnAmount, setBurnAmount] = useState<string>("");
  const [isAssetSelectorOpen, setIsAssetSelectorOpen] = useState(false);
  const [hasBurned, setHasBurned] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userEthBalance, setUserEthBalance] = useState<string | null>(null);
  const [maxAmount, setMaxAmount] = useState<string>("");
  
  const { 
    isConnected: isEthereumConnected, 
    // connect: connectEthereum,
    depositAsset,
    // claimTokens,
    address: ethereumAddress,
    provider
  } = useEthereum();

  // Reset error when tab changes
  useEffect(() => {
    setError(null);
  }, [activeTab]);

  // Add effect to fetch ETH balance when connected
  useEffect(() => {
    const fetchBalance = async () => {
      if (isEthereumConnected && ethereumAddress && provider) {
        try {
          const balance = await provider.getBalance(ethereumAddress);
          const balanceInEth = ethers.formatEther(balance);
          setUserEthBalance(balanceInEth);
          // Set max amount slightly less than balance to account for gas
          const maxForGas = Number(balanceInEth) * 0.95; // Leave 5% for gas
          setMaxAmount(maxForGas.toString());
        } catch (error) {
          console.error("Error fetching balance:", error);
          setUserEthBalance(null);
        }
      } else {
        setUserEthBalance(null);
        setMaxAmount("");
      }
    };

    fetchBalance();
  }, [isEthereumConnected, ethereumAddress, provider]);

  const calculateRedemptionAmount = (amount: string) => {
    const value = parseFloat(amount) || 0;
    return (value * 0.97).toFixed(2); // 3% fee
  };

  const handleAssetSelect = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsAssetSelectorOpen(false);
    setError(null);
  };

  // Update input validation
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) { // Allow empty or decimal numbers
      setBurnAmount(value);
      
      // Clear error if amount is valid
      if (selectedAsset?.symbol === "ETH" && userEthBalance) {
        const inputAmount = Number(value);
        const maxAllowed = Number(maxAmount);
        
        if (inputAmount > maxAllowed) {
          setError(`Amount exceeds available balance (${Number(userEthBalance).toFixed(5)} ETH). Please enter a smaller amount.`);
        } else {
          setError(null);
        }
      }
    }
  };

  // Update MAX button handler
  const handleMaxClick = () => {
    if (selectedAsset?.symbol === "ETH" && maxAmount) {
      setBurnAmount(maxAmount);
      setError(null);
    } else {
      setBurnAmount(tokenData.balance.toString());
    }
  };

  const handleBurn = async (amount: string, assetId: string) => {
    try {
      setError(null);
      setIsProcessing(true);

      // Check if wallet is connected
      if (!isConnected) {
        throw new Error("Please connect your wallet first");
      }

      // Check if Ethereum wallet is connected for L1
      if (!isEthereumConnected || !ethereumAddress) {
        try {
          // await connectEthereum();
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (!isEthereumConnected || !ethereumAddress) {
            throw new Error("Failed to connect Ethereum wallet");
          }
        } catch (error: any) {
          console.error('error', error)
          throw new Error("Please connect your Ethereum wallet first");
        }
      }

      if (!selectedAsset) {
        throw new Error("Please select an asset first");
      }

      if (!amount || parseFloat(amount) <= 0) {
        throw new Error("Please enter a valid amount");
      }

      // Determine asset type (0 for ETH, 1 for ERC20)
      const assetType = selectedAsset.symbol === "ETH" ? 0 : 1;
      
      // Get asset address
      const tokenAddress = selectedAsset.address || "0x0000000000000000000000000000000000000000";

      // For ETH transfers, validate balance before proceeding
      if (assetType === 0) {
        const balance = await provider?.getBalance(ethereumAddress);
        if (!balance) {
          throw new Error("Could not get your ETH balance");
        }

        const amountInWei = ethers.parseEther(amount);
        if (balance < amountInWei) {
          const balanceInEth = ethers.formatEther(balance);
          throw new Error(
            `Insufficient ETH balance. You have ${Number(balanceInEth).toFixed(5)} ETH but trying to send ${amount} ETH. Please reduce the amount or add more ETH to your wallet.`
          );
        }
      }

      console.log("Initiating burn transaction:", {
        assetType,
        tokenAddress,
        amount,
        userAddress: ethereumAddress,
        isEthereumConnected,
        hasAddress: !!ethereumAddress
      });

      // Call depositAsset function
      const result = await depositAsset(
        assetType,
        tokenAddress,
        amount
      );
      
      if (!result.success) {
        throw new Error(result.error || "Deposit failed");
      }

      console.log("Transaction successful:", {
        transactionHash: result.transactionHash,
        commitmentHash: result.commitmentHash
      });

      // Store commitment hash for L2 use
      if (result.commitmentHash) {
        localStorage.setItem('latestCommitmentHash', result.commitmentHash);
        localStorage.setItem('latestDepositTx', result.transactionHash || '');
      }
      
      setHasBurned(true);
      onBurn(amount, assetId);
    } catch (error) {
      console.error("Error in handleBurn:", error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred while burning tokens";
      setError(errorMessage);
      
      // If it's an insufficient funds error, add a suggestion
      if (errorMessage.includes("Insufficient")) {
        setTimeout(() => {
          setError(errorMessage + "\n\nTip: Try reducing the amount or adding more funds to your wallet.");
        }, 100);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClaim = async () => {
    try {
      setError(null);
      setIsProcessing(true);

      if (!isEthereumConnected || !ethereumAddress) {
        // await connectEthereum();
        return;
      }

      // await claimTokens();
      onClaim(selectedAsset?.id || "");
    } catch (error) {
      console.error("Error in handleClaim:", error);
      setError(error instanceof Error ? error.message : "An error occurred while claiming tokens");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConnect = async () => {
    try {
      setError(null);
      setIsProcessing(true);

      if (activeTab === "claim" && !isEthereumConnected) {
        // await connectEthereum();
        // Wait a bit for the connection to be established
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if connection was successful
        if (!isEthereumConnected || !ethereumAddress) {
          throw new Error("Failed to connect Ethereum wallet");
        }
      }
    } catch (error) {
      console.error("Error connecting:", error);
      setError(error instanceof Error ? error.message : "An error occurred while connecting");
    } finally {
      setIsProcessing(false);
    }
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
        {error && (
          <div className={`${isDarkMode ? "bg-[#E25876] text-white" : "bg-[#FFE5EA] text-[#E25876]"} rounded-xl py-4 px-6 text-center`}>
            <p>{error}</p>
          </div>
        )}

        {/* Title */}
        <h2 className="text-sm lg:text-lg font-medium">
          {activeTab === "claim"
            ? "Claim Your xZB Tokens Now"
            : "Burn Your xZB Tokens Now"}
        </h2>

        {/* Burn First Warning */}
        {activeTab === "claim" && !hasBurned && (
          <div
            className={`${
              isDarkMode
                ? "bg-[#E25876] border border-dashed border-white"
                : "bg-[#FFE5EA]"
            } rounded-xl py-4 px-6 text-center`}
          >
            <p className={`${isDarkMode ? "text-white" : "text-[#E25876]"}`}>
              Please burn your tokens first before claiming. This ensures proper token redemption.
            </p>
          </div>
        )}

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
            <p className={`${isDarkMode ? "text-gray-400" : "text-[#53436D]"} text-xs mb:text-sm mb-2 lg:mb-1`}>
              Enter amount to Burn
              {selectedAsset?.symbol === "ETH" && userEthBalance && (
                <span className="ml-2 text-xs">
                  (Available: {Number(userEthBalance).toFixed(5)} ETH)
                </span>
              )}
            </p>
            <div className="relative">
              <input
                type="text"
                value={burnAmount}
                onChange={handleAmountChange}
                className={`w-full font-semibold ${
                  isDarkMode
                    ? "bg-[#1F1333] text-[#8B8B8B] placeholder:text-[#8B8B8B]"
                    : "bg-[#ECE1FF] text-[#09050E] placeholder:text-[#09050E]"
                } border border-[#8B8B8B] rounded-xl p-4 pr-16`}
                placeholder="Enter Amount"
              />
              <button
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-[#6c5dd3] text-xs lg:text-sm ${
                  (!selectedAsset || (selectedAsset.symbol === "ETH" && !userEthBalance)) ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleMaxClick}
                disabled={!selectedAsset || (selectedAsset.symbol === "ETH" && !userEthBalance)}
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
            } ${(isLoading || isProcessing) ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={async () => {
              if (activeTab === "claim") {
                if (!isEthereumConnected) {
                  await handleConnect();
                } else {
                  await handleClaim();
                }
              } else {
                await handleBurn(burnAmount, selectedAsset?.id || "");
              }
            }}
            disabled={
              isLoading || 
              isProcessing ||
              (activeTab === "claim" && !hasBurned) || 
              (activeTab === "burn" && (!burnAmount || !selectedAsset || parseFloat(burnAmount) <= 0))
            }
          >
            {isLoading || isProcessing
              ? "Processing..." 
              : activeTab === "claim" 
                ? (isEthereumConnected ? "Claim xZB" : "Connect Ethereum Wallet") 
                : "Burn xZB"
            }
          </button>
        ) : (
          <button
            className={`w-full bg-gradient-to-b from-[#A26DFF] to-[#09050E] hover:bg-[#5a4eb8] rounded-2xl p-[14px] lg:p-4 font-bold lg:font-medium transition-colors ${
              !isDarkMode && "text-white"
            }`}
            onClick={handleConnect}
            disabled={isProcessing}
          >
            {isProcessing ? "Connecting..." : "Connect Wallet"}
          </button>
        )}
      </div>
    </div>
  );
};

export default XZBInterface;
