import Image from "next/image";
import { Button } from "./ui/button";

const AboutHeader = () => {
  return (
    <section className="relative text-white rounded-3xl py-[70px] shadow-lg z-10 font-roboto-serif">
      <h1 className="text-5xl font-bold font-manrope mb-3 text-center bg-gradient-to-r from-[#262429] via-[#9B6DFF] to-[#262429] bg-clip-text text-transparent">
        About Us
      </h1>
      <p className="text-xl text-white-2 text-center whitespace-nowrap font-roboto-serif mb-20">
        With ZeroXBridge eliminating the vulnerabilities of traditional
        cross-chain solutions:
      </p>

      <div className="flex flex-col-reverse md:flex-row p-4 justify-between items-center gap-20">
        <div className="flex flex-col w-full max-w-[721px] gap-10">
          <div className="flex flex-col gap-[30px] w-full">
            <div className="flex flex-col text-white-2 gap-3">
              <p className="font-bold text-xl">OUR MISSION</p>
              <p className="text-sm">
                We plan to revolutionize cross-chain liquidity by enabling
                trustless, secure asset settlement between Ethereum and Starknet
                without the risks of traditional bridge transfers.
              </p>
            </div>
            <div className="flex flex-col text-white-2 gap-3">
              <p className="font-bold text-xl">OUR VISION</p>
              <p className="text-sm">
                We aspire to be a DeFi ecosystem where users can seamlessly
                access their Ethereum assets liquidity on Starknet while keeping
                their assets securely locked on L1.
              </p>
            </div>
          </div>

          <Button variant="gradientPrimary" size="default" className="max-w-[200px] w-full">
            Launch App
          </Button>
        </div>
        <Image
          src="/about-header.png"
          alt="Glow Effect"
          width={500}
          height={500}
          className="w-full max-w-[396px] h-full"
        />
      </div>
    </section>
  );
};

export default AboutHeader;
