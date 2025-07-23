"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

const cardData = [
  {
    title: "Instant Liquidity Unlock",
    description:
      "Users lock ETH or other supported tokens on Ethereum and receive xZB on Starknet",
    image: "/safe.png",
    containerstyling: "sm:w-[402px] 2xl:w-[804px] 2xl:h-[928px]  w-full h-[481px] p-[2px]",
    styling: "w-full h-full",
    imagestyle:
      "w-auto h-auto bg-cover mt-[150px] ml-[80px] 2xl:mt-[320px] 2xl:ml-[150px] scale-[1.9] group-hover:mt-[140px] 2xl:group-hover:mt-[300px]",
  },
  {
    title: "ZK-Based Security",
    description:
      "Zero-knowledge proofs ensure the user’s L1 collateral is verified without revealing private data or bridging assets, enabling secure minting of xZB.",
    image: "/shield.png",
    containerstyling: "sm:w-[402px] 2xl:w-[804px] 2xl:h-[928px]  w-full h-[481px] p-[2px]",
    styling: "w-full h-full",
    imagestyle:
      "w-auto h-auto bg-cover mt-[130px] 2xl:mt-[320px] -ml-[20px] scale-[2.1] group-hover:mt-[120px] 2xl:group-hover:mt-[300px]",
  },
  {
    title: "Native xZB Token",
    description:
      "xZB is a non-wrapped, USD-pegged stable token issued on Starknet. It’s backed 1:1 by locked collateral on Ethereum L1 and is instantly usable across DeFi applications for lending, trading, and staking.",
    image: "/token.png",
    containerstyling: "sm:w-[402px] 2xl:w-[804px] 2xl:h-[928px]  w-full lg:h-[765px] h-[481px] p-[2px]",
    styling:
      "w-[100%] h-full overflow-none bg-[#161616] rounded-[16px] py-[30px]",
    imagestyle:
      "w-auto h-auto bg-cover mt-[90px] ml-[60px] scale-[1.9] group-hover:mt-[70px]",
  },
  {
    title: "Trustless Architecture",
    description:
      "Powered by ZK-proofs, ZeroXBridge eliminates the need for multisigs, validators, or custodians, removing human risk and ensuring user-owned security.",
    image: "/castle.png",
    containerstyling:
      "lg:w-[825px] lg:h-[274px] lg:absolute 2xl:relative lg:bottom-0 lg:left-0 sm:w-[402px] 2xl:w-[804px] 2xl:h-[928px]  w-full h-[481px] p-[2px] flex flex-col lg:flex-row 2xl:flex-col items-center justify-center",
    styling:
      "w-full h-full flex flex-col lg:flex-row 2xl:flex-col gap-4 bg-[#161616] rounded-[16px] py-[30px] ",
    imagestyle:
      "w-auto h-auto bg-cover mt-[125px] 2xl:mt-[240px] 2xl:ml-[80px] lg:mt-[55px] ml-[10px] lg:ml-[170px] scale-[1.8] 2xl:scale-[2.1] group-hover:mt-[85px] lg:group-hover:mt-[45px] 2xl:group-hover:mt-[220px] lg:group-hover:ml-[160px] 2xl:group-hover:ml-[70px] group-hover:ml-[20px]",
  },
  
];

function AnimatedCard({ card }: { card: typeof cardData[number] }) {
  const controls = useAnimation();

  return (
    <motion.div
      className={`${card.containerstyling} flex flex-col items-center justify-center  bg-none hover:bg-[url("/border.svg")] bg-cover bg-no-repeat rounded-[16px] overflow-none `}
      onHoverStart={() => {
        controls.start({
          scale: 1.05,
          transition: {
            type: "spring",
            stiffness: 1000,
            damping: 5,
          },
        });
      }}
      onHoverEnd={() => {
        controls.start({
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 500,
            damping: 15,
          },
        });
      }}
    >
      <div
        className={`${card.styling} bg-[#161616] rounded-[16px] 2xl:rounded-[24px] py-[30px] overflow-hidden group grayscale  brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-300 ease-in-out`}
      >
        <div className={`mx-[40px] flex flex-col gap-2 2xl:gap-[23.16px] 2xl:max-w-[75%] text-[#9E9E9E] group-hover:text-white transition-colors duration-300 ${card.title == "Trustless Architecture" ? " lg:w-[407px] 2xl:w-full" : ""}`}>
          <h2 className="text-[19.78px] 2xl:text-[24px] font-[400] ">
            {card.title}
          </h2>
          <p className="text-[12px] lg:text-[14px] 2xl:text-[16px] font-[300] ">
            {card.description}
          </p>
        </div>
        <motion.div className="w-full h-full" animate={controls}>
          <Image
            src={card.image}
            alt="card"
            width={1000}
            height={1000}
            priority
            quality={100} 
            className={`${card.imagestyle} bg-cover transition-all duration-300 ease-linear `}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

const InsideZeroX = () => {
  return (
    <div className="w-full px-2 2xl:px-[40px] h-fit py-4 flex flex-col gap-4 items-center mx-auto">
        <h2 className="font-mono font-[500] text-[14px] text-[#A6A6A7] self-start px-2 uppercase">Inside ZeroXBridge</h2>
      <div className="flex flex-col  lg:flex-row lg:flex-wrap 2xl:flex-row h-full gap-[16px] 2xl:gap-[24px] w-full  relative">
        {cardData.map((card, idx) => (
          <AnimatedCard key={idx} card={card} />
        ))}
      </div>
    </div>
  );
};

export default InsideZeroX;
