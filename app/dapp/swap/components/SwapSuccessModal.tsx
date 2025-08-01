"use client";

import { Globe } from "lucide-react";
import { useTheme } from "@/app/hooks/useTheme";
import Check from "@/public/check.png";
import CheckDark from "@/public/check-dark.png";
import Image from "next/image";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { getFormattedDate } from "@/lib/utils";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: {
    toToken: {
      symbol: string;
      amount: string;
    };
    fromToken: {
      symbol: string;
      amount: string;
    };
  };
}

export function SwapSuccessModal({
  isOpen,
  onClose,
  transaction,
}: SuccessModalProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  if (!transaction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`sm:max-w-md border-[#c6c6c6] dark:border-[#202020] border-[1.11px] dark:bg-[#111111] bg-white`}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className={`lg:w-[186px] lg:h-[186px] w-[150px] h-[150px] mb-7 rounded-full flex items-center justify-center`}
          >
            <Image
              src={Check}
              alt="Check Icon"
              width={186}
              height={186}
              className="object-contain dark:hidden flex"
            />
            <Image
              src={CheckDark}
              alt="Check Icon"
              width={186}
              height={186}
              className="object-contain hidden dark:flex"
            />
          </div>

          <div className="mb-[31px]">
            <h2
              className={`text-[32px]/[106%] font-light font-mono tracking-[-4%] mb-3 text-[#1E1E1E] dark:text-[#F4F4F4]`}
            >
              Swap complete!
            </h2>
            <p className="text-[#4B4B4B] dark:text-[#C3C3C3] text-base/[125%] tracking-[-2%] mb-[14px] max-w-[215px] font-normal">
              <span>
                You've swapped {transaction.fromToken.amount}{" "}
                {transaction.fromToken.symbol}
              </span>
              <br />
              <span>
                for {transaction.toToken.amount} {transaction.toToken.symbol}
              </span>
            </p>

            <p
              className={`text-sm/[113%] text-[#737373] dark:text-[#737373] tracking-[-2%]`}
            >
              {getFormattedDate()}
            </p>
          </div>

          <div className="w-full space-y-3">
            <button
              className={`w-full p-3 flex justify-center rounded-[8px] items-center gap-x-2  ${
                isDarkMode
                  ? "bg-[#1F1F1F] hover:bg-gray-600"
                  : "bg-[#1F1F1F] hover:bg-gray-700"
              } text-[#F4F4F4]`}
            >
              <Globe className="w-4 h-4" />
              View on Explorer
            </button>
            <button
              className={`w-full p-3 bg-[#F0F0F0] border-gray-300 text-gray-900 hover:bg-gray-50 rounded-[8px]`}
              onClick={onClose}
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
