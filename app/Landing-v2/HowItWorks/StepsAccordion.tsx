import { useState } from "react";

interface Step {
  id: number;
  title: string;
  description: string;
}

const StepsAccordion = () => {
  const [openStep, setOpenStep] = useState<number | null>(0);

  const steps: Step[] = [
    {
      id: 1,
      title: "Connect Wallet",
      description:
        "First, you'll have to connect your wallet and then deposit collateral (ETH, USDC, STRK etc) on Ethereum L1.",
    },
    {
      id: 2,
      title: "ZK-STARK Proof",
      description:
        "Deposit your chosen cryptocurrency as collateral to start the bridging process.",
    },
    {
      id: 3,
      title: "Starknet Verifies Proof",
      description:
        "Once your deposit is confirmed, you'll receive xZB tokens representing your bridged assets.",
    },
    {
      id: 4,
      title: "Borrow, Lend, or Trade",
      description:
        "You can now use your xZB tokens on the Starknet network for various DeFi activities.",
    },
  ];

  const toggleStep = (stepId: number) => {
    setOpenStep(openStep === stepId ? null : stepId);
  };

  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <div key={step.id} className="overflow-hidden">
          <button
            onClick={() => toggleStep(step.id)}
            className="w-full border-t border-[#1D1D1E] px-1 pt-6 pb-3 text-left transition-colors duration-200 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-7 h-7 bg-[#19191A] transition-all duration-200 rounded-full flex items-center justify-center text-sm ${
                  step.id === openStep ? "text-white" : "text-[#6C6C6C]"
                }`}
              >
                {step.id}
              </div>
              <span
                className={`text-white text-[1em] font-[300]  font-inter  ${
                  step.id === openStep ? "text-white" : "text-[#626263]"
                }`}
              >
                {step.title}
              </span>
            </div>
          </button>
          <div
            className={`overflow-hidden transition-all flex items-end duration-300 ease-in-out ${
              openStep === step.id
                ? "max-h-80 h-32 opacity-100"
                : "max-h-0 h-0 opacity-0"
            }`}
          >
            <div className="px-6 py-4 text-gray-300 text-sm 2xl:text-[1em]">
              {step.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepsAccordion;
