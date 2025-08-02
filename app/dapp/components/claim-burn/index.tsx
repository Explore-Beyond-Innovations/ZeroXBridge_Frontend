"use client";

import useTheme from "@/app/hooks/useTheme";
import { useWallet } from "@/app/hooks/useWallet";
import { useMemo, useState } from "react";
import { SuccessModal } from "./success";
import { ConnectWalletButton } from "../ui/ConnectWalletButton";
import Image from "next/image";
import { ClaimBurnTab } from "./tab";
import { Geist_Mono, Inter } from "next/font/google";
import { Hamburger } from "@/svg/Hamburger";
import { Info } from "@/svg/Info";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

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
      <div className="max-w-lg mx-auto">
        <ClaimBurnTab activeTab={activeTab} setActiveTab={setActiveTab} />
        <div
          className={`rounded-2xl p-0.5 bg-gradient-to-r from-[var(--primary-border)] to-[var(--toggle-slider-bg)]`}
        >
          <div className="bg-[var(--claim-burn-bg)] rounded-[14px]">
            <div className="flex justify-end p-4 cursor-pointer">
              <Hamburger />
            </div>
            <div className="rounded-4xl bg-[var(--claim-area)] h-fit p-6 border-2 border-[var(--primary-border)]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${
                      isDark ? "bg-[var(--toggle-slider-bg)]" : "bg-[#f6f6f6]"
                    }`}
                  >
                    <Image
                      src="/xZB.svg"
                      height={40}
                      width={40}
                      alt="ZeroXBridge Logo"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-regular text-[var(--claim-burn-text-disabled)]">
                      {activeTab === "claim" ? "Claim" : "Burn"}
                    </h2>
                    <p className="text-sm">xZB</p>
                  </div>
                </div>
              </div>
              <div className="mb-6 relative border-b-2 border-[var(--claim-area-btn)]">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={!isConnected}
                  className={`no-spinner w-full py-4 text-4xl font-light bg-transparent outline-none border-none pr-20 ${
                    isDark
                      ? "text-white placeholder-[#515151]"
                      : "text-[#303030] placeholder-[#c4c4c4]"
                  } ${geistMono.className}`}
                />
                <button
                  onClick={handleMaxClick}
                  disabled={!isConnected}
                  className={`absolute top-1/2 h-10 right-0 -translate-y-1/2 text-sm px-6 py-1 rounded-4xl transition-colors bg-[var(--claim-area-btn)] ${
                    isConnected
                      ? isDark
                        ? "text-[#a4a4a4] hover:text-white hover:bg-[var(--claim-area-btn)]"
                        : "text-[#909090] hover:text-[#303030] hover:bg-[#f6f6f6]"
                      : isDark
                        ? "text-[#515151] cursor-not-allowed"
                        : "text-[#d3d3d3] cursor-not-allowed"
                  }`}
                >
                  Max
                </button>
              </div>

              <InfoRow
                label={`Available to ${activeTab === "claim" ? "Claim" : "Burn"}:`}
                value={
                  isConnected
                    ? `${currentData.available} xZB (${currentData.value})`
                    : "-- xZB"
                }
                isDark={isDark}
              />
            </div>

            <div className="p-8">
              <div className="space-y-2 mb-4">
                <InfoRow
                  label="Price:"
                  value={`${currentData.price} xZB per ETH`}
                  isDark={isDark}
                />
                <InfoRow
                  label={
                    activeTab === "claim" ? "Frontend Fee:" : "Redemption Fee:"
                  }
                  value={
                    activeTab === "claim"
                      ? currentData.fee
                      : isConnected && amount
                        ? "3%"
                        : "--%"
                  }
                  isDark={isDark}
                />
                {activeTab === "burn" && isConnected && amount && (
                  <InfoRow
                    label="You'd recieve"
                    value="302.21 ETH"
                    isDark={isDark}
                    valueFontWeight="font-bold"
                  />
                )}
              </div>

              {activeTab === "burn" && (
                <div className="flex flex-col gap-2 mb-8 bg-[var(--claim-area)] px-4 py-4 rounded-2xl border border-[var(--primary-border)]">
                  <Info />
                  <p
                    className={`text-sm text-[var(--burn-info-text)] leading-relaxed ${inter.className}`}
                  >
                    Burning xZB tokens releases your locked USDC/USDT/ETH tokens
                    from the contract.
                  </p>
                </div>
              )}

              {!isConnected ? (
                <ConnectWalletButton full className="font-light" />
              ) : (
                <button
                  onClick={handleAction}
                  disabled={!amount || amount === "0" || amount === "0.00"}
                  className={`w-full py-4 rounded-4xl font-bold text-sm transition-colors ${
                    amount && amount !== "0" && amount !== "0.00"
                      ? "bg-[#ededed] text-black hover:bg-[#d3d3d3] active:bg-[#c4c4c4]"
                      : isDark
                        ? "bg-[#2e2e2e] text-[#515151] cursor-not-allowed"
                        : "bg-[#f0f0f0] text-[#c4c4c4] cursor-not-allowed"
                  } ${inter.className}`}
                >
                  {activeTab === "claim" ? "Claim xZB" : "Burn xZB"}
                </button>
              )}
            </div>
          </div>
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

interface InfoRowProps {
  label: string;
  value: string;
  isDark: boolean;
  valueFontWeight?: string;
}

const InfoRow = ({ label, value, isDark, valueFontWeight }: InfoRowProps) => (
  <div className="flex justify-between">
    <span
      className={`text-sm font-normal ${isDark ? "text-[var(--claim-burn-text-disabled)]" : "text-[#909090]"}`}
    >
      {label}
    </span>
    <span
      className={`text-sm ${valueFontWeight ? valueFontWeight : "font-normal"} ${isDark ? "text-[var(--claim-burn-text)]" : "text-[#303030]"}`}
    >
      {value}
    </span>
  </div>
);

export default ClaimBurn;
