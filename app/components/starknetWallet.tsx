/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useConnect } from "@starknet-react/core";
import { ChevronLeft, RefreshCw } from "lucide-react";
import { useWalletConnection } from "@/app/hooks/useWalletConnection";
import WalletErrorComponent from "./WalletError";
import WalletLoader from "./WalletLoader";
import WalletEmptyState from "./WalletEmptyState";
import WalletRecommendations from "./WalletRecommendations";
import { 
  getAvailableWallets, 
  getInstalledWallets, 
  getMissingWallets,
  hasAnyWalletsInstalled,
  checkWalletInstallation 
} from "@/app/utils/walletDetection";

interface ConnectModalProps {
  onBack: () => void;
  onConnectionStateChange?: (isConnecting: boolean) => void;
}

export default function ConnectModal({
  onBack,
  onConnectionStateChange
}: ConnectModalProps) {
  // StarkNet React hooks
  const { connectors } = useConnect();
  const { 
    isConnecting, 
    error, 
    connectWallet, 
    clearError
  } = useWalletConnection('starknet');

  const [selectedConnector, setSelectedConnector] = useState<any>(null);
  const [walletDetection, setWalletDetection] = useState(() => checkWalletInstallation());
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Notify parent of connection state changes
  useEffect(() => {
    onConnectionStateChange?.(isConnecting);
  }, [isConnecting, onConnectionStateChange]);

  // Get wallet information
  const availableWallets = getAvailableWallets('starknet');
  const installedWallets = getInstalledWallets('starknet');
  const missingWallets = getMissingWallets('starknet');
  const hasWallets = hasAnyWalletsInstalled('starknet');

  // Refresh wallet detection
  const refreshWalletDetection = () => {
    setWalletDetection(checkWalletInstallation());
    // Force re-render of connectors
    window.location.reload();
  };


  const handleWalletConnect = async (wallet: any) => {
    try {
      setSelectedConnector(wallet);
      await connectWallet(wallet);
      onBack(); // Close modal on success
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleRetry = () => {
    if (selectedConnector) {
      handleWalletConnect(selectedConnector);
    }
  };

 

  // Show empty state if no wallets are available
  if (!hasWallets && connectors.length === 0) {
    return (
      <div className="space-y-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ChevronLeft size={20} />
          <span>Back to options</span>
        </button>

        <WalletEmptyState
          category="starknet"
          availableWallets={availableWallets}
          onRefresh={refreshWalletDetection}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        disabled={isConnecting}
      >
        <ChevronLeft size={20} />
        <span>Back to options</span>
      </button>

      {/* Error Display */}
      {error && (
        <WalletErrorComponent
          error={error}
          walletName={selectedConnector?.name}
          onRetry={handleRetry}
          onDismiss={clearError}
          className="mb-4"
        />
      )}

      {/* Title */}
      <h2 className="text-white text-xl font-semibold mb-2 text-center">
        Select a wallet
      </h2>

      {/* Subtitle */}
      <p className="font-[400] text-[12px] text-white mb-6 text-center justify-center">
        Securely authenticate &amp; start earning.
      </p>

      {/* Wallet Recommendations Toggle */}
      {(missingWallets.length > 0 || installedWallets.length > 0) && (
        <button
          onClick={() => setShowRecommendations(!showRecommendations)}
          className="w-full flex items-center justify-between p-2 text-sm text-gray-400 hover:text-white transition-colors mb-2"
        >
          <span>Wallet Status ({installedWallets.length} installed)</span>
          <span className={`transition-transform ${showRecommendations ? 'rotate-180' : ''}`}>▼</span>
        </button>
      )}

      {/* Wallet Recommendations */}
      {showRecommendations && (
        <WalletRecommendations
          installedWallets={installedWallets}
          missingWallets={missingWallets}
          category="starknet"
          className="mb-4"
        />
      )}

      {/* Loading State Overlay */}
      {isConnecting && (
        <div className="mb-4 p-4 rounded-lg bg-[#291A43]/50 border border-[#A26DFF]/20">
          <WalletLoader 
            size="md" 
            message={`Connecting to ${selectedConnector?.name || 'wallet'}...`}
          />
          <p className="text-xs text-gray-400 text-center mt-2">
            Please check your wallet and approve the connection
          </p>
        </div>
      )}

      {/* Wallet List */}
      <div className="flex flex-col space-y-2">
        {connectors.map((wallet, idx) => {
          const isCurrentlyConnecting = isConnecting && selectedConnector?.id === wallet.id;
          
          return (
            <div key={wallet.id}>
              <button
                onClick={() => handleWalletConnect(wallet)}
                disabled={isConnecting}
                className={`
                  w-full flex items-center gap-3 p-3 text-white mb-3 
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                  ${isCurrentlyConnecting 
                    ? 'bg-[#A26DFF]/20 border border-[#A26DFF]/30' 
                    : 'hover:bg-[#393B3D]'
                  }
                `}
              >
                {isCurrentlyConnecting ? (
                  <WalletLoader size="sm" message="" />
                ) : (
                  <Image
                    src={
                      typeof wallet.icon === "object"
                        ? wallet.icon.dark
                        : wallet.icon
                    }
                    alt={wallet.name || "Unknown Wallet"}
                    height={24}
                    width={24}
                  />
                )}
                <span className="text-sm font-medium">{wallet.name}</span>
                {isCurrentlyConnecting && (
                  <span className="text-xs text-[#A26DFF] ml-auto">Connecting...</span>
                )}
              </button>

              {/* Divider between wallet items, except after last one */}
              {idx < connectors.length - 1 && (
                <hr className="border-t border-[#D9D9D957]" />
              )}
            </div>
          );
        })}
      </div>

      {/* Refresh Detection */}
      {connectors.length === 0 && (
        <div className="text-center py-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 mb-3">
            Wallet not appearing?
          </p>
          <button
            onClick={refreshWalletDetection}
            className="
              inline-flex items-center gap-2 px-4 py-2 
              bg-[#291A43] hover:bg-[#342251] 
              text-white text-sm rounded-lg 
              transition-colors duration-200
              border border-gray-600 hover:border-gray-500
            "
          >
            <RefreshCw size={14} />
            Refresh Wallets
          </button>
        </div>
      )}

      {/* Help Text */}
      <p className="text-center text-sm text-gray-400 mt-4">
        New to Starknet?{' '}
        <a
          href="https://starknet.io/wallets"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#A26DFF] hover:text-[#A26DFF]/80"
        >
          Learn more about wallets
        </a>
      </p>
    </div>
  );
}