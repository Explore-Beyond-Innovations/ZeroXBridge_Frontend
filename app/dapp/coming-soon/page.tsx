import Image from "next/image";
import { MoveRight } from "lucide-react";

const ComingSoon = () => {
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
          className="absolute top-[-7px] opacity-60"
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
          className="absolute top-[0px] left-[2px] opacity-60"
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
          className="absolute top-[-120px] left-[5px] opacity-60 scale-20"
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
          className="absolute top-[-50px] opacity-60 scale-70"
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
          className="absolute top-[-40px] opacity-60 scale-75"
        />
      ),
    },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-6">
        <div className="grid grid-cols-3 gap-[20px]">
          {data.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-[12px] border-[1.11px] border-[#202020] bg-[#151515] rounded-[16px] p-[16px]"
            >
              <div className="text-[#FDFBFF] text-[16px] font-light leading-[120%] tracking-[-0.02em] font-inter">
                {item.title}
              </div>
              <div className="text-[#B2B2B2] text-[14px] font-light leading-[120%] tracking-[-0.02em] font-inter">
                {item.description}
              </div>
              <div className="relative bg-[#1D1D1D] rounded-[16px] overflow-hidden h-[120px]">
                {item.img}
              </div>
            </div>
          ))}
        </div>
      </main>
      <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-orange-200 w-full py-[26px] px-[30px]">
        <div className="bg-black py-[30px] px-[37px] flex justify-between items-center rounded-[16px]">
          <div className="text-[20px] text-[#DADADA]">
            Be the first to know! 🔔
          </div>
          <div className="flex items-center gap-[4px]">
            <div>
              <input
                type="text"
                placeholder="Enter e-mail address"
                className="bg-[#222223] px-[12.1px] py-[10.95px] rounded-[6.92px] w-[324px]"
              />
            </div>
            <div>
              <button className="flex items-center gap-[8px] bg-white text-black text-[14px] px-[11.53px] py-[9.22px] rounded-[23.06px]">
                Join waitlist <MoveRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ComingSoon;
