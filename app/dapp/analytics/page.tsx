"use client";

import { useState } from "react";
import { useConnection } from "@/app/context/ConnectionContext";
import ChartCard from "../components/analytics/ChartCard";
import StatsOverview from "../components/analytics/StatsOverview";
import AssetPieChart from "../components/analytics/AssetPieChart";
import EmptyState from "../components/analytics/EmptyState";
import useTheme from "@/app/hooks/useTheme";

export default function AnalyticsPage() {
  const { isConnected } = useConnection();
  const [selectedChart, setSelectedChart] = useState<"tvl" | "volume" | "price">("price");
  const { theme } = useTheme();

  if (!isConnected) {
    return <EmptyState />;
  }

  if (theme !== "light" && theme !== "dark") {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full overflow-y-auto lg:overflow-y-hidden">
      {/* Stats Overview */}
      <div className="mb-6 flex-shrink-0">
        <StatsOverview />
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