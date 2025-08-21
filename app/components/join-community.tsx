import { Manrope, Roboto_Serif } from "next/font/google";
import Image from "next/image";
import ellipse from "@/public/join-community/ellipse.svg";
import { useTranslation } from "react-i18next";

const manrope = Manrope({
  weight: ["700"],
  subsets: ["latin"],
});

const robotoSerif = Roboto_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

const JoinCommunity = () => {
  const { t } = useTranslation();
  return (
    <section className="w-[95%] md:w-[75%] flex flex-col items-center mx-auto border-[#A26DFF] rounded-[20px] border-[2px] md:border-[5px] bg-[#09050E] my-6 md:my-12">
      <div className="relative grid place-items-center gap-y-8 md:gap-y-16 text-center bg-join-community w-full h-[330px] md:h-[391px] shadow-[0px_0px_4px_2px_#A26DFF40] rounded-[20px] overflow-hidden p-6 md:p-0">
        <Image
          src={ellipse}
          width={310}
          height={350}
          alt="community ellipse with blur filter"
          className="absolute top-[-40px] md:top-[-77px] right-0 w-[200px] md:w-[308px] h-[250px] md:h-[350px]"
        />
        <div className="flex flex-col gap-8 md:gap-16 z-10 relative">
          <div className="flex flex-col gap-3 text-center">
            <h3
              className={`${manrope.className} text-[#8B8B8B] text-2xl md:text-[32px]`}
            >
              {t("joinCommunity.title")}
            </h3>
            <p
              className={`${robotoSerif.className} text-white-2 text-base md:text-base px-4`}
            >
              {t("joinCommunity.description")}
            </p>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className={`${manrope.className} text-black rounded-full text-base md:text-xl bg-community-cta p-[2px]`}
              style={{
                boxShadow:
                  "0px 4px 8px 0px #C29EFF1A, 0px -4px 4px 0px #A26DFF0D",
              }}
            >
              <span className="grid place-items-center bg-[#D2B9FF] w-[200px] md:w-[250px] h-[50px] md:h-[68px] rounded-full">
                {t("joinCommunity.button")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
