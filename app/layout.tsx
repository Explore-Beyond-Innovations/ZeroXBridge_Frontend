import type { Metadata } from "next";
import { ConnectionProvider } from "@/app/context/ConnectionContext";
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
        <ConnectionProvider>{children}</ConnectionProvider>
      </body>
    </html>
  );
}
