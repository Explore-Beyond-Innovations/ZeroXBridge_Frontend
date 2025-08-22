import React from "react";
import { ThemeContext, ThemeContextValues } from "@/app/context";

export const useThemeContext = (): ThemeContextValues => {
  const context = React.useContext(ThemeContext);

  if (context === null) {
    throw new Error(
      "Theme context is missing. You probably forgot to wrap a route/component depending on theme in <ThemeProvider />",
    );
  }

  return context as ThemeContextValues;
};
