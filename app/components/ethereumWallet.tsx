/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useConnect } from 'wagmi';
import { ChevronLeft } from 'lucide-react';
import { useWalletConnection } from "@/app/hooks/useWalletConnection";
import WalletErrorComponent from "./WalletError";
import WalletLoader from "./WalletLoader";

interface EthereumWalletModalProps {
  onBack: () => void;
  onConnectionStateChange?: (isConnecting: boolean) => void;
}

const EthereumWalletModal: React.FC<EthereumWalletModalProps> = ({ onBack, onConnectionStateChange }) => {
  const { connectors } = useConnect();
  const { 
    isConnecting, 
    error, 
    connectWallet, 
    clearError
  } = useWalletConnection('ethereum');

  const [selectedConnector, setSelectedConnector] = useState<any>(null);

  // Notify parent of connection state changes
  useEffect(() => {
    onConnectionStateChange?.(isConnecting);
  }, [isConnecting, onConnectionStateChange]);

  const walletIcons: Record<string, string> = {
    metamask: '/icons/wallets/metamask.svg',
    coinbase: '/icons/wallets/coinbase-logo.svg',
    walletconnect: '/icons/wallets/walletconnect.svg',
    injected: '/wallet.svg',
  };

  const handleWalletConnect = async (connector: any) => {
    try {
      setSelectedConnector(connector);
      await connectWallet(connector);
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
      <div className="space-y-3">
        {connectors.map((connector: any) => {
          const isCurrentlyConnecting = isConnecting && selectedConnector?.id === connector.id;
          
          return (
            <button
              key={connector.id}
              onClick={() => handleWalletConnect(connector)}
              disabled={isConnecting}
              className={`
                w-full flex items-center justify-between p-4 rounded-lg 
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                ${isCurrentlyConnecting 
                  ? 'bg-[#A26DFF]/20 border border-[#A26DFF]/30' 
                  : 'bg-[#291A43] hover:bg-[#342251]'
                }
              `}
            >
              <div className="flex items-center gap-3">
                {isCurrentlyConnecting ? (
                  <div className="w-8 h-8 flex items-center justify-center">
                    <WalletLoader size="sm" message="" />
                  </div>
                ) : (
                  <img
                    src={walletIcons[connector.id.toLowerCase()] || '/wallet.svg'}
                    alt={connector.name}
                    className="w-8 h-8"
                  />
                )}
                <div className="text-left">
                  <p className="font-medium text-white">
                    {connector.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {isCurrentlyConnecting 
                      ? 'Connecting...' 
                      : connector.ready ? 'Available' : 'Not installed'
                    }
                  </p>
                </div>
              </div>
              {isCurrentlyConnecting && (
                <span className="text-xs text-[#A26DFF]">Please approve</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Help Text */}
      <p className="text-center text-sm text-gray-400 mt-4">
        New to Ethereum?{' '}
        <a
          href="https://ethereum.org/wallets"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#A26DFF] hover:text-[#A26DFF]/80"
        >
          Learn more about wallets
        </a>
      </p>
    </div>
  );
};

export default EthereumWalletModal;