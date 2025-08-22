"use client";

import { useState } from "react";
import ChartCard from "../components/analytics/ChartCard";
import StatsOverview from "../components/analytics/StatsOverview";
import AssetPieChart from "../components/analytics/AssetPieChart";
import EmptyState from "../components/analytics/EmptyState";
import { useThemeContext } from "@/app/hooks/context/theme";
import { useWallet } from "@/app/hooks";

const stats = [
  { id: "1", title: "Wallet Balance", value: "$1.13" },
  { id: "2", title: "Total Value Locked", value: "$92,294,191" },
  { id: "3", title: "24H Volume", value: "$165,003,398" },
];

export default function AnalyticsPage() {
  const { isConnected } = useWallet();
  const [selectedChart, setSelectedChart] = useState<
    "tvl" | "volume" | "price"
  >("price");
  const { theme } = useThemeContext();

  if (!isConnected) {
    return <EmptyState />;
  }

  if (theme !== "light" && theme !== "dark") {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full overflow-y-auto">
      {/* Stats Overview */}
      <div className="mb-6 flex-shrink-0">
        <StatsOverview stats={stats} />
      </div>

      {/* Chart and Asset Distribution */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-5 gap-6 min-h-0">
        <div className="xl:col-span-3">
          <ChartCard
            selectedChart={selectedChart}
            onChartChange={setSelectedChart}
            theme={theme}
          />
        </div>
        <div className="xl:col-span-2">
          <AssetPieChart />
        </div>
      </div>
    </div>
  );
}
