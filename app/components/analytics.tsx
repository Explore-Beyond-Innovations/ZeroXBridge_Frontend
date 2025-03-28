import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

const DUMMY_DATA = [
  { hour: "10am", value: 85 },
  { hour: "11am", value: 45 },
  { hour: "12am", value: 90 },
  { hour: "01am", value: 55 },
  { hour: "02am", value: 30 },
  { hour: "03am", value: 85 },
  { hour: "04am", value: 15 },
  { hour: "05am", value: 95 },
  { hour: "06am", value: 90 },
  { hour: "07am", value: 120 },
];

const LOCKED_ASSETS_COLORS = ["#5088FF", "#D456FD"];
const XZB_BALANCE_COLORS = ["#9E8FFF", "#FF9000"];

interface AnalyticsDashboardProps {
  isDarkMode: boolean;
  isConnected?: boolean;
}

export default function AnalyticsDashboard({
  isDarkMode,
  isConnected = false,
}: AnalyticsDashboardProps) {
  const [mounted, setMounted] = useState(false);
  const [activeMetric, setActiveMetric] = useState("TVL");

  useEffect(() => {
    setMounted(true);
  }, []);

  const lockedAssets = [
    { name: "ETH", value: 8000, amount: "10.5 ETH", display: "$21,000" },
    { name: "USDC", value: 5000, amount: "5000 USDC", display: "$5,000" },
  ];

  const xzbBalance = [
    { name: "xZB 1", value: 12520, amount: "26,000 xZB", display: "$26,520" },
    { name: "xZB 2", value: 10200, amount: "10,000 xZB", display: "$10,200" },
  ];

  if (!mounted) {
    return null;
  }

  const cardBg = isDarkMode ? "#21192F" : "#F8F4FF";
  const textPrimary = isDarkMode ? "text-white" : "text-[#09050E]";
  const textSecondary = isDarkMode ? "text-gray-400" : "text-[#53436D]";
  const borderColor = isDarkMode ? "border-[#614199]" : "border-[#F8F4FF]";
  const tabActiveBg = isDarkMode ? "#7D53C4" : "#ECE1FF";
  const chartGridColor = isDarkMode ? "#6B7280" : "#D1D5DB";
  const tooltipBg = isDarkMode ? "#282433" : "#FBF9FF";
  const emptyChartColor = isDarkMode ? "#8B8B8B" : "#53436D";

  const MetricCard = ({
    title,
    value,
    change = null,
  }: {
    title: string;
    value: string;
    change?: number | null;
  }) => (
    <div
      className={`rounded-2xl p-6 w-full lg:w-[350px] h-[150px]`}
      style={{ backgroundColor: cardBg }}
    >
      <p className={`${textSecondary} mb-2`}>{title}</p>
      <p className={`text-3xl font-semibold ${textPrimary} mb-1`}>${value}</p>
      {change !== null && (
        <p
          className={`text-[14px] ${
            change > 0 ? "text-[#4AD991]" : "text-red-500"
          }`}
        >
          {change > 0 ? "+" : ""}
          {change}% (24h)
        </p>
      )}
    </div>
  );

  const CustomDonut = ({
    data,
    colors,
    isEmpty = false,
  }: {
    data: { name: string; value: number }[];
    colors: string[];
    isEmpty?: boolean;
  }) => (
    <PieChart width={150} height={150}>
      <Pie
        data={data}
        innerRadius={50}
        outerRadius={65}
        paddingAngle={0}
        dataKey="value"
        startAngle={90}
        stroke="0"
        endAngle={450}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={isEmpty ? emptyChartColor : colors[index]}
          />
        ))}
      </Pie>
    </PieChart>
  );

  return (
    <div className="space-y-6 p-6 w-full lg:max-w-[1800px] mx-auto">
      <div
        className={`flex flex-col lg:flex-row justify-evenly md:px-4 gap-6 border-b ${borderColor} py-6`}
      >
        <MetricCard
          title="Total Value Locked"
          value={isConnected ? "1,500" : "0.00"}
          change={isConnected ? 5.6 : null}
        />
        <MetricCard
          title="24h Volume"
          value={isConnected ? "2,506" : "0.00"}
          change={isConnected ? 2.3 : null}
        />
        <MetricCard title="xZB Price" value="1.02" change={-0.5} />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row justify-evenly w-full ">
        <div className="w-full   md:w-[720px] overflow-x-scroll md:overflow-none">
          <div
            className="col-span-3 rounded-2xl p-6 w-[720px] h-full lg:w-full"
            style={{ backgroundColor: cardBg }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-[16px] font-semibold ${textPrimary}`}>
                Protocol Metrics
              </h2>
              <div className="flex border-b-0 text-sm font-medium">
                {["TVL", "Volume", "Price"].map((metric) => (
                  <button
                    key={metric}
                    className={cn(
                      "px-4 py-2 transition-all border-r last:border-r-0 first:rounded-l-full last:rounded-r-full",
                      activeMetric === metric
                        ? "bg-[#E8DFFC] text-black font-medium"
                        : "bg-transparent text-black hover:bg-gray-100"
                    )}
                    style={{
                      borderColor: isDarkMode ? "#E8DFFC" : "#A26DFF",
                      backgroundColor:
                        activeMetric === metric
                          ? tabActiveBg
                          : isDarkMode
                          ? "#282433"
                          : "#FBF9FF",
                      color:
                        activeMetric === metric
                          ? isDarkMode
                            ? "white"
                            : "black"
                          : isDarkMode
                          ? "white"
                          : "black",
                    }}
                    onClick={() => setActiveMetric(metric)}
                  >
                    {metric}
                  </button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={isConnected ? DUMMY_DATA : []}>
                <XAxis
                  dataKey="hour"
                  stroke={chartGridColor}
                  tick={{ fill: chartGridColor }}
                  tickLine={false}
                  fontSize={"12px"}
                  axisLine={false}
                />
                <YAxis
                  stroke={chartGridColor}
                  tick={{ fill: chartGridColor }}
                  fontSize={"14px"}
                  tickLine={false}
                  axisLine={false}
                />
                <CartesianGrid
                  stroke={chartGridColor}
                  horizontal={true}
                  vertical={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    border: "none",
                    borderRadius: "8px",
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="url(#gradientStroke)"
                  strokeWidth={4}
                  dot={{
                    fill: "#7D53C4",
                    stroke: "#7D53C4",
                    r: 4,
                  }}
                />
                <defs>
                  <linearGradient
                    id="gradientStroke"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#5BC4FF" />
                    <stop offset="100%" stopColor="#FF5BEF" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column - Donut Charts */}
        <div className="space-y-6 w-full lg:w-[350px] ">
          {/* Locked Assets */}
          <div
            className="rounded-2xl py-6 px-4 h-[261px]"
            style={{ backgroundColor: cardBg }}
          >
            <h2 className={`text-[16px] font-semibold mb-4 ${textPrimary}`}>
              Your Locked Assets
            </h2>
            <div className="flex items-center justify-between px-4">
              <CustomDonut
                data={lockedAssets}
                colors={LOCKED_ASSETS_COLORS}
                isEmpty={!isConnected}
              />
              <div className="space-y-2">
                {isConnected ? (
                  lockedAssets.map((asset, index) => (
                    <div key={asset.name} className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full`}
                        style={{ backgroundColor: LOCKED_ASSETS_COLORS[index] }}
                      />
                      <div>
                        <p className={`text-sm ${textPrimary}`}>
                          {asset.amount}
                        </p>
                        <p className={`text-sm ${textSecondary}`}>
                          {asset.display}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full`}
                        style={{
                          backgroundColor: isDarkMode ? "#8B8B8B" : "#53436D",
                        }}
                      />
                      <div className={textSecondary}>
                        <p>0 xZB</p>
                        <p>$0.00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full`}
                        style={{
                          backgroundColor: isDarkMode ? "#8B8B8B" : "#53436D",
                        }}
                      />
                      <div className={textSecondary}>
                        <p>0 ETH</p>
                        <p>$0.00</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* xZB Balance */}
          <div
            className="rounded-2xl py-6 px-4 h-[261px]"
            style={{ backgroundColor: cardBg }}
          >
            <h2 className={`text-[16px] ${textPrimary} font-semibold mb-4`}>
              Your xZB Balance
            </h2>
            <div className="flex items-center justify-between px-4">
              <CustomDonut
                data={lockedAssets}
                colors={XZB_BALANCE_COLORS}
                isEmpty={!isConnected}
              />
              <div className="space-y-2">
                {isConnected ? (
                  xzbBalance.map((balance, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full`}
                        style={{ backgroundColor: XZB_BALANCE_COLORS[index] }}
                      />
                      <div>
                        <p className={`text-sm ${textPrimary}`}>
                          {balance.amount}
                        </p>
                        <p className={`text-sm ${textSecondary}`}>
                          {balance.display}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full`}
                        style={{
                          backgroundColor: isDarkMode ? "#8B8B8B" : "#53436D",
                        }}
                      />
                      <div className={textSecondary}>
                        <p>0 xZB</p>
                        <p>$0.00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full`}
                        style={{
                          backgroundColor: isDarkMode ? "#8B8B8B" : "#53436D",
                        }}
                      />
                      <div className={textSecondary}>
                        <p>0 xZB</p>
                        <p>$0.00</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
