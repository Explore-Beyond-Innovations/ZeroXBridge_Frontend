"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What is ZeroXBridge built on?",
    answer: "ZeroXBridge is built on a combination of Ethereum and Starknet, leveraging the strengths of both platforms to provide a secure and efficient cross-chain solution.",
  },
  {
    question: "How does ZeroXBridge differ from fractional bridges?",
    answer: "ZeroXBridge differs from fractional bridges by providing a more secure and efficient cross-chain solution that leverages the strengths of both Ethereum and Starknet platforms.",
  },
  {
    question: "What is XZB?",
    answer: "XZB is the native token of the ZeroXBridge protocol, used for governance and protocol incentives.",
  },
  {
    question: "Do users have to trust any intermediaries?",
    answer: "No, ZeroXBridge is designed to be trustless, meaning users don't need to trust any intermediaries for their cross-chain transactions.",
  },
  {
    question: "Can I recover my Ethereum assets after using them on Starknet?",
    answer: "Yes, you can recover your Ethereum assets after using them on Starknet through the ZeroXBridge protocol's reverse bridging functionality.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
              >
                <h3 className="text-white font-semibold text-lg pr-4 group-hover:text-gray-300 transition-colors">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 4v16m8-8H4" />
                    </svg>
                  )}
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
      </div>
    </section>
  );
};

export default Faq;