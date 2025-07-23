"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What is ZeroX Bridge?",
    answer: "ZeroX Bridge is a decentralized cross-chain protocol that enables seamless asset transfers between different blockchain networks. It uses advanced cryptographic techniques to ensure secure and efficient bridging without relying on centralized intermediaries.",
  },
  {
    question: "How does the bridging process work?",
    answer: "The bridging process involves locking your assets on the source chain and minting equivalent tokens on the destination chain. Our protocol uses a network of validators to verify and execute these transfers securely, typically completing within minutes.",
  },
  {
    question: "What networks are supported?",
    answer: "ZeroX Bridge currently supports major networks including Ethereum, Starknet, Arbitrum, Optimism, and Polygon. We're continuously expanding our network support to include more chains based on community demand.",
  },
  {
    question: "Are there any fees involved?",
    answer: "Yes, there are minimal fees to cover network gas costs and protocol operations. Our fee structure is transparent and competitive, typically ranging from 0.1% to 0.3% of the transaction value, plus network gas fees.",
  },
  {
    question: "How secure is ZeroX Bridge?",
    answer: "Security is our top priority. ZeroX Bridge uses multi-signature wallets, time-locked transactions, and has undergone multiple security audits. Our smart contracts are open-source and continuously monitored for any potential vulnerabilities.",
  },
  {
    question: "What happens if a transaction fails?",
    answer: "In the rare event of a failed transaction, our protocol automatically initiates a refund process. Your funds will be returned to your original wallet within 24-48 hours. Our support team is available 24/7 to assist with any issues.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[#09050E]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers to common questions about ZeroX Bridge
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#1A1525] to-[#0F0A1A] rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
              >
                <h3 className="text-white font-semibold text-lg pr-4 group-hover:text-purple-400 transition-colors">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <p className="text-gray-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <motion.a
            href="mailto:support@zeroxbridge.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Contact Support
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;