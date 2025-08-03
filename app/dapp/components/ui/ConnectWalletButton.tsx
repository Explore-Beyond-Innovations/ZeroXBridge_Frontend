import { BrokenLink } from "@/svg/BrokenLink";
import { Spinner } from "@/svg/Spinner";
import WalletIcon from "@/svg/WalletIcon";
import { GradientDirection, GradientWrapperPrimary } from "./Gradients";
import { useThemeContext } from "@/app/hooks/context";
import { useEffect } from "react";
import { toast } from "sonner";

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
  isLoading = false,
  isConnected = false,
  walletAddress = null,
  error = null,
  showBrokenLink,
}: ConnectWalletButtonProps) => {
  const { isDark } = useThemeContext();

  useEffect(() => {
    if (error) {
      toast.error(`Connection error: ${error}`);
    }
  }, [error]);



  const handleClick = () => {
    if (action) {
      action();
    }
  };

  const getPaddingAndRoundness = () => {
    if (thin) {
      return "px-3 py-1 rounded-[6px]";
    }
    if (full) {
      return "py-4 rounded-[8px]";
    }
    return "py-2 rounded-[8px]";
  };

  const baseClasses = `flex items-center justify-center px-3 ${getPaddingAndRoundness()} text-primary-text border border-wallet-border transition-all duration-200 hover:opacity-80 active:opacity-60 ${
    full ? "w-full" : ""
  } ${className}`;

  const getButtonContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center gap-x-2">
          <Spinner />
          <span className="inline-block">Connecting...</span>
        </div>
      );
    }

    if (isConnected) {
      return (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-2">
            <WalletIcon />
            <span className="inline-block text-sm font-normal">
              {walletAddress}
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
        <span className="inline-block">Connect Wallet</span>
      </div>
    );
  };

  const ButtonContent = (
    <button
      className={`${baseClasses} ${
        isConnected ? "justify-between" : "justify-center gap-x-2"
      } ${isDark ? "bg-[var(--btn-bg)]" : "bg-white"} ${
        isLoading ? "cursor-not-allowed opacity-75" : "cursor-pointer"
      } ${error ? "border-red-300" : ""}`}
      onClick={handleClick}
      disabled={isLoading}
      title={isConnected ? "Manage wallet connections" : "Connect your wallet"}
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
