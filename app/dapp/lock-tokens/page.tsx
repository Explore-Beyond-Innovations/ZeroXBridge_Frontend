"use client";
import TokenLockInterface from "@/app/dapp/components/lock-tokens";

const TokenLockPage = () => {
  return (
    <div
      className={`flex justify-center sm:pt-20 sm:min-h-screen w-full dark:bg-background bg-[#FFF]`}
    >
      <div className="w-full max-w-md px-1 sm:px-4">
        <TokenLockInterface />
      </div>
    </div>
  );
};

export default TokenLockPage;
