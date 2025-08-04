"use client";
import TokenLockInterface from "@/app/dapp/components/lock-tokens";

const TokenLockPage = () => {

  return (
    <div
      className={`flex flex-col items-center justify-center h-fit lg:h-full w-full dark:bg-[#09050E] bg-[#FFF]`}>
      <TokenLockInterface />
    </div>
  );
};

export default TokenLockPage;
