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
    description: "And that’s all, you can now borrow, lend, or trade using their collateralized funds."
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
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen  bg-blend-normal px-8 py-[6rem] pb-8 w-full relative">
      <div className="absolute -top-[110px] left-[25%] opacity-80 bg-blend-normal z-0">
        <Image
          src={blur3}
          alt="Glow Effect"
          width={500}
          height={500}
          className='h-[600px] w-[600px]'
        />
      </div>
      <div className="max-w-6xl mx-auto h-fit">
        <div className="text-center mb-24 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4 gradient-text">How it Works</h2>
          <p className="text-gray-300 text-[18px] font-serif">These easy 4 steps, is all you need to Get Started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-center items-center w-[92%] h-[467px] mx-auto mt-[24px] px-4 py-3">
          <div className="relative pl-4 h-[200px] flex self-center">
            <div
              className={`absolute w-full transition-all duration-500 ${
                isAnimating ? 'opacity-0 translate-x-[-100px]' : 'opacity-100 translate-x-0'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-[60px] h-[60px] rounded-full border border-[#A26DFF] text-white flex items-center justify-center text-[18px] font-serif flex-shrink-0">
                  {steps[currentStep].number}.
                </div>
                <div>
                  <h3 className="text-[36px] font-semibold text-white mb-2">
                    {steps[currentStep].title}
                  </h3>
                  <p className="text-gray-300 text-[16px]">
                    {steps[currentStep].description}
                  </p>

                  <div className="flex justify-start self-start gap-2 mt-24">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`w-12 h-1 rounded-full transition-all ${
                currentStep === index ? 'bg-[#A26DFF]' : 'bg-gray-600'
              }`}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentStep(index);
                  setIsAnimating(false);
                }, 500);
              }}
            />
          ))}
        </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full h-full">
            <div
              className={`absolute w-full transition-all duration-500 ${
                isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <div className="bg-check-bg bg-no-repeat bg-cover w-full h-[467px] rounded-3xl flex items-center justify-center">
                <div className="relative">
                  <div className="animate-float">
                    <div className="rounded-xl p-6 relative">
                      <Image
                        src={steps[currentStep].image}
                        width={500}
                        height={500}
                        alt={steps[currentStep].title}
                        className='w-[245px] h-[245px]'
                      />
                    </div>
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

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;