import { AutoFadeTextWrapper } from "@/app/components/AutoFadeTextWrapper";
import GradientWrapper from "@/app/components/ui/GradientWrapper";
import Image from "next/image";

const ZeroXPosition = () => {
  return (
    <div className="bg-[#0F0F0F] px-6 lg:px-24 py-16 2xl:px-28 ">
      <div className="  flex flex-col gap-8 mx-auto 2xl:w-[95%]">
        <GradientWrapper className="h-fit w-fit rounded-full">
          <AutoFadeTextWrapper
            as="h2"
            className="font-mono text-sm font-[500] py-1 px-2 2xl:px-6 2xl:py-4 rounded-full w-fit bg-[#19191A] uppercase 2xl:text-3xl"
          >
            ZERO-X-POSITION
          </AutoFadeTextWrapper>
        </GradientWrapper>

        <p className="tracking-tight text-3xl font-[300] text-[#9E9E9E] hover:text-white transition-all duration-300 font-inter group 3xl:text-5xl">
          ZeroXBridge is a decentralized protocol that unlocks cross-chain
          liquidity without requiring users to bridge or move their original
          assets across chains. Instead of bridging assets, users lock ETH
          <Image
            src="/eth.png"
            alt="Ethereum"
            width={24}
            height={24}
            className="inline-block mx-1 cursor-pointer group-hover:animate-jiggle"
            aria-hidden="true"
          />
          or other supported tokens on Ethereum (L1) and instantly receive xZB
          tokens on Starknet
          <Image
            src="/strk.png"
            alt="Starknet"
            width={24}
            height={24}
            className="inline-block mx-1 cursor-pointer group-hover:animate-jiggle"
            aria-hidden="true"
          />
          . These tokens are native, and backed 1:1 by the user&apos;s collateral
          locked on Ethereum.
        </p>

        <p className="tracking-tight text-[#9E9E9E] hover:text-white transition-all duration-300 font-[300] text-3xl  font-inter 3xl:text-5xl">
          xZB can be used across DeFi applications on Starknet — including
          lending, trading, and staking (LSTs) — all without moving your
          original assets from L1 or depending on centralized bridges.
        </p>
        <p className="tracking-tight text-[#9E9E9E] hover:text-white transition-all duration-300 font-[300] text-3xl  font-inter 3xl:text-5xl">
          Zero-knowledge proofs (ZKPs) are used to verify that a deposit was
          made on Ethereum — without revealing user data or bridging L1 assets.
          This allows Starknet to trustlessly mint xZB, enabling secure and
          non-custodial liquidity transfer across chains.
        </p>
      </div>
    </div>
  );
};

export default ZeroXPosition;
