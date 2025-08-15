import Image from "next/image";
import { MoveRight } from "lucide-react";

// if the data isn't depending on any prop in the component, it should be outside its
// render method so we avoid re-computing it again on every render.
const data = [
  {
    title: "Seamless Wallet Integrations",
    description:
      "xZB will soon be natively accessible through popular Starknet wallets allowing users to instantly connect, hold, and deploy their xZB in DeFi — without extra setup or manual imports.",
    img: (
      <Image
        src="/user.png"
        alt="img"
        width={357.5}
        height={195}
        className="absolute top-[-7px] opacity-70"
      />
    ),
  },
  {
    title: "Governance DAO & Token Whitelist Voting",
    description:
      "ZeroXBridge will enable the community to vote on which assets get whitelisted and help shape key protocol decisions — ensuring decentralization and user-driven evolution.",
    img: (
      <Image
        src="/voting.png"
        alt="img"
        width={357.5}
        height={195}
        className="absolute top-[0px] left-[2px] opacity-70"
      />
    ),
  },
  {
    title: "Account Abstraction Support",
    description:
      "xZB will soon be natively accessible through popular Starknet wallets allowing users to instantly connect, hold, and deploy their xZB in DeFi — without extra setup or manual imports.",
    img: (
      <Image
        src="/starknet.png"
        alt="img"
        width={357.5}
        height={195}
        className="absolute top-[-115px] opacity-70 scale-20"
      />
    ),
  },
  {
    title: "Staking + APY for Liquidity Providers",
    description:
      "ZeroXBridge will enable users to earn passive yield by staking or locking assets, rewarding participation and driving deeper liquidity in the ecosystem.",
    img: (
      <Image
        src="/lock.png"
        alt="img"
        width={357.5}
        height={195}
        className="absolute top-[-50px] opacity-70 scale-70"
      />
    ),
  },
  {
    title: "Paymaster Integration",
    description:
      "ZeroXBridge will let users interact with the app without needing ETH for gas, removing friction and simplifying onboarding for new Starknet users.",
    img: (
      <Image
        src="/eth.png"
        alt="img"
        width={357.5}
        height={195}
        className="absolute top-[-40px] opacity-70 scale-75"
      />
    ),
  },
];

const ComingSoon = () => {
  return (
    <main className="flex w-full justify-center max-w-7xl mx-auto md:pt-10 sm:pt-8 sm:px-[20px]">
      <div className="grid grid-cols-1 mx-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-[20px]">
        {data.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-[16px] border-[1.11px] border-[#EFEFEF] dark:border-[#202020] bg-[#FFFFFF] dark:bg-[#151515] rounded-[20px] p-[20px]"
          >
            <div className="text-black dark:text-[#FDFBFF] text-[18px] font-light leading-[120%] tracking-[-0.02em] font-inter">
              {item.title}
            </div>
            <div className="text-[#3A3A3A] dark:text-[#B2B2B2] text-[16px] font-light leading-[120%] tracking-[-0.02em] font-inter">
              {item.description}
            </div>
            <div className="relative bg-[#EFEFEF] dark:bg-[#1D1D1D] rounded-[16px] overflow-hidden h-[120px]">
              {item.img}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ComingSoon;
