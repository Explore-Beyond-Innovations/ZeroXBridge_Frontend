"use client";

import { WagmiProvider } from "wagmi";
import { StarknetProvider } from "../context/starknet-provider";
import AppLayout from "./components/layout/AppLayout";
import { config } from "../config";
import { Toaster } from "sonner";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <WagmiProvider config={config}>
        <StarknetProvider>
          <AppLayout>{children}</AppLayout>
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
