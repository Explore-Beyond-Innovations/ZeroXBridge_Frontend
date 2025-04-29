'use client'
import AnalyticsDashboard from "@/app/components/analytics";
import { useTheme } from "@/app/ThemeContext";
import { useAccount } from "@starknet-react/core";


export default function AnalyticsPage() {
  const { isDarkMode } = useTheme();
  const { isConnected } = useAccount();
  return (
    <div
      className={`flex flex-col items-center w-full h-full relative py-[2rem] ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      {/* to test out the connect state, please change isconnected to true */}
      <AnalyticsDashboard isDarkMode={isDarkMode} isConnected={isConnected} />
    </div>
  );
}