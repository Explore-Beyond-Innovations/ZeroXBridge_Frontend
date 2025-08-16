import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useThemeContext } from "@/app/hooks/context";
import { useCryptoData } from "@/app/hooks/swr";

const dummyData = [
  { date: "Jan", value: 5000 },
  { date: "Feb", value: 15000 },
  { date: "Mar", value: 12000 },
  { date: "Apr", value: 25000 },
  { date: "May", value: 30000 },
  { date: "Jun", value: 18000 },
  { date: "Jul", value: 22000 },
  { date: "Aug", value: 28000 },
];

const formatYAxisValue = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
};

export const DashboardChart = () => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={dummyData}
        margin={{ top: 5, right: 5, left: -10, bottom: -5 }}
      >
        <defs>
          {/* Area Gradient Above Curve. I'm not even sure this works or is possible with recharts */}
          <linearGradient id="areaGradientAbove" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={isDark ? "#555555" : "#F1BAE1"}
              stopOpacity={isDark ? 0.15 : 0.6}
            />
            <stop
              offset="100%"
              stopColor={isDark ? "#555555" : "#F1BAE1"}
              stopOpacity={0}
            />
          </linearGradient>

          {/* Area Gradient Below Curve */}
          <linearGradient id="areaGradientBelow" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={isDark ? "#555555" : "#F1BAE1"}
              stopOpacity={isDark ? 1 : 0.4}
            />
            <stop
              offset="100%"
              stopColor={isDark ? "#555555" : "#F1BAE1"}
              stopOpacity={isDark ? 0.1 : 0.2}
            />
          </linearGradient>

          {/* Line Gradient for Dark Mode */}
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6226EF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: isDark ? "#888" : "#666" }}
        />
        <YAxis
          dataKey="value"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: isDark ? "#888" : "#666" }}
          tickFormatter={formatYAxisValue}
          width={40}
        />
        <CartesianGrid
          stroke={isDark ? "#2B2B2B" : "#E8E8E8"}
          strokeOpacity={isDark ? 0.8 : 0.5}
          strokeDasharray="10"
          vertical={false}
        />

        <Area
          type="monotone"
          dataKey="value"
          stroke="transparent"
          fill="url(#areaGradientBelow)"
        />

        <Area
          type="monotone"
          dataKey="value"
          stroke={isDark ? "url(#lineGradient)" : "#636363"}
          fill="url(#areaGradientAbove)"
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 4,
            fill: "#6226EF",
            stroke: "#FFFFFF",
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

interface AssetChartProps {
  assetId: string;
}

export const AssetChart = ({ assetId }: AssetChartProps) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const { data, isLoading } = useCryptoData(assetId);

  const latest = data[data.length - 1]?.value || 0;
  const initial = data[0]?.value || 0;
  const change =
    latest && initial
      ? (((latest - initial) / initial) * 100).toFixed(2)
      : "0.00";
  const isUp = parseFloat(change) >= 0;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <p className="text-2xl md:text-[32px] text-[#444444] dark:text-[#B7B5B9] font-mono font-normal">
          {isLoading ? "Loading..." : `$${latest.toLocaleString()}`}
        </p>
        <div className="flex gap-x-1">
          <svg width="16" height="16">
            <polygon
              points={isUp ? "8,0 16,16 0,16" : "0,0 16,0 8,16"}
              fill={isUp ? "#32B289" : "#EF4444"}
            />
          </svg>
          <p
            className={`text-sm flex items-center ${
              isUp ? "text-[#32B289]" : "text-[#EF4444]"
            }`}
          >
            {isUp ? "+" : ""}
            {change}%
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 5, left: -10, bottom: -5 }}
        >
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>

            <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: isDark ? "#888" : "#666" }}
            interval="preserveStartEnd"
          />
          <YAxis
            dataKey="value"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: isDark ? "#888" : "#666" }}
            tickFormatter={(value) => {
              if (value >= 1_000_000)
                return `$${(value / 1_000_000).toFixed(0)}M`;
              if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
              return value.toString();
            }}
            width={55}
          />

          <CartesianGrid
            strokeDasharray="10"
            vertical={false}
            stroke={isDark ? "#2B2B2B" : "#E8E8E8"}
            strokeOpacity={isDark ? 0.8 : 0.5}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke={`url(#${isUp ? "greenGradient" : "redGradient"})`}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const dummyTVLData = [
  { date: "Jan", value: 5000000 },
  { date: "Feb", value: 15000000 },
  { date: "Mar", value: 12000000 },
  { date: "Apr", value: 25000000 },
  { date: "May", value: 30000000 },
  { date: "Jun", value: 18000000 },
  { date: "Jul", value: 22000000 },
  { date: "Aug", value: 28000000 },
];

export const TVLChart = () => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const formatYAxisValue = (value: number) => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
    return value.toString();
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={dummyTVLData}
        margin={{ top: 5, right: 5, left: -10, bottom: -5 }}
      >
        <defs>
          <linearGradient id="tvlAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={isDark ? "#555555" : "#A0CFFF"}
              stopOpacity={isDark ? 0.2 : 0.6}
            />
            <stop
              offset="100%"
              stopColor={isDark ? "#555555" : "#A0CFFF"}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: isDark ? "#888" : "#666" }}
        />
        <YAxis
          dataKey="value"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: isDark ? "#888" : "#666" }}
          tickFormatter={formatYAxisValue}
          width={40}
        />
        <CartesianGrid
          stroke={isDark ? "#2B2B2B" : "#E8E8E8"}
          strokeOpacity={isDark ? 0.8 : 0.5}
          strokeDasharray="10"
          vertical={false}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={isDark ? "#4FC3F7" : "#0369A1"}
          fill="url(#tvlAreaGradient)"
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
