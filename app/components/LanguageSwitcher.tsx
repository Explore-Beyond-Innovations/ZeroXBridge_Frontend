"use client";

import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { useThemeContext } from "../context/theme-provider";
import "../i18n-client";

interface LanguageSwitcherProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = "",
  size = "md",
  showText = true,
}) => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, isLoading } = useLanguage();
  const { isDark } = useThemeContext();

  const handleLanguageChange = async () => {
    const newLanguage = currentLanguage === "en" ? "fr" : "en";
    await changeLanguage(newLanguage);
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  return (
    <button
      onClick={handleLanguageChange}
      disabled={isLoading}
      className={`flex items-center gap-2 rounded-lg transition-all duration-200 hover:scale-105 ${
        isDark
          ? "bg-[#21192F] text-white hover:bg-[#2F1F4C] border border-[#A26DFF]"
          : "bg-[#F8F4FF] text-[#09050E] hover:bg-[#ECE1FF] border border-[#A26DFF]"
      } ${sizeClasses[size]} ${className}`}
      title={t("language.switchLanguage")}
    >
      <Globe size={iconSizes[size]} />
      {showText && (
        <span className="font-medium">
          {currentLanguage.toUpperCase()}
        </span>
      )}
    </button>
  );
};

export default LanguageSwitcher;
