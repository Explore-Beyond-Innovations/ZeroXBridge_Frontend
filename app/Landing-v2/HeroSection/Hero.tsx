import Image from "next/image";
import Navbar from "./Navbar";
import HeroBg from "./HeroBg";
import ArrowIcon from "@/app/components/ui/ArrowIcon";
import GradientText from "../../components/ui/GradientText";

const Hero = () => {
  return (
    <div className="h-[100dvh] relative w-full overflow-hidden">
      <div className="relative   z-10">
        <Navbar />
        <div className="flex flex-col  gap-4 mt-[clamp(100px,10dvh,150px)] text-[36px] 2xl:mt-[15vh] max-w-[85%]  md:max-w-[632px] mx-auto 2xl:max-w-[500px] 3xl:max-w-[650px]  4xl:max-w-[850px]">
          <h1 className="">
            Secure <GradientText>Cross-Chain</GradientText> Liquidity with
            Zero-Knowledge Proofs
          </h1>
          <p className="text-[16px]">
            Unlock liquidity on Starknet using ZK,{" "}
            <span className="text-[#6C6C6C]">no centralized bridges.</span>
          </p>
          <div className="flex gap-2 items-center ">
            <button className="bg-white text-base  rounded-full text-black px-4 py-2 flex items-center gap-2">
              Launch App
              <ArrowIcon direction="right" />
            </button>
            <button className="bg-[#1F1F1F] text-base rounded-[12px] text-white px-4 py-2 flex items-center gap-2">
              Read Docs
            </button>
          </div>
        </div>
      </div>
      <div className="h-fit md:h-[100%] z-[2] scale-[2.5] -rotate-12 md:rotate-0 md:scale-[1.17] bottom-0  mx-auto absolute md:left-1/2 top-[50%] left-[40%] md:top-[65%]  3xl:top-[50%] 3xl:scale-100  md:-translate-x-1/2 w-full md:bottom-0 mix-blend-lighten group">
        <Image
          src="/bridge-xl.png"
          alt="hero-bg"
          width={3840}
          height={2095}
          priority
          className="object-center absolute inset-0 -translate-y-[25%] object-contain"
        />
        <Image
          src="/bridge-xl-animated.png"
          alt="hero-bg"
          width={3840}
          height={2095}
          priority
          className="object-center absolute inset-0 -translate-y-[25%] object-contain opacity-0 group-hover:opacity-100 transition-[opacity] duration-300"
        />
      </div>

      <HeroBg />
    </div>
  );
};

export default Hero;
