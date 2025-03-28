"use client";
import React from "react";
import Image from "next/image";
import coreProblemImg from "@/public/images/problem.png";
import coreSolutionImg from "@/public/images/solution.png";
import Arrow from "@/public/icons/Arrow";
import blur3 from "@/public/topBlur.svg"; // Import the blur effect SVG

interface SectionTitleProps {
  children: React.ReactNode;
}

interface SectionTextProps {
  children: React.ReactNode;
}

interface ListItemProps {
  children: React.ReactNode;
}

interface SubListProps {
  items: string[];
}

interface SolutionItem {
  title: string;
  description: string;
  subItems: string[];
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <h1 className="text-[24px] md:text-[28px] font-bold bg-gradient-to-r from-[#26183E] to-[#A26DFF] text-transparent bg-clip-text font-manrope mb-4">
    {children}
  </h1>
);

const SectionText: React.FC<SectionTextProps> = ({ children }) => (
  <p className="text-[16px] md:text-[18px] text-[#D4D4D4] leading-[24px] md:leading-[27px] mb-6 font-roboto-serif">
    {children}
  </p>
);

const ListItem: React.FC<ListItemProps> = ({ children }) => (
  <li className="flex items-start gap-3">
    <span className="mt-0.5 flex-shrink-0"><Arrow className="w-5 h-5" /></span>
    <span className="text-[#D4D4D4]">{children}</span>
  </li>
);

const SubList: React.FC<SubListProps> = ({ items }) => (
  <ul className="text-[#8B8B8B] list-disc pl-8 md:pl-10 mt-2 mb-2 space-y-1">
    {items.map((item, index) => (
      <li key={index} className="text-sm">{item}</li>
    ))}
  </ul>
);

const AboutCoreProblems: React.FC = () => {
  // Data for the component
  const problems: string[] = [
    "Security vulnerabilities in centralized bridges leading to hacks and exploits",
    "Inefficient capital allocation due to wrapped tokens and fragmented liquidity",
    "Limited cross-chain utility of liquid staking tokens",
    "High gas fees and delays in asset transfers"
  ];

  const solutionItems: SolutionItem[] = [
    {
      title: "Zero-Knowledge Proofs",
      description: "Instead of moving assets between chains, we use ZK-STARK proofs to verify asset ownership on Ethereum while unlocking liquidity on Starknet.",
      subItems: []
    },
    {
      title: "Trustless Architecture",
      description: "",
      subItems: [
        "Users deposit collateral on Ethereum L1.",
        "ZK-STARK proof verifies the deposit without exposing sensitive data.",
        "Starknet validates the proof and enables borrowing from liquidity vaults.",
        "Users can immediately access trading, lending, and borrowing capabilities."
      ]
    },
    {
      title: "Capital Efficiency",
      description: "",
      subItems: [
        "No wrapped tokens required.",
        "Assets remain secure on Ethereum while being utilized on Starknet.",
        "Liquid staking tokens can be used cross-chain without unstaking.",
        "Instant settlement through proof verification."
      ]
    }
  ];

  return (
    <div className="relative md:m-0 pt-12 pb-4 md:py-16 mx-8 px-6 md:px-10 xl:max-w-[1086px]">
      <div className="absolute -top-[250px] left-1/2 -translate-x-1/2 z-10">
        <Image
          src={blur3}
          alt="Glow Effect"
          width={700}
          height={600}
        />
      </div>

      {/* Problems Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-20 mb-20">
        <div className="w-full max-w-[575px] m-auto">
          <SectionTitle>Core Problems</SectionTitle>
          <SectionText>
            It is not a new thing that Traditional cross-chain solutions face
            critical challenges such as:
          </SectionText>
          <ul className="text-sm flex flex-col gap-4 font-roboto-serif">
            {problems.map((problem, index) => (
              <ListItem key={index}>{problem}</ListItem>
            ))}
          </ul>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-[256px] h-[256px]">
            <Image
              src={coreProblemImg}
              alt="Problem illustration"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-10 pt-6">
        <div className="flex justify-center lg:justify-start">
          <div className="relative w-[256px] h-[256px]">
            <Image
              src={coreSolutionImg}
              alt="Solution illustration"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="w-full max-w-[576px]">
          <SectionTitle>The Solution</SectionTitle>
          <SectionText>
            There is no doubt that ZeroXBridge is solving these problems through
            these innovative approaches:
          </SectionText>
          <ul className="text-sm flex flex-col gap-5 font-roboto-serif">
            {solutionItems.map((solution, index) => (
              <div key={index}>
                <ListItem>
                  <span className="font-medium">{solution.title}</span>
                  {solution.description ? `: ${solution.description}` : ""}
                </ListItem>
                {solution.subItems.length > 0 && <SubList items={solution.subItems} />}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutCoreProblems;