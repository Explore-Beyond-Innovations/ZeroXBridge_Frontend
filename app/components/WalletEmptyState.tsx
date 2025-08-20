import React from 'react';
import { Wallet, Download, ExternalLink } from 'lucide-react';
import { WalletInfo } from '@/app/utils/walletDetection';

interface WalletEmptyStateProps {
  category: 'ethereum' | 'starknet';
  availableWallets: WalletInfo[];
  onRefresh: () => void;
  className?: string;
}

const WalletEmptyState: React.FC<WalletEmptyStateProps> = ({
  category,
  availableWallets,
  onRefresh,
  className = ''
}) => {
  const categoryName = category === 'ethereum' ? 'Ethereum' : 'Starknet';
  const primaryWallet = availableWallets[0];

  return (
    <div className={`text-center py-8 px-4 ${className}`}>
      {/* Icon */}
      <div className="mb-4 flex justify-center">
        <div className="w-16 h-16 rounded-full bg-[#291A43]/30 flex items-center justify-center">
          <Wallet className="w-8 h-8 text-gray-400" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white text-lg font-semibold mb-2">
        No {categoryName} Wallets Found
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
        To connect to {categoryName}, you'll need to install a compatible wallet extension.
      </p>

      {/* Primary Action - Install main wallet */}
      {primaryWallet && (
        <div className="mb-6">
          <a
            href={primaryWallet.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-3 px-6 py-3 
              bg-[#A26DFF] hover:bg-[#A26DFF]/90 
              text-white font-medium rounded-lg 
              transition-colors duration-200
            "
          >
            <Download size={18} />
            Install {primaryWallet.name}
          </a>
          <p className="text-xs text-gray-500 mt-2">
            {primaryWallet.description}
          </p>
        </div>
      )}

      {/* Alternative Wallets */}
      {availableWallets.length > 1 && (
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-3">Or choose an alternative:</p>
          <div className="space-y-2">
            {availableWallets.slice(1).map((wallet) => (
              <a
                key={wallet.id}
                href={wallet.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 px-4 py-2 
                  bg-[#291A43] hover:bg-[#342251] 
                  text-white text-sm rounded-lg 
                  transition-colors duration-200
                  mr-2 mb-2
                "
              >
                <ExternalLink size={14} />
                {wallet.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Refresh Action */}
      <div className="border-t border-gray-700 pt-4 mt-6">
        <p className="text-xs text-gray-500 mb-3">
          Already installed a wallet?
        </p>
        <button
          onClick={onRefresh}
          className="
            inline-flex items-center gap-2 px-4 py-2 
            bg-[#291A43] hover:bg-[#342251] 
            text-white text-sm rounded-lg 
            transition-colors duration-200
            border border-gray-600 hover:border-gray-500
          "
        >
          <Wallet size={14} />
          Check Again
        </button>
      </div>

      {/* Help Text */}
      <p className="text-xs text-gray-500 mt-4">
        Need help? Check our{' '}
        <a
          href={category === 'ethereum' ? 'https://ethereum.org/wallets' : 'https://starknet.io/wallets'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#A26DFF] hover:text-[#A26DFF]/80 underline"
        >
          wallet setup guide
        </a>
      </p>
    </div>
  );
};

export default WalletEmptyState;