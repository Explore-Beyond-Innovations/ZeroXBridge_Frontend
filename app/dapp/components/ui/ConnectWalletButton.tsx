"use client";

import { BrokenLink } from "@/svg/BrokenLink";
import { Spinner } from "@/svg/Spinner";
import WalletIcon from "@/svg/WalletIcon";
import { GradientDirection, GradientWrapperPrimary } from "./Gradients";
import { useThemeContext } from "@/app/hooks/context";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useWallet } from "@/app/hooks/useWallet";

interface ConnectWalletButtonProps {
  full?: boolean;
  className?: string;
  /** Toggle gradient border wrapping */
  withGradient?: boolean;
  /** The direction of the gradient */
  gradientDirection?: GradientDirection;
  /** Make button thinner with reduced padding */
  thin?: boolean;
  /** Action of the button. If not provided, will open wallet modal by default */
  action?: () => void;
  isLoading?: boolean;
  isConnected?: boolean;
  walletAddress?: string | null;
  error?: string | null;
  /** prop to show the broken link icon */
  showBrokenLink?: boolean;
}

export const ConnectWalletButton = ({
  full,
  className = "",
  withGradient = true,
  gradientDirection,
  thin = false,
  action,
  isLoading,
  isConnected,
  walletAddress,
  error,
  showBrokenLink,
}: ConnectWalletButtonProps) => {
  const { isDark } = useThemeContext();

  // Pull defaults from the wallet hook, but allow props to override
  const wallet = useWallet(); // { isConnected, openWalletModal, ... }
  const resolvedIsConnected = useMemo(
    () => isConnected ?? wallet?.isConnected ?? false,
    [isConnected, wallet?.isConnected]
  );
  const resolvedWalletAddress = useMemo(
    () => walletAddress ?? wallet?.ethAddress ?? wallet?.strkAddress ?? null,
    [walletAddress, wallet?.ethAddress, wallet?.strkAddress]
  );
  const resolvedIsLoading = useMemo(
    () => isLoading ?? wallet?.ethConnecting ?? wallet?.strkConnecting ?? false,
    [isLoading, wallet?.ethConnecting, wallet?.strkConnecting]
  );
  const resolvedError = useMemo(
    () => error ?? wallet?.error ?? null,
    [error, wallet?.error]
  );

  useEffect(() => {
    if (resolvedError) toast.error(`Connection error: ${resolvedError}`);
  }, [resolvedError]);

  const handleClick = () => {
    // Use provided action if any; otherwise open the wallet modal from the hook
    const fallback = wallet?.openWalletModal;
    const fn = action ?? fallback;
    if (fn) fn();
  };

  const getPaddingAndRoundness = () => {
    if (thin) return "px-3 py-1 rounded-[6px]";
    if (full) return "py-4 rounded-[8px]";
    return "py-2 rounded-[8px]";
  };

  const baseClasses = `flex items-center justify-center px-3 ${getPaddingAndRoundness()} text-primary-text border border-wallet-border transition-all duration-200 hover:opacity-80 active:opacity-60 ${
    full ? "w-full" : ""
  } ${className}`;

  const getButtonContent = () => {
    if (resolvedIsLoading) {
      return (
        <div className="flex items-center justify-center gap-x-2">
          <Spinner />
          <span className="inline-block">Connecting...</span>
        </div>
      );
    }

    if (resolvedIsConnected) {
      return (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-2">
            <WalletIcon />
            <span className="inline-block text-sm font-normal">
              {resolvedWalletAddress}
            </span>
          </div>
          {showBrokenLink && (
            <div className="border-l border-wallet-border pl-2 ml-2">
              <BrokenLink />
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center gap-x-2">
        <WalletIcon />
        <span className="inline-block font-medium sm:text-[14px]">
          Connect Wallet
        </span>
      </div>
    );
  };

  const ButtonContent = (
    <button
      className={`${baseClasses} ${
        resolvedIsConnected ? "justify-between" : "justify-center gap-x-2"
      } ${isDark ? "bg-[var(--btn-bg)]" : "bg-white"} ${
        resolvedIsLoading ? "cursor-not-allowed opacity-75" : "cursor-pointer"
      } ${resolvedError ? "border-red-300" : ""}`}
      onClick={handleClick}
      disabled={resolvedIsLoading}
      title={
        resolvedIsConnected
          ? "Manage wallet connections"
          : "Connect your wallet"
      }
      type="button"
    >
      {getButtonContent()}
    </button>
  );

  return withGradient ? (
    <GradientWrapperPrimary
      gradientDirection={gradientDirection || "to-top"}
      borderRadius="rounded-xl"
      padding="p-[1px]"
      className={full ? "w-full" : ""}
    >
      {ButtonContent}
    </GradientWrapperPrimary>
  ) : (
    ButtonContent
  );
};
