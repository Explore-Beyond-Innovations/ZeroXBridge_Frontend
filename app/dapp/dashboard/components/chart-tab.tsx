"use client"

import { useState } from "react";

interface ChartTabsProps {
  tabs: { label: string; content: React.ReactNode }[];
}

export const ChartTabs = ({ tabs }: ChartTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex gap-x-4 mb-4">
        {tabs.map((tab, index) => (
          <p
            key={index}
            onClick={() => setActiveTab(index)}
            className={`
              text-sm cursor-pointer capitalize
              ${activeTab === index
                ? "font-medium text-[#4f4f4f] dark:text-[#fff]"
                : "font-normal text-[#dddddd] dark:text-[#4f4f4f]"}
            `}
          >
            {tab.label}
          </p>
        ))}
      </div>
      <div>{tabs[activeTab].content}</div>
    </div>
  );
};
