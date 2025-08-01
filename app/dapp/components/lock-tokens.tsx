"use client";

import { useState } from "react";
import { Menu, Info, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { TokenSelectDropdown } from "@/app/dapp/components/token-select-dropdown";
import { SuccessModal } from "@/app/dapp/components/success-modal";
import type { Token, LockTransaction } from "@/types/token";
import { useTheme } from "@/app/hooks/useTheme";
import { useAccount } from "@starknet-react/core";

// Mock token data
const mockTokens: Token[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "⟠",
    price: 3193.21,
    liquidity: 1391195483.0,
    xzbRate: 1.29,
    riskLevel: "Low Risk",
    balance: 391.12,
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    icon: "₿",
    price: 45000.0,
    liquidity: 2500000000.0,
    xzbRate: 1.15,
    riskLevel: "Low Risk",
    balance: 2.5,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "$",
    price: 1.0,
    liquidity: 500000000.0,
    xzbRate: 0.95,
    riskLevel: "Low Risk",
    balance: 10000.0,
  },
];

const TokenLockInterface = () => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState("");
  const  [isConnected, setIsConnected]  = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastTransaction, setLastTransaction] =
    useState<LockTransaction | null>(null);

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
  };

  const handleMaxClick = () => {
    if (selectedToken) {
      setAmount(selectedToken.balance.toString());
    }
  };

  const handleLock = () => {
    if (selectedToken && amount) {
      const numAmount = Number.parseFloat(amount);
      const xzbReceived = numAmount * selectedToken.xzbRate;

      const transaction: LockTransaction = {
        amount: numAmount,
        token: selectedToken,
        xzbReceived,
        timestamp: new Date().toLocaleString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
        txHash: "0x" + Math.random().toString(16).substr(2, 64),
      };

      setLastTransaction(transaction);
      setIsSuccessModalOpen(true);
      setAmount("");
    }
  };

  const calculateXzbReceived = () => {
    if (selectedToken && amount) {
      return (Number.parseFloat(amount) * selectedToken.xzbRate).toFixed(0);
    }
    return "0";
  };

  return (
    <div
      className={`w-full max-w-[440px] mx-auto border rounded-[17px] ${
        isDarkMode ? "bg-[#161616cc] border-[#202020]" : "bg-[#F7F7F7]"
      }`}>
      <div className="flex justify-end p-4 w-full max-w-md">
        <Button
          variant="ghost"
          size="icon"
          className={`${isDarkMode ? "text-[#FFF]" : "text-[#878787]"}`}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      <div className="max-w-md mx-auto w-full">
        <Card
          className={`shadow-lg border-none bg-white ${
            isDarkMode
              ? "bg-[#161616cc] shadow-[#878787]/20"
              : "bg-transparent shadow-gray-200/20"
          }`}>
          <CardContent className="space-y-6 p-0">
            <div
              className={`p-5 rounded-[16px] border space-y-6 shadow-[0_0_14px_0_rgba(0,0,0,0.08)] ${
                isDarkMode ? "bg-[#1D1D1D] border-[#202020]" : "bg-[#FFF]"
              }`}>
              <TokenSelectDropdown
                selectedToken={selectedToken}
                onTokenSelect={handleTokenSelect}
                tokens={mockTokens}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className={`!text-4xl font-light border-none outline-none shadow-none focus:outline-none ring-0 focus:ring-0 p-0 h-12 bg-transparent ${
                      isDarkMode
                        ? "text-white placeholder-gray-500"
                        : "text-[#878787] placeholder-gray-400"
                    }`}
                    disabled={!isConnected || !selectedToken}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMaxClick}
                    disabled={!isConnected || !selectedToken}
                    className={`bg-transparent rounded-full ${
                      isDarkMode
                        ? "text-gray-400 border-gray-600 hover:bg-gray-700"
                        : "text-[#737373] border-[#EEE] hover:bg-gray-50 bg-[#F4F4F4]"
                    }`}>
                    Max
                  </Button>
                </div>
                <div
                  className={`w-full h-px ${
                    isDarkMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
                  }`}
                />
                <div
                  className={`flex justify-between text-sm ${
                    isDarkMode ? "text-gray-400" : "text-[#737373]"
                  }`}>
                  <span>Available Balance:</span>
                  <span className="text-[#878787]">
                    {isConnected && selectedToken
                      ? `${selectedToken.balance} ${selectedToken.symbol}`
                      : "-- xZB"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-gray-200 dark:border-gray-700 p-5">
              <div className="flex justify-between text-sm">
                <span
                  className={`${
                    isDarkMode ? "text-[#737373]" : "text-[#909090]"
                  }`}>
                  Token Price:
                </span>
                <span
                  className={`font-medium ${
                    isDarkMode ? "text-[#AFAFAF]" : "text-[#878787]"
                  }`}>
                  {selectedToken
                    ? `$${selectedToken.price.toLocaleString()}`
                    : "$--"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span
                  className={`${
                    isDarkMode ? "text-[#737373]" : "text-[#909090]"
                  }`}>
                  Current Liquidity
                </span>
                <span
                  className={`font-medium ${
                    isDarkMode ? "text-[#AFAFAF]" : "text-[#878787]"
                  }`}>
                  {selectedToken
                    ? `$${selectedToken.liquidity.toLocaleString()}`
                    : "$--"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span
                  className={`${
                    isDarkMode ? "text-[#737373]" : "text-[#909090]"
                  }`}>
                  xZB Token Rate:
                </span>
                <span
                  className={`font-medium ${
                    isDarkMode ? "text-[#AFAFAF]" : "text-[#878787]"
                  }`}>
                  {selectedToken ? `$${selectedToken.xzbRate}` : "$--"}
                </span>
              </div>

              {selectedToken && amount && (
                <div className="flex justify-between text-sm">
                  <span
                    className={`${
                      isDarkMode ? "text-[#737373]" : "text-[#878787]"
                    }`}>
                    {"You'll receive:"}
                  </span>
                  <span
                    className={`font-bold ${
                      isDarkMode ? "text-[#FFF]" : "text-[#1D1D1D]"
                    }`}>
                    {calculateXzbReceived()} xZB
                  </span>
                </div>
              )}
            </div>

            {isConnected && selectedToken && (
              <div
                className={`rounded-xl border mx-5 p-4 ${
                  isDarkMode
                    ? "bg-[#1D1D1D] border-[#202020]"
                    : "bg-[#FFF] border-[#EAEAEA]"
                }`}>
                <div className="flex flex-col items-start gap-3">
                  <Info
                    className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-[#B9B9B9]" : "text-[#909090]"
                    }`}>
                    When you lock {selectedToken.symbol} tokens, you receive xZB
                    tokens which can be burnt to release your locked{" "}
                    {selectedToken.symbol}.
                  </p>
                </div>
              </div>
            )}
            <div className="p-5 pt-0">
              {isConnected ? (
                <Button
                  className={`w-full py-3 h-10 rounded-full ${
                    isDarkMode
                      ? "bg-[#CDCDCD] text-[#111111] hover:bg-gray-600"
                      : "bg-gray-800 text-[#FFF] hover:bg-gray-700"
                  }`}
                  onClick={handleLock}
                  disabled={
                    !selectedToken || !amount || Number.parseFloat(amount) <= 0
                  }>
                  Lock {selectedToken?.symbol || "Token"}
                </Button>
              ) : (
                <Button
                  className={`w-full py-3 text-sm h-10 ${
                    isDarkMode
                      ? "bg-[#1F1F1F] text-[#F4F4F4] border-gray-600 hover:bg-gray-700"
                      : "bg-[#FFF] border-gray-300 text-[#030303] hover:bg-gray-50"
                  }`}
                  >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        transaction={lastTransaction}
      />
    </div>
  );
};

export default TokenLockInterface;
