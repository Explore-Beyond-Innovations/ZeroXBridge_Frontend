"use client";

import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "dark";

export interface ThemeContextValues {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValues | undefined>(
  undefined,
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const activeTheme = storedTheme || (prefersDark ? "dark" : "light");

    setTheme(activeTheme);
    updateHtmlClass(activeTheme);
  }, []);

  const updateHtmlClass = (newTheme: Theme) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  const isDark = useMemo(() => theme === "dark", [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    updateHtmlClass(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const contextValues: ThemeContextValues = {
    theme,
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValues}>
      {children}
    </ThemeContext.Provider>
  );
};
