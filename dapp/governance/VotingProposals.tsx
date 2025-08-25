"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function VotingProposals() {
  const proposals = [
    { id: 1, title: "Upgrade Starknet to v0.13.0", status: "Active", votes: { yes: 2345, no: 567 } },
    { id: 2, title: "Deploy new governance contract", status: "Pending", votes: { yes: 0, no: 0 } },
    { id: 3, title: "Increase block size", status: "Closed", votes: { yes: 5432, no: 3210 } },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "Closed": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="px-4 sm:px-6 py-10">
      {/* Placeholder illustration */}
      <div className="flex justify-center mb-8">
        <img src="/starknet-placeholder.svg" alt="Starknet illustration" className="w-64 h-auto" />
      </div>

      <h1 className="text-3xl font-bold tracking-wide mb-8 text-center">
        Starknet Governance Proposals
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {proposals.map((proposal, index) => (
          <motion.div
            key={proposal.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 p-4 sm:p-6 rounded-2xl border border-gray-800 shadow hover:shadow-xl hover:bg-gray-800 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <Link href={`/voting-proposals/${proposal.id}`} className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(proposal.status)}`}>
                  {proposal.status === "Active" && "🟢"}
                  {proposal.status === "Pending" && "🟡"}
                  {proposal.status === "Closed" && "🔴"}
                  {proposal.status}
                </span>
                <span className="text-sm text-gray-400 mt-2 sm:mt-0">ID #{proposal.id}</span>
              </div>

              <h2 className="text-base sm:text-lg font-semibold mb-3">{proposal.title}</h2>

              <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-400 mb-4">
                <span>✅ Yes: {proposal.votes.yes}</span>
                <span>❌ No: {proposal.votes.no}</span>
              </div>
            </Link>

            <button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg transition">
              Vote Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

