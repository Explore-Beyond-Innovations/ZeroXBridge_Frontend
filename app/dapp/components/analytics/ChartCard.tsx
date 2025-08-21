"use client";

import type React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface ChartCardProps {
  selectedChart: "tvl" | "volume" | "price";
  onChartChange: (chart: "tvl" | "volume" | "price") => void;
  theme: string;
  currentPrice?: string;
  priceChange?: string;
}

// Small logo component specifically for ChartCard
function SmallLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 36 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_786_5598)">
        <path
          d="M27.4468 0.67704H8.9423C8.85769 0.677089 8.77498 0.702122 8.70454 0.748999C8.6341 0.795876 8.57907 0.862509 8.54636 0.94054C8.51365 1.01857 8.5047 1.10453 8.52065 1.18762C8.5366 1.27071 8.57673 1.34725 8.63601 1.40762L12.6297 5.46361C12.7098 5.54411 12.7547 5.65304 12.7547 5.76658C12.7547 5.88013 12.7098 5.98905 12.6297 6.06955L0.132893 18.5385C0.0728672 18.5986 0.0319957 18.6751 0.0154421 18.7584C-0.00111156 18.8417 0.00739544 18.928 0.0398883 19.0065C0.0723811 19.085 0.127402 19.152 0.197999 19.1992C0.268596 19.2465 0.351601 19.2717 0.436528 19.2717H8.25945C8.80148 19.2722 9.33825 19.1656 9.83887 18.9578C10.3395 18.75 10.7941 18.4453 11.1765 18.0612L27.7505 1.41027C27.8105 1.35019 27.8514 1.27367 27.8679 1.19037C27.8845 1.10708 27.876 1.02074 27.8435 0.942275C27.811 0.863809 27.756 0.796735 27.6854 0.749527C27.6148 0.702318 27.5318 0.677094 27.4468 0.67704Z"
          fill="currentColor"
        />
        <path
          d="M7.62136 26.3229H26.1206C26.2052 26.3229 26.2879 26.2979 26.3584 26.251C26.4288 26.2041 26.4838 26.1375 26.5165 26.0594C26.5492 25.9814 26.5582 25.8955 26.5422 25.8124C26.5263 25.7293 26.4862 25.6527 26.4269 25.5924L22.4332 21.5364C22.3531 21.4559 22.3082 21.3469 22.3082 21.2334C22.3082 21.1198 22.3531 21.0109 22.4332 20.9304L34.9326 8.46678C34.9927 8.4067 35.0335 8.33018 35.0501 8.24688C35.0667 8.16358 35.0581 8.07724 35.0257 7.99878C34.9932 7.92031 34.9381 7.85324 34.8675 7.80603C34.7969 7.75882 34.7139 7.7336 34.629 7.73355H26.8061C26.2641 7.73303 25.7273 7.83972 25.2267 8.04748C24.726 8.25524 24.2715 8.55996 23.8891 8.94411L7.31507 25.595C7.25668 25.6555 7.21733 25.7318 7.20189 25.8145C7.18645 25.8971 7.1956 25.9825 7.2282 26.06C7.26081 26.1375 7.31545 26.2037 7.38533 26.2504C7.45522 26.2972 7.53728 26.3224 7.62136 26.3229Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_786_5598">
          <rect
            width="35.0613"
            height="25.6459"
            fill="currentColor"
            transform="translate(0 0.677032)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

// Mock data for different chart types with the exact dates and values
const chartData = {
  tvl: [
    { time: "Jan 25", value: 250000 },
    { time: "Jan 26", value: 100000 },
    { time: "Jan 27", value: 10000 },
    { time: "Jan 28", value: 5000 },
    { time: "Jan 29", value: 1000 },
    { time: "Jan 30", value: 1000 },
    { time: "Jan 31", value: 150000 },
    { time: "Feb 1", value: 150000 },
  ],
  volume: [
    { time: "Jan 25", value: 250000 },
    { time: "Jan 26", value: 100000 },
    { time: "Jan 27", value: 10000 },
    { time: "Jan 28", value: 5000 },
    { time: "Jan 29", value: 1000 },
    { time: "Jan 30", value: 1000 },
    { time: "Jan 31", value: 50000 },
    { time: "Feb 1", value: 150000 },
  ],
  price: [
    { time: "Jan 25", value: 250000 },
    { time: "Jan 26", value: 100000 },
    { time: "Jan 27", value: 10000 },
    { time: "Jan 28", value: 5000 },
    { time: "Jan 29", value: 1000 },
    { time: "Jan 30", value: 0 },
    { time: "Jan 31", value: 50000 },
    { time: "Feb 1", value: 150000 },
  ],
};

const chartConfig = {
  tvl: {
    label: "TVL",
    color: "#8884d8",
    format: (value: number) => `$${(value / 1000).toFixed(0)}K`,
  },
  volume: {
    label: "Volume",
    color: "#82ca9d",
    format: (value: number) => `$${(value / 1000).toFixed(0)}K`,
  },
  price: {
    label: "Price",
    color: "#ffc658",
    format: (value: number) => `$${(value / 1000).toFixed(0)}K`,
  },
};

export default function ChartCard({
  selectedChart,
  onChartChange,
  theme,
  currentPrice,
  priceChange,
}: ChartCardProps) {
  const lineColor = theme === "dark" ? "#fff" : "#000";
  console.log("ChartCard theme:", theme, "lineColor:", lineColor);
  const axisAndGridColor = theme === "dark" ? "#444" : "#e5e5e5";
  const textColor = theme === "dark" ? "#999" : "#999";

  const currentData = chartData[selectedChart];
  const config = chartConfig[selectedChart];

  return (
    <div className="bg-card border border-card-border rounded-xl px-4 py-3 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-3">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2 my-2 md:my-0">
            <div className="w-5 h-5 overflow-visible">
              <SmallLogo className="w-full h-full" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-primary-text">
              ZeroXBridge (xZB)
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-lg sm:text-xl font-bold text-primary-text">
              {currentPrice || "$1.1392"}
            </p>
            <span className="text-xs sm:text-sm text-green-600 font-medium">
              {priceChange || "+2.38%"}
            </span>
          </div>
        </div>
        <div className="w-fit border border-gray-200 flex space-x-1 bg-muted rounded-lg p-1">
          {(["tvl", "volume", "price"] as const).map((chart) => (
            <button
              key={chart}
              onClick={() => onChartChange(chart)}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ${
                selectedChart === chart
                  ? "bg-background text-primary-text shadow-sm"
                  : "text-muted-foreground hover:text-primary-text"
              }`}
            >
              {chartConfig[chart].label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-0 h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={currentData} 
            margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
          >
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke={axisAndGridColor}
              strokeDasharray="3 3"
              strokeWidth={1}
            />
            <XAxis
              dataKey="time"
              stroke={textColor}
              fontSize={10}
              axisLine={false}
              tickLine={false}
              tick={{ fill: textColor, fontSize: 10 }}
              interval="preserveStartEnd"
              angle={0}
              textAnchor="middle"
              height={30}
            />
            <YAxis
              stroke={textColor}
              fontSize={11}
              axisLine={false}
              tickLine={false}
              tick={{ fill: textColor }}
              width={50}
              tickFormatter={(value) => {
                if (value === 0) return "0";
                if (value >= 100000) return `$${(value / 1000).toFixed(0)}K`;
                if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
                return `$${value}`;
              }}
              domain={['dataMin', 'dataMax']}
              tickCount={6}
            />
            <Tooltip 
              formatter={(value: number) => [config.format(value), config.label]}
              labelStyle={{ color: theme === "dark" ? "#fff" : "#000" }}
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
                border: `1px solid ${theme === "dark" ? "#333" : "#e5e5e5"}`,
                borderRadius: "8px",
                fontSize: "12px"
              }}
            />
            <Line
              key={theme}
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                stroke: lineColor,
                strokeWidth: 2,
                fill: theme === "dark" ? "#1a1a1a" : "#fff"
              }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}