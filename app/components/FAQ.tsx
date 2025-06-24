"use client";
import { Manrope, Roboto_Serif } from "next/font/google";
import Image from "next/image";
import React, { useState } from "react";

export const faqs = [
  {
    question: "What is ZeroXBridge built on?",
    answer: "ZeroXBridge is built on a combination of Ethereum and Starknet, leveraging the strengths of both platforms to provide a secure and efficient cross-chain solution."
  },
  {
    question: "How does ZeroXBridge differ from traditional bridges?",
    answer: "Unlike traditional bridges that rely on validators or relayers, ZeroXBridge uses zk-STARK proofs to verify deposits and burns on-chain, removing centralized trust assumptions."
  },
  {
    question: "What is xZB?",
    answer: "xZB is the single native token of ZeroXBridge. It's minted on Starknet when a valid deposit proof is submitted and burned to generate a withdrawal proof for asset recovery on Ethereum."
  },
  {
    question: "Do users have to trust any intermediaries?",
    answer: "No. ZeroXBridge is fully trustless. All cross-chain actions are verified by zk-STARK proofs that are publicly verifiable and processed on-chain."
  },
  {
    question: "Can I recover my Ethereum assets after using them on Starknet?",
    answer: "Yes, as long as you burn your xZB tokens on Starknet and submit the zk-proof on Ethereum, your locked assets can be unlocked."
  }
];


interface FaqItem {
  item: {
    question: string;
    answer: string;
  };
  onToggle: () => void;
  isOpen: boolean;
}
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const roboto = Roboto_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const FaqItem = ({ item, onToggle, isOpen }: FaqItem) => {
  return (
    <div className="relative z-20 lg:max-w-[667px]  mb-5 pb-3 cursor-pointer before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-[#26183E00] before:via-[#A26DFF] before:to-[#26183E00] ">
      <div
        className="flex justify-between items-center gap-5"
        onClick={onToggle}
      >
        <h4
          className={` transition-all duration-500 ease-in-out mt-3 ${manrope.className
            } ${isOpen ? "text-[#A26DFF]  font-medium text-lg" : "text-white"}`}
        >
          {item.question}
        </h4>

        <Image
          src="/arrowdownfaq.svg"
          alt="arrowdown"
          height={18}
          width={19}
          className={`transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180 " : ""
            }`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 flex justify-center items-center ease-in-out ${isOpen ? "max-h-[200px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
      >
        <p
          className={`lg:text-[16px] text-[13px] px-6  font-400  text-white/85 max-w-[609px] ${roboto.className}`}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [isOpenIndex, setIsOpenIndex] = useState<number | null>(null);
  const onToggle = (index: number | null) => {
    setIsOpenIndex(isOpenIndex === index ? null : index);
  };
  return (
    <div className="lg:py-20 py-12 h-fit relative  overflow-hidden flex justify-center items-center w-full bg-[#09050E]">
      <div className=" w-[95vw] lg:max-w-[1200px] py-0  lg:w-[1200px] relative px-5 flex overflow-hidden   flex-col justify-center items-center ">
        <p
          className={`lg:min-w-[700px] lg:w-[700px] text-center  font-bold text-3xl w-[95vw]   lg:text-5xl bg-gradient-to-r  from-[#26183E] via-[#A26DFF] to-[#26183E] text-transparent bg-clip-text ${manrope.className}`}
        >
          You have a Question You’re not clear about?
        </p>
        <p
          className={`lg:text-[20px] text-sm  lg:w-[691px] text-center    text-[#D4D4D4] mt-6 mb-24 ${roboto.className} `}
        >
          ZeroXBridge is here to answer all your questions and keep you updated.
        </p>

        {/* FAQ Items */}
        {faqs.map((faq, index) => (
          <FaqItem
            item={faq}
            key={index}
            onToggle={() => onToggle(index)}
            isOpen={index === isOpenIndex}
          />
        ))}

        <div className="gradient-01 z-0 rounded-full  "></div>

      </div>
    </div>
  );
};

export default FAQ;
