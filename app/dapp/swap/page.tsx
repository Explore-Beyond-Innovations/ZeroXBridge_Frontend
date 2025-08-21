"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import SwapFromInput from "./components/SwapFromInput";
import SwapToInput from "./components/SwapToInput";
import SwapToggle from "./components/SwapToggle";

// Dummy tokens data
import { tokens_swap as tokens } from "@/utils/data";
import { SwapSuccessModal } from "./components/SwapSuccessModal";
import { ConnectWalletButton } from "../components/ui/ConnectWalletButton";
import { useWallet } from "@/app/hooks";

// Skeleton Components
function SwapFromInputSkeleton() {
  return (
    <div
      className="bg-card border-[1.1px] border-card-border p-4 font-light rounded-[16px]"
      style={{
        boxShadow: "0px 0px 14px 0px #00000014",
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-x-3">
          <div className="w-11 h-11 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />

          <div className="flex flex-col space-y-0.5">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12" />
          </div>
        </div>
        <div className="w-[35px] h-[35px] bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
      </div>

      <div className="flex items-center mb-[14px] w-full space-x-2">
        <div className="h-[34px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-1" />
        <div className="h-[34px] w-[60px] bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
      </div>

      <div className="flex items-center justify-between pt-[14.4px] border-t-[#F1F1F1] dark:border-t-[#232323] border-t-[1px] text-[13.3px]/[113%]">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16" />
      </div>
    </div>
  );
}

function SwapToInputSkeleton() {
  return (
    <div
      className="bg-card border-[1.1px] border-card-border p-4 font-light rounded-[16px]"
      style={{
        boxShadow: "0px 0px 14px 0px #00000014",
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-x-3">
          <div className="w-11 h-11 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />

          <div className="flex flex-col space-y-0.5">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-6" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12" />
          </div>
        </div>
        <div className="w-[35px] h-[35px] bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
      </div>

      <div className="flex items-center mb-[14px] w-full">
        <div className="h-[34px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
      </div>
    </div>
  );
}

function SwapQuoteDetailsSkeleton() {
  return (
    <div className="flex flex-col space-y-2 mb-6">
      <div className="flex items-center justify-between text-sm/[113%]">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24" />
      </div>
      
      <div className="flex items-center justify-between text-sm/[113%]">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12" />
      </div>
      
      <div className="flex items-center justify-between text-sm/[113%]">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16" />
      </div>
    </div>
  );
}

function SwapButtonSkeleton() {
  return (
    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-full" />
  );
}

export default function SwapPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState<string>("");
  const toAmount: string = fromAmount
    ? (
        (fromToken.currentPrice * Number(fromAmount)) /
        toToken.currentPrice
      ).toFixed(2)
    : "";

  const { isConnected, openWalletModal } = useWallet();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  function handleToggle() {
    const temp = fromToken;
    const currentAmountInput = toAmount;
    console.log(currentAmountInput);
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(currentAmountInput);
  }

  return (
    <div className="w-full md:pt-20 flex justify-center">
      <div
        className="w-full lg:w-[440px] md:h-fit p-[1.11px] rounded-[18px] overflow-hidden"
        style={{
          backgroundImage: "var(--container-border)",
        }}
      >
        <div className="bg-container h-full w-full rounded-[18px]">
          <div className="pt-3 pr-4 flex justify-end pb-2 text-foreground">
            <button>
              <Menu />
            </button>
          </div>

          <div className="relative flex flex-col gap-y-3">
            <SwapToggle onToggle={handleToggle} />
            
            {isLoading ? (
              <>
                <SwapFromInputSkeleton />
                <SwapToInputSkeleton />
              </>
            ) : (
              <>
                <SwapFromInput
                  token={fromToken}
                  setToken={setFromToken}
                  balance="10"
                  amount={fromAmount}
                  setAmount={setFromAmount}
                  isConnected={isConnected}
                />
                <SwapToInput
                  token={toToken}
                  setToken={setToToken}
                  amount={toAmount}
                  isConnected={isConnected}
                />
              </>
            )}
          </div>

          <div className="p-5 pt-[25px]">
            {isLoading ? (
              <>
                <SwapQuoteDetailsSkeleton />
                <SwapButtonSkeleton />
              </>
            ) : (
              <>
                <div className="flex flex-col space-y-2 mb-6">
                  {[
                    [
                      "Price",
                      `${fromAmount} ${fromToken.symbol} = ${(
                        (fromToken.currentPrice * Number(fromAmount)) /
                        toToken.currentPrice
                      ).toFixed(2)} ${toToken.symbol}`,
                    ],
                    ["Frontend Fee:", "$1.23"],
                    ["You'd receive:", "$3492.10"],
                  ]
                    .filter(([label]) => isConnected || label !== "You'd receive:")
                    .map(([label, value], i) => {
                      const fallbackMap: Record<string, string> = {
                        Price: "-- USDT per ETH",
                        "Frontend Fee:": "$0",
                      };

                      const displayValue = isConnected
                        ? value
                        : fallbackMap[label] || "--";

                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between text-sm/[113%]"
                        >
                          <span className="text-[#909090] dark:text-[#737373] tracking-[-2%]">
                            {label}
                          </span>
                          <span className="text-[#1D1D1D] dark:text-[#AFAFAF] tracking-[-2%]">
                            {displayValue}
                          </span>
                        </div>
                      );
                    })}
                </div>

                {isConnected ? (
                  <button
                    disabled={fromAmount.length === 0}
                    onClick={() => setIsSuccessModalOpen(true)}
                    className="py-3 text-center w-full leading-[120%] font-light text-[#F4F4F4] dark:text-[#111111] rounded-full disabled:opacity-65 shadow-sm-shadow"
                    style={{
                      backgroundImage: "var(--linear-reverse-primary-gradient)",
                    }}
                  >
                    Swap
                  </button>
                ) : (
                  <ConnectWalletButton
                    className="w-full rounded-[12px] font-light"
                    action={openWalletModal}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <SwapSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        transaction={{
          fromToken: {
            symbol: fromToken.symbol,
            amount: fromAmount,
          },
          toToken: {
            symbol: toToken.symbol,
            amount: toAmount,
          },
        }}
      />
    </div>
  );
}