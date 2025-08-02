"use client";

import { useState } from "react";
import { useConnection } from "@/app/context/ConnectionContext";
import ChartCard from "../components/analytics/ChartCard";
import StatsOverview from "../components/analytics/StatsOverview";
import AssetPieChart from "../components/analytics/AssetPieChart";
import EmptyState from "../components/analytics/EmptyState";

export default function AnalyticsPage() {
  const { isConnected } = useConnection();
  const [selectedChart, setSelectedChart] = useState<"tvl" | "volume" | "price">("price");

  if (!isConnected) {
    return <EmptyState />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto h-full flex flex-col overflow-hidden">
      {/* Stats Overview */}
      <div className="mb-6 flex-shrink-0">
        <StatsOverview />
      </div>

      {/* Chart and Asset Distribution */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-5 gap-6 min-h-0 overflow-hidden">
        <div className="xl:col-span-3 overflow-hidden">
          <ChartCard 
            selectedChart={selectedChart}
            onChartChange={setSelectedChart}
          />
        </div>
        <div className="xl:col-span-2 overflow-hidden">
          <AssetPieChart />
        </div>
      </div>
    </div>
  );
} 