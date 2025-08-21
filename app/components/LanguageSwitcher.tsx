"use client";

import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  isDarkMode?: boolean;
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  isDarkMode = false,
  className = "",
}) => {
  const { currentLanguage, changeLanguage, isLoading } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageChange = async () => {
    const newLanguage = currentLanguage === "en" ? "fr" : "en";
    await changeLanguage(newLanguage);
  };

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Globe
          className={`h-4 w-4 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        />
        <span
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          ...
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={handleLanguageChange}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
        isDarkMode
          ? "hover:bg-gray-800 text-gray-300 hover:text-white"
          : "hover:bg-gray-100 text-gray-700 hover:text-black"
      } ${className}`}
      title={t("language.switchLanguage")}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">
        {currentLanguage.toUpperCase()}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
