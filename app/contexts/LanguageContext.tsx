"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "../i18n-client";

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => Promise<void>;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);

  const changeLanguage = async (language: string) => {
    setIsLoading(true);
    try {
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
      if (typeof window !== "undefined") {
        localStorage.setItem("language", language);
      }
    } catch (error) {
      console.error("Error changing language:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize language from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage && ["en", "fr"].includes(savedLanguage)) {
        setCurrentLanguage(savedLanguage);
        i18n.changeLanguage(savedLanguage);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, changeLanguage, isLoading }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
