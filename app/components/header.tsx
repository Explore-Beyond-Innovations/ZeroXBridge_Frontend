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
        <div className="text-2xl font-[500] text-[#D4D4D4] font-manrope">
          {counts[index]}
          {stat.value.slice(-2)}
        </div>
        <div className="text-sm text-[#8B8B8B] font-roboto-serif">
          {stat.label}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#09050E]">
    <div className="flex flex-col gap-[10em] bg-[url(/hero-bg.png)]  bg-cover bg-no-repeat bg-center h-screen justify-center w-full">
      <div className="flex relative items-center">
        <div className="flex flex-col pl-[1em] justify-center h-full lg:pl-[7em] mt-[3em] gap-[1em]">
          <h1 className="lg:text-[48px] font-manrope xl:text-5xl text-2xl text-wrap w-[449px] lg:w-[679px] font-bold bg-gradient-to-r from-[#262429] via-[#9B6DFF] to-[#262429]  bg-clip-text text-transparent pb-[7px] ">
            Secure Cross-Chain Liquidity with Zero-Knowledge Proofs
          </h1>
          <div className="font-roboto-serif text-[17px] font-[400] relative mt-4">
            <p className="text-gray-400 z-20">
              Unlock liquidity on Starknet using Ethereum collateral—no asset
              transfers,
            </p>
            <p className="text-gray-400">
              no wrapping, no centralized bridges.
            </p>
          </div>
          <Link href="/dashboard">
          <button className="relative mt-[39px] w-[12.5em] overflow-hidden py-[15px] px-[54px] text-white bg-[#4C327A] rounded-full transition-all hover:bg-opacity-90 shadow-[0_4px_8px_rgba(194,151,255,0.25),0_-4px_4px_rgba(162,109,255,0.5)]">
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
      <div>
        <div className="flex flex-wrap justify-between items-start pt-12 w-[70%] xl:w-[40%] ml-[7rem] ">
          {STATS_DATA.map(renderStatItem)}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Header;
