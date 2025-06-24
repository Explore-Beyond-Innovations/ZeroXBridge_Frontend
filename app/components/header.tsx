/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import RightArrow from "@/public/right-arrow.svg";
// import Link from "next/link";
import { Button } from "./ui/button";

interface StatItem {
  value: string;
  label: string;
  endValue: number;
}

const STATS_DATA: StatItem[] = [
  // { value: "70M+", label: "Total Transactions", endValue: 70 },
  // { value: "7K+", label: "Active Users", endValue: 7 },
  // { value: "20M+", label: "Total earned", endValue: 20 },
  // { value: "10M+", label: "Investments", endValue: 10 },
];

const NETWORK_NODES = [
  { top: "5.7%", left: "26%", translateX: "0", translateY: "0", delay: "0s" },
  { top: "6%", left: "67.7%", translateX: "0", translateY: "0", delay: "1.5s" },
  {
    top: "38.5%",
    left: "83.5%",
    translateX: "0",
    translateY: "-50%",
    delay: "0.7s",
  },
  {
    top: "71.5%",
    left: "90.9%",
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
    left: "19%",
    translateX: "0",
    translateY: "0",
    delay: "2.8s",
  },
  {
    top: "58%",
    left: "4%",
    translateX: "0",
    translateY: "-50%",
    delay: "0.4s",
  },
  {
    top: "47%",
    left: "9%",
    translateX: "0",
    translateY: "0",
    delay: "3.3s",
  },
  {
    top: "32%",
    left: "5%",
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
  const [is4K, setIs4K] = useState(false);
  const [counts, setCounts] = useState<number[]>(STATS_DATA.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if screen is 4K or higher
    const check4K = () => {
      setIs4K(window.innerWidth >= 3000);
    };

    check4K();
    window.addEventListener("resize", check4K);
    return () => window.removeEventListener("resize", check4K);
  }, []);

  // Then in your node mapping:
  // Add a small adjustment to positions for 4K screens
  const getNodePosition = (node: any) => {
    if (is4K) {
      // Adjust position for 4K screens - fine-tune these values
      return {
        top: `calc(${node.top} + 0.4%)`,
        left: `calc(${node.left} - 2.2%)`,
      };
    }
    return { top: node.top, left: node.left };
  };

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
    <div key={index} className="flex gap-2 w-full items-center">
      <Image
        src={RightArrow}
        alt="Right Arrow"
        className="w-4 h-4 mt-2"
        priority={false}
      />
      <div className="flex flex-col space-y-2">
        <div className="text-xl lg:text-[32px] 4k-large:text-[48px] font-[500] text-[#D4D4D4] font-manrope">
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
    <div className="w-full bg-[#09050E] lg:min-h-screen overflow-x-hidden relative pt-[8rem] 4k-large:pt-[12rem] 4k-large:w-[85%] mx-auto px-[3.5rem]">
      <div className="flex flex-col gap-10 md:gap-[10em] bg-[url(/hero-bg.png)] bg-cover bg-no-repeat bg-center min-h-[calc(100vh-8rem)] justify-center w-full px-4 sm:px-6 lg:px-[4rem]">
        <div className="flex flex-col lg:flex-row justify-between relative items-center w-full h-full">
          <div className="flex flex-col justify-center h-full gap-4 lg:gap-[1rem] w-full px-[1px] lg:w-[70%] text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] xl:text-[54px] 4k:text-[78px] font-manrope py-2 text-wrap w-full font-bold bg-gradient-to-r from-[#262429] via-[#9B6DFF] to-[#262429] bg-clip-text text-transparent leading-tight lg:leading-[4rem] 4k:leading-[6rem]">
              Secure Cross-Chain Liquidity with Zero-Knowledge Proofs
            </h1>
            <div className="font-roboto-serif text-sm md:text-base lg:text-[17px] 2xl:text-[24px] 4k:text-[32px] font-[400] relative mt-4 w-full max-w-sm mac-14:max-w-full 4k:max-w-full mx-auto lg:mx-0 flex flex-col gap-4">
              <p className="md:text-gray-400 text-white">
                Unlock liquidity on Starknet using ZK,
              </p>
              <p className="md:text-gray-400 text-white">
                no wrapping, no centralized bridges.
              </p>
            </div>
            <div className="flex justify-center lg:justify-start mt-6 lg:mt-[39px]">
              {/* <Link href="/dashboard" className=" cursor-pointer"> */}
              <Button variant="gradientPrimary" size="default" disabled={true}>
                Coming Soon
              </Button>
              {/* </Link> */}
            </div>
          </div>

          <div className="mt-10 lg:mt-0 w-full lg:w-[520px] max-w-[520px] 4k:max-w-full 4k:w-[720px] 4k-large:scale-110 relative h-[290px] sm:h-[400px] lg:h-[457px] 4k:h-[720px] ">
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
              {NETWORK_NODES.map((node, index) => {
                const position = getNodePosition(node);
                return (
                  <div
                    key={index}
                    className={``}
                    style={{
                      position: "absolute",
                      top: position.top,
                      left: position.left,
                      transform: `translate(${node.translateX}, ${node.translateY})`,
                    }}
                  >
                    <div
                      className="w-2 h-2 4k-large:w-4 4k-large:h-4 bg-gradient-to-b from-[#FFFFFF] to-[#A26DFF] rounded-full shadow-glow"
                      style={{
                        animation: `pulse 3s infinite ${node.delay}`,
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-10  lg:-mt-0 4k-large:mt-[2rem] w-full flex items-center">
          <div className="w-full flex items-center justify-center gap-4 lg:ml-[12%]">
            {STATS_DATA.map(renderStatItem)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
