"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { LockTransaction } from "@/types/token";
import { useThemeContext } from "@/app/context/theme-provider";
import Check from "@/public/check.png";
import CheckDark from "@/public/check-dark.png";
import Image from "next/image";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: LockTransaction | null;
}

export function SuccessModal({
  isOpen,
  onClose,
  transaction,
}: SuccessModalProps) {
  const { isDark } = useThemeContext();
  if (!transaction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`sm:max-w-md border-none dark:bg-[#09050E] "
        }`}>
        <div className="flex flex-col items-center text-center space-y-6 pb-6">
          <div
            className={`w-[186px] h-[186px] rounded-full border-2 flex items-center justify-center`}>
            <Image
              src={isDark ? CheckDark : Check}
              alt="Check Icon"
              width={186}
              height={186}
              className="object-contain"
            />
          </div>

          <div>
            <h2
              className={`text-2xl font-bold mb-2 ${
                isDark ? "text-[#F4F4F4]" : "text-gray-900"
              }`}>
              {transaction.token.symbol} Locked!
            </h2>
            <p className={`dark:text-[#C3C3C3] text-gray-600 max-w-[285px]`}>
              {"You've locked "}
              <span className="font-semibold">
                {transaction.amount} {transaction.token.symbol}
              </span>
              {" and you've received "}
              <span className="font-semibold">
                {transaction.xzbReceived.toFixed(2)} xZB!
              </span>
            </p>
          </div>

          <p className={`text-sm dark:text-[#737373] text-gray-500}`}>
            {transaction.timestamp}
          </p>

          <div className="w-full space-y-3 mt-3">
            <Button
              className={`h-10 w-full dark:bg-[#1F1F1F] dark:hover:bg-[#1F1F1F] bg-[#1F1F1F] text-[#F4F4F4]`}
              style={{
                boxShadow: "0 1px 2px 0 rgba(120, 120, 120, 0.25) inset",
                background: "linear-gradient(180deg, #1F1F1F 0%, #1C1C1C 100%)",
              }}>
              <Globe className="w-4 h-4 mr-2" />
              View on Explorer
            </Button>
            <Button
              variant="outline"
              className={`h-10 w-full bg-transparent rounded-full dark:bg-[#CDCDCD] dark:text-[#111111] border-gray-300 text-gray-900 dark:hover:bg-[#CDCDCD]`}
              onClick={onClose}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
