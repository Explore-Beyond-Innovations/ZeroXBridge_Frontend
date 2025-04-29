'use client'
import Swap from '@/app/components/swap'
import { useTheme } from '@/app/ThemeContext'
import React from 'react'

const SwapPage = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`flex flex-col items-center justify-center h-fit lg:h-full w-full ${
      isDarkMode ? "bg-[#09050E]" : "bg-white"
    }`}>
    <Swap />
    </div>
  )
}

export default SwapPage