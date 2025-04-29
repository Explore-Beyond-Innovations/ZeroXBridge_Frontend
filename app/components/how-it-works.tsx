/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import wallet from '../../public/wallet.svg';
import write from '../../public/write.svg';
import scroll from '../../public/scroll.svg';
import token from '../../public/token.svg';
import blur3 from "@/public/outerBlur.svg";

const steps = [
  {
    number: 1,
    title: "Connect Wallet",
    image: wallet,
    description: "First, you'll have to connect your wallet and then deposit collateral (ETH, USDC, STRK etc) on Ethereum L1."
  },
  {
    number: 2,
    title: "ZK-STARK Proof",
    image: write,
    description: "A ZK-STARK proof verifies the deposit without exposing sensitive data."
  },
  {
    number: 3,
    title: "STARKNET VERIFIES PROOF",
    image: scroll,
    description: "Starknet verifies the proof and unlocks borrowing power from liquidity vaults."
  },
  {
    number: 4,
    title: "BORROW, LEND OR TRADE",
    image: token,
    description: "And that's all, you can now borrow, lend, or trade using their collateralized funds."
  }
];

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
        setTimeout(() => {
          setIsAnimating(false);
        }, 500); // Allow transition to complete before removing animation class
      }, 500); // Time to fade out current step
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleStepChange = (index: any) => {
    if (currentStep === index || isAnimating) return; // Prevent changing during animation
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(index);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 500);
  };

  return (
    <div className="relative bg-[#09050E] px-4 sm:px-6 lg:px-8 py-16 lg:py-[6rem] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute -top-[10px] left-[10%] z-20 hidden lg:block">
        <Image
          src={blur3}
          alt="Glow Effect"
          width={500}
          height={500}
          className="h-[350px] w-[950px] opacity-90"
        />
      </div>

      {/* For Large Screens */}
      <Image
        src="/images/ellipse.png"
        alt="Glow Effect"
        width={500}
        height={500}
        className="hidden sm:block w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] absolute -bottom-[200px] lg:-bottom-[400px] -left-[10%] lg:-left-[0%] z-20"
      />

      <div className="max-w-6xl mx-auto max-sm:bg-gradient-to-b max-sm:pt-4 max-sm:rounded-t-[20px] max-sm:from-[#0d0814] max-sm:to-[#0d0814]">
        {/* Section Title */}
        <div className="text-center mb-12 lg:mb-24 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
            How it Works
          </h2>
          <p className="text-gray-300 text-base sm:text-lg lg:text-[18px] font-serif">
            These easy 4 steps are all you need to Get Started
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 justify-center items-center w-full lg:w-[92%] mx-auto">
          {/* Image Section */}
          <div className="relative order-2 md:order-1 w-full h-[300px] sm:h-[400px] lg:h-[467px] flex items-center justify-center">
            <div className="bg-check-bg bg-no-repeat bg-cover w-full h-[300px] sm:h-[400px] lg:h-[467px] rounded-3xl flex items-center justify-center">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-full flex items-center justify-center transition-all duration-1000 ${
                    currentStep === index 
                      ? isAnimating 
                        ? 'opacity-0 scale-90' 
                        : 'opacity-100 scale-100' 
                      : 'opacity-0 scale-90'
                  }`}
                >
                  <div className="animate-float">
                    <div className="rounded-xl p-6">
                      <Image
                        src={step.image}
                        width={500}
                        height={500}
                        alt={step.title}
                        className='w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[245px] lg:h-[245px]'
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text Section */}
          <div className="relative order-1 md:order-2 lg:pl-4">
            <div className={`transition-all duration-1000 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 lg:w-[60px] lg:h-[60px] rounded-full border border-[#A26DFF] text-white flex items-center justify-center text-base lg:text-[18px] font-serif flex-shrink-0">
                  {steps[currentStep].number}.
                </div>
                <div>
                  <h3 className="text-sm lg:text-[36px] leading-10 font-semibold text-[#8B8B8B] sm:text-white mb-2">
                    {steps[currentStep].title}
                  </h3>
                  <p className="text-gray-300 text-sm lg:text-[16px] w-[80%] text-wrap">
                    {steps[currentStep].description}
                  </p>

                  {/* Navigation Dots */}
                  <div className="flex pr-24 sm:pr-0 justify-center w-full self-start gap-2 mt-8 lg:mt-24">
                    {steps.map((_, index) => (
                      <button
                        key={index}
                        className={`w-10 lg:w-12 h-[0.8px] rounded-full transition-all ${currentStep === index ? 'bg-[#A26DFF]' : 'bg-gray-600'}`}
                        onClick={() => handleStepChange(index)}
                        disabled={isAnimating}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(90deg, #26183E 0%, #A26DFF 47.5%, #26183E 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;