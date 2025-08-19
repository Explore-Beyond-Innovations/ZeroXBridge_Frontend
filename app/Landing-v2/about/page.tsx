"use client";

import GradientWrapper from "@/app/components/ui/GradientWrapper";
import GradientWrapperHover from "@/app/components/ui/GradientWrapperHover";
import Navbar from "../HeroSection/Navbar";
import Accordion from "./Accordion";
import { AutoFadeTextWrapper } from "@/app/components/AutoFadeTextWrapper";
import ArrowIcon from "@/app/components/ui/ArrowIcon";
import Image from "next/image";
import Link from "next/link";
import Footer from "../StatsFaqFooter/Footer";

const page = () => {
  const scrollToMission = () => {
    if (typeof window !== "undefined") {
      const targetElement = document.getElementById("our-mission");
      if (targetElement) {
        const targetPosition = targetElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1500;
        let startTime: number | null = null;

        const animation = (currentTime: number) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);

          // Easing function for smooth scroll
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);

          window.scrollTo(0, startPosition + distance * easeOutQuart);

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        };

        requestAnimationFrame(animation);
      }
    }
  };

  const team: {
    name: string;
    role?: string;
    skill?: string;
    image: string;
    x?: string;
    github?: string;
  }[] = [
    {
      name: "Ugo-X",
      role: "Co-Founder",
      skill: "Blockchain Developer",
      image: "/team/ugo.png",
      x: "IamUgo_x",
      github: "ugo_x",
    },
    {
      name: "BlockyJ",
      role: "Co-Founder",
      skill: "Blockchain Developer",
      image: "/team/blockyj.png",
      x: "BlockyJ_",
      github: "blockyj",
    },
    {
      name: "Isaac",
      role: "Frontend Developer",
      image: "/team/ugo.png",
      x: "IamUgo_x",
      github: "ugo_x",
    },
  ];
  return (
    <section className="w-full bg-[#0A0A0A] ">
      <div
        className="xl:h-[406px]"
        style={{
          backgroundImage: "url('/star-noise-2.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 1,
        }}
      >
        <Navbar />
        <div className="w-full py-12 px-5 lg:px-[clamp(16px,5vw,80px)] ">
          <div className="sm:max-w-[70ch] py-10 mx-auto flex flex-col gap-4">
            <h1 className="text-[36px] text-[#EEEEEE] lg:text-[48px] leading-[106%] 4k:text-[64px] 4k:text-[64px] tracking-[-2%]">
              ZeroXBridge is more than a cross-chain solution, it is a
              revolution.
            </h1>
            <div>
              <button
                onClick={scrollToMission}
                className="text-[#6C6C6C] flex items-center gap-2 hover:text-[#9C9C9D] 4k:text-[24px] transition-colors cursor-pointer"
              >
                Read More <ArrowIcon direction="down" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="our-mission"
        className="w-full bg-[#0F0F0F] lg:flex justify-between items-center grid gap-4 grid-cols-1 sm:grid-cols-2 py-16 px-5 lg:px-[clamp(16px,5vw,80px)] 4k:px-[10rem] "
      >
        <div className="flex  flex-col max-w-[507px] 4k:max-w-[1100px] gap-4 ">
          <GradientWrapper className="h-fit w-fit rounded-full">
            <AutoFadeTextWrapper
              as="p"
              className="font-mono text-sm 4k:text-[32px] font-[500] text-[#9C9C9D] py-1 4k:py-3 4k:px-5 px-2 rounded-full w-fit bg-[#19191A] uppercase "
            >
              OUR MISSION
            </AutoFadeTextWrapper>
          </GradientWrapper>
          <p className="text-[#C9C9C9] mt-2 text-[20px] xl:text-[24px] 4k:text-[48px] ">
            We plan to revolutionize cross-chain liquidity by enabling
            trustless, secure asset settlement between Ethereum and Starknet
            without the risks of traditional bridge transfers.
          </p>
        </div>

        <hr className="border-t sm:hidden border-gray-800 my-8 w-full" />

        {/* PROBLEM */}
        <div className="flex  flex-col max-w-[507px] 4k:max-w-[1100px] gap-4">
          <GradientWrapper className="h-fit w-fit rounded-full">
            <AutoFadeTextWrapper
              as="p"
              className="font-mono text-sm 4k:text-[32px] font-[500] text-[#9C9C9D] py-1 4k:py-3 4k:px-5 px-2 rounded-full w-fit bg-[#19191A] uppercase "
            >
              OUR VISION
            </AutoFadeTextWrapper>
          </GradientWrapper>
          <p className="text-[#C9C9C9] mt-2 text-[20px] xl:text-[24px] 4k:text-[48px]">
            We aspire to be a DeFi ecosystem where users can seamlessly access
            their Ethereum assets&apos; liquidity on Starknet while keeping
            their assets securely locked on L1.
          </p>
        </div>
      </div>

      <div className="w-full grid gap-4 grid-cols-1 px-5 lg:flex justify-between  py-12 my-6 lg:px-[clamp(16px,5vw,80px)] 4k:px-[10rem] ">
        <div className="flex max-w-[507px] 4k:max-w-[1100px]  flex-col gap-4  h-full">
          <p className="text-sm 4k:text-[32px] mb-4 font-mono text-[#EEEEEE]">
            THE PROBLEM
          </p>
          <p className="text-[24px] md:text-[40px] 4k:leading-[106%] leading-[120%] 4k:text-[80px] text-[#C9C9C9] tracking-[-2%] 4k:max-w-[979px] ">
            Traditional cross chain solutions face a lot of critical challenges
            today.
          </p>
        </div>
        <div className="  max-w-[507px] 4k:max-w-[1100px] h-[300px]">
          <div className="w-full h-full">
            <Accordion />
          </div>
        </div>
      </div>

      {/* SOLUTION */}
      <div className="w-full flex flex-col gap-4 py-12 my-10 px-5 lg:px-[clamp(16px,5vw,80px)] 4k:px-[10rem] ">
        <p className="text-sm 4k:text-[32px] font-mono text-[#EEEEEE]">
          THE SOLUTION
        </p>
        <p className="text-[24px] 4k:text-[48px] md:max-w-[40ch] mb-6 text-[#C9C9C9] leading-[120%] tracking-[-2%]">
          There is no doubt that ZeroXBridge is at the game of solving these
          problems through our innovative approach.
        </p>
        <div className="w-full gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <GradientWrapperHover className="text-[#9E9E9E] hover:text-white ">
            <div className="px-8 py-[40px] 4k:py-[20px] flex justify-center h-full flex-col 4k:gap-5  gap-2">
              <p className="text-[21px] md:text-[24px] 4k:text-[62px]">
                ⁠Zero-Knowledge Proofs
              </p>
              <p className="text-[14.58px] 4k:text-[41.26px] md:text-[16px] 4k:max-w-[860px] max-w-[330px]">
                ⁠Zero-Knowledge Proofs: Instead of moving assets between chains,
                we use ZK-STARK proofs to verify asset ownership on Ethereum
                while unlocking liquidity on Starknet.
              </p>
            </div>
          </GradientWrapperHover>
          <GradientWrapperHover className="text-[#9E9E9E] hover:text-white">
            <div className="px-8 py-[40px] 4k:py-[20px] flex justify-center h-full flex-col 4k:gap-5  gap-2">
              <p className="text-[21px] 4k:text-[62px]">
                ⁠Trustless Architecture
              </p>
              <p className="text-[14.58px] 4k:text-[41.26px] md:text-[16px] 4k:max-w-[860px] max-w-[330px]">
                Collateral is deposited on Ethereum L1, verified privately via
                ZK-STARK, then validated by Starknet to unlock instant trading,
                lending, and borrowing access.
              </p>
            </div>
          </GradientWrapperHover>
          <GradientWrapperHover className="text-[#9E9E9E] hover:text-white">
            <div className="px-8 py-[40px] 4k:py-[20px] flex justify-center h-full flex-col 4k:gap-5  gap-2">
              <p className="text-[21px] 4k:text-[62px]">Capital Efficiency</p>
              <p className="text-[14.58px] 4k:text-[41.26px] md:text-[16px] 4k:max-w-[860px] max-w-[330px]">
                Collateral is deposited on Ethereum L1, verified privately via
                ZK-STARK, then validated by Starknet to unlock instant trading,
                lending, and borrowing access.
              </p>
            </div>
          </GradientWrapperHover>
        </div>
      </div>

      {/* TEAM SECTION */}
      <div className="w-full px-5 bg-[#0F0F0F] py-16 mb-6 lg:px-[clamp(16px,5vw,80px)] 4k:px-[10rem] ">
        <GradientWrapper className="h-fit w-fit rounded-full">
          <AutoFadeTextWrapper
            as="p"
            className="font-mono text-sm font-[500] text-[#9C9C9D] py-1 4k:py-3 4k:px-5 px-2 4k:text-[32px] rounded-full w-fit bg-[#19191A] uppercase "
          >
            OUR TEAM
          </AutoFadeTextWrapper>
        </GradientWrapper>
        <div className="w-full grid mt-8 gap-y-8 gap-x-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <div key={index} className="flex w-full h-full flex-col gap-2">
              <div className="w-full h-full max-h-[377px] sm:max-h-[456px] bg-[#161616] flex items-end justify-start">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={500}
                  height={500}
                  className="w-auto h-full object-cover"
                />
              </div>
              <div className="flex gap-3 pt-3">
                <p className="text-[24px] text-[#C9C9C9]">{member.name}</p>
                <p className="text-[16px] font-light text-[#9E9E9E]">
                  {member.skill}
                </p>
              </div>
              <div>
                <p className="text-[16px] font-light text-[#9E9E9E]">
                  {member.role}
                </p>
              </div>
              <div className="flex font-light items-center gap-6">
                <Link
                  href={`https://x.com/${member.x}`}
                  className="flex items-center gap-2"
                  target="_blank"
                >
                  <Image src="/XLogo.svg" alt="x" width={24} height={24} />
                  <p>{member.x}</p>
                </Link>
                <Link
                  href={`https://github.com/${member.github}`}
                  className="flex items-center gap-2"
                  target="_blank"
                >
                  <Image
                    src="/GithubLogo.svg"
                    alt="github"
                    width={24}
                    height={24}
                  />
                  <p>{member.github}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      {/* <Footer /> */}
    </section>
  );
};

export default page;
