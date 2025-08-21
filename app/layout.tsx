import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, ConnectionProvider } from "./context";
import { LanguageProvider } from "./contexts/LanguageContext";

export const metadata: Metadata = {
  title: "ZeroXBridge",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-inter text-sm">
        <ThemeProvider>
          <ConnectionProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </ConnectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
