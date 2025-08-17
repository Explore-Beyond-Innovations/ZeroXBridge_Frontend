import { MoveRight } from "lucide-react";

export const ComingSoonFooter = () => {
  return (
    <footer className="sm:static lg:static xl:absolute 2xl:absolute bottom-0 bg-gradient-to-r from-pink-300 via-purple-300 to-orange-200 py-[26px] px-[30px] mt-4 lg:mt-12 w-[100%]">
      <div className="bg-white dark:bg-black py-[30px] px-[37px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[16px] rounded-[16px]">
        <div className="text-[20px] whitespace-nowrap  text-[#222223] dark:text-[#DADADA]">
          Be the first to know! 🔔
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[8px] sm:gap-[4px] lg:gap-[18px] w-full sm:w-auto flex-wrap">
          <input
            type="text"
            placeholder="Enter e-mail address"
            className="bg-[#EFEFEF] dark:bg-[#222223] px-[12.1px] py-[10.95px] rounded-[6.92px] w-full sm:w-[324px]"
          />
          <button className="flex items-center gap-[8px] bg-[#111111] dark:bg-white text-white dark:text-black text-[14px] px-[11.53px] py-[9.22px] rounded-[23.06px] w-full sm:w-auto justify-center sm:justify-start">
            Join waitlist <MoveRight size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
