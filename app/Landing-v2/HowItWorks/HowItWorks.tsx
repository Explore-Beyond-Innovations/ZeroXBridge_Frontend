import Image from "next/image";
import StepsAccordion from "./StepsAccordion";
import { AutoFadeTextWrapper } from "@/app/components/AutoFadeTextWrapper";

const Steps = () => {
  return (
    <div className="mx-auto px-24 py-16 2xl:px-28 2xl:w-[95%]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[463px] 3xl:h-[clamp(463px,60dvh,983px)] ">
        <div className="flex flex-col h-full">
          <AutoFadeTextWrapper
            as="h2"
            className="font-mono text-sm 2xl:text-[32px] 2xl:mb-12 font-[500] mb-5 uppercase flex-shrink-0"
          >
            How it works
          </AutoFadeTextWrapper>

          <div className="flex-1">
            <StepsAccordion />
          </div>
        </div>
        <div className=" w-full h-full bg-[#161616]  relative rounded-lg overflow-hidden">
          <Image
            src="/how-it-works.png"
            alt="how-it-works"
            width={500}
            height={500}
            className="object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Steps;
