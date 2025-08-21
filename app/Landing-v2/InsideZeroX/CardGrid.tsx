"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const cardData = [
  {
    title: "Instant Liquidity Unlock",
    description:
      "Users lock ETH or other supported tokens on Ethereum and receive xZB on Starknet",
    image: "/safe.png",
    containerstyling:
      "w-full sm:w-[calc(25%-12px)] md:w-[calc(25%-16px)] lg:w-[calc(25%-20px)] xl:w-[calc(25%-24px)] 2xl:w-[calc(25%-30px)] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px] p-[2px]",
    styling: "w-full h-full",
    imagestyle:
      "w-auto h-auto bg-cover mt-[80px] ml-[40px] 2xl:mt-[200px] 2xl:ml-[80px] scale-[1.5] group-hover:mt-[70px] 2xl:group-hover:mt-[180px]",
  },
  {
    title: "ZK-Based Security",
    description:
      "Zero-knowledge proofs ensure the user's L1 collateral is verified without revealing private data or bridging assets, enabling secure minting of xZB.",
    image: "/shield.png",
    containerstyling:
      "w-full sm:w-[calc(25%-12px)] md:w-[calc(25%-16px)] lg:w-[calc(25%-20px)] xl:w-[calc(25%-24px)] 2xl:w-[calc(25%-30px)] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px] p-[2px]",
    styling: "w-full h-full",
    imagestyle:
      "w-auto h-auto bg-cover mt-[70px] 2xl:mt-[200px] -ml-[10px] scale-[1.6] group-hover:mt-[60px] 2xl:group-hover:mt-[180px]",
  },
  {
    title: "Native xZB Token",
    description:
      "xZB is a non-wrapped, USD-pegged stable token issued on Starknet. It's backed 1:1 by locked collateral on Ethereum L1 and is instantly usable across DeFi applications for lending, trading, and staking.",
    image: "/token.png",
    containerstyling:
      "w-full sm:w-[calc(25%-12px)] md:w-[calc(25%-16px)] lg:w-[calc(25%-20px)] xl:w-[calc(25%-24px)] 2xl:w-[calc(25%-30px)] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px] p-[2px]",
    styling:
      "w-full h-full overflow-none bg-[#161616] rounded-[16px] py-[30px]",
    imagestyle:
      "w-auto h-auto bg-cover mt-[50px] ml-[30px] scale-[1.5] group-hover:mt-[40px]",
  },
  {
    title: "Trustless Architecture",
    description:
      "Powered by ZK-proofs, ZeroXBridge eliminates the need for multisigs, validators, or custodians, removing human risk and ensuring user-owned security.",
    image: "/castle.png",
    containerstyling:
      "w-full sm:w-[calc(25%-12px)] md:w-[calc(25%-16px)] lg:w-[calc(25%-20px)] xl:w-[calc(25%-24px)] 2xl:w-[calc(25%-30px)] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px] p-[2px] flex flex-col lg:flex-row 2xl:flex-col items-center justify-center",
    styling:
      "w-full h-full flex flex-col lg:flex-row 2xl:flex-col gap-4 bg-[#161616] rounded-[16px] py-[30px] ",
    imagestyle:
      "w-auto h-auto bg-cover mt-[60px] 2xl:mt-[150px] 2xl:ml-[40px] lg:mt-[30px] ml-[5px] lg:ml-[80px] scale-[1.4] 2xl:scale-[1.6] group-hover:mt-[50px] lg:group-hover:mt-[25px] 2xl:group-hover:mt-[130px] lg:group-hover:ml-[70px] 2xl:group-hover:ml-[35px] group-hover:ml-[10px]",
  },
];

// Helper function to get active image styles for mobile
const getActiveImageStyle = (title: string) => {
  switch (title) {
    case "Instant Liquidity Unlock":
      return "!mt-[140px] 2xl:!mt-[300px]";
    case "ZK-Based Security":
      return "!mt-[120px] 2xl:!mt-[300px]";
    case "Native xZB Token":
      return "!mt-[70px]";
    case "Trustless Architecture":
      return "!mt-[85px] lg:!mt-[45px] 2xl:!mt-[220px] lg:!ml-[160px] 2xl:!ml-[70px] !ml-[20px]";
    default:
      return "";
  }
};

function AnimatedCard({
  card,
  index,
}: {
  card: (typeof cardData)[number];
  index: number;
}) {
  const controls = useAnimation();
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
    rootMargin: "-5px 10px",
  });

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Trigger animation when in view (for mobile/scroll)
  useEffect(() => {
    if (inView) {
      // On mobile, activate hover effects when in view
      if (isMobile) {
        setIsActive(true);
      }
      controls.start({
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 1000,
          damping: 15,
          delay: index * 0.15,
        },
      });
    } else {
      if (isMobile) {
        setIsActive(false);
      }
      controls.start({
        scale: 0.95,
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
        },
      });
    }
  }, [inView, controls, index, isMobile]);

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.9, opacity: 0, y: 50 }}
      animate={controls}
      className={`${
        card.containerstyling
      } flex flex-col items-center bg-center justify-center  rounded-[16px] 2xl:rounded-[24px] overflow-none ${
        isActive ? 'bg-[url("/border.svg")]' : "bg-none"
      } hover:bg-[url("/border.svg")]`}
      onHoverStart={() => {
        controls.start({
          scale: 1.05,
          transition: {
            type: "spring",
            stiffness: 1000,
            damping: 15,
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
        className={`${
          card.styling
        } bg-[#161616] rounded-[16px] 2xl:rounded-[24px] py-[30px] overflow-hidden group transition-all duration-300 ease-in-out ${
          isActive ? "grayscale-0 brightness-100" : "grayscale brightness-[80%]"
        } hover:grayscale-0 hover:brightness-100`}
      >
        <div
          className={`mx-[40px] flex flex-col gap-2 2xl:gap-[23.16px] 2xl:max-w-[75%] transition-colors duration-300 ${
            isActive ? "text-white" : "text-[#9E9E9E]"
          } group-hover:text-white ${
            card.title == "Trustless Architecture"
              ? " lg:w-[407px] 2xl:w-full"
              : ""
          }`}
        >
          <h2 className="text-[22px] 2xl:text-[24px] font-[400] ">
            {card.title}
          </h2>
          <p className="text-[14px] 2xl:text-[16px] font-[300] ">
            {card.description}
          </p>
        </div>
        <motion.div
          className={`w-full h-full relative opacity-40 group-hover:opacity-100 ${
            isActive && "opacity-100"
          }`}
          animate={controls}
        >
          <Image
            src={card.image}
            alt="card"
            width={1000}
            height={1000}
            priority
            quality={100}
            className={`${
              card.imagestyle
            }   bg-cover transition-all duration-300 ease-linear ${
              isActive ? getActiveImageStyle(card.title) : ""
            }`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

const InsideZeroX = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[40px] max-w-[3359px] py-4 my-[3rem] md:my-0 flex flex-col gap-4 items-center mx-auto">
      <h2 className="font-mono font-[500] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] 2xl:text-[32px] 2xl:mb-8 text-[#A6A6A7] self-start px-2 uppercase">
        Inside ZeroXBridge
      </h2>
      <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-row lg:flex-wrap xl:flex-row xl:flex-wrap 2xl:flex-row 2xl:flex-wrap h-full gap-4 sm:gap-6 lg:gap-8 xl:gap-12 2xl:gap-[24px] w-full relative">
        {cardData.map((card, idx) => (
          <AnimatedCard key={idx} card={card} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default InsideZeroX;
