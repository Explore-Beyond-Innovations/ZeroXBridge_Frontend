'use client';
import TokenLockInterface from '@/app/dapp/components/lock-tokens';

const TokenLockPage = () => {
  return (
    <div
      className={`flex justify-center pt-20 min-h-screen w-full dark:bg-[#09050E] bg-[#FFF]`}
    >
      <div className='w-full max-w-md px-4'>
        <TokenLockInterface />
      </div>
    </div>
  );
};

export default TokenLockPage;
