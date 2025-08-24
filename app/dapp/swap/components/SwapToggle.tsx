import SwapIcon from "@/svg/SwapIcon";
import React from "react";

function SwapToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="absolute left-1/2 top-[169.5px] -translate-x-1/2 z-10 border-[#EEEEEE] dark:border-[#151515] border-[3px] w-[35.5px] h-[35.5px] rounded-full flex items-center justify-center bg-[#FFFFFF] dark:bg-[#232323]"
    >
      <span className="rotate-90 dark:text-[#999999]">
        <SwapIcon className="w-[18px] h-[18px]" />
      </span>
    </button>
  );
}

export default SwapToggle;
