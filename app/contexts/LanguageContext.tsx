"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

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
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: string;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLanguage = "en",
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);
  const [isLoading, setIsLoading] = useState(true);

  const changeLanguage = async (language: string) => {
    try {
      setIsLoading(true);
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
      // Store the language preference in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("preferredLanguage", language);
      }
    } catch (error) {
      console.error("Failed to change language:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        // Check for stored language preference
        const storedLanguage =
          typeof window !== "undefined"
            ? localStorage.getItem("preferredLanguage")
            : null;

        const languageToUse = storedLanguage || initialLanguage;
        await i18n.changeLanguage(languageToUse);
        setCurrentLanguage(languageToUse);
      } catch (error) {
        console.error("Failed to initialize language:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLanguage();
  }, [initialLanguage]);

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
