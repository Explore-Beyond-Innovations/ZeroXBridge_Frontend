import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { SectionTitle } from "./about-core-problems";

const aboutUs = {
  title: 'About Us',
  description: 'ZeroXBridge is more than a cross-chain solutions, it is a Revolution',
  activities: [
    {
      title: "OUR MISSION",
      description: "We plan to revolutionize cross-chain liquidity by enabling trustless, secure asset settlement between Ethereum and Starknet without the risks of traditional bridge transfers.",
    },
    {
      title: "OUR VISION",
      description: "We aspire to be a DeFi ecosystem where users can seamlessly access their Ethereum assets liquidity on Starknet while keeping their assets securely locked on L1.",
    },
  ],
};

const AboutHeader = () => {
  return (
    <section className="relative w-[95%] sm:w-[90%] md:w-[85%] mx-auto text-white rounded-3xl py-[40px] sm:py-[50px] md:py-[70px] shadow-lg z-10 font-roboto-serif">
      <div className="flex flex-col items-center justify-center">
        <SectionTitle>{aboutUs.title}</SectionTitle>
      </div>
{/*       <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-manrope mb-3 text-center bg-gradient-to-r from-[#262429] via-[#9B6DFF] to-[#262429] bg-clip-text text-transparent">
        
      </h1> */}
      <p className="text-lg sm:text-xl text-white-2 text-center font-roboto-serif mb-10 sm:mb-15 md:mb-20 px-4">
        {aboutUs.description}
      </p>

      <div className="flex flex-col-reverse md:flex-row p-4 justify-between items-center gap-10 md:gap-20">
        <div className="flex flex-col w-full max-w-[721px] gap-6 sm:gap-8 md:gap-10">
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-[30px] w-full">
            {
              aboutUs.activities.map((item) => {
                return (
                  <div className="flex flex-col text-white-2 gap-3">
                    <p className="font-bold text-lg sm:text-xl">{item.title}</p>
                    <p className="text-sm sm:text-base font-normal">{item.description}</p>
                  </div>
                )
              })
            }
          </div>
          <Link href='/dashboard' className="w-full sm:w-auto">
            <Button
              variant="gradientPrimary"
              size="default"
              className="w-full sm:max-w-[200px]"
            >
              Launch App
            </Button>
          </Link>
        </div>
        <div className="bg-[url(/about-header.png)] hidden md:flex bg-cover w-[250px] h-[270px] sm:w-[320px] sm:h-[347px] md:w-[396px] md:h-[427px] flex-col items-center justify-center">
          <Image
            src="/about-header-icon.png"
            alt="Glow Effect"
            width={500}
            height={500}
            className="w-[180px] h-[180px] sm:w-[230px] sm:h-[230px] md:w-[289px] md:h-[289px] animate-slowSpin"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center md:hidden">
      <div className="bg-[url(/about-header.png)] flex md:hidden bg-cover w-[300px] h-[300px] sm:w-[320px] sm:h-[347px] md:w-[396px] md:h-[427px] flex-col items-center justify-center">
          <Image
            src="/about-header-icon.png"
            alt="Glow Effect"
            width={500}
            height={500}
            className="w-[180px] h-[180px] sm:w-[230px] sm:h-[230px] md:w-[289px] md:h-[289px] animate-slowSpin"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHeader;
