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
    <div className="relative overflow-hidden w-full flex flex-col items-center py-8 bg-[#09050E]">

      <div className="absolute top-[1100px] left-[700px] -translate-x-1/2 -translate-y-1/2 z-0">
        <Image
          src="/images/ellipse-1.png"
          alt="Glow Effect"
          width={500}
          height={500}
        />
      </div>

      {/* Main Section Content */}
      <section className="relative bg-dark-bg text-white rounded-3xl p-10 shadow-lg w-[85%] m-10  z-50">
        <h1 className="text-5xl font-bold font-manrope mb-3 text-center bg-gradient-to-r from-[#262429] via-[#9B6DFF] to-[#262429] bg-clip-text text-transparent">
          ZeroXBridge is here to <br />
          Redefine Cross-Chain liquidity
        </h1>

        <p className="text-xl text-gray-300 text-center whitespace-nowrap font-roboto-serif mb-20">
          With ZeroXBridge eliminating the vulnerabilities of traditional cross-chain solutions:
        </p>

        <div className="flex flex-row md:flex-row gap-8 py-5 px-10">
          <div className="flex flex-col gap-6 flex-1">
            <div className="relative bg-grid-pattern bg-cover bg-center rounded-2xl pb-5 px-5 shadow-custom-purple border border-transparent flex flex-col justify-center h-[300px] w-full">
              <div className="flex absolute top-2 left-96">
                <Image
                  src="/images/assets-transfer.png"
                  alt="No Asset Transfers"
                  width={124}
                  height={124}
                />
              </div>

              <div className="flex items-start gap-3.5 flex-col absolute mt-12">
                <h3 className={`${manrope.className} text-[16px] text-gray-400`}>
                  No Asset Transfers
                </h3>
                <p className={`${robotoSerif.className} text-gray-300 text-sm`}>
                  Traditional bridges require moving assets between chains,<br />
                  exposing them to security risks like hacks and exploits.<br />
                  ZeroXBridge eliminates this by keeping your collateral <br />securely
                  locked on Ethereum while unlocking liquidity <br /> on Starknet.
                </p>
              </div>
            </div>

            <div className="relative bg-grid-pattern bg-cover bg-center rounded-2xl pb-5 px-5 shadow-custom-purple border border-transparent flex flex-col justify-between h-[300px] w-full">
              <div className="flex absolute top-2 left-96">
                <Image
                  src="/images/centralized-icon.png"
                  alt="No Centralized Intermediaries"
                  width={124}
                  height={124}
                />
              </div>

              <div className="flex items-start gap-3.5 flex-col absolute mt-24">
                <h3 className={`${manrope.className} text-white-style text-[16px]`}>
                  No Centralized Intermediaries
                </h3>
                <p className={`${robotoSerif.className} text-gray-300 text-sm`}>
                  Centralized bridges introduce single points of failure and <br />
                  custodial risks. ZeroXBridge uses decentralized, trustless <br />
                  zk-STARK proofs to ensure security and transparency.
                </p>
              </div>
            </div>
          </div>

          <div className="relative bg-grid-pattern-2 bg-cover rounded-2xl px-4 shadow-custom-purple border border-transparent hover:border-gradient-purple transition-all duration-300 flex flex-col justify-center flex-1 h-[620px] w-[395px]">
            <div className="flex justify-center gap-4 mb-6">
              <Image
                src="/images/liquidity-chain.png"
                alt="Liquidity Chain"
                width={154}
                height={154}
              />
              <Image
                src="/images/liquidity-chart.png"
                alt="Liquidity Chart"
                width={124}
                height={124}
              />
            </div>

            <h3 className={`${manrope.className} text-white-style text-[16px] text-center mb-3`}>
              No Liquidity Fragmentation
            </h3>
            <p className={`${robotoSerif.className} text-gray-300 font-serif text-center text-sm`}>
              Traditional bridges fragment liquidity across<br /> multiple chains,
              reducing efficiency.<br /> ZeroXBridge maintains liquidity cohesion by<br />
              enabling cross-chain transactions without<br /> moving assets.<br /> You can
              make numerous transactions daily<br /> without worry of efficiency
              problems.
            </p>
          </div>
        </div>
      </section>

<JoinCommunity />
    </div>
  );
};

export default AboutUs;
