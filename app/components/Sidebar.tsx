'use client'
import { useState } from "react";
import Image from "next/image";
import Chart from "../../public/Chart.png";
import Swap from "../../public/Swap.png";
import Claim from "../../public/Claim.png";
import Coins from "../../public/Coins.png";
import Dashboard from "../../public/dashboard.png";
import { cn } from "@/utils/cn";
import { useTheme } from '../ThemeContext';
import { Settings } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
    const { isDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState("Dashboard");

    return (
        <aside className={`mt-24 w-80 ${isDarkMode ? "bg-[#09050E] border-[#1F1333]" : "bg-white border-none"} border-r-2  h-screen flex flex-col fixed`}>
            <div className="flex-1 mt-6 flex flex-col items-start gap-2 pl-6">
                {[
                    { name: "Dashboard", icon: Dashboard, url: '/dashboard' },
                    { name: "Swap", icon: Swap,url: '/dashboard/swap'  },
                    { name: "Claim/Burn xZB Tokens", icon: Claim, url: '/dashboard/claim-burn' },
                    { name: "Lock Tokens", icon: Coins, url: '/dashboard/lock-liquidity' },
                    { name: "Analytics", icon: Chart, url: '/dashboard/analytics' },
                ].map((tab) => (
                    <Link key={tab.name} href={tab.url}  className={cn(
                        "relative flex items-center gap-3 cursor-pointer px-4 py-3 w-[90%] transition-all duration-200 rounded-xl",
                        activeTab === tab.name
                            ? `shadow-[inset_-5px_0px_1px_-2px_#8f8d94] ${isDarkMode ? 'bg-[#21192F] text-white ' : 'bg-[#ECE1FF] text-black'}`
                            : "text-gray-400"
                    )}>
                    <div className="flex gap-4 w-full h-full"
                        onClick={() => setActiveTab(tab.name)}
                    >
                        <Image src={tab.icon} alt={tab.name} height={24} width={24} />
                        <p className={` font-light ${isDarkMode ? 'text-white' : 'text-black'}`}>{tab.name}</p>
                    </div>
                    </Link>


                ))}
            </div>
            <div className="pl-6 pb-[70%] flex items-center gap-3">
                <Settings size={24} className={`${isDarkMode ? 'text-white' : 'text-black'}`} />
                {/* <Image src={cog} alt="settings" height={24} width={24} /> */}
                <p className={`font-light ${isDarkMode ? 'text-white' : 'text-black'}`}>Settings</p>
            </div>
        </aside>
    );
};

export default Sidebar;
