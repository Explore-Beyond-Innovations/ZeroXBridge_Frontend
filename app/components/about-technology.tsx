import Image from "next/image";
import pointer from "../../public/up-pointer.png"
import pointerdown from "../../public/down-pointer.png"
import pointerdownDesktop from "../../public/down-pointer-desktop.png"
import blur3 from "@/public/outerBlur.svg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItemProps {
  title: string;
  description: string;
  content: string[];
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ title, description, content, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="relative">
      <div className="border-b border-transparent lg:hidden" style={{
        background: 'linear-gradient(to right, #09050E, #A26DFF, #09050E)',
        height: '2px',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
      }}>
      </div>
      <button
        onClick={content.length > 0 ? onClick : undefined}
        className="w-full flex items-center justify-between text-left py-4 lg:hidden"
      >
        <span className={`text-sm ${isOpen ? 'text-[#A26DFF]' : 'text-white/80'}`}>
          {title}
        </span>
        <Image
          src={isOpen ? pointer : pointerdown}
          width={12}
          height={12}
          alt={isOpen ? "up-pointer" : "down-pointer"}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden lg:hidden"
          >
            <div className="pb-4 text-sm text-white/60">
              {description}
              <ul className="list-disc pl-4 space-y-2">
                {
                    content.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))
                }
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AboutTech = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const accordionItems = [
    {
      title: "How ZeroXBridge differs",
      description: "ZeroXBridge continues to stand out from others, and here are some ways:",
      content: [
        "Traditional bridges fragment liquidity across multiple chains, reducing efficiency. ZeroXBridge maintains liquidity cohesion by enabling cross-chain transactions daily without worry of efficiency problems.",
        "Centralized bridges introduce single point of failure and custodial risks. ZeroXBridge uses decentralized, trustless zk-STARK proof to ensure security and transparency.",
        "Traditional bridges require moving assets between chains, thereby exposing them to security risks like hacks and exploits. ZeroXBridge eliminates this by keeping your collateral securely locked on Ethereum while unlocking liquidity on Starknet."
      ]
    },
    {
      title: "What is ZK Proofs",
      description: "",
      content: []
    },
    {
      title: "Key differences between ZeroXBridge and Traditional Bridges",
      description: "",
      content: []
    },
    {
      title: "Security Benefits",
      description: "",
      content: []
    }
  ];

  return (
    <div className="relative w-full pb-10 md:py-[8rem]">
      <div className="absolute -top-[140px] bg-blend-normal left-0 z-0">
        <Image
          src={blur3}
          alt="Glow Effect"
          width={500}
          height={500}
        />
      </div>
      <div className="w-full md:max-w-[80%] md:mx-auto z-10 relative px-6 md:px-0">
        <div className="bg-[#0F0A17] rounded-2xl overflow-hidden">
          <div className="px-6 pt-6">
            <h1 className="text-2xl md:text-[32px] text-center bg-gradient-to-r from-[#26183E] via-[#A26DFF] to-[#26183E] bg-clip-text text-transparent font-manrope mb-2">
              Our Technology
            </h1>
            <p className="text-white/60 text-center text-sm">Terms and their explanations</p>
          </div>

          {/* Mobile Accordion */}
          <div className="p-6 lg:hidden">
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                description={item.description}
                content={item.content}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>

          {/* Desktop Two Columns */}
          <div className="hidden lg:flex p-6">
            {/* Left Column - Titles */}
            <div className="flex flex-col gap-2 w-1/3 pr-6 mt-8">
              {accordionItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => item.content.length > 0 && setOpenIndex(index)}
                  className={` w-[60%] flex items-start justify-between text-left text-sm transition-colors ${
                    openIndex === index ? 'text-[#A26DFF]' : 'text-white/80'
                  } ${item.content.length === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span className="text-left w-[80%]">{item.title}</span>
                  <Image
                    src={openIndex === index ? pointer : pointerdownDesktop}
                    width={12}
                    height={12}
                    alt={openIndex === index ? "up-pointer" : "down-pointer"}
                    className="mt-1"
                  />
                </button>
              ))}
            </div>

            {/* Right Column - Content */}
            <div className="w-2/3 pl-6">
              {accordionItems.map((item, index) => (
                <div key={index} className="mb-8">
                  <p className="text-base text-white/80 font-normal">
                    {item.description}
                  </p>  
                  <ul className="list-disc pl-6 space-y-2">
                    {
                        item.content.map((content, index) => (
                            <li key={index} className="text-base text-white/80 font-normal">
                                {content}
                            </li>
                        ))
                    }
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTech;