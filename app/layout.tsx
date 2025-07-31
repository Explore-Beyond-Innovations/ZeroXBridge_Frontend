import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./ThemeContext";

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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
