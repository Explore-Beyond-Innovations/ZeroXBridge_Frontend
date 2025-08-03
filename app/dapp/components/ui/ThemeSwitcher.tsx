"use client";
import { useThemeContext } from "@/app/hooks/context/theme";

import MoonIcon from "@/svg/MoonIcon";
import SunIcon from "@/svg/SunIcon";

function ThemeSwitcher() {
  const { isDark, toggleTheme } = useThemeContext();
  return (
    <div
      onClick={toggleTheme}
      className="relative flex h-10 w-[80px] cursor-pointer items-center gap-x-1 rounded-full bg-toggle-bg p-[3px] transition-all duration-300"
    >
      <div
        className={`absolute left-[3px] top-1/2 h-[calc(100%-4px)] w-[calc(50%-4px)] -translate-y-1/2 rounded-full bg-toggle-slider-bg border-[1px] border-toggle-slider-border transition-all duration-200 ease-in-out ${
          !isDark ? "translate-x-0" : "translate-x-[calc(100%+3px)]"
        }`}
      />
      <span
        className={`relative z-10 flex flex-1 justify-center items-center h-full rounded-full text-center transition-colors duration-300 ${
          !isDark
            ? "text-theme-icon-fill-active"
            : "text-theme-icon-fill-not-active"
        }`}
      >
        <SunIcon />
      </span>
      <span
        className={`relative z-10 flex-1  rounded-full justify-center h-full items-center flex transition-colors duration-300 ${
          isDark
            ? "text-theme-icon-fill-active"
            : "text-theme-icon-fill-not-active"
        }`}
      >
        <MoonIcon />
      </span>
    </div>
  );
}

export default ThemeSwitcher;
