"use client";
import Image from "next/image";
import { WalletCard, ClaimCard } from "./components/card";
import { DashboardChart, AssetChart } from "./components/chart";
import { SearchIcon, Triangle } from "lucide-react";
import { useThemeContext } from "@/app/hooks/context";

export default function DashboardPage() {
  const { isDark } = useThemeContext();
  return (
    <div className="p-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="flex flex-col gap-y-4 lg:col-span-1">
        <WalletCard />
        <ClaimCard />
      </div>
      <div className="bg-white border-[1.11px] border-[#efefef] dark:border-[#202020] dark:bg-[#1E1E1E] rounded-2xl p-3 col-span-1 lg:col-span-2">
        <div className="flex gap-x-4">
          <p className="text-sm font-medium mb-4">Total Users</p>
          <p className="text-sm font-normal text-[#dddddd] dark:text-[#4f4f4f] capitalize">
            total value locked
          </p>
        </div>
        <DashboardChart />
      </div>
      <div className="col-span-1 lg:col-span-3 bg-white dark:bg-[#1E1E1E] rounded-2xl p-3 border-[1.11px] border-[#efefef] dark:border-[#202020]">
        <div className="flex gap-y-2 flex-col mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/bitcoin.svg"
                alt="Bitcoin Logo"
                height={24}
                width={24}
              />
              <p className="text-sm dark:text-[#fff] text-[#000]">
                Bitcoin <span className="text-[#696969]">(BTC)</span>
              </p>
            </div>
            <div className="relative w-[234px]  bg-[#F4F4F4] dark:bg-[#181818] rounded-[8px] px-2 h-[37px]">
              <input
                type="text"
                placeholder="Search token"
                className="rounded-xl py-2 px-4 pl-6 bg-[#F4F4F4] dark:bg-[#181818] text-sm dark:text-[#434343] text-[#9D9D9D] focus:outline-none"
              />
              <SearchIcon
                color={isDark ? "#696969" : "#B9B9B9"}
                size="18"
                className="absolute top-2.5"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[32px] text-[#444444] dark:text-[#B7B5B9] font-mono font-normal">
              $117,201.01
            </p>
            <div className="flex gap-x-1">
              <Triangle fill="#32B289" color="#32B289" size="16" />
              <p className="text-sm text-[#32B289] flex items-center">+2.38%</p>
            </div>
          </div>
        </div>
        <AssetChart />
      </div>
    </div>
  );
}
