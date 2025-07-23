"use client";

import { motion } from "framer-motion";

interface Transaction {
  id: string;
  type: string;
  from: string;
  amount: string;
  value: string;
}

const LiveStats = () => {
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      type: "Swapped to STRK",
      from: "0x07296...cfede",
      amount: "+400 USDT",
      value: "$399.6",
    },
    {
      id: "2",
      type: "Swapped to STRK",
      from: "0x07296...cfede",
      amount: "+400 USDT",
      value: "$399.6",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-[#09050E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-400 uppercase tracking-wider">
            Live Stats
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Total Value Locked Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-[#1a1a1a] rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Total Value Locked</h3>
            <button className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors duration-300 rounded-lg p-4 flex items-center gap-3 text-white">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <circle cx="12" cy="16" r="1"></circle>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Coming Soon</span>
            </button>
          </motion.div>

          {/* XZB Supply Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#1a1a1a] rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">XZB Supply</h3>
            <button className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors duration-300 rounded-lg p-4 flex items-center gap-3 text-white">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <circle cx="12" cy="16" r="1"></circle>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Coming Soon</span>
            </button>
          </motion.div>

          {/* Latest Transactions Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-[#1a1a1a] rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Latest Transactions</h3>
            <div className="space-y-4">
              {mockTransactions.map((tx, index) => (
                <div key={tx.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
                      {index === 0 ? (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{tx.type}</div>
                      <div className="text-gray-400 text-xs">From {tx.from}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm font-medium">{tx.amount}</div>
                    <div className="text-gray-400 text-xs">{tx.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;