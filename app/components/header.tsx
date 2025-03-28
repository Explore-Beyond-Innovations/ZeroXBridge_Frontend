"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import RightArrow from "@/public/right-arrow.svg";
import Link from "next/link";

interface StatItem {
  value: string;
  label: string;
  endValue: number;
}

const STATS_DATA: StatItem[] = [
  { value: "70M+", label: "Total Transactions", endValue: 70 },
  { value: "7K+", label: "Active Users", endValue: 7 },
  { value: "20M+", label: "Total earned", endValue: 20 },
  { value: "10M+", label: "Investments", endValue: 10 },
];

const NETWORK_NODES = [
  { top: "5.5%", left: "27%", translateX: "0", translateY: "0", delay: "0s" },
  { top: "6%", left: "67.4%", translateX: "0", translateY: "0", delay: "1.5s" },
  {
    top: "38.5%",
    left: "83.5%",
    translateX: "0",
    translateY: "-50%",
    delay: "0.7s",
  },
  {
    top: "71.5%",
    left: "89.5%",
    translateX: "0",
    translateY: "0",
    delay: "2.2s",
  },
  {
    top: "48%",
    left: "51%",
    translateX: "-50%",
    translateY: "0",
    delay: "1.2s",
  },
  {
    top: "85%",
    left: "20%",
    translateX: "0",
    translateY: "0",
    delay: "2.8s",
  },
  {
    top: "58%",
    left: "5%",
    translateX: "0",
    translateY: "-50%",
    delay: "0.4s",
  },
  {
    top: "47%",
    left: "10%",
    translateX: "0",
    translateY: "0",
    delay: "3.3s",
  },
  {
    top: "32%",
    left: "6.5%",
    translateX: "0",
    translateY: "0",
    delay: "1.8s",
  },
  { top: "67%", left: "46%", translateX: "0", translateY: "0", delay: "2.5s" },
  {
    top: "37.5%",
    left: "55.4%",
    translateX: "0",
    translateY: "0",
    delay: "0.9s",
  },
  { top: "52%", left: "77%", translateX: "0", translateY: "0", delay: "0.9s" },
  { top: "54%", left: "90%", translateX: "0", translateY: "0", delay: "3.1s" },
  {
    top: "92.7%",
    left: "70%",
    translateX: "0",
    translateY: "0",
    delay: "3.1s",
  },
  { top: "93%", left: "42%", translateX: "0", translateY: "0", delay: "3.1s" },
  {
    top: "87%",
    left: "30.5%",
    translateX: "0",
    translateY: "0",
    delay: "3.1s",
  },
  {
    top: "78.4%",
    left: "59.5%",
    translateX: "0",
    translateY: "0",
    delay: "3.1s",
  },
  {
    top: "66.5%",
    left: "28%",
    translateX: "0",
    translateY: "0",
    delay: "3.1s",
  },
];

const Header = () => {
  const [counts, setCounts] = useState<number[]>(STATS_DATA.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animationDuration = 2000;
    const steps = 60;
    const interval = animationDuration / steps;

    const animations = STATS_DATA.map((stat, index) => {
      let currentStep = 0;
      return setInterval(() => {
        if (currentStep === steps) {
          clearInterval(animations[index]);
          return;
        }

        setCounts((prevCounts) => {
          const newCounts = [...prevCounts];
          newCounts[index] = Math.min(
            Math.ceil((stat.endValue * currentStep) / steps),
            stat.endValue
          );
          return newCounts;
        });

        currentStep++;
      }, interval);
    });

    return () => animations.forEach((interval) => clearInterval(interval));
  }, [isVisible]);

  const renderStatItem = (stat: StatItem, index: number) => (
    <div key={index} className="flex gap-2 z-20 w-fit">
      <Image
        src={RightArrow}
        alt="Right Arrow"
        className="w-4 h-4 mt-2"
        priority={false}
      />
      <div className="flex flex-col space-y-2">
        <div className="text-xl lg:text-2xl font-[500] text-[#D4D4D4] font-manrope">
          {counts[index]}
          {stat.value.slice(-2)}
        </div>
        <div className="text-xs lg:text-sm text-[#8B8B8B] font-roboto-serif">
          {stat.label}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#09050E] h-fit pt-24">
      <div className="flex flex-col gap-10 md:gap-[10em] bg-[url(/hero-bg.png)] bg-cover bg-no-repeat bg-center min-h-screen justify-center w-full px-4 sm:px-6 lg:px-[4rem]">
        <div className="flex flex-col lg:flex-row justify-between relative items-center w-full">
          <div className="flex flex-col justify-center h-full gap-4 lg:gap-[1rem] w-full px-[1px] lg:w-[70%] text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] xl:text-[54px] font-manrope py-2 text-wrap w-full font-bold bg-gradient-to-r from-[#262429] via-[#9B6DFF] to-[#262429] bg-clip-text text-transparent leading-tight lg:leading-[4rem]">
              Secure Cross-Chain Liquidity with Zero-Knowledge Proofs
            </h1>
            <div className="font-roboto-serif text-sm md:text-base lg:text-[17px] 2xl:text-[24px] font-[400] relative mt-4 w-full max-w-sm mx-auto lg:mx-0">
              <p className="md:text-gray-400 text-white">
                Unlock liquidity on Starknet using Ethereum collateral—no asset
                transfers,
              </p>
              <p className="md:text-gray-400 text-white">no wrapping, no centralized bridges.</p>
            </div>
            <div className="flex justify-center lg:justify-start mt-6 lg:mt-[39px]">
              <Link href="/dashboard" className="w-full max-w-sm mx-auto lg:mx-0">
                <button className="relative w-full overflow-hidden py-[15px] px-[54px] text-white bg-[#4C327A] rounded-full transition-all hover:bg-opacity-90 shadow-[0_4px_8px_rgba(194,151,255,0.25),0_-4px_4px_rgba(162,109,255,0.5)]">
                  <span className="relative font-bold text-base font-manrope z-10">Launch App</span>
                  <span
                    aria-hidden
                    className="absolute inset-[-75px] animate-slowSpin rounded-lg bg-gradient-to-r from-[#A26DFFE5] via-[#e3e1e5d6] to-[#4C327A]"
                  />
                  <span className="absolute inset-[2px] bg-[#4C327A] rounded-full" />
                </button>
              </Link>
            </div>
          </div>


          <div className="mt-10 lg:mt-0 w-full lg:w-[520px] max-w-[520px] relative h-[300px] sm:h-[400px] lg:h-[457px]">
            {/* Spinning globe (inner element) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Image
                src="/globe-icon.svg"
                alt="Spinning Globe"
                width={500}
                height={500}
                className="w-[70%] sm:w-[85%] h-auto animate-spinSlow"
              />
            </div>

            {/* Static network overlay (outer element) */}
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src="/globe-grid.svg"
                alt="Network Overlay"
                width={500}
                height={500}
                className="w-full h-full animate-glowSlow"
              />
            </div>

            {/* Flashing nodes */}
            <div className="absolute inset-0 pointer-events-none">
              {NETWORK_NODES.map((node, index) => (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    top: node.top,
                    left: node.left,
                    transform: `translate(${node.translateX}, ${node.translateY})`,
                  }}
                >
                  <div
                    className="w-2 h-2 bg-gradient-to-b from-[#FFFFFF] to-[#A26DFF] rounded-full shadow-glow"
                    style={{
                      animation: `pulse 3s infinite ${node.delay}`,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10  lg:mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 pl-10 md:pl-0 gap-4 sm:gap-6 justify-center items-center w-full lg:w-[70%] xl:w-[60%] mx-auto lg:ml-[4rem]">
            {STATS_DATA.map(renderStatItem)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
