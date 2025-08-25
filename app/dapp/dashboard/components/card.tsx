"use client"

import { useWallet } from "@/app/hooks";
import { PlusIcon } from "lucide-react";
import { Geist_Mono } from "next/font/google";
import { useRouter } from "next/navigation";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const WalletCard = () => {
  const { isConnected, openWalletModal } = useWallet();

  return (
    <>
      <div className="rounded-2xl h-[150px] w-full col-span-1 flex-col flex p-3 justify-between bg-[#FFFFFF] dark:bg-[#1D1D1D] border-[1.1px] border-[#EFEFEF] dark:border-[#202020]">
        <div className="flex flex-col gap-y-4 border-b-[1.11px] border-[#EFEFEF] pb-3 dark:border-[#232323]">
          <p className="text-sm text-[var(--card-text-disabled)] font-normal">
            Wallet
          </p>
          <p
            className={`text-[32px] leading-[106%] font-normal font-mono ${
              isConnected
                ? "text-[#1E1E1E] dark:text-[#F4F4F4]"
                : "text-[#DDDDDD] dark:text-[#353535]"
            } ${geistMono.className}`}
          >
            $0.00
          </p>
        </div>
        <button
          onClick={openWalletModal}
          className="flex gap-x-2 items-center w-full rounded-xl bg-none hover:bg-none text-sm font-normal h-[37px] text-[#757575] dark:text-[#737373]"
        >
          <PlusIcon /> Add {isConnected ? "another" : ""} wallet
        </button>
      </div>
    </>
  );
};

export const ClaimCard = () => {
  const { isConnected } = useWallet();
  const router = useRouter();
  return (
    <div className="rounded-2xl h-[150px] w-full col-span-1 flex-col flex p-3 justify-between bg-[#FFFFFF] dark:bg-[#1D1D1D] border-[1.1px] border-[#EFEFEF] dark:border-[#202020]">
      <div className="flex flex-col gap-y-4 pb-3 dark:border-[#232323]">
        <p className="text-sm text-[var(--card-text-disabled)] font-normal">
          Claim
        </p>
        <p
          className={`text-[32px] leading-[106%] font-light font-mono ${
            isConnected
              ? "text-[#1E1E1E] dark:text-[#F4F4F4]"
              : "text-[#DDDDDD] dark:text-[#353535]"
          } ${geistMono.className}`}
        >
          ---xZB
        </p>
      </div>
      <button
        onClick={() => router.push("/dapp/claim-burn")}
        className={`w-[99px] rounded-[8px] bg-[#F4F4F4] dark:bg-[#2E2E2E] text-sm font-light h-[37px] text-[#757575] dark:text-${isConnected ? "[#F4F4F4]" : "[#737373]"}`}
      >
        Get Started
      </button>
    </div>
  );
};
