import { ArrowUpRight, BookOpen } from "@/public/icons/svg/general";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
const resources = [
  {
    title: "Starknet’s progressive governance",
    description:
      "A decentralized network that strives to evolve over time needs to have progressively evolving decentralized governance mechanisms to support protocol upgrades.",
    link: "#",
  },
  {
    title: "How to delegate voting power",
    description:
      "If you are a STRK token holder, you can select a delegate to vote in your place for protocol changes.",
    link: "#",
  },
];
export const LearnOverview = () => {
  return (
    <section className="max-w-[75rem] p-4 mx-auto bg-[#E9E8EA] rounded-[0.75rem] w-full">
      <div className="flex flex-col gap-6 md:flex-row  sm:justify-between">
        <div className="space-y-6 w-full sm:max-w-[20rem]">
          <h2 className="flex items-center gap-2 text-[#86848d]">
            <BookOpen />
            <p className="text-normal font-semibold text-[#86848D] sm:text-3xl">
              Learn
            </p>
          </h2>
          <p className="text-2xl sm:text-3xl font-semibold text-black ">
            Starknet Governance overview
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="sm:text-[1.32rem] font-semibold text-[#1A1523]">
              Overview
            </p>
            <p className="text-black text-base pr-3">
              Starknet is a permissionless decentralized Layer 2 (L2) validity
              rollup, built to enable Ethereum to scale by using cryptographic
              protocols called STARKs, without compromising Ethereum’s core
              principles of decentralization, transparency, inclusivity, and
              security.
            </p>
          </div>
          <button className="px-5 py-3 rounded bg-[#1A1523] flex items-center justify-between text-white text-base font-semibold hover:bg-opacity-90 transition-colors gap-2">
            <span>Read more</span>
            <span className="">
              <ArrowRight />
            </span>
          </button>
        </div>
      </div>
      <hr className="my-5 border-[1px] border-[#23192d1a] w-full border-collapse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((item, index) => (
          <OverviewCard
            title={item.title}
            description={item.description}
            link={item.link}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};
interface OverviewCardProps {
  title: string;
  description: string;
  link: string;
}
export const OverviewCard = ({
  title,
  description,
  link,
}: OverviewCardProps) => {
  return (
    <Link
      href={link}
      className="sm:max-w-[24.0rem] h-full w-full p-3 rounded-[0.375rem] border border-[#23192d1a] shadow-[0px_1px_2px_0px] block shadow-[#0000000a] bg-[#FBFBFB] hover:border-[#C8C7CB] hover:shadow-[0px_1px_2px_0px] hover:shadow-[#0000001a] transition-all"
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-1">
          <p className="text-[#1a1523] font-semibold ">{title}</p>
          <p className="text-[#86848d] text-xs font-medium leading-[20px]  text-balance ">
            {description}
          </p>
        </div>
        <div className="pt-[0.50rem] flex items-center justify-between">
          <p className="text-xs font-medium leading-[20px] text-[#1A202C]">
            Learn more
          </p>
          <span className="rotate-45 text-[#1A202C]">
            <ArrowUpRight />
          </span>
        </div>
      </div>
    </Link>
  );
};
