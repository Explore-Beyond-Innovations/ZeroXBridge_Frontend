import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Chart from "../../public/Chart.png";
import Swap from "../../public/Swap.png";
import Claim from "../../public/Claim.png";
import Coins from "../../public/Coins.png";
import Dashboard from "../../public/dashboard.png";
import Image from "next/image";

const NavigationBar = () => {
  const router = usePathname();
  const currentPath = router;

  // Navigation items with their respective paths and icons
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Dashboard },
    { name: "Swap", path: "/dashboard/swap", icon: Swap },
    { name: "Claim", path: "/dashboard/claim-burn", icon: Claim },
    { name: "Lock", path: "/dashboard/lock-liquidity", icon: Coins },
    { name: "Analytics", path: "/dashboard/analytics", icon: Chart },
  ];

  return (
    <div className="fixed bottom-0 w-full flex md:hidden bg-[#21192F] rounded-b rounded-3xl px-6 py-3 border-t border-[#A26DFF] h-[99px]">
      <div className="flex justify-between items-center w-full h-full">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;

          return (
            <Link href={item.path} key={item.name}>
              <div className="flex flex-col items-center justify-center">
                {isActive && (
                  <div className="h-1 w-16 bg-[#A26DFF] mt-2 rounded-t-lg" />
                )}
                <div
                  className={`p-2 rounded-lg mb-1 ${
                    isActive ? "text-[#A26DFF]" : ""
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt="navigator"
                    width={500}
                    height={500}
                    className={`${
                      isActive ? "text-[#A26DFF]" : "text-gray-400"
                    } w-[24px] h-[24px]`}
                  />
                </div>
                <span
                  className={`text-[14px] ${
                    isActive ? "text-[#A26DFF]" : "text-gray-400"
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
