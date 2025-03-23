'use client'
import React from "react";
import LiquidityLockTable from "@/app/components/lock-liquidity";
import { useTheme } from "@/app/ThemeContext";

const LockTokens = () => {
  const {isDarkMode} = useTheme();
  return (
    <>
      <LiquidityLockTable isDarkMode={isDarkMode} />
    </>
  );
}

export default LockTokens
