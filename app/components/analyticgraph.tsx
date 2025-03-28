"use client";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";
import { FilterIcon } from "lucide-react";

interface DataItem {
  month: string;
  thisYear: number;
  lastYear: number;
}

const data: DataItem[] = [
  { month: "JAN", thisYear: 1000, lastYear: 800 },
  { month: "FEB", thisYear: 2000, lastYear: 1600 },
  { month: "MAR", thisYear: 1800, lastYear: 1800 },
  { month: "APR", thisYear: 2200, lastYear: 2000 },
  { month: "MAY", thisYear: 2400, lastYear: 2200 },
  { month: "JUN", thisYear: 3200, lastYear: 2400 },
  { month: "JUL", thisYear: 3800, lastYear: 2800 },
  { month: "AUG", thisYear: 4000, lastYear: 3000 },
  { month: "SEP", thisYear: 3800, lastYear: 3200 },
  { month: "OCT", thisYear: 3600, lastYear: 3400 },
  { month: "NOV", thisYear: 3800, lastYear: 3600 },
  { month: "DEC", thisYear: 4000, lastYear: 3800 },
];

const timeRanges = ["ALL", "6M", "3M", "1M", "1W"];

export default function Analytictable( {isDarkMode}: {isDarkMode: boolean} ) {
  const [selectedRange, setSelectedRange] = useState("ALL");
  const [filteredData, setFilteredData] = useState<DataItem[]>(data);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Add effect to handle client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFilterChange = (selectedMonth: string) => {
    if (selectedMonth === "ALL") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.month === selectedMonth);
      setFilteredData(filtered);
    }
    setIsFilterOpen(false);
  };

  return (
    <div className="">
        <div className="flex flex-row mb-4 items-center justify-between">
          <div>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>$0.00</div>
            <div className={`text-sm ${isDarkMode ? 'text-red-500' : 'text-red-500'}`}>-100.00% (-29.51) this week</div>
          </div>
          <div className="relative">
            <button 
              className={`flex items-center justify-center p-2 gap-3 ${isDarkMode ? 'text-white hover:bg-white/10' : 'bg-[#E1D6F2] text-black hover:bg-gray-200'} rounded-full transition-colors`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span>Filter</span>
              <FilterIcon className={`${isDarkMode ? 'text-white' : 'text-black'} w-4 h-4`} />
            </button>
            {isFilterOpen && (
              <div className={`absolute right-0 mt-2 py-2 w-48 ${isDarkMode ? 'bg-white' : 'bg-black'} rounded-md shadow-xl z-20`}>
                <button
                  className={`block px-4 py-2 text-sm capitalize ${isDarkMode ? 'text-gray-700 hover:bg-blue-500 hover:text-white' : 'text-white hover:bg-gray-700'} w-full text-left`}
                  onClick={() => handleFilterChange("ALL")}
                >
                  All
                </button>
                {data.map((item) => (
                  <button
                    key={item.month}
                    className={`block px-4 py-2 text-sm capitalize ${isDarkMode ? 'text-gray-700 hover:bg-blue-500 hover:text-white' : 'text-white hover:bg-gray-700'} w-full text-left`}
                    onClick={() => handleFilterChange(item.month)}
                  >
                    {item.month}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="overflow-x-scroll w-full">
      <div className={`${isDarkMode ? 'bg-gradient-to-b from-[#21192F] to-[#3E246B]' : 'bg-[#ECE1FF]'} rounded-2xl shadow-lg h-[400px] w-[720px] md:w-auto`}>

        <div className="p-6 pt-0 h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between gap-4 mb-4 pt-4">
              <div className="flex gap-4">
                {["Total Users", "Total Projects", "Operating Status"].map((label) => (
                  <button
                    key={label}
                    className={`px-3 py-2 hover:bg-white/10 rounded-md transition-colors focus:ring-2 focus:ring-purple-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-8 ml-auto">
                <div className="flex items-center gap-1">
                  <div className={`h-2 w-2 rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>This year</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className={`h-2 w-2 rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>Last year</span>
                </div>
              </div>
            </div>

            {/* Add explicit height to this flex container */}
            <div className="flex h-[300px] flex-1">
              <div className="flex flex-col justify-between py-6 pr-2">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedRange(range)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${isDarkMode ? 'text-white ' : ' text-black'} ${
                      selectedRange === range ? "bg-purple-600 " : " hover:bg-white/10"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              
              {/* Only render chart when mounted & with explicit height */}
              <div className="flex-1 h-[300px]">
                {isMounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={filteredData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="thisYear" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={isDarkMode ? "#fff" : "#8056E1"} stopOpacity={0.2} />
                          <stop offset="95%" stopColor={isDarkMode ? "#fff" : "#8056E10"} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="lastYear" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={isDarkMode ? "#a78bfa" : "#8056E1"} stopOpacity={0.2} />
                          <stop offset="95%" stopColor={isDarkMode ? "#a78bfa" : "#8056E1"} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="month"
                        stroke={isDarkMode ? "#fff" : "#000"}
                        strokeOpacity={0.4}
                        style={{ fontSize: "12px" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        stroke={isDarkMode ? "#fff" : "#000"}
                        strokeOpacity={0.4}
                        style={{ fontSize: "12px" }}
                        axisLine={false}
                        tickLine={false}
                        tick={false}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className={`rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800 bg-opacity-90' : 'border-gray-300 bg-white bg-opacity-90'} p-2 shadow-md`}>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                                    <span className={`text-[0.70rem] uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>This Year</span>
                                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{payload[0].value}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className={`text-[0.70rem] uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Last Year</span>
                                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{payload[1].value}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="thisYear"
                        stroke={isDarkMode ? "#fff" : "#8056E1"}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#thisYear)"
                      />
                      <Area
                        type="monotone"
                        dataKey="lastYear"
                        stroke={isDarkMode ? "#a78bfa" : "#E25876"}
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        fillOpacity={1}
                        fill="url(#lastYear)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}