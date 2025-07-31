
import StepsAccordion from "./StepsAccordion";
import { AutoFadeTextWrapper } from "@/app/components/AutoFadeTextWrapper";

const Steps = () => {
  return (
    <div className="mx-auto px-6 md:px-24 py-6 md:py-16 2xl:px-28 2xl:w-[95%] h-[1072px] md:h-[707px] 2xl:h-[1460px]">
      <div className="grid grid-cols-1 lg:flex gap-8 h-[463px] 3xl:h-[clamp(463px,60dvh,983px)] w-full ">
        <div className="flex flex-col h-full w-full">
          <AutoFadeTextWrapper
            as="h2"
            className="font-mono text-sm 2xl:text-[32px] 2xl:mb-12 font-[500] mb-5 uppercase flex-shrink-0 "
          >
            How it works
          </AutoFadeTextWrapper>

          <div className="flex-1 w-full h-fit">
            <StepsAccordion />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Steps;
