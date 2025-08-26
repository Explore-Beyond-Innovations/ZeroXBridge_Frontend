"use client";
import { WagmiProvider } from "wagmi";
import { StarknetProvider } from "../context/starknet-provider";
import AppLayout from "./components/layout/AppLayout";
import { config } from "../config";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const comingSoon = pathname === "/dapp/coming-soon";
  const contactPage = pathname === "/dapp/support/contact";
  
  return (
    <>
      <WagmiProvider config={config}>
        <StarknetProvider>
          {contactPage ? (
            // Contact page gets no AppLayout (no sidebar)
            children
          ) : (
            // All other pages get the AppLayout with sidebar
            <AppLayout layoutPadding={comingSoon ? false : true}>
              {children}
            </AppLayout>
          )}
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

export default Layout;