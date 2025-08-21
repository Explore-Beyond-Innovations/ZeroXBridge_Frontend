"use client";
import TokenLockInterface from "@/app/dapp/components/lock-tokens";

const TokenLockPage = () => {
  return (
    <div
      className={`flex justify-center pt-5 sm:pt-20 sm:min-h-screen w-full dark:bg-background bg-[#FFF]`}
    >
      <div className="w-full sm:max-w-md px-6 sm:px-4">
        <TokenLockInterface />
      </div>
    </div>
  );
};

export default TokenLockPage;
