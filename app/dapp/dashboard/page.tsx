"use client";
import { useState } from "react";
import { WalletCard, ClaimCard } from "./components/card";
import { DashboardChart, TVLChart, AssetChart } from "./components/chart";
import { SearchIcon, XIcon } from "lucide-react";
import { useThemeContext } from "@/app/hooks/context";
import { AssetsMenu } from "./components/asset-menu";
import { ChartTabs } from "./components/chart-tab";

const assets = [
  { name: "Bitcoin", symbol: "btc", icon: "/bitcoin.svg", id: "bitcoin" },
  {
    name: "Ethereum",
    symbol: "eth",
    icon: "/token-logos/eth-logo.svg",
    id: "ethereum",
  },
  {
    name: "StarkNet",
    symbol: "strk",
    icon: "/token-logos/strk-logo.svg",
    id: "starknet",
  },
];

export default function DashboardPage() {
  const { isDark } = useThemeContext();
  const [currentAsset, setCurrentAsset] = useState(assets[0]);
  const [showSearch, setShowSearch] = useState(false);

  const onAssetSelect = (id: string) => {
    const found = assets.find((asset) => asset.id === id);
    if (found) setCurrentAsset(found);
  };

  return (
    <div className="w-full flex justify-center">
      <div
        className="
          w-full
          p-2
          grid grid-cols-1 lg:grid-cols-3 gap-4
          2xl:max-w-[1400px] 2xl:px-0
          [@media(min-width:1920px)]:max-w-[1600px]
          [@media(min-width:2560px)]:max-w-[1800px]
        "
      >
        <div className="flex flex-col gap-y-4 lg:col-span-1">
          <WalletCard />
          <ClaimCard />
        </div>

        <div className="bg-white border-[1.11px] border-[#efefef] dark:border-[#202020] dark:bg-[#1E1E1E] rounded-2xl p-3 col-span-1 lg:col-span-2">
          <ChartTabs
            tabs={[
              { label: "Total Users", content: <DashboardChart /> },
              { label: "Total Value Locked", content: <TVLChart /> },
            ]}
          />
        </div>

        <div className="col-span-1 lg:col-span-3 bg-white dark:bg-[#1E1E1E] rounded-2xl p-3 border-[1.11px] border-[#efefef] dark:border-[#202020]">
          <div className="flex gap-y-2 flex-col mb-4">
            <div className="flex items-center justify-between relative">
              <AssetsMenu
                currentAsset={currentAsset}
                assets={assets}
                onSelect={onAssetSelect}
              />

              <div className="hidden md:flex relative bg-[#F4F4F4] dark:bg-[#181818] rounded-[8px] px-2 h-[37px]">
                <SearchIcon
                  color={isDark ? "#696969" : "#B9B9B9"}
                  size="18"
                  className="absolute top-2.5 left-2"
                />
                <input
                  type="text"
                  placeholder="Search token"
                  className="rounded-xl py-2 px-4 pl-6 bg-[#F4F4F4] dark:bg-[#181818] text-sm text-[#9D9D9D] focus:outline-none"
                />
              </div>
              {/* This one is for mobiles which slides from the top when the search icon is clicked */}
              <button
                onClick={() => setShowSearch(true)}
                className="md:hidden p-2"
              >
                <SearchIcon color={isDark ? "#696969" : "#B9B9B9"} size="18" />
              </button>

              {showSearch && (
                <div className="fixed top-0 left-0 w-full h-[60px] bg-[#F4F4F4] dark:bg-[#181818] flex items-center px-4 z-50 animate-slidedown">
                  <SearchIcon
                    color={isDark ? "#696969" : "#B9B9B9"}
                    size="18"
                    className="mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Search token"
                    autoFocus
                    className="flex-1 bg-transparent text-sm text-[#9D9D9D] focus:outline-none"
                  />
                  <button onClick={() => setShowSearch(false)} className="ml-2">
                    <XIcon size="20" color={isDark ? "#696969" : "#B9B9B9"} />
                  </button>
                </div>
              )}
            </div>
            <AssetChart assetId={currentAsset.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
