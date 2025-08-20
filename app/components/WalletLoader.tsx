import React from 'react';
import { Loader2 } from 'lucide-react';

interface WalletLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const sizeClasses = {
  sm: {
    spinner: 'w-4 h-4',
    text: 'text-xs'
  },
  md: {
    spinner: 'w-5 h-5',
    text: 'text-sm'
  },
  lg: {
    spinner: 'w-6 h-6',
    text: 'text-base'
  }
};

const WalletLoader: React.FC<WalletLoaderProps> = ({
  size = 'md',
  message = 'Connecting...',
  className = ''
}) => {
  const classes = sizeClasses[size];

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Loader2 
        className={`${classes.spinner} text-[#A26DFF] animate-spin`} 
      />
      <span className={`${classes.text} text-gray-300 font-medium`}>
        {message}
      </span>
    </div>
  );
};

export default WalletLoader;