"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { LockTransaction } from "@/types/token";
import { useTheme } from "@/app/ThemeContext";
import Check from "../../public/check.png";
import CheckDark from "../../public/check-dark.png";
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
  const { isDarkMode } = useTheme();
  if (!transaction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`sm:max-w-md border-[#202020] ${
          isDarkMode ? "bg-[#09050E]" : "bg-white"
        }`}>
        <div className="flex flex-col items-center text-center space-y-6 pb-6">
          <div
            className={`w-[186px] h-[186px] rounded-full border-2 flex items-center justify-center ${
              isDarkMode ? "border-gray-600" : "border-gray-300"
            }`}>
            <Image
              src={isDarkMode ? CheckDark : Check}
              alt="Check Icon"
              width={186}
              height={186}
              className="object-contain"
            />
          </div>

          <div>
            <h2
              className={`text-2xl font-bold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
              {transaction.token.symbol} Locked!
            </h2>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
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

          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}>
            {transaction.timestamp}
          </p>

          <div className="w-full space-y-3">
            <Button
              className={`w-full ${
                isDarkMode
                  ? "bg-[#1F1F1F] hover:bg-gray-600"
                  : "bg-[#1F1F1F] hover:bg-gray-700"
              } text-[#F4F4F4]`}>
              <Globe className="w-4 h-4 mr-2" />
              View on Explorer
            </Button>
            <Button
              variant="outline"
              className={`w-full bg-transparent rounded-full ${
                isDarkMode
                  ? "bg-[#CDCDCD] text-[#111111] hover:bg-gray-800"
                  : "border-gray-300 text-gray-900 hover:bg-gray-50"
              }`}
              onClick={onClose}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
