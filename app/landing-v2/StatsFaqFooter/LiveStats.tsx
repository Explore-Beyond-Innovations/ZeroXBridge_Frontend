"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Stat {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
}

const LiveStats = () => {
  const [stats, setStats] = useState<Stat[]>([
    {
      label: "Total Volume",
      value: "$0",
      change: "+0%",
      trend: "up",
    },
    {
      label: "24h Transactions",
      value: "0",
      change: "+0%",
      trend: "up",
    },
    {
      label: "Active Users",
      value: "0",
      change: "+0%",
      trend: "up",
    },
    {
      label: "TVL",
      value: "$0",
      change: "+0%",
      trend: "up",
    },
  ]);

  // Mock data animation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) =>
        prevStats.map((stat) => {
          const randomChange = Math.random() * 10 - 5;
          const newValue = parseFloat(stat.value.replace(/[$,]/g, "")) || 0;
          const updatedValue = Math.max(0, newValue + randomChange * 1000);
          
          return {
            ...stat,
            value: stat.label.includes("Volume") || stat.label.includes("TVL") 
              ? `$${updatedValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
              : updatedValue.toFixed(0),
            change: `${randomChange > 0 ? "+" : ""}${randomChange.toFixed(2)}%`,
            trend: randomChange > 0 ? "up" : "down",
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-[#09050E] to-[#0F0A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Live Protocol Stats
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-gray-400 text-lg">Real-time data (Coming Soon)</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[#1A1525] to-[#0F0A1A] rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </h3>
                  {stat.change && (
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}>
                      <span>{stat.change}</span>
                      <svg
                        className={`w-4 h-4 ${stat.trend === "down" ? "rotate-180" : ""}`}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 15l7-7 7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            Stats update every 3 seconds • Powered by ZeroX Protocol
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveStats;