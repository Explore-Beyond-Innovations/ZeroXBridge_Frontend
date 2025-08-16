import Image from 'next/image';
import { MoveRight } from 'lucide-react';

const ComingSoon = () => {
  const data = [
    {
      title: 'Seamless Wallet Integrations',
      description:
        'xZB will soon be natively accessible through popular Starknet wallets allowing users to instantly connect, hold, and deploy their xZB in DeFi — without extra setup or manual imports.',
      img: (
        <Image
          src='/user.png'
          alt='img'
          width={357.5}
          height={195}
          className='absolute top-[-7px] opacity-70'
        />
      ),
    },
    {
      title: 'Governance DAO & Token Whitelist Voting',
      description:
        'ZeroXBridge will enable the community to vote on which assets get whitelisted and help shape key protocol decisions — ensuring decentralization and user-driven evolution.',
      img: (
        <Image
          src='/voting.png'
          alt='img'
          width={357.5}
          height={195}
          className='absolute top-[0px] left-[2px] opacity-70'
        />
      ),
    },
    {
      title: 'Account Abstraction Support',
      description:
        'xZB will soon be natively accessible through popular Starknet wallets allowing users to instantly connect, hold, and deploy their xZB in DeFi — without extra setup or manual imports.',
      img: (
        <Image
          src='/starknet.png'
          alt='img'
          width={357.5}
          height={195}
          className='absolute top-[-115px]  opacity-70 scale-20'
        />
      ),
    },
    {
      title: 'Staking + APY for Liquidity Providers',
      description:
        'ZeroXBridge will enable users to earn passive yield by staking or locking assets, rewarding participation and driving deeper liquidity in the ecosystem.',
      img: (
        <Image
          src='/lock.png'
          alt='img'
          width={357.5}
          height={195}
          className='absolute top-[-50px] opacity-70 scale-70'
        />
      ),
    },
    {
      title: 'Paymaster Integration',
      description:
        'ZeroXBridge will let users interact with the app without needing ETH for gas, removing friction and simplifying onboarding for new Starknet users.',
      img: (
        <Image
          src='/eth.png'
          alt='img'
          width={357.5}
          height={195}
          className='absolute top-[-40px] opacity-70 scale-75'
        />
      ),
    },
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex flex-1 w-full  justify-center p-6 max-w-7xl mx-auto mt-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] h-full'>
          {data.map((item) => (
            <div
              key={item.title}
              className='flex flex-col gap-[16px] border-[1.11px] border-[#EFEFEF] dark:border-[#202020] bg-[#FFFFFF] dark:bg-[#151515] rounded-[20px] p-[20px]'
            >
              <div className='text-black dark:text-[#FDFBFF] text-[18px] font-light leading-[120%] tracking-[-0.02em] font-inter'>
                {item.title}
              </div>
              <div className='text-[#3A3A3A] dark:text-[#B2B2B2] text-[16px] font-light leading-[120%] tracking-[-0.02em] font-inter'>
                {item.description}
              </div>
              <div className='relative bg-[#EFEFEF] dark:bg-[#1D1D1D] rounded-[16px] overflow-hidden h-[120px]'>
                {item.img}
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className='bg-gradient-to-r from-pink-300 via-purple-300 to-orange-200 w-full py-[26px] px-[30px]'>
        <div className='bg-white dark:bg-black py-[30px] px-[37px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[16px] rounded-[16px]'>
          <div className='text-[20px] text-[#222223] dark:text-[#DADADA]'>
            Be the first to know! 🔔
          </div>
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-[8px] sm:gap-[4px] w-full sm:w-auto'>
            <input
              type='text'
              placeholder='Enter e-mail address'
              className='bg-[#EFEFEF] dark:bg-[#222223] px-[12.1px] py-[10.95px] rounded-[6.92px] w-full sm:w-[324px]'
            />
            <button className='flex items-center gap-[8px] bg-[#111111] dark:bg-white text-white dark:text-black text-[14px] px-[11.53px] py-[9.22px] rounded-[23.06px] w-full sm:w-auto justify-center sm:justify-start'>
              Join waitlist <MoveRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
