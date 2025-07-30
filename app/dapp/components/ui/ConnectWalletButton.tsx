import { useWallet } from "@/app/hooks/useWallet";
import { BrokenLink } from "@/svg/BrokenLink";
import { Spinner } from "@/svg/Spinner";
import WalletIcon from "@/svg/WalletIcon";

const ConnectWalletButton = ({ fullWidth = false }) => {
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
    fullWidth ? "w-full py-4 rounded-xl" : ""
  }`;

  if (isConnected && shortAddress) {
    return (
      <button
        className={`${baseClasses} justify-between`}
        style={{
          backgroundImage: "var(--color-linear-primary-gradient)",
        }}
        onClick={handleClick}
        disabled={isConnecting}
      >
        <div className="flex items-center gap-x-2">
          <WalletIcon />
          <span className="inline-block text-sm font-normal">{shortAddress}</span>
        </div>
        <div className="border-l border-wallet-border pl-2 ml-2">
          {isConnecting ? <Spinner /> : <BrokenLink />}
        </div>
      </button>
    );
  }

  return (
    <button
      className={`${baseClasses} justify-center gap-x-2 ${
        isConnecting ? "cursor-not-allowed opacity-75" : ""
      }`}
      style={{
        backgroundImage: "var(--color-linear-primary-gradient)",
      }}
      onClick={handleClick}
      disabled={isConnecting}
    >
      {isConnecting ? <Spinner /> : <WalletIcon />}
      <span className="inline-block">
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </span>
    </button>
  );
};

export default ConnectWalletButton;
