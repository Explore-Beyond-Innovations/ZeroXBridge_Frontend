'use client';
import React, { useEffect, useRef } from "react";
import HomeNav2 from "../components/HomeNav2";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../components/ui/button";
import Footer from "../components/footer";
import FAQ from "../components/FAQ";
import AboutUs from "../components/about";
import HowItWorks from "../components/how-it-works";

const Home = () => {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navbar = navRef.current;

    window.onscroll = () => {
      if (!navbar) return;

      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollTop > 0) {
        navbar.classList.remove("-translate-y-full");
        navbar.classList.add("translate-y-0");
      } else {
        navbar.classList.add("-translate-y-full");
        navbar.classList.remove("translate-y-0");
      }
    };

    // Trigger it once on load
    window.dispatchEvent(new Event('scroll'));

    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <div className="h-full bg-black flex flex-col items-center w-full overflow-x-hidden py-8">
        <div className="w-[95%] mx-auto">
        <HomeNav2 />
        </div>
      {/* Sticky Navbar */}
      <div
        ref={navRef}
        id="navbar"
        className="fixed top-0 left-0 w-full z-50 transform -translate-y-full transition-transform duration-75 ease-in-out"
      >
        <div className="w-[95%] mx-auto flex items-center lg:py-4 h-fit lg:backdrop-blur-md border-[#C29EFF1A] border-b border-l border-r rounded-xl">
          <HomeNav2 />
        </div>
      </div>

      {/* Page Content */}
      <div className="flex flex-col justify-center items-center h-full gap-4 w-full text-center mt-[4rem] lg:mt-[6rem] px-6">
        <h1 className="max-w-[85%] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] xl:text-[62px] 4k:text-[78px] font-manrope py-2 text-wrap text-center w-full font-bold bg-gradient-to-r from-[#262429] via-[#9B6DFF] to-[#262429] bg-clip-text text-transparent leading-tight lg:leading-[4rem] 4k:leading-[6rem]">
          Secure Cross-Chain Liquidity with Zero-Knowledge Proofs
        </h1>

        <div className="font-roboto-serif text-sm md:text-base lg:text-[17px] 2xl:text-[24px] 4k:text-[32px] font-[400] mt-4 w-full max-w-sm mac-14:max-w-full 4k:max-w-full mx-auto flex flex-col gap-4">
          <p className="md:text-gray-400 text-white">
            Unlock liquidity on Starknet using Ethereum collateral—no asset transfers,
          </p>
          <p className="md:text-gray-400 text-white">
            no wrapping, no centralized bridges.
          </p>
        </div>

        <div className="flex justify-center mt-4 relative w-full h-full mb-[600px]">
          <Link href="/dashboard" className="cursor-pointer z-30">
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
              className="w-full h-full rounded-lg"
            />
          </div>

          <div className="bg-[url('/images/dashboard.png')] bg-cover bg-no-repeat border border-[#C29EFF1A] rounded-lg shadow-lg absolute top-6 z-20 w-[787px] h-[487px] left-4 overflow-x-hidden lg:hidden flex"></div>
        </div>
      </div>
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-0 max-w-[1600px] mx-auto">
      <HowItWorks />
        <AboutUs />
        <FAQ />
        </div>
        <Footer />
    </div>
  );
};

export default Home;
