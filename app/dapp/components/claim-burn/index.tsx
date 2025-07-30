"use client";

import useTheme from "@/app/hooks/useTheme";
import { useWallet } from "@/app/hooks/useWallet";
import { useMemo, useState } from "react";
import { SuccessModal } from "./success";
import ConnectWalletButton from "../ui/ConnectWalletButton";
import Image from "next/image";

type BurnClaimData = {
  available: number;
  value: string;
  price: string;
  fee: string;
  displayAmount: string;
};

const ClaimBurn = () => {
  const { theme } = useTheme();
  const { isConnected } = useWallet();
  const [activeTab, setActiveTab] = useState("claim");
  const [amount, setAmount] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isDark = useMemo(() => theme === "dark", [theme]);

  const CLAIM_BURN_DATA: Record<string, BurnClaimData> = useMemo(
    () => ({
      claim: {
        available: isConnected ? 3939 : 0,
        value: isConnected ? "$3394.13" : "--",
        price: isConnected ? "$0.123" : "--",
        fee: "$0",
        displayAmount: isConnected ? "3094.00" : "0.00",
      },
      burn: {
        available: isConnected ? 3939 : 0,
        value: isConnected ? "$3394.13" : "--",
        price: isConnected ? "$0.123" : "--",
        fee: "$0",
        displayAmount: isConnected ? "3094.00" : "0.00",
      },
    }),
    [isConnected],
  );

  const currentData = CLAIM_BURN_DATA[activeTab];

  const handleMaxClick = () => {
    if (isConnected) setAmount(currentData.displayAmount);
  };

  const handleAction = () => {
    if (isConnected && amount) setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-8 relative">
          <div
            className={`relative inline-flex items-center rounded-full p-1 ${
              isDark
                ? "bg-[#1c1c1c] border border-[#202020]"
                : "bg-[#ededed] border border-[#e8e8e8]"
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] rounded-full transition-transform duration-300 ease-in-out ${
                isDark ? "bg-[#2e2e2e]" : "bg-white"
              }`}
              style={{
                transform:
                  activeTab === "claim" ? "translateX(0)" : "translateX(100%)",
              }}
            />

            <button
              onClick={() => setActiveTab("claim")}
              className={`relative z-10 px-6 py-2 rounded-full transition-all duration-200 ${
                activeTab === "claim"
                  ? isDark
                    ? "text-white"
                    : "text-[#303030]"
                  : isDark
                    ? "text-[#a4a4a4] hover:text-white"
                    : "text-[#909090] hover:text-[#303030]"
              }`}
            >
              Claim xZB
            </button>

            <button
              onClick={() => setActiveTab("burn")}
              className={`relative z-10 px-6 py-2 rounded-full transition-all duration-200 ${
                activeTab === "burn"
                  ? isDark
                    ? "text-white"
                    : "text-[#303030]"
                  : isDark
                    ? "text-[#a4a4a4] hover:text-white"
                    : "text-[#909090] hover:text-[#303030]"
              }`}
            >
              Burn xZB
            </button>
          </div>
        </div>

        <div
          className={`rounded-2xl border p-8 ${
            isDark
              ? "bg-gradient-to-b from-[#1f1f1f] to-[#1c1c1c] border-[#202020]"
              : "bg-white border-[#e8e8e8]"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                  isDark ? "bg-[var(--toggle-slider-bg)]" : "bg-[#f6f6f6]"
                }`}
              >
                <Image
                  src="/xZB.svg"
                  height={30}
                  width={30}
                  alt="ZeroXBridge Logo"
                />
              </div>
              <div>
                <h2
                  className={`text-lg font-semibold ${isDark ? "text-white" : "text-[#303030]"}`}
                >
                  {activeTab === "claim" ? "Claim" : "Burn"}
                </h2>
                <p
                  className={`text-sm ${isDark ? "text-[#a4a4a4]" : "text-[#909090]"}`}
                >
                  xZB
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 relative">
            <input
              type="number"
              inputMode="decimal"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={!isConnected}
              className={`no-spinner w-full text-4xl font-light bg-transparent outline-none border-none pr-20 ${
                isDark
                  ? "text-white placeholder-[#515151]"
                  : "text-[#303030] placeholder-[#c4c4c4]"
              }`}
            />
            <button
              onClick={handleMaxClick}
              disabled={!isConnected}
              className={`absolute top-1/2 right-0 -translate-y-1/2 text-sm px-3 py-1 rounded transition-colors ${
                isConnected
                  ? isDark
                    ? "text-[#a4a4a4] hover:text-white hover:bg-[#2e2e2e]"
                    : "text-[#909090] hover:text-[#303030] hover:bg-[#f6f6f6]"
                  : isDark
                    ? "text-[#515151] cursor-not-allowed"
                    : "text-[#d3d3d3] cursor-not-allowed"
              }`}
            >
              Max
            </button>
          </div>

          <div className="space-y-4 mb-8">
            <InfoRow
              label={`Available to ${activeTab === "claim" ? "Claim" : "Burn"}:`}
              value={
                isConnected
                  ? `${currentData.available} xZB (${currentData.value})`
                  : "-- xZB"
              }
              isDark={isDark}
            />
            <InfoRow
              label="Price:"
              value={`${currentData.price} xZB per ETH`}
              isDark={isDark}
            />
            <InfoRow
              label={
                activeTab === "claim" ? "Frontend Fee:" : "Redemption Fee:"
              }
              value={currentData.fee}
              isDark={isDark}
            />
          </div>

          {!isConnected ? (
            <ConnectWalletButton fullWidth />
          ) : (
            <button
              onClick={handleAction}
              disabled={!amount || amount === "0" || amount === "0.00"}
              className={`w-full py-4 rounded-xl transition-colors ${
                amount && amount !== "0" && amount !== "0.00"
                  ? "bg-[#ededed] text-black hover:bg-[#d3d3d3] active:bg-[#c4c4c4]"
                  : isDark
                    ? "bg-[#2e2e2e] text-[#515151] cursor-not-allowed"
                    : "bg-[#f0f0f0] text-[#c4c4c4] cursor-not-allowed"
              }`}
            >
              {activeTab === "claim" ? "Claim xZB" : "Burn xZB"}
            </button>
          )}
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type={activeTab}
        amount={amount}
      />
    </div>
  );
};

const InfoRow = ({
  label,
  value,
  isDark,
}: {
  label: string;
  value: string;
  isDark: boolean;
}) => (
  <div className="flex justify-between">
    <span className={`text-sm ${isDark ? "text-[#a4a4a4]" : "text-[#909090]"}`}>
      {label}
    </span>
    <span className={`text-sm ${isDark ? "text-white" : "text-[#303030]"}`}>
      {value}
    </span>
  </div>
);

export default ClaimBurn;
