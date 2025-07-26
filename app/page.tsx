"use client";

import { InsideZeroX } from "./Landing-v2/InsideZeroX";
import { FeaturesList } from "./Landing-v2/ComingSoonFeatures";
import { Hero } from "./Landing-v2/HeroSection";
import { ZeroXPosition } from "./Landing-v2/Position";
import { HowItWorks } from "./Landing-v2/HowItWorks";

const Page = () => {
  return (
    <div className="w-full min-h-screen h-full bg-[#0a0a0a] flex flex-col items-center">
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
