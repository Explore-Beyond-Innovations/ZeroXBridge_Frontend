"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const features = [
  {
    title: "Seamless Wallet Integrations",
    description:
      "xZB will soon be natively accessible through popular Starknet wallets allowing users to instantly connect, hold, and deploy their xZB in DeFi — without extra setup or manual imports.",
    image: "/wallet.svg",
  },
  {
    title: "Staking + APY for Liquidity Providers",
    description:
      "ZeroXBridge will enable users to earn passive yield by staking or locking assets, rewarding participation and driving deeper liquidity in the ecosystem.",
    image: "/staking.png",
  },
  {
    title: "Governance DAO & Token Whitelist Voting",
    description:
      "ZeroXBridge will enable the community to vote on which assets get whitelisted and help shape key protocol decisions — ensuring decentralization, transparency, and user-driven evolution.",
    image: "/voting.png",
  },
  {
    title: "Account Abstraction Support",
    description:
      "xZB will soon be natively accessible through popular Starknet wallets allowing users to instantly connect, hold, and deploy their xZB in DeFi — without extra setup or manual imports.",
    image: "/abstraction.svg",
  },
  {
    title: "Paymaster Integration",
    description:
      "ZeroXBridge will let users interact with the app without needing ETH for gas, removing friction and simplifying onboarding for new Starknet users.",
    image: "/paymaster.png",
  },
];


const FeatureCard = ({ feature }: { feature: typeof features[number] }) => {
  const controls = useAnimation();
  const bgControls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Detect screen size
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateScreenSize = () => setIsLargeScreen(mediaQuery.matches);
    updateScreenSize();
    mediaQuery.addEventListener("change", updateScreenSize);
    return () => mediaQuery.removeEventListener("change", updateScreenSize);
  }, []);


  useEffect(() => {
    if (!isLargeScreen) return;

    const node = containerRef.current;
    const onEnter = () => {
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 800,
          damping: 20,
        },
      });
      bgControls.start({
        backgroundColor: "#0E0E0E",
        transition: {
          duration: 0.6,
          ease: [0.25, 1, 0.5, 1], // Ease-out flow
        },
      });
    };
    const onLeave = () => {
      controls.start({
        y: -100,
        opacity: 0,
        transition: {
          type: "spring",
          stiffness: 800,
          damping: 40,
        },
      });
      bgControls.start({
        backgroundColor: "transparent",
        transition: {
          duration: 0.2,
          ease: [0.25, 1, 0.5, 1],
        },
      });
    };

    if (node) {
      node.addEventListener("mouseenter", onEnter);
      node.addEventListener("mouseleave", onLeave);
    }

    return () => {
      if (node) {
        node.removeEventListener("mouseenter", onEnter);
        node.removeEventListener("mouseleave", onLeave);
      }
    };
  }, [controls, bgControls, isLargeScreen]);

  return (
    <motion.div
      ref={containerRef}
      animate={bgControls}
      className="flex flex-row gap-4 justify-between items-start border-b border-[#131314] text-[#B2B2B2] pb-[40px] px-1 text-start relative group"
    >
      <div className="flex flex-col lg:flex-row w-full items-center justify-between gap-4 lg:px-[30px] lg:py-2">
        <p className="w-full md:w-[400px] font-[400] text-[20px] 2xl:w-[800px] 2xl:text-[37px] tracking-[-2px] ">
          {feature.title}
        </p>
        <p className="w-full lg:max-w-[50%] 2xl:w-[1200px] font-[300] text-[14px] md:text-[16px] 2xl:text-[24px]">
          {feature.description}
        </p>
      </div>

      <motion.div
        initial={{ y: isLargeScreen ? -100 : 0, opacity: isLargeScreen ? 0 : 1 }}
        animate={controls}
        className="bg-[#131313] h-[60px] w-[60px] lg:w-[165.17px] lg:h-[165.17px] rounded-[5.2px] flex lg:hidden  lg:group-hover:flex lg:absolute lg:left-[33%] lg:-top-[20%] lg:rotate-2"
      >
        <Image
          src={feature.image || "/abstraction.svg"}
          alt="card"
          width={1000}
          height={1000}
          priority
          quality={100}
          className="w-full h-full bg-cover transition-all duration-300 ease-linear"
        />
      </motion.div>
    </motion.div>
  );
};

const FeaturesList = () => {
  return (
    <div className="w-full px-2 2xl:w-full h-fit py-4 flex flex-col gap-6 2xl:gap-12 items-center mx-auto my-[10rem]">
      <h2 className="font-mono font-[500] text-[14px] 2xl:text-[32px] text-[#A6A6A7] self-start px-2 uppercase lg:pl-[40px] ">
        Inside ZeroXBridge{" "}
        <span className="bg-[url('/border.svg')] bg-cover bg-no-repeat rounded-full px-0.5 py-1 inline-block">
          <span className="uppercase bg-[#131314] w-full h-full rounded-full px-[6.5px] py-[4.5px] ">
            Coming Soon
          </span>
        </span>
      </h2>

      <div className="flex flex-col h-full gap-[16px] 2xl:gap-[24px] w-full px-4 2xl:px-0 relative">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} feature={feature} />
        ))}
      </div>
    </div>
  );
};

export default FeaturesList;
