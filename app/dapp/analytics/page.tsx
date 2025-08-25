"use client";

import React, { useEffect, useMemo, useState } from "react";
import ChartCard from "../components/analytics/ChartCard";
import StatsOverview from "../components/analytics/StatsOverview";
import AssetPieChart from "../components/analytics/AssetPieChart";
import EmptyState from "../components/analytics/EmptyState";
import { useThemeContext } from "@/app/hooks/context/theme";
import { useWallet } from "@/app/hooks";

/** ---------------------------------------------------
 *  Mock data (unchanged)
 *  --------------------------------------------------- */
const stats = [
  { id: "1", title: "Wallet Balance", value: "$1.13" },
  { id: "2", title: "Total Value Locked", value: "$92,294,191" },
  { id: "3", title: "24H Volume", value: "$165,003,398" },
];

// Mock analytics table data
const mockTableData = [
  { asset: "ETH", price: "$1,823", change: "+3.2%" },
  { asset: "BTC", price: "$29,482", change: "-0.5%" },
  { asset: "SOL", price: "$23.45", change: "+1.8%" },
  { asset: "MATIC", price: "$0.85", change: "-2.1%" },
  { asset: "USDC", price: "$1.00", change: "0.0%" },
];

/** ---------------------------------------------------
 *  Reusable Skeleton Block
 *  --------------------------------------------------- */
const SkeletonBlock: React.FC<{
  className?: string;
  theme: "light" | "dark";
}> = ({ className = "", theme }) => (
  <div
    className={[
      "animate-pulse rounded-md",
      theme === "dark" ? "bg-gray-700" : "bg-gray-300",
      className,
    ].join(" ")}
  />
);

/** ---------------------------------------------------
 *  StatsOverview Skeleton
 *  --------------------------------------------------- */
const StatsOverviewSkeleton: React.FC<{ theme: "light" | "dark" }> = ({
  theme,
}) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className={[
          "rounded-xl p-4 border",
          theme === "dark"
            ? "bg-[#1c1c1c] border-[#202020]"
            : "bg-white border-[#eaeaea]",
        ].join(" ")}
      >
        <SkeletonBlock theme={theme} className="h-4 w-32 mb-3" />
        <SkeletonBlock theme={theme} className="h-8 w-40" />
      </div>
    ))}
  </div>
);

/** ---------------------------------------------------
 *  Chart Skeleton
 *  --------------------------------------------------- */
const ChartSkeleton: React.FC<{ theme: "light" | "dark" }> = ({ theme }) => (
  <div
    className={[
      "rounded-xl p-4 border h-[360px] md:h-[420px] flex flex-col",
      theme === "dark"
        ? "bg-[#1c1c1c] border-[#202020]"
        : "bg-white border-[#eaeaea]",
    ].join(" ")}
  >
    <div className="flex items-center justify-between mb-4">
      <SkeletonBlock theme={theme} className="h-5 w-32" />
      <div className="flex gap-2">
        <SkeletonBlock theme={theme} className="h-8 w-16 rounded-full" />
        <SkeletonBlock theme={theme} className="h-8 w-16 rounded-full" />
        <SkeletonBlock theme={theme} className="h-8 w-16 rounded-full" />
      </div>
    </div>
    <SkeletonBlock theme={theme} className="h-full w-full rounded-lg" />
  </div>
);

/** ---------------------------------------------------
 *  Pie Chart Skeleton
 *  --------------------------------------------------- */
const PieSkeleton: React.FC<{ theme: "light" | "dark" }> = ({ theme }) => (
  <div
    className={[
      "rounded-xl p-4 border h-[360px] md:h-[420px] flex flex-col",
      theme === "dark"
        ? "bg-[#1c1c1c] border-[#202020]"
        : "bg-white border-[#eaeaea]",
    ].join(" ")}
  >
    <SkeletonBlock theme={theme} className="h-5 w-40 mb-6" />
    <div className="flex-1 flex items-center justify-center">
      <div className="relative">
        <SkeletonBlock theme={theme} className="h-56 w-56 rounded-full" />
      </div>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-3">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <SkeletonBlock theme={theme} className="h-3 w-3 rounded-sm" />
          <SkeletonBlock theme={theme} className="h-3 w-24" />
        </div>
      ))}
    </div>
  </div>
);

/** ---------------------------------------------------
 *  Table Skeleton
 *  --------------------------------------------------- */
const TableSkeleton: React.FC<{ theme: "light" | "dark" }> = ({ theme }) => (
  <div
    className={[
      "rounded-xl p-4 border",
      theme === "dark"
        ? "bg-[#1c1c1c] border-[#202020]"
        : "bg-white border-[#eaeaea]",
    ].join(" ")}
  >
    <SkeletonBlock theme={theme} className="h-5 w-40 mb-4" />
    <div className="space-y-3">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center justify-between">
          <SkeletonBlock theme={theme} className="h-4 w-40" />
          <SkeletonBlock theme={theme} className="h-4 w-24" />
          <SkeletonBlock theme={theme} className="h-4 w-16" />
        </div>
      ))}
    </div>
  </div>
);

/** ---------------------------------------------------
 *  Mock Analytics Table
 *  --------------------------------------------------- */
const AnalyticsTable: React.FC = () => (
  <div className="rounded-xl border border-gray-200 dark:border-[#202020] bg-white dark:bg-[#1c1c1c] overflow-hidden">
    <table className="w-full text-sm">
      <thead className="bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300">
        <tr>
          <th className="px-4 py-3 text-left">Asset</th>
          <th className="px-4 py-3 text-left">Price</th>
          <th className="px-4 py-3 text-left">24h Change</th>
        </tr>
      </thead>
      <tbody>
        {mockTableData.map((row, i) => (
          <tr
            key={i}
            className="border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
          >
            <td className="px-4 py-3">{row.asset}</td>
            <td className="px-4 py-3">{row.price}</td>
            <td
              className={`px-4 py-3 ${
                row.change.startsWith("+")
                  ? "text-green-500"
                  : row.change.startsWith("-")
                  ? "text-red-500"
                  : ""
              }`}
            >
              {row.change}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function AnalyticsPage() {
  const { isConnected } = useWallet();
  const [selectedChart, setSelectedChart] = useState<
    "tvl" | "volume" | "price"
  >("price");
  const { theme } = useThemeContext();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // ✅ always resolve to a valid theme
  const safeTheme: "light" | "dark" = useMemo(() => {
    if (theme === "light" || theme === "dark") return theme;
    return "light";
  }, [theme]);

  // ✅ Show skeletons FIRST
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex-shrink-0">
          <StatsOverviewSkeleton theme={safeTheme} />
        </div>
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-5 gap-6 min-h-0">
          <div className="xl:col-span-3">
            <ChartSkeleton theme={safeTheme} />
          </div>
          <div className="xl:col-span-2">
            <PieSkeleton theme={safeTheme} />
          </div>
        </div>
        <div className="mt-6">
          <TableSkeleton theme={safeTheme} />
        </div>
      </div>
    );
  }

  // ✅ After skeletons finish, check wallet
  if (!isConnected) {
    return <EmptyState />;
  }

  // ✅ Finally show analytics dashboard
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full overflow-y-auto">
      <div className="mb-6 flex-shrink-0">
        <StatsOverview stats={stats} />
      </div>

      <div className="flex-1 grid grid-cols-1 xl:grid-cols-5 gap-6 min-h-0">
        <div className="xl:col-span-3">
          <ChartCard
            selectedChart={selectedChart}
            onChartChange={setSelectedChart}
            theme={safeTheme}
          />
        </div>

        <div className="xl:col-span-2">
          <AssetPieChart />
        </div>
      </div>

      <div className="mt-6">
        <AnalyticsTable />
      </div>
    </div>
  );
}
