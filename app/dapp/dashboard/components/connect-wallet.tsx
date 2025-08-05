import { useWallet } from "@/app/hooks";
import { DialogBase } from "../../components/ui/Dailog";
import Image from "next/image";
import { ConnectWalletButton } from "../../components/ui/ConnectWalletButton";
import { ConnectedWallet } from "./connected-wallet";

interface WalletProps {
  walletName: string;
  assetLogo: string;
  isWalletConnected: boolean;
  walletAddress: string;
  walletPlatform?: string;
  walletPlatformLogo?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onCopy?: () => void;
}

const WalletItem = ({
  assetLogo,
  isWalletConnected,
  walletAddress,
  walletPlatform,
  walletPlatformLogo,
  onDisconnect,
  onCopy,
}: WalletProps) => {
  return (
    <div className="bg-[#F5F5F5] dark:bg-card rounded-[8px] w-full flex gap-x-4 p-4 items-center border-[#EFEFEF] dark:border-[#202020]">
      <div className="flex items-center justify-center w-[50px] h-[50px] p-1 rounded-full bg-[#FFFFFF] dark:bg-[var(--toggle-slider-bg)]">
        <Image src={assetLogo} height={28} width={28} alt="Asset Logo" />
      </div>
      <div className="flex flex-col gap-y-2 flex-1">
        <div className="flex items-center gap-x-2">
          <p className="text-[#4B4B4B] dark:text-[#c3c3c3] text-xs">Status:</p>
          <div
            className={`w-2 h-2 rounded-full ${isWalletConnected ? "bg-[#32B289]" : "bg-[#D9D9D9]"}`}
          />
          <span className="text-[#4B4B4B] dark:text-[#c3c3c3] text-xs">
            {isWalletConnected ? "Connected" : "Not connected"}
          </span>
        </div>

        {isWalletConnected ? (
          <ConnectedWallet
            address={walletAddress}
            walletPlatform={walletPlatform ?? ""}
            onCopy={onCopy}
            onDisconnect={onDisconnect}
            walletPlatformLogo={walletPlatformLogo ?? "/ready-wallet.svg"}
          />
        ) : (
          <ConnectWalletButton full withGradient={false} thin />
        )}
      </div>
    </div>
  );
};

export const ConnectWalletModal = () => {
  const {
    isWalletModalOpen,
    isConnected,
    disconnectWallet,
    connectWallet,
    closeWalletModal,
    shortAddress,
    address,
  } = useWallet();

  const copyWalletAddress = async (address: string) => {
    if (!address) return;
    try {
      navigator.clipboard.writeText(address);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogBase
      isOpen={isWalletModalOpen}
      onClose={closeWalletModal}
      title="Select a Network"
      className="p-6"
      size="lg"
      addCloseBtn
    >
      <div className="flex flex-col gap-y-3 pt-4">
        <div className="flex flex-col gap-y-1">
          <p className="font-mono font-normal text-xs text-[#1E1E1E] dark:text-[#F4F4F4]">
            ETH Wallet
          </p>
          <WalletItem
            walletAddress={shortAddress || "0x031f8...0451a87"}
            walletName="ETH Wallet"
            assetLogo="/token-logos/eth-logo.svg"
            isWalletConnected={isConnected}
            onDisconnect={disconnectWallet}
            onConnect={connectWallet}
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <p className="font-mono font-normal text-xs text-[#1E1E1E] dark:text-[#F4F4F4]">
            STRK Wallet
          </p>
          <WalletItem
            walletName="STRK Wallet"
            assetLogo="/token-logos/strk-logo.svg"
            isWalletConnected={true} // we'll change this later. just need it to match the design
            walletAddress={shortAddress || "0x031f8...0451a87"}
            walletPlatform="ReadyWallet"
            walletPlatformLogo="/ready-wallet.svg"
            onConnect={connectWallet}
            onDisconnect={disconnectWallet}
            onCopy={() => copyWalletAddress(address as string)}
          />
        </div>
      </div>
    </DialogBase>
  );
};
