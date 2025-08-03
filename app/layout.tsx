import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, ConnectionProvider } from "./context";

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
