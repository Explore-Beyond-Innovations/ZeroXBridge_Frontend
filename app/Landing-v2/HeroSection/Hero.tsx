import Image from 'next/image';
import Navbar from './Navbar';
import HeroBg from './HeroBg';
import ArrowIcon from '@/app/components/ui/ArrowIcon';
import GradientText from '../../components/ui/GradientText';

const Hero = () => {
  return (
    <div className='h-[100dvh] relative w-full overflow-hidden'>
      <div className='relative   z-10'>
        <Navbar />
        <div className="flex flex-col gap-6 mt-20 lg:mt-32 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Secure <GradientText>Cross-Chain</GradientText> Liquidity with
            Zero-Knowledge Proofs
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl">
            Unlock liquidity on Starknet using ZK,{' '}
            <span className="text-gray-500">no centralized bridges.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <a
              href="https://app.zeroxbridge.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 rounded-full font-medium inline-flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
            >
              Launch App
              <ArrowIcon direction="right" />
            </a>

            <button className="bg-gray-800 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors">
              Read Docs
            </button>
          </div>
        </div>
      </div>
      <div className='h-fit md:h-[100%] z-[2] scale-[2.5] -rotate-12 md:rotate-0 md:scale-[1.17] bottom-0  mx-auto absolute md:left-1/2 top-[50%] left-[40%] md:top-[65%]  3xl:top-[50%] 3xl:scale-100  md:-translate-x-1/2 w-full md:bottom-0 mix-blend-lighten group'>
        <Image
          src='/bridge-xl.png'
          alt='hero-bg'
          width={3840}
          height={2095}
          priority
          className='object-center absolute inset-0 -translate-y-[25%] object-contain'
        />
        <Image
          src='/bridge-xl-animated.png'
          alt='hero-bg'
          width={3840}
          height={2095}
          priority
          className='object-center absolute inset-0 -translate-y-[25%] object-contain opacity-0 group-hover:opacity-100 transition-[opacity] duration-300'
        />
      </div>

      <HeroBg />
    </div>
  );
};

export default Hero;
