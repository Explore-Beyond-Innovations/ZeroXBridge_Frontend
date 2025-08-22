"use client";

import { useWallet } from "@/app/hooks/useWallet";
import { useMemo, useState } from "react";
import { SuccessModal } from "../../../dapp/claim-burn/components/success";
import { ConnectWalletButton } from "../ui/ConnectWalletButton";
import Image from "next/image";
import { ClaimBurnTab } from "../../../dapp/claim-burn/components/tab";
import { Geist_Mono, Inter } from "next/font/google";
import { Hamburger } from "@/svg/Hamburger";
import { Info } from "@/svg/Info";
import { useThemeContext } from "@/app/hooks/context";
import { useTranslation } from "react-i18next";
import "../../../i18n-client"; // Initialize i18n on client side

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
  const { isDark } = useThemeContext();
  const { isConnected } = useWallet();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("claim");
  const [amount, setAmount] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
    [isConnected]
  );

  const currentData = CLAIM_BURN_DATA[activeTab];

  const handleMaxClick = () => {
    if (isConnected) setAmount(currentData.displayAmount);
  };

  const handleAction = () => {
    if (isConnected && amount) setShowSuccessModal(true);
  };

  const isActionable = !!(amount && amount !== "0" && amount !== "0.00");
  const claimBurnBtnClasses = isActionable
    ? isDark
      ? "bg-white text-[#515151] hover:opacity-80"
      : "bg-black text-white hover:opacity-80"
    : isDark
    ? "bg-[#2e2e2e] text-[#515151] cursor-not-allowed"
    : "bg-[#f0f0f0] text-[#c4c4c4] cursor-not-allowed";

  return (
    <>
      <div className="min-h-screen p-8">
        <div className="max-w-lg mx-auto">
          <ClaimBurnTab activeTab={activeTab} setActiveTab={setActiveTab} />
          <div
            className={`rounded-2xl p-0.5 ${
              isDark
                ? "bg-gradient-to-r from-[var(--primary-border)] to-[var(--toggle-slider-bg)]"
                : ""
            }`}
          >
            <div
              className={`${
                isDark
                  ? "bg-[var(--claim-burn-bg)]"
                  : "border bg-[var(--container)] border-[var(--card-border)]"
              } rounded-[14px]`}
            >
              <div className="flex justify-end p-4 cursor-pointer">
                <Hamburger />
              </div>
              <div
                className={`rounded-4xl ${
                  isDark
                    ? "border-2 bg-[var(--claim-area)] border-[var(--primary-border)]"
                    : "bg-white border border-[var(--card-border)] shadow-[0px_0px_14px_0px_#00000014]"
                } h-fit p-6`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${
                        isDark ? "bg-[var(--toggle-slider-bg)]" : "bg-[#f6f6f6]"
                      }`}
                    >
                      <Image
                        src={isDark ? "/xZB.svg" : "/xZB-black.svg"}
                        height={40}
                        width={40}
                        alt="ZeroXBridge Logo"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-regular text-[var(--claim-burn-text-disabled)]">
                        {activeTab === "claim"
                          ? t("claimBurn.claimXZB")
                          : t("claimBurn.burnXZB")}
                      </h2>
                      <p className="text-sm">xZB</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`mb-6 relative border-b-2 ${
                    isDark
                      ? "border-[var(--claim-area-btn)]"
                      : "border-[var(--claim-area-input-border-light)"
                  }`}
                >
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder={t("deposit.enterAmount")}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={!isConnected}
                    className={`no-spinner w-full py-4 text-4xl font-light bg-transparent outline-none border-none pr-20 ${
                      isDark
                        ? "text-white placeholder-[#515151]"
                        : "text-[var(--claim-area)] placeholder-[var(--claim-input-placeholder)]"
                    } ${geistMono.className}`}
                  />
                  <button
                    onClick={handleMaxClick}
                    disabled={!isConnected}
                    className={`absolute top-1/2 h-10 right-0 -translate-y-1/2 text-sm px-6 py-1 rounded-4xl transition-colors ${
                      isDark
                        ? "bg-[var(--claim-area-btn)]"
                        : "bg-[#F4F4F4] border border-[#EEEEEE]"
                    } ${
                      isConnected
                        ? isDark
                          ? "text-[#a4a4a4] hover:text-white hover:bg-[var(--claim-area-btn)]"
                          : "text-[#909090] hover:text-[#303030] hover:bg-[#f6f6f6]"
                        : isDark
                        ? "text-[#515151] cursor-not-allowed"
                        : "text-[#d3d3d3] cursor-not-allowed"
                    }`}
                  >
                    {t("common.max")}
                  </button>
                </div>

                <InfoRow
                  label={`${t("claimBurn.availableToClaim")} ${
                    activeTab === "claim"
                      ? t("claimBurn.claimXZB")
                      : t("claimBurn.burnXZB")
                  }:`}
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
                    label={`${t("claimBurn.usdValue")}:`}
                    value={`${currentData.price} xZB per ETH`}
                    isDark={isDark}
                  />
                  <InfoRow
                    label={
                      activeTab === "claim"
                        ? "Frontend Fee:"
                        : "Redemption Fee:"
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
                      label={t("claimBurn.availableToClaim")}
                      value="302.21 ETH"
                      isDark={isDark}
                      valueFontWeight="font-bold"
                    />
                  )}
                </div>

                {activeTab === "burn" && (
                  <div
                    className={`flex flex-col gap-2 mb-8 ${
                      isDark
                        ? "bg-[var(--claim-area)] border-[var(--primary-border)]"
                        : "bg-white border-[var(--card-border)]"
                    } px-4 py-4 rounded-2xl border`}
                  >
                    <Info />
                    <p
                      className={`text-sm text-[var(--burn-info-text)] leading-relaxed ${inter.className}`}
                    >
                      {t("claimBurn.burnFirstWarning")}
                    </p>
                  </div>
                )}

                {!isConnected ? (
                  <ConnectWalletButton full className="font-light" />
                ) : (
                  <button
                    onClick={handleAction}
                    disabled={!isActionable}
                    className={`w-full py-4 rounded-4xl font-bold text-sm transition-colors ${claimBurnBtnClasses} ${inter.className}`}
                  >
                    {activeTab === "claim"
                      ? t("claimBurn.claimXZB")
                      : t("claimBurn.burnXZB")}
                  </button>
                )}
              </div>
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
    </>
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
      className={`text-sm font-normal ${
        isDark ? "text-[var(--claim-text-disabled)]" : "text-[#909090]"
      }`}
    >
      {label}
    </span>
    <span
      className={`text-sm ${
        valueFontWeight ? valueFontWeight : "font-normal"
      } ${isDark ? "text-[var(--claim-burn-text)]" : "text-[#303030]"}`}
    >
      {value}
    </span>
  </div>
);

export default ClaimBurn;
