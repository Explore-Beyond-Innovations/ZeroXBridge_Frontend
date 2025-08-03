"use client";

import Image from "next/image";
import { DialogBase } from "../ui/Dailog";
import { Geist_Mono, Inter } from "next/font/google";
import { Close } from "@/svg/CloseIcon";
import { GlobeIcon } from "@/svg/GlobeIcon";
import { GradientWrapperPrimary } from "../ui/Gradients";
import { useThemeContext } from "@/app/hooks/context";
import { useMemo } from "react";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

export interface SuccessModalProps {
  isOpen: boolean;
  type: string;
  onClose: () => void;
  amount: string;
}

export const SuccessModal = ({
  isOpen,
  onClose,
  type,
  amount,
}: SuccessModalProps) => {
  const { isDark } = useThemeContext();
  const date = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "medium",
  });

  return (
    <DialogBase isOpen={isOpen} onClose={onClose} size="md">
      <button
        onClick={onClose}
        className={`absolute flex justify-center items-center border ${isDark ? "border-[var(--close-btn-border)]" : "border-[var(--wallet-border)]"} rounded-full h-8 w-8 top-4 right-4 text-2xl leading-none text-sidebar-text`}
      >
        <Close />
      </button>

      <div className="flex flex-col gap-2">
        <div
          className={`w-50 h-50 mx-auto ${isDark ? "bg-[var(--toggle-slider-bg)]" : "bg-[#F6F6F6]"} rounded-full flex items-center justify-center`}
        >
          <Image
            src="/check.svg"
            width={60}
            height={60}
            alt="Check mark"
            className="w-full h-full object-contain"
          />
        </div>

        <h2
          className={`text-[32px] text-center font-light font-mono text-[var(--primary-text)] mb-2 ${geistMono.className}`}
        >
          xZB {type === "claim" ? "Claimed" : "Burned"}!
        </h2>
      </div>

      {type === "burn" && (
        <p
          className={`text-[var(--claim-burn-modal-text)] font-normal text-center mb-2 ${inter.className}`}
        >
          You’ve unlocked
          <span className="font-bold text-white">{amount} ETH</span> by burning
          the allocated for locking {amount} xZB!
        </p>
      )}

      {type === "claim" && (
        <p
          className={`text-[var(--claim-burn-modal-text)] px-12 font-normal text-center mb-2 ${inter.className}`}
        >
          You’ve claimed 3094 xZB for locking 3492.23 ETH!
        </p>
      )}

      <p className="text-sm mb-6 text-center text-[var(--modal-date-text)]">
        {date}
      </p>

      <div className="flex flex-col gap-3">
        <GradientWrapperPrimary gradientDirection="to-top">
          <button
            className={`flex gap-x-2 justify-center ${isDark ? "bg-[var(--btn-bg)] text-primary-text" : "bg-black text-white"} w-full items-center px-3 py-[10px] rounded-[8px] border border-wallet-border transition-all duration-200 hover:opacity-80 active:opacity-60`}
          >
            <GlobeIcon />
            <span className="inline-block text-sm font-light">
              View on Explorer
            </span>
          </button>
        </GradientWrapperPrimary>

        <button
          onClick={onClose}
          className={`w-full py-3 px-4 rounded-4xl font-bold text-sm transition-colors ${isDark ? "bg-[#ededed] text-black" : "bg-[#F0F0F0]"} ${inter.className}`}
        >
          Return to Dashboard
        </button>
      </div>
    </DialogBase>
  );
};
