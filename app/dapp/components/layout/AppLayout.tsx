"use client";

import React, { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
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
        <div className="flex-1 h-full overflow-y-auto text-primary-text">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
