"use client";
import { Manrope, Roboto_Serif } from "next/font/google";
import Image from "next/image";
import React, { useState } from "react";

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
    <div className="relative z-20 lg:max-w-[667px]  mb-5 pb-3 cursor-pointer before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-[#26183E00] before:via-[#A26DFF] before:to-[#26183E00]">
      <div
        className="flex justify-between items-center gap-5"
        onClick={onToggle}
      >
        <h4
          className={` transition-all duration-500 ease-in-out mt-3 ${
            manrope.className
          } ${isOpen ? "text-[#A26DFF]  font-medium text-lg" : "text-white"}`}
        >
          {item.question}
        </h4>

        <Image
          src="/arrowdownfaq.svg"
          alt="arrowdown"
          height={18}
          width={19}
          className={`transition-transform duration-500 ease-in-out ${
            isOpen ? "rotate-180 " : ""
          }`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 flex justify-center items-center ease-in-out ${
          isOpen ? "max-h-[200px] opacity-100 mt-4" : "max-h-0 opacity-0"
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
    <div className="lg:py-20 py-12 min-h-screen relative  lg:px-0  overflow-hidden flex justify-center items-center w-full">
      <div className=" w-[95vw] lg:max-w-[1200px] py-0 lg:py-10  lg:w-[1200px] relative px-5 flex overflow-hidden   flex-col justify-center items-center ">
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

        {Array(7)
          .fill(null)
          .map((_, index) => {
            return (
              <FaqItem
                item={{
                  question: `What is ZeroXBridge built on?`,
                  answer: `Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.`,
                }} // Sample data
                key={index}
                onToggle={() => onToggle(index)}
                isOpen={index === isOpenIndex}
              />
            );
          })}
    
          <div className="gradient-01 z-0 rounded-full  "></div>
        
      </div>
    </div>
  );
};

export default FAQ;
