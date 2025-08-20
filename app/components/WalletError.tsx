import React from 'react';
import { AlertCircle, RefreshCw, ExternalLink, X } from 'lucide-react';
import { WalletError, getWalletInstallUrl } from '@/app/utils/walletErrors';

interface WalletErrorProps {
  error: WalletError;
  walletName?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const WalletErrorComponent: React.FC<WalletErrorProps> = ({
  error,
  walletName,
  onRetry,
  onDismiss,
  className = ''
}) => {
  const installUrl = walletName ? getWalletInstallUrl(walletName) : null;

  return (
    <div className={`
      relative p-4 rounded-lg border border-red-500/20 bg-red-500/5 
      backdrop-blur-sm transition-all duration-200 ${className}
    `}>
      {/* Dismiss button */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Dismiss error"
        >
          <X size={16} />
        </button>
      )}

      <div className="flex items-start gap-3">
        {/* Error icon */}
        <div className="flex-shrink-0 mt-0.5">
          <AlertCircle className="w-5 h-5 text-red-400" />
        </div>

        <div className="flex-1 min-w-0">
          {/* Error message */}
          <h4 className="text-white font-medium text-sm mb-1">
            Connection Failed
          </h4>
          <p className="text-gray-300 text-sm mb-2">
            {error.message}
          </p>

          {/* Suggested action */}
          {error.suggestedAction && (
            <p className="text-gray-400 text-xs mb-3">
              {error.suggestedAction}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Retry button */}
            {error.retryable && onRetry && (
              <button
                onClick={onRetry}
                className="
                  inline-flex items-center gap-2 px-3 py-1.5 
                  bg-[#291A43] hover:bg-[#342251] 
                  text-white text-xs rounded-lg 
                  transition-colors duration-200
                  border border-gray-600 hover:border-gray-500
                "
              >
                <RefreshCw size={12} />
                Try Again
              </button>
            )}

            {/* Install wallet button */}
            {installUrl && installUrl !== '#' && (
              <a
                href={installUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 px-3 py-1.5 
                  bg-[#A26DFF] hover:bg-[#A26DFF]/90 
                  text-white text-xs rounded-lg 
                  transition-colors duration-200
                "
              >
                <ExternalLink size={12} />
                Install {walletName}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletErrorComponent;