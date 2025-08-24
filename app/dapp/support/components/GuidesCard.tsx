"use client";
import Image from "next/image";
import React from "react";

interface SupportCardProps {
  title: string;
  subtitle: string;
  // icon?: React.ReactNode;
  iconSrc?: string;
  // className?: string;
  onClick?: () => void;
}

export const SupportCard: React.FC<SupportCardProps> = ({
  title,
  subtitle,
  iconSrc,
  // icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-full rounded-xl bg-neutral-900 text-left border border-neutral-800 hover:border-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 transition"
    >
      <div className="flex flex-col gap-2 h-full">
        <div className="flex flex-col p-4 space-y-3">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-neutral-400">{subtitle}</p>
        </div>

        <div className="flex justify-end w-full">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={`${title} icon`}
              width={500}
              height={500}
            />
          )}
        </div>

        {/* or */}
        {/* {icon && (
            <div className="text-neutral-400  shadow-md shadow-dark-bg rounded-2xl md:h-[496px] md:w-[496px]  transition">
              {icon}
            </div>
          )} */}
      </div>
    </button>
  );
};

// Special GuidesCard version
export const GuidesCard = () => {
  return (
    <SupportCard
      title="Guides"
      subtitle="Read our setup guides and documentation"
      iconSrc="/community-image.png" // replace with actual icon path
      // icon={<span className="material-icons"></span>} // replace with SVG if available
      onClick={() => {
        console.log("Guides clicked!");
      }}
    />
  );
};
