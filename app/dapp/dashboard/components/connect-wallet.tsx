import { useWallet } from "@/app/hooks";
import { DialogBase } from "../../components/ui/Dailog";
import Image from "next/image";
import { ConnectWalletButton } from "../../components/ui/ConnectWalletButton";
import { ConnectedWallet } from "./connected-wallet";
import { useCallback, useEffect, useState } from "react";
import { getInjectedStarknetWallets, shortenAddress } from "@/lib/utils";
import { toast } from "sonner";
import { Network } from "@/app/store/wallet";
import { StarknetConnectorId, StarknetProviders } from "@/lib/connectors";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

interface WalletProps {
  walletName: string;
  assetLogo: string;
  isWalletConnected: boolean;
  walletAddress: string;
  walletPlatform?: string;
  walletPlatformLogo?: string;
  onDisconnect?: () => void;
  onCopy?: () => void;
  network: Network;
  isConnecting?: boolean;
}

// we can add more state union here and export later
type State = "loading" | "connecting" | "pending" | "idle" | "failed";

const WalletItem = ({
  assetLogo,
  isWalletConnected,
  walletAddress,
  walletPlatform,
  walletPlatformLogo,
  onCopy,
  onDisconnect,
  network,
  isConnecting = false,
}: WalletProps) => {
  const [state, setState] = useState<State>("idle");
  const { connectEthWallet, connectStrkWallet, error } = useWallet();
  // the provider type is quite verbose, that's why i'm using a shallow cast
  const [walletProviders, setWalletProviders] = useState<StarknetProviders[]>(
    [],
  );

  const handleConnect = useCallback(async () => {
    try {
      setState("connecting");

      if (network === "ETH") {
        await connectEthWallet("injected");
      } else if (network === "STRK") {
        const providers = getInjectedStarknetWallets();
        setWalletProviders(providers.map((p) => p.provider));

        if (providers.length === 0) {
          console.error("No StarkNet wallets found");
          toast.error("No StarkNet wallets found");
          return;
        }

        if (providers.length === 1) {
          await connectStrkWallet(providers[0].provider.id);
        }
      }
    } catch (err) {
      console.error("Connection error:", err);
      toast.error("Failed to connect wallet");
    } finally {
      setState("idle");
    }
  }, [network, connectEthWallet, connectStrkWallet]);

  useEffect(() => {
    if (network === "STRK") {
      const providers = getInjectedStarknetWallets();
      setWalletProviders(providers.map((p) => p.provider));
    }
  }, [network]);

  return (
    <div className="bg-[#F5F5F5] dark:bg-card rounded-[8px] w-full flex gap-x-4 p-4 items-center border border-[#EFEFEF] dark:border-[#202020]">
      <div className="flex items-center justify-center w-[50px] h-[50px] p-1 rounded-full bg-[#FFFFFF] dark:bg-[var(--toggle-slider-bg)]">
        <Image src={assetLogo} height={28} width={28} alt="Asset Logo" />
      </div>

      <div className="flex flex-col gap-y-2 flex-1">
        <div className="flex items-center gap-x-2">
          <p className="text-[#4B4B4B] dark:text-[#c3c3c3] text-xs">Status:</p>
          <div
            className={`w-2 h-2 rounded-full ${
              isConnecting
                ? "bg-yellow-500 animate-pulse"
                : isWalletConnected
                  ? "bg-[#32B289]"
                  : "bg-[#D9D9D9]"
            }`}
          />
          <span className="text-[#4B4B4B] dark:text-[#c3c3c3] text-xs">
            {isConnecting
              ? "Connecting..."
              : isWalletConnected
                ? "Connected"
                : "Not connected"}
          </span>
        </div>

        {error && !isWalletConnected && (
          <p className="text-red-500 text-xs">{error}</p>
        )}

        {isWalletConnected ? (
          <ConnectedWallet
            address={walletAddress}
            walletPlatform={walletPlatform ?? ""}
            onCopy={onCopy}
            onDisconnect={onDisconnect}
            walletPlatformLogo={walletPlatformLogo ?? "/ready-wallet.svg"}
          />
        ) : walletProviders.length > 1 ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-x-2  w-full justify-between text-xs text-primary-text bg-white dark:bg-[var(--btn-bg)] border border-wallet-border rounded px-2 py-1 hover:opacity-80"
                onClick={(e) => e.stopPropagation()}
              >
                Select Wallet
                <ChevronDownIcon />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="bottom"
              align="start"
              className="w-40 lg:w-64 bg-card border-card-border border-[0.5px] mt-2"
            >
              {walletProviders.map((provider) => (
                <DropdownMenuItem
                  key={provider.id}
                  className="flex items-center gap-x-2 px-2 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded text-sm"
                  onSelect={async () => {
                    setState("connecting");
                    await connectStrkWallet(provider?.id as StarknetConnectorId);
                    setState("idle");
                  }}
                >
                  <Image
                    src={provider.icon}
                    alt={provider.name}
                    width={16}
                    height={16}
                    className="rounded"
                  />
                  {provider.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <ConnectWalletButton
            full
            thin
            withGradient={false}
            action={handleConnect}
            isLoading={state === "connecting"}
            isConnected={isWalletConnected}
            walletAddress={walletAddress ? shortenAddress(walletAddress) : null}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export const ConnectWalletModal = () => {
  const {
    isWalletModalOpen,
    closeWalletModal,
    ethAddress,
    ethConnected,
    ethConnecting,
    strkAddress,
    strkConnected,
    strkConnecting,
    disconnectEthWallet,
    disconnectStrkWallet,
    ethPlatformLogo,
    ethPlatformName,
    strkPlatformName,
    strkPlatformLogo,
  } = useWallet();

  const copyWalletAddress = useCallback(async (address: string) => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      toast.success("Wallet address copied!");
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  }, []);

  const handleCopyEthAddress = useCallback(() => {
    if (ethAddress) {
      copyWalletAddress(ethAddress);
    }
  }, [ethAddress, copyWalletAddress]);

  const handleCopyStrkAddress = useCallback(() => {
    if (strkAddress) {
      copyWalletAddress(strkAddress);
    }
  }, [strkAddress, copyWalletAddress]);

  return (
    <DialogBase
      isOpen={isWalletModalOpen}
      onClose={closeWalletModal}
      title="Connect Wallet"
      className="p-6"
      size="lg"
      addCloseBtn
    >
      <div className="flex flex-col gap-y-4 pt-4">
        <div className="flex flex-col gap-y-2">
          <p className="font-mono font-normal text-xs text-[#1E1E1E] dark:text-[#F4F4F4]">
            ETH Wallet
          </p>
          <WalletItem
            network="ETH"
            walletAddress={
              shortenAddress(ethAddress as string) || "0x0000...0000"
            }
            walletName="ETH Wallet"
            assetLogo="/token-logos/eth-logo.svg"
            isWalletConnected={ethConnected}
            isConnecting={ethConnecting}
            walletPlatform={ethPlatformName ?? ""}
            walletPlatformLogo={ethPlatformLogo ?? "/wallet-logos/metamask.svg"}
            onDisconnect={disconnectEthWallet}
            onCopy={handleCopyEthAddress}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="font-mono font-normal text-xs text-[#1E1E1E] dark:text-[#F4F4F4]">
            STRK Wallet
          </p>
          <WalletItem
            network="STRK"
            walletName="STRK Wallet"
            assetLogo="/token-logos/strk-logo.svg"
            isWalletConnected={strkConnected}
            isConnecting={strkConnecting}
            walletAddress={
              shortenAddress(strkAddress as string) || "0x0000...0000"
            }
            walletPlatform={strkPlatformName ?? ""}
            walletPlatformLogo={strkPlatformLogo ?? "/wallet-logos/read.svg"}
            onDisconnect={disconnectStrkWallet}
            onCopy={handleCopyStrkAddress}
          />
        </div>
      </div>
    </DialogBase>
  );
};
