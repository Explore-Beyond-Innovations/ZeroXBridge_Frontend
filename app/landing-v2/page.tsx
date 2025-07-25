"use client";
import StatsFaqFooter from "./StatsFaqFooter";

export default function LandingV2() {
  return (
    <div className="min-h-screen flex flex-col items-center w-full overflow-x-hidden">
      {/* Hero Section Placeholder */}
      {/*<HomeNav />
      <Header />*/}

      <div className="w-full max-w-[1600px] mx-auto py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            ZeroX Bridge V2
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the next generation of cross-chain bridging with enhanced security, 
            faster transactions, and lower fees.
          </p>
        </div>
      </div>

      {/* Stats, FAQ, and Footer Section */}
      <div className="w-full max-w-[1600px] mx-auto">
        {/*<HowItWorks />
        <AboutUs />
        <Testimonial />*/}
    
      <StatsFaqFooter />
      </div>
    </div>
  );
}