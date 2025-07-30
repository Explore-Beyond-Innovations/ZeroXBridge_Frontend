"use client";
import { useState, useEffect } from "react";

type Theme = "dark" | "light"

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.localStorage) return;

    const storedTheme = localStorage.getItem("theme");

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const activeTheme = storedTheme || (prefersDark ? "dark" : "light");

    document.documentElement.classList.toggle("dark", activeTheme === "dark");

    setTheme(activeTheme as Theme);
  }, []);

  const changeTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return { theme, changeTheme };
};

export default useTheme;
