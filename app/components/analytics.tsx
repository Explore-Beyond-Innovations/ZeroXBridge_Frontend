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

export default function AnalyticsDashboard({ isConnected = false }) {
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

  const MetricCard = ({
    title,
    value,
    change = null,
  }: {
    title: string;
    value: string;
    change?: number | null;
  }) => (
    <div className="bg-[#21192F] rounded-2xl p-6 w-[350px] h-[150px]">
      <p className="text-gray-400 mb-2">{title}</p>
      <p className="text-3xl font-semibold text-white mb-1">${value}</p>
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
  }: {
    data: { name: string; value: number }[];
    colors: string[];
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
          <Cell key={`cell-${index}`} fill={colors[index]} />
        ))}
      </Pie>
    </PieChart>
  );

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-3 gap-6 border-b border-[#614199] py-6">
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

      <div className="grid grid-cols-4">
        <div className="col-span-3 bg-[#21192F] rounded-2xl p-6  w-[720px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[16px] font-semibold text-white">
              Protocol Metrics
            </h2>
            <div className="flex gap-2 bg-[#282433] rounded-full p-1">
              {["TVL", "Volume", "Price"].map((metric) => (
                <button
                  key={metric}
                  className={`px-4 py-1 rounded-full transition-all ${
                    activeMetric === metric
                      ? "bg-[#7D53C4] text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
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
                stroke="#6B7280"
                tick={{ fill: "#6B7280" }}
                tickLine={false}
                fontSize={"12px"}
                axisLine={false}
              />
              <YAxis
                stroke="#6B7280"
                tick={{ fill: "#6B7280" }}
                fontSize={"14px"}
                tickLine={false}
                axisLine={false}
              />
              <CartesianGrid
                stroke="#6B7280"
                horizontal={true}
                vertical={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#282433",
                  border: "none",
                  borderRadius: "8px",
                  color: "#FFFFFF",
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
                <linearGradient id="gradientStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5BC4FF" />
                  <stop offset="100%" stopColor="#FF5BEF" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Right Column - Donut Charts */}
        <div className="space-y-6 w-[350px] -ml-[76px]">
          {/* Locked Assets */}
          <div className="bg-[#21192F] rounded-2xl py-6 px-4 h-[261px] ">
            <h2 className="text-[16px] font-semibold mb-4 text-white">
              Your Locked Assets
            </h2>
            <div className="flex items-center justify-between px-4">
              <CustomDonut
                data={lockedAssets}
                colors={
                  isConnected ? LOCKED_ASSETS_COLORS : ["#8B8B8B", "#8B8B8B"]
                }
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
                        <p className="text-sm text-white">{asset.amount}</p>
                        <p className="text-sm text-gray-400">{asset.display}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full`}
                        style={{ backgroundColor: "#8B8B8B" }}
                      />
                      <div className="text-gray-400">
                        <p>0 xZB</p>
                        <p>$0.00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full`}
                        style={{ backgroundColor: "#8B8B8B" }}
                      />
                      <div className="text-gray-400">
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
          <div className="bg-[#21192F] rounded-2xl py-6 px-4 h-[261px]">
            <h2 className="text-[16px] text-white font-semibold mb-4">
              Your xZB Balance
            </h2>
            <div className="flex items-center justify-between px-4">
              <CustomDonut
                data={xzbBalance}
                colors={
                  isConnected ? XZB_BALANCE_COLORS : ["#8B8B8B", "#8B8B8B"]
                }
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
                        <p className="text-sm text-white">{balance.amount}</p>
                        <p className="text-sm text-gray-400">
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
                        style={{ backgroundColor: "#8B8B8B" }}
                      />
                      <div className="text-gray-400">
                        <p>0 xZB</p>
                        <p>$0.00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full`}
                        style={{ backgroundColor: "#8B8B8B" }}
                      />
                      <div className="text-gray-400">
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
