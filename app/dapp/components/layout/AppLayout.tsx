"use client";

import React, { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { ConnectWalletModal } from "../../dashboard/components/connect-wallet";
import { usePathname } from "next/navigation";
import { ComingSoonFooter } from "./Footer";

interface AppLayoutProps {
  children: React.ReactNode;
  /** the comming soon page has a different layout interms of spacing
   * the gradient banner touches the edges of it parent, the app layout.
   * with the current setup/style of the AppLayout, we need to have an optional prop
   * to help ud sepcifiy whether to use the default padding or not.
   */
  layoutPadding?: boolean;
}

function AppLayout({ children, layoutPadding = true }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isComingSoon = pathname === "/dapp/coming-soon";

  return (
    <>
      <div className="h-[100vh] flex flex-col bg-background">
        <Topbar
          onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="flex flex-1 relative overflow-y-hidden">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <div
            className={`flex-1 h-full relative overflow-y-auto ${
              layoutPadding ? "p-[22px] pt-10" : ""
            }  text-primary-text`}
          >
            {children}

            {isComingSoon && <ComingSoonFooter />}
          </div>
        </div>
      </div>
      <ConnectWalletModal />
    </>
  );
}

export default AppLayout;
