import React from "react";
import HomeNav2 from "../components/HomeNav2";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../components/ui/button";

const Home = () => {
  return (
    <div className=" h-full bg-[#000000] flex flex-col items-center w-full overflow-x-hidden py-8">
      <div className="w-full flex items-center top-0 lg:py-4 h-fit lg:backdrop-blur-md fixed z-50"><HomeNav2 /></div>
      <div className="flex flex-col justify-center items-center h-full gap-4  w-full  text-center mt-[4rem] lg:mt-[12rem] px-6">
      
        <h1 className="max-w-[85%] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] xl:text-[62px] 4k:text-[78px] font-manrope py-2 text-wrap text-center w-full font-bold bg-gradient-to-r from-[#262429] via-[#9B6DFF] to-[#262429] bg-clip-text text-transparent leading-tight lg:leading-[4rem] 4k:leading-[6rem]">
          Secure Cross-Chain Liquidity with Zero-Knowledge Proofs
        </h1>
        <div className="font-roboto-serif text-sm md:text-base lg:text-[17px] 2xl:text-[24px] 4k:text-[32px] font-[400] relative mt-4 w-full max-w-sm mac-14:max-w-full 4k:max-w-full mx-auto lg:mx-0 flex flex-col gap-4">
          <p className="md:text-gray-400 text-white">
            Unlock liquidity on Starknet using Ethereum collateral—no asset
            transfers,
          </p>
          <p className="md:text-gray-400 text-white">
            no wrapping, no centralized bridges.
          </p>
        </div>
        <div className="flex justify-center mt-4 relative w-full h-full">
          <Link href="/dashboard" className=" cursor-pointer z-30">
            <Button variant="gradientPrimary" size="default">
              Launch App
            </Button>
          </Link>
          <div className="border border-[#C29EFF1A] rounded-lg shadow-lg absolute top-6 z-20 w-[1440px] h-auto left-4 lg:left-auto overflow-x-hidden lg:w-[85%] mx-auto hidden lg:flex">
            <Image
              src="/images/dashboard.png"
              alt="app dashboard"
              width={1980}
              height={787}
              className="w-full h-full rounded-lg "
            />
          </div>
          <div className="bg-[url('/images/dashboard.png')] bg-cover bg-no-repeat border border-[#C29EFF1A] rounded-lg shadow-lg absolute top-6 z-20 w-[787px] h-[487px] left-4 overflow-x-hidden lg:hidden flex"></div>
        </div>
      </div>
    </div>
  );
};
export default Home;
