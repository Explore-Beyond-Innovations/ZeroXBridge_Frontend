"use client";

import { motion } from "framer-motion";

interface Transaction {
  id: string;
  type: string;
  from: string;
  amount: string;
  value: string;
  icon?: "swap" | "arrow";
}

const LiveStats = () => {
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      type: "Swapped to STRK",
      from: "0x07296...cfede",
      amount: "+400 USDT",
      value: "$399.6",
      icon: "swap"
    },
    {
      id: "2",
      type: "Swapped to STRK",
      from: "0x07296...cfede",
      amount: "+400 USDT",
      value: "$399.6",
      icon: "arrow"
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
            LIVE STATS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Value Locked Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-6 flex flex-col justify-between min-h-[180px]"
          >
            <h3 className="text-sm font-normal text-gray-400">Total Value Locked</h3>
            <div className="flex items-end">
              <button className="bg-[#1a1a1a] hover:bg-[#222222] transition-all duration-300 rounded-full px-5 py-3 flex items-center gap-2 group shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30">
                <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span className="text-gray-300 text-sm font-bold">Coming Soon</span>
              </button>
            </div>
          </motion.div>

          {/* XZB Supply Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-6 flex flex-col justify-between min-h-[180px]"
          >
            <h3 className="text-sm font-normal text-gray-400">xZB Supply</h3>
            <div className="flex items-end">
              <button className="bg-[#1a1a1a] hover:bg-[#222222] transition-all duration-300 rounded-full px-5 py-3 flex items-center gap-2 group shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30">
                <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span className="text-gray-300 text-sm font-bold">Coming Soon</span>
              </button>
            </div>
          </motion.div>

          {/* Latest Transactions Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-6 min-h-[180px]"
          >
            <h3 className="text-sm font-normal text-gray-400 mb-4">Lastest Transactions</h3>
            <div className="relative">
              {mockTransactions.map((tx, index) => (
                <motion.div 
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  viewport={{ once: true }}
                  className="absolute w-full bg-[#1a1a1a] border border-[#252525] rounded-xl p-3 flex items-center justify-between"
                  style={{
                    top: `${index * 35}px`,
                    zIndex: mockTransactions.length - index,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${index === 0 ? 'bg-white' : 'bg-gray-800'} rounded-lg flex items-center justify-center`}>
                      {tx.icon === "swap" ? (
                        <svg className={`w-4 h-4 ${index === 0 ? 'text-black' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      ) : (
                        <svg className={`w-4 h-4 ${index === 0 ? 'text-black' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{tx.type}</div>
                      <div className="text-gray-500 text-xs">From {tx.from}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm font-semibold">{tx.amount}</div>
                    <div className="text-gray-500 text-xs">{tx.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;