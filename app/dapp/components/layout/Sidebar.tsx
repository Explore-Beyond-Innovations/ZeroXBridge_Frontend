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
import { useTranslation } from "react-i18next";
import "../../../i18n-client"; // Initialize i18n on client side

function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const routes = [
    {
      label: t("navigation.dashboard"),
      href: "/dapp/dashboard",
      icon: HomeIcon,
    },
    { label: t("navigation.swap"), href: "/dapp/swap", icon: SwapIcon },
    {
      label: t("navigation.claimBurn"),
      href: "/dapp/claim-burn",
      icon: CryptoIcon,
    },
    {
      label: t("navigation.lockTokens"),
      href: "/dapp/lock-tokens",
      icon: LockIcon,
    },
    {
      label: t("navigation.analytics"),
      href: "/dapp/analytics",
      icon: PieChartIcon,
    },
    { label: "Coming Soon", href: "/dapp/coming-soon", icon: HourglassIcon },
  ];

  return (
    <div
      className={`bg-background z-50 absolute top-0 left-0 font-light h-full transition-transform duration-300
         w-full sm:w-[280px] lg:relative lg:translate-x-0 lg:w-fit
         ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-[24px] lg:p-[42px_30px_45px_40px] flex flex-col gap-y-[6px] items-stretch">
        {routes.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className={`flex justify-between items-center py-[10px] pl-3 pr-[6px] rounded-[8px] gap-x-[18px]  ${
                isActive
                  ? "text-sidebar-text-active border-[#F4F4F4] border-[1px] dark:border-none"
                  : "text-sidebar-text"
              }`}
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
                  isActive ? "" : "invisible"
                } bg-[#FFB0E8] backdrop-blur-[0.3px]`}
                style={{
                  boxShadow: isActive ? "0px 0px 11px 4px #F1BAE140" : "none",
                }}
              ></span>
            </Link>
          );
        })}
      </div>

      <div className="py-[10px] mt-14 sm:mt-2 pl-6 lg:pl-10 border-y-[1px] border-y-primary-border">
        <Link
          href="/dapp/settings"
          onClick={onClose}
          className={`flex justify-between items-center py-[10px] pl-3 pr-[6px] rounded-[8px] ${
            pathname === "/dapp/settings" ? "text-[#E0E0E0]" : "text-[#A4A4A4]"
          } w-[190px]`}
        >
          <div className="flex items-center gap-x-3">
            <SettingsIcon />
            <span>{t("navigation.settings")}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
