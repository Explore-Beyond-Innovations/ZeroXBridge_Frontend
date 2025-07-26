"use client";

import { InsideZeroX } from "./InsideZeroX";
import { FeaturesList } from "./ComingSoonFeatures";
import { HowItWorks } from "./HowItWorks";
import { ZeroXPosition } from "./Position";
import { Hero } from "./HeroSection";

const Page = () => {
  return (
    <div className="w-full min-h-screen h-full bg-[#0a0a0a]  flex flex-col items-center">
      <Hero />
      <div className="bg-[#0A0A0A] w-full relative z-10">
        <ZeroXPosition />
        <HowItWorks />
        <InsideZeroX />
        <FeaturesList />
      </div>
    </div>
  );
};
export default Page;
