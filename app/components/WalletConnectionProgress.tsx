import React from 'react';
import { ConnectionStep } from '@/app/hooks/useWalletConnection';
import { Loader2, CheckCircle, AlertCircle, Wallet } from 'lucide-react';

interface WalletConnectionProgressProps {
  step: ConnectionStep;
  walletName?: string;
  className?: string;
}

const WalletConnectionProgress: React.FC<WalletConnectionProgressProps> = ({
  step,
  walletName,
  className = ''
}) => {
  const getStepIcon = () => {
    switch (step) {
      case 'connecting':
        return <Loader2 className="w-5 h-5 text-[#A26DFF] animate-spin" />;
      case 'success':
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Wallet className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStepMessage = () => {
    switch (step) {
      case 'connecting':
        return `Connecting to ${walletName || 'wallet'}...`;
      case 'success':
        return `Successfully connected to ${walletName || 'wallet'}!`;
      case 'connected':
        return `Connected to ${walletName || 'wallet'}`;
      case 'failed':
        return `Failed to connect to ${walletName || 'wallet'}`;
      default:
        return 'Ready to connect';
    }
  };

  const getStepColor = () => {
    switch (step) {
      case 'connecting':
        return 'text-[#A26DFF]';
      case 'success':
      case 'connected':
        return 'text-green-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getProgressWidth = () => {
    switch (step) {
      case 'idle':
        return '0%';
      case 'connecting':
        return '50%';
      case 'success':
      case 'connected':
        return '100%';
      case 'failed':
        return '30%';
      default:
        return '0%';
    }
  };

  return (
    <div className={`${className}`}>
      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-1 mb-3 overflow-hidden">
        <div 
          className={`
            h-full transition-all duration-500 ease-out
            ${step === 'success' || step === 'connected' 
              ? 'bg-green-400' 
              : step === 'failed' 
                ? 'bg-red-400' 
                : 'bg-[#A26DFF]'
            }
          `}
          style={{ width: getProgressWidth() }}
        />
      </div>

      {/* Status */}
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          {getStepIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${getStepColor()}`}>
            {getStepMessage()}
          </p>
          {step === 'connecting' && (
            <p className="text-xs text-gray-500 mt-1">
              Please check your wallet and approve the connection
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletConnectionProgress;