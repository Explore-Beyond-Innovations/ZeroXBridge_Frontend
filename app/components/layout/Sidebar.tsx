"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@/svg/HomeIcon";
import SwapIcon from "@/svg/SwapIcon";
import CryptoIcon from "@/svg/CryptoIcon";
import LockIcon from "@/svg/LockIcon";
import PieChartIcon from "@/svg/PieChartIcon";
import HourglassIcon from "@/svg/HourglassIcon";
import SettingsIcon from "@/svg/SettingsIcon";

const routes = [
  { label: "Dashboard", href: "/dapp/dashboard", icon: HomeIcon },
  { label: "Swap", href: "/dapp/swap", icon: SwapIcon },
  { label: "Claim/Burn Tokens", href: "/dapp/claim-burn", icon: CryptoIcon },
  { label: "Lock Tokens", href: "/dapp/lock-tokens", icon: LockIcon },
  { label: "Analytics", href: "/dapp/analytics", icon: PieChartIcon },
  { label: "Coming Soon", href: "/dapp/coming-soon", icon: HourglassIcon },
];

function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <div
      className={`lg:border-r-primary-border bg-background lg:border-r-[1px] w-full lg:w-fit z-50 md:relative absolute top-0 left-0 h-full transition-transform duration-300 md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-[24px] lg:p-[42px_30px_45px_40px] flex flex-col gap-y-[6px]">
        {routes.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className={`flex justify-between items-center py-[10px] pl-3 pr-[6px] rounded-[8px] ${
                isActive ? "text-sidebar-text-active" : "text-sidebar-text"
              } w-full lg:w-[190px]`}
              style={
                isActive
                  ? {
                      backgroundImage: "var(--linear-primary-gradient)",
                      boxShadow: "0px 1px 2px 0px #78787840 inset",
                    }
                  : {}
              }
            >
              <div className="flex items-center gap-x-3">
                <Icon />
                <span>{label}</span>
              </div>
              <span
                className={`w-[2px] h-[18px] rounded-full ${
                  isActive ? "" : "hidden"
                } bg-[#FFB0E8] backdrop-blur-[0.3px]`}
                style={{
                  boxShadow: isActive ? "0px 0px 11px 4px #F1BAE140" : "none",
                }}
              ></span>
            </Link>
          );
        })}
      </div>

      <div className="py-[10px] pl-6 lg:pl-10 border-y-[1px] border-y-primary-border">
        <Link
          href="/dapp/settings"
          onClick={onClose}
          className={`flex justify-between items-center py-[10px] pl-3 pr-[6px] rounded-[8px] ${
            pathname === "/dapp/settings" ? "text-[#E0E0E0]" : "text-[#A4A4A4]"
          } w-[190px]`}
        >
          <div className="flex items-center gap-x-3">
            <SettingsIcon />
            <span>Settings</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
