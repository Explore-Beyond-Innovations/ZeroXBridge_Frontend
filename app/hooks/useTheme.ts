"use client";
import { useThemeContext } from "@/app/context/ThemeContext";

export const useTheme = () => {
  return useThemeContext();
};

export default useTheme;
