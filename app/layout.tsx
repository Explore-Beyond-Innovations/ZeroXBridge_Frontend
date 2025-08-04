import type { Metadata } from "next";
import { ConnectionProvider } from "@/app/context/ConnectionContext";
import { ThemeProvider } from "@/app/context/ThemeContext";
import "./globals.css";

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
          <ConnectionProvider>{children}</ConnectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
