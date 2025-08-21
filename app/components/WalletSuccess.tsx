import React, { useEffect, useState } from 'react';
import { CheckCircle, Wallet } from 'lucide-react';

interface WalletSuccessProps {
  walletName: string;
  address: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  className?: string;
}

const WalletSuccess: React.FC<WalletSuccessProps> = ({
  walletName,
  address,
  onClose,
  autoClose = true,
  autoCloseDelay = 2000,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);

    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className={`
      transform transition-all duration-300 ease-out
      ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      ${className}
    `}>
      <div className="p-6 rounded-lg bg-gradient-to-br from-green-500/10 to-[#A26DFF]/10 border border-green-500/20">
        {/* Success Animation */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping"></div>
            {/* Inner success icon */}
            <div className="relative w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center">
          <h3 className="text-white text-lg font-semibold mb-2">
            Successfully Connected!
          </h3>
          
          <div className="mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wallet className="w-4 h-4 text-[#A26DFF]" />
              <span className="text-[#A26DFF] font-medium text-sm">{walletName}</span>
            </div>
            
            <div className="
              inline-flex items-center gap-2 px-3 py-1 
              bg-[#291A43]/50 rounded-full 
              border border-[#A26DFF]/30
            ">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-xs font-mono">
                {formatAddress(address)}
              </span>
            </div>
          </div>

          <p className="text-gray-400 text-sm">
            You can now use all features of the platform
          </p>
        </div>

        {/* Manual close option */}
        {!autoClose && (
          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="
                px-4 py-2 text-sm 
                bg-[#291A43] hover:bg-[#342251] 
                text-white rounded-lg 
                transition-colors duration-200
              "
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletSuccess;