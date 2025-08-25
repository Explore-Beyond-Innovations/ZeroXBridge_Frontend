"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function GovernanceOverview() {
  return (
    <section className="w-full py-10 px-4 md:px-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-10 transition-colors duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h4 className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2 text-2xl">
                <BookOpen size={22} className="text-gray-500 dark:text-gray-400" />
                Learn
              </h4>
              <h1 className="text-3xl mt-6 md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
                Starknet Governance overview
              </h1>
              
            </div>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Overview</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl">
                    Starknet is a permissionless decentralized Layer 2 (L2) validity rollup,
                    built to enable Ethereum to scale by using cryptographic protocols
                    called STARKs, without compromising Ethereum’s core principles of
                    decentralization, transparency, inclusivity, and security.
                </p>
                <motion.div whileHover={{ scale: 1.01 }}>
                <Link
                    href="#"
                    className="w-fit bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-5 py-3 font-medium shadow-md hover:bg-gray-800 dark:hover:bg-gray-200 transition flex items-center gap-2"
                >
                    Read more →
                </Link>
                </motion.div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 mb-6" />

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl cursor-pointer hover:shadow-md transition-colors duration-300"
            >
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                Starknet’s progressive governance
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                A decentralized network that strives to evolve over time needs to have
                progressively evolving decentralized governance mechanisms to support
                protocol upgrades.
              </p>
              <Link
                href="#"
                className="flex items-center justify-between gap-2 text-gray-900 dark:text-white font-medium mt-4"
              >
                Learn more <ArrowUpRight size={200} />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl cursor-pointer hover:shadow-md transition-colors duration-300"
            >
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                How to delegate voting power
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                If you are a STRK token holder, you can select a delegate to vote in
                your place for protocol changes.
              </p>
              <Link
                href="#"
                className="flex items-center justify-between gap-2 text-gray-900 dark:text-white font-medium mt-4"
              >
                Learn more <ArrowUpRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}