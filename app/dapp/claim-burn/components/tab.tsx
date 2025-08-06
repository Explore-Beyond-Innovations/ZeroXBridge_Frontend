'use client';

import { useThemeContext } from '@/app/hooks/context';
import React from 'react';

interface ClaimBurnTabProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const ClaimBurnTab = ({
  activeTab,
  setActiveTab,
}: ClaimBurnTabProps) => {
  const { isDark } = useThemeContext();
  return (
    <div className='flex justify-center mb-8 relative'>
      <div
        className={`relative inline-flex items-center rounded-full p-1 ${
          isDark
            ? 'bg-[#1c1c1c] border border-[#202020]'
            : 'bg-[var(--toggle-bg)] border border-[var(--toggle-slider-border)]'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] rounded-full transition-transform duration-300 ease-in-out ${
            isDark ? 'bg-[#2e2e2e]' : 'bg-white'
          }`}
          style={{
            transform:
              activeTab === 'claim' ? 'translateX(0)' : 'translateX(100%)',
          }}
        />

        <button
          onClick={() => setActiveTab('claim')}
          className={`relative z-10 px-6 py-2 rounded-full transition-all duration-200 ${
            activeTab === 'claim'
              ? isDark
                ? 'text-white'
                : 'text-[#303030]'
              : isDark
              ? 'text-[#a4a4a4] hover:text-white'
              : 'text-[#909090] hover:text-[#303030]'
          }`}
        >
          Claim xZB
        </button>

        <button
          onClick={() => setActiveTab('burn')}
          className={`relative z-10 px-6 py-2 rounded-full transition-all duration-200 ${
            activeTab === 'burn'
              ? isDark
                ? 'text-white'
                : 'text-[#303030]'
              : isDark
              ? 'text-[#a4a4a4] hover:text-white'
              : 'text-[#909090] hover:text-[#303030]'
          }`}
        >
          Burn xZB
        </button>
      </div>
    </div>
  );
};
