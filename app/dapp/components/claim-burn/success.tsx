"use client";
import React from "react";
import Image from "next/image";

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
  if (!isOpen) return null;

  const date = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "medium",
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-2xl p-8 max-w-sm w-full text-center relative bg-background border border-primary-border">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl leading-none text-sidebar-text hover:text-primary-text"
        >
          ×
        </button>

        <div className="w-30 h-30 mx-auto mb-6 bg-[var(--toggle-slider-bg)] rounded-full flex items-center justify-center">
          <Image
            src="/check.svg"
            width={60}
            height={60}
            alt="Check mark"
            className="w-full h-full object-contain"
          />
        </div>

        <h2 className="text-[22px] font-bold font-mono text-foreground mb-2">
          xZB {type === "claim" ? "Claimed" : "Burned"}!
        </h2>

        <p className="text-sidebar-text mb-2">
          You've {type === "claim" ? "claimed" : "burned"} {amount} xZB{" "}
          {type === "claim" ? "for" : "and received"}
        </p>
        <p className="text-sidebar-text mb-6">
          {type === "claim" ? "3492.23 ETH!" : "3492.23 ETH!"}
        </p>

        <p className="text-sm mb-6 text-sidebar-text opacity-75">{date}</p>

        <button className="w-full py-3 px-4 rounded-lg border border-primary-border text-sidebar-text hover:text-primary-text hover:bg-toggle-bg transition-colors flex items-center justify-center mb-4">
          <span className="mr-2">🔍</span>
          View on Explorer
        </button>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-lg bg-toggle-bg text-foreground hover:opacity-80 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};
