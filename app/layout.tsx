import type { Metadata } from "next";
import "./globals.css";
import StarknetProvider from "./dapp/components/Starknet-provider";

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
        <StarknetProvider>
          {children}
        </StarknetProvider>
      </body>
    </html>
  );
}
