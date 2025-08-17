"use client";

import { WagmiProvider } from "wagmi";
import { StarknetProvider } from "../context/starknet-provider";
import AppLayout from "./components/layout/AppLayout";
import { config } from "../config";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const comingSoon = pathname === "/dapp/coming-soon";
  return (
    <>
      <WagmiProvider config={config}>
        <StarknetProvider>
          <AppLayout layoutPadding={comingSoon ? false : true}>
            {children}
          </AppLayout>
        </StarknetProvider>
      </WagmiProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            toast: "!bg-card !border !border-primary-border",
          },
          style: {
            color: "var(--toast-text-color)",
          },
        }}
      />
    </>
  );
}

export default layout;
