/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useConnect } from 'wagmi';
import { ChevronLeft } from 'lucide-react';

interface EthereumWalletModalProps {
  onBack: () => void;
}

const EthereumWalletModal: React.FC<EthereumWalletModalProps> = ({ onBack }) => {
  const { connect, connectors } = useConnect();

  const walletIcons: Record<string, string> = {
    metamask: '/icons/wallets/metamask.svg',
    coinbase: '/icons/wallets/coinbase-logo.svg',
    walletconnect: '/icons/wallets/walletconnect.svg',
    injected: '/wallet.svg',
  };

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

      {/* Wallet List */}
      <div className="space-y-3">
        {connectors.map((connector: any) => (
          <button
            key={connector.id}
            onClick={() =>{ connect({ connector }); onBack()}}
            // disabled={!connector.ready}
            className="w-full flex items-center justify-between p-4 rounded-lg bg-[#291A43] hover:bg-[#342251] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3">
              <img
                src={walletIcons[connector.id.toLowerCase()] || '/wallet.svg'}
                alt={connector.name}
                className="w-8 h-8"
              />
              <div className="text-left">
                <p className="font-medium text-white">
                  {connector.name}
                </p>
                <p className="text-sm text-gray-400">
                  {connector.ready ? 'Available' : 'Not installed'}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Help Text */}
      <p className="text-center text-sm text-gray-400 mt-4">
        New to Ethereum?{' '}
        <a
          href="https://ethereum.org/wallets"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          Learn more about wallets
        </a>
      </p>
    </div>
  );
};

export default EthereumWalletModal;