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

const bitcoinData = [
  { date: "Jan 25", value: 45000 },
  { date: "Jan 26", value: 48000 },
  { date: "Jan 27", value: 52000 },
  { date: "Jan 28", value: 55000 },
  { date: "Jan 29", value: 58000 },
  { date: "Jan 30", value: 62000 },
  { date: "Jan 31", value: 59000 },
  { date: "Feb 1", value: 56000 },
  { date: "Feb 2", value: 53000 },
  { date: "Feb 3", value: 48000 },
  { date: "Feb 4", value: 42000 },
  { date: "Feb 5", value: 38000 },
  { date: "Feb 6", value: 35000 },
  { date: "Feb 7", value: 32000 },
];

const formatYAxisValue = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
};

const formatAssetValue = (value: number) => {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
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
          <linearGradient id="areaGradientAbove" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={isDark ? "#555555" : "#F1BAE100"}
              stopOpacity={isDark ? 0.15 : 0.1}
            />
            <stop
              offset="100%"
              stopColor={isDark ? "#555555" : "#F1BAE1"}
              stopOpacity={0}
            />
          </linearGradient>

          <linearGradient id="areaGradientBelow" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={isDark ? "#555555" : "#F1BAE100"}
              stopOpacity={0}
            />
            <stop
              offset="100%"
              stopColor={isDark ? "#555555" : "#F1BAE1"}
              stopOpacity={isDark ? 0.1 : 0.08}
            />
          </linearGradient>

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
          strokeWidth={0}
        />

        <Area
          type="monotone"
          dataKey="value"
          stroke={isDark ? "url(#lineGradient)" : "#6226EF"}
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

export const AssetChart = () => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart
        data={bitcoinData}
        margin={{ top: 5, right: 5, left: -10, bottom: 1 }}
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
          tickFormatter={formatAssetValue}
          domain={["dataMin", "dataMax"]}
          width={40}
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
          stroke="#22C55E"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
