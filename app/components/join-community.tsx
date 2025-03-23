import { Manrope, Roboto_Serif } from "next/font/google";
import Image from "next/image";
import ellipse from "@/public/join-community/ellipse.svg";

const manrope = Manrope({
  weight: ["700"],
  subsets: ["latin"],
});

const robotoSerif = Roboto_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

const JoinCommunity = () => {
  return (
    <section className="w-[75%] flex flex-col items-center mx-auto border-[#A26DFF] rounded-[20px] border-[5px] bg-[#09050E] my-12">
      <div className="relative grid place-items-center gap-y-16 text-center bg-join-community w-full h-[391px] shadow-[0px_0px_4px_2px_#A26DFF40] rounded-[20px] overflow-hidden">
        <Image
          src={ellipse}
          width={310}
          height={350}
          alt="community ellipse with blur filter"
          className="absolute top-[-77px] right-0 w-[308px] h-[350px]"
        />
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-3">
            <h3 className={`${manrope.className} text-[#8B8B8B] text-[32px]`}>
              Join Our Wonderful Community Today!
            </h3>
            <p className={`${robotoSerif.className} text-white-2`}>
              Stay Connected with exciting updates, do not be left out of this
              revolution
            </p>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className={`${manrope.className} text-black rounded-full text-xl bg-community-cta p-[2px]`}
              style={{
                boxShadow:
                  "0px 4px 8px 0px #C29EFF1A, 0px -4px 4px 0px #A26DFF0D",
              }}
            >
              <span className="grid place-items-center bg-[#D2B9FF] w-[250px] h-[68px] rounded-full">
                Join Community
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
