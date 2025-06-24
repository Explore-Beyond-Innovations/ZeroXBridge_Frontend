"use client";

import React from "react";
import Image from "next/image";
import { Manrope, Roboto_Serif } from "next/font/google";
import JoinCommunity from "./join-community";

const manrope = Manrope({
  weight: ["700"],
  subsets: ["latin"],
});

const robotoSerif = Roboto_Serif({
  weight: ["300"],
  subsets: ["latin"],
});

const AboutUs = () => {
  return (
    <div className="relative  w-full flex flex-col items-center py-4 md:py-8 bg-[#09050E] ">
      {/* Eclipse Background */}
      <div className="absolute  left-[-10px] top-[-280px] w-full z-[-90px] flex justify-center sm:hidden">
        <Image
          src="/images/ellipse.png"
          alt="Background Glow"
          width={700}
          height={20}
          className="block  opacity-50"
        />
      </div>

      {/* Main Section Content */}
      <section className="relative bg-dark-bg text-white rounded-3xl p-4 md:p-10 shadow-lg w-[95%] md:w-[85%] m-4 md:m-10 z-10">
        {/* Title */}
        <h1 className="relative text-2xl md:text-5xl font-bold font-manrope mt-2 mb-3 text-center bg-gradient-to-r from-[#262429] via-[#9B6DFF] to-[#262429] bg-clip-text text-transparent z-20">
          ZeroXBridge is here to <br />
          Redefine Cross-Chain Liquidity
        </h1>

        <p className="text-base md:text-xl text-gray-300 text-center sm:whitespace-nowrap font-roboto-serif mb-10 md:mb-20">
          With ZeroXBridge eliminating the vulnerabilities of traditional cross-chain solutions:
        </p>

        <div className="flex flex-row md:flex-row gap-8 md:gap-8 py-2 md:py-5 px-2 md:px-10">

          {/* No Centralized Intermediaries */}
          {/* Security is based on cryptographic truth, not human trust or off-chain infrastructure. */}

          <div className="flex flex-col  gap-8 md:gap-6 md:flex-1">
            <div className="relative bg-grid-pattern bg-cover bg-center rounded-2xl p-4 md:pb-5 md:px-5 shadow-[0px_0px_4px_2px_#A26DFF26] sm:shadow-custom-purple border border-transparent flex flex-col justify-center h-[413px] md:h-[300px] w-full">
              <div className="flex justify-center md:absolute md:top-2 md:right-4 lg:right-8 mb-4 md:mb-0">
                <Image
                  src="/images/centralized-icon.png"
                  alt="No Centralized Intermediaries"
                  width={124}
                  height={124}
                  className="w-24 h-24 md:w-32 md:h-32"
                />
              </div>

              <div className="flex items-center md:items-start gap-3.5 flex-col text-center md:text-left md:absolute md:mt-24">
                <h3 className={`${manrope.className} text-white-style text-base md:text-[16px]`}>
                  No Centralized Intermediaries
                </h3>
                <p className={`${robotoSerif.className} text-[#fff] text-sm md:text-sm`}>
                  Traditional bridges rely on multisig validators or trusted relayers to verify deposits and approve withdrawals, creating centralized trust assumptions.
                  ZeroXBridge eliminates this risk by using zk-STARK proofs users submit verifiable proofs to unlock assets trustlessly.
                </p>
              </div>
            </div>

            {/* Immutable, Verifiable Cross-Chain State */}
            <div className="relative bg-grid-pattern bg-cover bg-center rounded-2xl p-4 md:pb-5 md:px-5 shadow-[0px_0px_4px_2px_#A26DFF26] sm:shadow-custom-purple border border-transparent flex flex-col justify-center h-[413px] md:h-[300px] w-full">

              <div className="flex justify-center md:absolute md:top-2 md:right-4 lg:right-8 mb-4 md:mb-0">
                <Image
                  src="/images/liquidity-chain.png"
                  alt="Liquidity Chain"
                  width={124}
                  height={124}
                  className="w-24 h-24 md:w-32 md:h-32"
                />
              </div>
              <div className="flex items-center md:items-start gap-3.5 flex-col text-center md:text-left md:absolute md:mt-24">
                <h3 className={`${manrope.className} text-base md:text-[16px] text-gray-400`}>
                  Immutable, Verifiable Cross-Chain State
                </h3>
                <p className={`${robotoSerif.className} text-[#fff] text-sm md:text-sm`}>
                  Traditional bridges rely on off-chain message-passing and validator consensus to relay state changes across chains, making them vulnerable to spoofed transactions and replay attacks.
                  ZeroXBridge replaces this with zk-STARK proofs, ensuring that only genuine state changes on the source chain can trigger asset movement on the destination chain.
                </p>
              </div>
            </div>
          </div>

          {/* No Liquidity Fragmentation */}
          {/* <div className="relative bg-grid-pattern-2 bg-cover rounded-2xl p-4 md:px-4 shadow-[0px_0px_4px_2px_#A26DFF26] sm:shadow-custom-purple border border-transparent hover:border-gradient-purple transition-all duration-300 flex flex-col justify-center md:flex-1 h-[413px] md:h-[620px] w-full">
            <div className="flex justify-center gap-4 mb-4 md:mb-6">
              <Image
                src="/images/assets-transfer.png"
                alt="Immutable, Verifiable Cross-Chain State"
                width={124}
                height={124}
                className="w-24 h-24 md:w-40 md:h-40"
              />
              <Image
                src="/images/liquidity-chart.png"
                alt="Liquidity Chart"
                width={124}
                height={124}
                className="w-20 h-20 md:w-32 md:h-32"
              />
            </div>

            <h3 className={`${manrope.className} text-white-style text-base md:text-[16px] text-center mb-2 md:mb-3`}>
              No Liquidity Fragmentation
            </h3>
            <p className={`${robotoSerif.className} text-[#fff] font-serif text-center text-sm md:text-sm`}>
              Traditional bridges fragment liquidity across multiple chains,
              reducing efficiency. ZeroXBridge maintains liquidity cohesion by
              enabling cross-chain transactions without moving assets. You can
              make numerous transactions daily without worry of efficiency problems.
            </p>
          </div> */}

        </div>
      </section >

      <JoinCommunity />
    </div >
  );
};

export default AboutUs;
