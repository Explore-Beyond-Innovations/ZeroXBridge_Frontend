/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useConnect } from "@starknet-react/core";
import { ChevronLeft } from "lucide-react";
import { useWalletConnection } from "@/app/hooks/useWalletConnection";
import WalletErrorComponent from "./WalletError";
import WalletLoader from "./WalletLoader";

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

  // Notify parent of connection state changes
  useEffect(() => {
    onConnectionStateChange?.(isConnecting);
  }, [isConnecting, onConnectionStateChange]);


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