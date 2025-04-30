"use client";

import React, { useState } from 'react';
import { useAccount as useStarknetAccount } from '@starknet-react/core';
import { useAccount as useEthereumAccount } from 'wagmi';
import { X } from 'lucide-react';
import StarknetWalletModal from './starknetWallet';
import EthereumWalletModal from './ethereumWallet';

interface ConnectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const ConnectModal: React.FC<ConnectModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  const [activeChain, setActiveChain] = useState<'ethereum' | 'starknet' | null>(null);
  
  const { address: starknetAddress } = useStarknetAccount();
  const { address: ethereumAddress } = useEthereumAccount();

  const handleOverlayClick = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleBack = () => {
    setActiveChain(null);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4 ${
        isModalOpen ? "visible" : "hidden"
      }`}
      onClick={handleOverlayClick}
    >
      <div 
        className="relative w-full max-w-md bg-[#0F0F0F] rounded-[10px] p-6"
        onClick={handleModalClick}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          onClick={() => setIsModalOpen(false)}
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-white text-xl font-semibold my-3 text-center">
          {activeChain === null 
            ? 'Select a Network'
            : activeChain === 'ethereum'
            ? 'Connect Ethereum Wallet'
            : 'Connect Starknet Wallet'
          }
        </h2>

        {/* Content */}
        <div className="mt-6">
          {activeChain === null ? (
            <div className="space-y-4">
              {/* Ethereum Option */}
              <button
                onClick={() => setActiveChain('ethereum')}
                className="w-full flex items-center justify-between p-4 rounded-lg bg-[#291A43] hover:bg-[#342251] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src="/eth-icon.png" 
                    alt="Ethereum" 
                    className="w-8 h-8"
                  />
                  <div className="text-left">
                    <p className="font-medium text-white">Ethereum</p>
                    <p className="text-sm text-gray-400">
                      {ethereumAddress 
                        ? `${ethereumAddress.slice(0, 6)}...${ethereumAddress.slice(-4)}`
                        : 'Not connected'
                      }
                    </p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  ethereumAddress ? 'bg-green-500' : 'bg-red-500'
                }`} />
              </button>

              {/* Starknet Option */}
              <button
                onClick={() => setActiveChain('starknet')}
                className="w-full flex items-center justify-between p-4 rounded-lg bg-[#291A43] hover:bg-[#342251] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src="/wallet.svg" 
                    alt="Starknet" 
                    className="w-8 h-8"
                  />
                  <div className="text-left">
                    <p className="font-medium text-white">Starknet</p>
                    <p className="text-sm text-gray-400">
                      {starknetAddress 
                        ? `${starknetAddress.slice(0, 6)}...${starknetAddress.slice(-4)}`
                        : 'Not connected'
                      }
                    </p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  starknetAddress ? 'bg-green-500' : 'bg-red-500'
                }`} />
              </button>
            </div>
          ) : activeChain === 'ethereum' ? (
            <EthereumWalletModal onBack={handleBack} />
          ) : (
            <StarknetWalletModal onBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;