"use client";
import TokenLockInterface from "@/app/dapp/components/lock-tokens";
import { useTheme } from "@/app/ThemeContext";

const TokenLockPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex flex-col items-center justify-center h-fit lg:h-full w-full ${
        isDarkMode ? "bg-[#09050E]" : "bg-white"
      }`}>
      <TokenLockInterface />
    </div>
  );
};

export default TokenLockPage;
