"use client"

import { AutoFadeTextWrapper } from "@/app/components/AutoFadeTextWrapper";
import { useState } from "react";

interface Step {
  id: number;
  title: string;
  description: string;
}

const Accordion = () => {
  const [openStep, setOpenStep] = useState<number | null>(1);

  const steps: Step[] = [
    {
      id: 1,
      title: "Security Vulnerabilities",
      description:
        "Security vulnerabilities in centralized bridges leading to hacks and exploits.",
    },
    {
      id: 2,
      title: "Inefficient Capital Allocation",
      description:
        "Deposit your chosen cryptocurrency as collateral to start the bridging process.",
    },
    {
      id: 3,
      title: "Limited Cross-Chain Utility",
      description:
        "Once your deposit is confirmed, you'll receive xZB tokens representing your bridged assets.",
    },
    {
      id: 4,
      title: "Gas Fees and Delays",
      description:
        "You can now use your xZB tokens on the Starknet network for various DeFi activities.",
    },
  ];

  const toggleStep = (stepId: number) => {
    // Only allow opening a step, not closing the currently open one
    setOpenStep(stepId);
  };
  

  return (
    <div className="flex flex-col-reverse w-full h-full gap-8">
      <div className="flex-1 h-[95%] 2xl:h-full flex flex-col ">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`overflow-hidden flex flex-col ${
              openStep === step.id ? "flex-1 border-b pb-2 border-[#1D1D1E]" : ""
            }`}
          >
            <button
              onClick={() => toggleStep(step.id)}
              className={`w-full border-[#1D1D1E] px-1 pt-4 pb-4 text-left transition-colors duration-200 flex items-center justify-between flex-shrink-0 ${step.id !== openStep ? "border-b" : "pb-0"} ${step.id === 1 && "border-t "} `}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 bg-[#19191A] transition-all duration-200 rounded-full flex items-center justify-center 2xl:text-[16px] text-sm ${
                    step.id === openStep ? "text-[#D0D0D0]" : "text-[#6C6C6C]"
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`text-[#D0D0D0] font-[300]  font-inter  `}
                >
                  <AutoFadeTextWrapper className={`${
                    step.id === openStep ? "text-[#D0D0D0]" : "text-[#626263]"
                  } text-[16px]  2xl:text-[24px]`}>{step.title}</AutoFadeTextWrapper>
                </span>
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all flex items-end duration-300 ease-in-out ${
                openStep === step.id
                  ? "opacity-100 flex-1 max-h-[85px] md:max-h-[366.32px]  2xl:max-h-full"
                  : "max-h-0 h-0 opacity-0"
              }`}
            >
              <div className="pl-10 py-2 md:py-4 text-sm ">
                <AutoFadeTextWrapper className="text-[14px] text-[#D0D0D0] 2xl:text-[16px]">{step.description}</AutoFadeTextWrapper>
              </div>
            </div>
          </div>
        ))}
      </div>       
      
    </div>
  );
};

export default Accordion;
