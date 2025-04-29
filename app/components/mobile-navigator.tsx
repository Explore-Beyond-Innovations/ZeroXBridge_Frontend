import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Landmark, LayoutGrid } from "lucide-react";
import { PiChartPieSlice, PiCoins, PiSwap } from "react-icons/pi";
import { useTheme } from "../ThemeContext";

const NavigationBar = () => {
  const router = usePathname();
  const {isDarkMode} = useTheme()
  const currentPath = router;

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutGrid },
    { name: "Swap", path: "/dashboard/swap", icon: PiSwap },
    { name: "Claim", path: "/dashboard/claim-burn", icon: Landmark },
    { name: "Lock", path: "/dashboard/lock-liquidity", icon: PiCoins },
    { name: "Analytics", path: "/dashboard/analytics", icon: PiChartPieSlice },
  ];

  return (
    <div className={`fixed bottom-0 z-10 flex flex-col md:hidden w-full ${isDarkMode ? "bg-[#21192F]" : "bg-[#FBF9FF]"}  rounded-b rounded-3xl px-6 py-4 border-t border-[#A26DFF]`}>
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          const activeColor = "#A26DFF";
          const inactiveColor = isDarkMode ? "#D4D4D4" : "#53436D";
          
          const IconComponent = item.icon;

          return (
            <Link href={item.path} key={item.name}>
              <div className="flex flex-col items-center justify-center relative">
                {isActive && (
                  <div className="h-0.5 w-16 bg-[#A26DFF] absolute -top-4" />
                )}
                <div className="p-2 rounded-lg mb-1">
                  <IconComponent 
                    className={`w-[24px] h-[24px]`}
                    color={isActive ? activeColor : inactiveColor}
                  />
                </div>
                <span
                  className={`text-[14px] ${
                    isActive ? "text-[#A26DFF]" : `text-[${inactiveColor}]`
                  }`}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationBar;