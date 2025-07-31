import { AutoFadeTextWrapper } from "@/app/components/AutoFadeTextWrapper";
import Image from "next/image";
import { useState } from "react";

interface Step {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageStyling: string;
}

const StepsAccordion = () => {
  const [openStep, setOpenStep] = useState<number | null>(1);

  const steps: Step[] = [
    {
      id: 1,
      title: "Connect Wallet",
      description:
        "First, you'll have to connect your wallet and then deposit collateral (ETH, USDC, STRK etc) on Ethereum L1.",
      imageUrl: "/connect.svg",
      imageStyling: "w-[140.04px] h-[47.5px] 2xl:w-[340.58px] 2xl:h-[115.64px]"

    },
    {
      id: 2,
      title: "ZK-STARK Proof",
      description:
        "Deposit your chosen cryptocurrency as collateral to start the bridging process.",
      imageUrl: "/proof.svg",
      imageStyling: "w-[390px] h-[130.17px] 2xl:w-[800px] 2xl:h-[400px]"
    },
    {
      id: 3,
      title: "Starknet Verifies Proof",
      description:
        "Once your deposit is confirmed, you'll receive xZB tokens representing your bridged assets.",
      imageUrl: "/verify.svg",
      imageStyling: "w-[390px] h-[287.72px] 2xl:w-[878px] 2xl:h-[450px]"
    },
    {
      id: 4,
      title: "Borrow, Lend, or Trade",
      description:
        "You can now use your xZB tokens on the Starknet network for various DeFi activities.",
      imageUrl: "/trade.svg",
      imageStyling: "w-[321px] h-[411px] 2xl:w-[1208px] 2xl:h-[720px] "
    },
  ];

  const toggleStep = (stepId: number) => {
    // Only allow opening a step, not closing the currently open one
    setOpenStep(stepId);
  };

  const currentStep = steps.find((step) => step.id === openStep);

  return (
    <div className="flex flex-col-reverse w-full h-full gap-8 lg:grid lg:grid-cols-2">
      {/* Left side - Steps */}
      <div className="flex-1 space-y-4 h-[95%] 2xl:h-[855.28px] flex flex-col 2xl:mt-8 ">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`overflow-hidden flex flex-col ${
              openStep === step.id ? "flex-1" : ""
            }`}
          >
            <button
              onClick={() => toggleStep(step.id)}
              className={`w-full border-b border-[#1D1D1E] px-1 pt-6 pb-3 2xl:pb-6 text-left transition-colors duration-200 flex items-center justify-between flex-shrink-0 ${step.id === 1 && "border-t border-[#1D1D1E]"} `}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-7 h-7 2xl:w-fit 2xl:h-fit 2xl:p-4 bg-[#19191A] transition-all duration-200 rounded-full flex items-center justify-center 2xl:text-[40px] text-sm ${
                    step.id === openStep ? "text-white" : "text-[#6C6C6C]"
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`text-white font-[300]  font-inter  `}
                >
                  <AutoFadeTextWrapper className={`${
                    step.id === openStep ? "text-white" : "text-[#626263]"
                  }  2xl:text-[40px]`}>{step.title}</AutoFadeTextWrapper>
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
              <div className="px-6 py-4 text-sm ">
                <AutoFadeTextWrapper className="2xl:text-[24px]">{step.description}</AutoFadeTextWrapper>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right side - Image */}
      <div className="flex-1 flex items-center justify-center bg-[#161616] rounded-lg h-[563px] 2xl:h-[955.28px] relative overflow-hidden">
            <Image
              src='/line.svg'
              alt={`line`}
              className={`absolute top-0  w-[4px] h-full transition-all ease-in-out duration-500 ${currentStep?.id === 1 && 'left-[32%]' || currentStep?.id === 2 && 'left-[12%]' || currentStep?.id === 3 && 'left-[12%]' || currentStep?.id === 4 && 'left-[18%]' }`}
              width={500}
              height={400}
            />
            <Image
              src='/line.svg'
              alt={`line`}
              className={`absolute top-0  w-[4px] h-full transition-all ease-in-out duration-500 ${currentStep?.id === 1 && 'left-[68%]' || currentStep?.id === 2 && 'left-[88%]' || currentStep?.id === 3 && 'left-[88%]' || currentStep?.id === 4 && 'left-[82%]' } `}
              width={500}
              height={400}
            />
            <Image
              src='/line2.svg'
              alt={`line2`}
              className={`absolute left-0 w-full h-full transition-all ease-in-out duration-500 ${currentStep?.id === 1 && '-top-[10%]' || currentStep?.id === 2 && '-top-[18%]' || currentStep?.id === 3 && '-top-[27%]' || currentStep?.id === 4 && '-top-[42%]' }`}
              width={500}
              height={400}
            />
            <Image
              src='/line2.svg'
              alt={`line2`}
              className={`absolute left-0 w-full h-full transition-all ease-in-out duration-500 ${currentStep?.id === 1 && 'top-[10%]' || currentStep?.id === 2 && 'top-[18%]' || currentStep?.id === 3 && 'top-[27%]' || currentStep?.id === 4 && 'top-[42%]' }`}
              width={500}
              height={400}
            />
            <Image
              src='/eth.svg'
              alt={`eth`}
              className={`absolute  w-[112.25px] h-[84.67px] 2xl:w-[272.99px] 2xl:h-[204.98px] transition-all ease-in-out duration-500 ${currentStep?.id === 1 && 'top-[23%] 2xl:top-[17%] left-[13%]' || currentStep?.id === 2 && 'hidden' || currentStep?.id === 3 && 'top-[4%] left-[3%]' || currentStep?.id === 4 && 'hidden' }`}
              width={500}
              height={400}
            />
            <Image
              src='/starknet.svg'
              alt={`starknet`}
              className={`absolute  w-[151px] h-[169px] 2xl:w-[343.7px] 2xl:h-[325.8px] transition-all ease-in-out duration-500 ${currentStep?.id === 1 && 'top-[7%] 2xl:top-[3%] right-[6%] 2xl:right-[8%]' || currentStep?.id === 2 && 'hidden' || currentStep?.id === 3 && '-top-[9%] 2xl:-top-[12%] -right-[12%] 2xl:-right-[10%]' || currentStep?.id === 4 && 'hidden' }`}
              width={500}
              height={400}
            />
            <Image
              src='/usdc.svg'
              alt={`usdc`}
              className={`absolute  w-[112.25px] h-[84.67px] 2xl:w-[272.99px] 2xl:h-[204.98px] transition-all ease-in-out duration-500 ${currentStep?.id === 1 && 'bottom-[10%] 2xl:bottom-[7%] right-[23%]' || currentStep?.id === 2 && 'hidden' || currentStep?.id === 3 && 'bottom-0 -right-[7%]' || currentStep?.id === 4 && 'hidden' }`}
              width={500}
              height={400}
            />
            <Image
              src='/you.svg'
              alt={`you`}
              className={`absolute  w-[64px] h-[42px] 2xl:w-[104px] 2xl:h-[68.43px] transition-all ease-in-out duration-500 ${currentStep?.id === 1 && 'bottom-[34%] 2xl:bottom-[32%] right-[42%]' || currentStep?.id === 2 && 'hidden' || currentStep?.id === 3 && 'hidden' || currentStep?.id === 4 && 'hidden' }`}
              width={500}
              height={400}
            />

        {currentStep && currentStep.imageUrl && currentStep.imageUrl.trim() !== "" ? (
          <div className="w-full h-full flex items-center justify-center z-20">
            <Image
              src={currentStep.imageUrl}
              alt={`Step ${currentStep.id}: ${currentStep.title}`}
              className={`max-w-full max-h-full object-contain rounded-lg transition-all ease-in-out duration-500 ${currentStep.imageStyling} `}
              width={500}
              height={400}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <span>No image available</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepsAccordion;
