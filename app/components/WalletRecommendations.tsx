import React from 'react';
import { CheckCircle, AlertCircle, Download } from 'lucide-react';
import { WalletInfo } from '@/app/utils/walletDetection';

interface WalletRecommendationsProps {
  installedWallets: WalletInfo[];
  missingWallets: WalletInfo[];
  category: 'ethereum' | 'starknet';
  className?: string;
}

const WalletRecommendations: React.FC<WalletRecommendationsProps> = ({
  installedWallets,
  missingWallets,
  category,
  className = ''
}) => {
  if (installedWallets.length === 0 && missingWallets.length === 0) {
    return null;
  }

  const categoryName = category === 'ethereum' ? 'Ethereum' : 'Starknet';

  return (
    <div className={`p-4 rounded-lg bg-[#291A43]/30 border border-gray-600 ${className}`}>
      <h4 className="text-white text-sm font-medium mb-3">
        {categoryName} Wallet Status
      </h4>

      {/* Installed Wallets */}
      {installedWallets.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-2">✅ Installed & Ready:</p>
          <div className="space-y-1">
            {installedWallets.map((wallet) => (
              <div
                key={wallet.id}
                className="flex items-center gap-2 text-sm"
              >
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-white">{wallet.name}</span>
                <span className="text-xs text-gray-500">• {wallet.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing Wallets */}
      {missingWallets.length > 0 && (
        <div>
          <p className="text-xs text-gray-400 mb-2">
            💡 {missingWallets.length === 1 ? 'Alternative Option:' : 'Additional Options:'}
          </p>
          <div className="space-y-2">
            {missingWallets.map((wallet) => (
              <div
                key={wallet.id}
                className="flex items-center justify-between p-2 rounded bg-[#0F0F0F]/50"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-400" />
                  <div>
                    <span className="text-white text-sm">{wallet.name}</span>
                    <p className="text-xs text-gray-500">{wallet.description}</p>
                  </div>
                </div>
                <a
                  href={wallet.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-1 px-2 py-1 
                    bg-[#A26DFF] hover:bg-[#A26DFF]/90 
                    text-white text-xs rounded 
                    transition-colors duration-200
                  "
                >
                  <Download size={12} />
                  Install
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="mt-3 pt-3 border-t border-gray-700">
        <p className="text-xs text-gray-500">
          {installedWallets.length > 0
            ? `${installedWallets.length} wallet${installedWallets.length > 1 ? 's' : ''} ready to use`
            : 'Install any wallet to get started'
          }
        </p>
      </div>
    </div>
  );
};

export default WalletRecommendations;