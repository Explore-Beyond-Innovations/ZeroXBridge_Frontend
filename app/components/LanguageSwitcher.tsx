"use client";

import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { useThemeContext } from "../context/theme-provider";
import "../i18n-client"; // Initialize i18n on client side

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = "",
}) => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, isLoading } = useLanguage();
  const { isDark } = useThemeContext();

  const handleLanguageChange = async () => {
    const newLanguage = currentLanguage === "en" ? "fr" : "en";
    await changeLanguage(newLanguage);
  };

  return (
    <button
      onClick={handleLanguageChange}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
        isDark
          ? "bg-[#21192F] text-white hover:bg-[#2F1F4C] border border-[#A26DFF]"
          : "bg-[#F8F4FF] text-[#09050E] hover:bg-[#ECE1FF] border border-[#A26DFF]"
      } ${className}`}
      title={t("language.switchLanguage")}
    >
      <Globe size={16} />
      <span className="text-sm font-medium">
        {currentLanguage.toUpperCase()}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
