import { MoveRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../../../i18n-client";

export const ComingSoonFooter = () => {
  const { t } = useTranslation();
  return (
    <footer className="sm:static lg:static xl:absolute 2xl:absolute bottom-0 bg-gradient-to-r from-pink-300 via-purple-300 to-orange-200 py-[20px] sm:py-[26px] px-[20px] sm:px-[30px] mt-4 lg:mt-12 w-[100%]">
      <div className="bg-white dark:bg-black py-[20px] sm:py-[30px] px-[20px] sm:px-[37px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[16px] rounded-[16px]">
        <div className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#222223] dark:text-[#DADADA] break-words">
          {t("joinCommunity.title")} 🔔
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[12px] sm:gap-[4px] lg:gap-[18px] w-full sm:w-auto">
          <input
            type="text"
            placeholder={t("common.enterEmail")}
            className="bg-[#EFEFEF] dark:bg-[#222223] px-[12px] py-[10px] rounded-[6px] w-full sm:w-[280px] lg:w-[324px] text-[14px]"
          />
          <button className="flex items-center gap-[8px] bg-[#111111] dark:bg-white text-white dark:text-black text-[14px] px-[12px] py-[10px] rounded-[23px] w-full sm:w-auto justify-center sm:justify-start whitespace-nowrap">
            {t("joinCommunity.button")} <MoveRight size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
