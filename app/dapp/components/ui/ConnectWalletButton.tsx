import { useWallet } from "@/app/hooks/useWallet";
import { BrokenLink } from "@/svg/BrokenLink";
import { Spinner } from "@/svg/Spinner";
import WalletIcon from "@/svg/WalletIcon";
import { GradientDirection, GradientWrapperPrimary } from "./Gradients";

interface ConnectWalletButtonProps {
  full?: boolean;
  className?: string;
  /** Toggle gradient border wrapping */
  withGradient?: boolean;
  /** The direction of the gradient */
  gradientDirection?: GradientDirection
}

export const ConnectWalletButton = ({
  full,
  className = "",
  withGradient = true,
  gradientDirection,
}: ConnectWalletButtonProps) => {
  const {
    connectWallet,
    disconnectWallet,
    isConnected,
    isConnecting,
    shortAddress,
  } = useWallet();

  const handleClick = async () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      await connectWallet();
    }
  };

  const baseClasses = `flex items-center px-3 py-[10px] rounded-[8px] text-primary-text border border-wallet-border transition-all duration-200 hover:opacity-80 active:opacity-60 ${
    full ? "w-full py-4 rounded-xl" : ""
  } ${className}`;

  const ButtonContent = (
    <button
      className={`${baseClasses} ${
        isConnected ? "justify-between" : "justify-center gap-x-2"
      } bg-[var(--btn-bg)] ${
        isConnecting && !isConnected ? "cursor-not-allowed opacity-75" : ""
      }`}
      onClick={handleClick}
      disabled={isConnecting}
    >
      {isConnected && shortAddress ? (
        <>
          <div className="flex items-center gap-x-2">
            <WalletIcon />
            <span className="inline-block text-sm font-normal">
              {shortAddress}
            </span>
          </div>
          <div className="border-l border-wallet-border pl-2 ml-2">
            {isConnecting ? <Spinner /> : <BrokenLink />}
          </div>
        </>
      ) : (
        <>
          {isConnecting ? <Spinner /> : <WalletIcon />}
          <span className="inline-block">
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </span>
        </>
      )}
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
