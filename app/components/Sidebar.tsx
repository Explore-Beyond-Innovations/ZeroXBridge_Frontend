import { useState } from "react";
import Image from "next/image";
import cog from "../../public/Cog.png";
import Chart from "../../public/Chart.png";
import Swap from "../../public/Swap.png";
import Claim from "../../public/Claim.png";
import Coins from "../../public/Coins.png";
import Dashboard from "../../public/dashboard.png";
import { cn } from "@/utils/cn";

interface SidebarProps {
    isDarkMode: boolean;
}

const Sidebar = ({ isDarkMode }: SidebarProps) => {
    const [activeTab, setActiveTab] = useState("Dashboard");

    return (
        <aside className={`w-80 ${isDarkMode ? "bg-[#09050E]" : "bg-white"} border-r-2 border-[#1F1333] h-full flex flex-col`}>
            <div className="flex-1 mt-6 flex flex-col items-start gap-2 pl-6">
                {[
                    { name: "Dashboard", icon: Dashboard },
                    { name: "Swap", icon: Swap },
                    { name: "Claim/Burn xZB Tokens", icon: Claim },
                    { name: "Lock Tokens", icon: Coins },
                    { name: "Analytics", icon: Chart },
                ].map((tab) => (
                    <div
                        key={tab.name}
                        className={cn(
                            "relative flex items-center gap-3 cursor-pointer px-4 py-3 w-[90%] transition-all duration-200 rounded-xl",
                            activeTab === tab.name
                                ? "bg-[#21192F] text-white shadow-[inset_-5px_0px_1px_-2px_#8f8d94]"
                                : "text-gray-400"
                        )}
                        onClick={() => setActiveTab(tab.name)}
                    >
                        <Image src={tab.icon} alt={tab.name} height={24} width={24} />
                        <p className="text-base font-light">{tab.name}</p>
                    </div>


                ))}
            </div>
            <div className="pl-6 pb-[70%] flex items-center gap-3">
                <Image src={cog} alt="settings" height={24} width={24} />
                <p className="text-gray-400 text-base font-light">Settings</p>
            </div>
        </aside>
    );
};

export default Sidebar;
