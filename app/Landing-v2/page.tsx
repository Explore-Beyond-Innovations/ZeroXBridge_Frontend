"use client";

import { InsideZeroX } from "./InsideZeroX";
import { FeaturesList } from "./ComingSoonFeatures";
import { HowItWorks } from "./HowItWorks";
import { ZeroXPosition } from "./Position";
import { Hero } from "./HeroSection";
import { Faq, Footer, LiveStats } from "./StatsFaqFooter";

const Page = () => {
  return (
    <div className="w-full min-h-screen h-fit bg-[#0a0a0a]  flex flex-col items-center">
      <Hero />
      <div className="bg-[#0A0A0A] w-full relative z-10">
        <ZeroXPosition />
        <HowItWorks />
        <InsideZeroX />
        <FeaturesList />
        <LiveStats />
        <Faq />
        <Footer />
      </div>
    </div>
  );
};
export default Page;
