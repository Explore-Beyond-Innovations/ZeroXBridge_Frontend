"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import ConnectWalletButton from "../components/ui/ConnectWalletButton";
import SwapFromInput from "./components/SwapFromInput";
import SwapToInput from "./components/SwapToInput";
import SwapToggle from "./components/SwapToggle";

// Dummy tokens data
import { tokens_swap as tokens } from "@/utils/data";
import { useConnection } from "@/app/context/ConnectionContext";
import { SwapSuccessModal } from "./components/SwapSuccessModal";

export default function SwapPage() {
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

  // Dummy connection status
  const { isConnected } = useConnection();

  function handleToggle() {
    const temp = fromToken;
    const currentAmountInput = toAmount;
    console.log(currentAmountInput);
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(currentAmountInput);
  }

  return (
    <div className="w-full flex justify-center">
      <div
        className="w-full lg:w-[440px] h-fit p-[1.11px] rounded-[18px] overflow-hidden"
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
          </div>

          <div className="p-5 pt-[25px]">
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
              <ConnectWalletButton className="w-full" />
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
