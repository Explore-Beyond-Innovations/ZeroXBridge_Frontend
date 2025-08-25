import React, { useEffect, useRef, useState, useId } from 'react';
import { Info, HelpCircle } from 'lucide-react';

interface WalletTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click';
  className?: string;
}

const WalletTooltip: React.FC<WalletTooltipProps> = ({
  content,
  children,
  position = 'top',
  trigger = 'hover',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const getPositionClasses = () => {
    const base = 'absolute z-50 px-3 py-2 text-xs text-white bg-gray-900 rounded-lg shadow-lg border border-gray-700 max-w-xs';
    
    switch (position) {
      case 'top':
        return `${base} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
      case 'bottom':
        return `${base} top-full left-1/2 transform -translate-x-1/2 mt-2`;
      case 'left':
        return `${base} right-full top-1/2 transform -translate-y-1/2 mr-2`;
      case 'right':
        return `${base} left-full top-1/2 transform -translate-y-1/2 ml-2`;
      default:
        return `${base} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
    }
  };

  const getArrowClasses = () => {
    const base = 'absolute w-2 h-2 bg-gray-900 border border-gray-700 transform rotate-45';
    
    switch (position) {
      case 'top':
        return `${base} top-full left-1/2 -translate-x-1/2 -mt-1 border-t-0 border-l-0`;
      case 'bottom':
        return `${base} bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b-0 border-r-0`;
      case 'left':
        return `${base} left-full top-1/2 -translate-y-1/2 -ml-1 border-l-0 border-b-0`;
      case 'right':
        return `${base} right-full top-1/2 -translate-y-1/2 -mr-1 border-r-0 border-t-0`;
      default:
        return `${base} top-full left-1/2 -translate-x-1/2 -mt-1 border-t-0 border-l-0`;
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsVisible(!isVisible);
    }
  };

  // Close on outside click for click-triggered tooltips
  useEffect(() => {
    if (trigger !== 'click' || !isVisible) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [isVisible, trigger]);

  // Keyboard support: Enter/Space toggles, Esc closes
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (trigger === 'click' && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setIsVisible(v => !v);
    }
    if (e.key === 'Escape') {
      setIsVisible(false);
    }
  };

  return (
    <div 
      ref={wrapperRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={trigger === 'click' ? 0 : -1}
      aria-describedby={isVisible ? tooltipId : undefined}
    >
      {children}
      
      {isVisible && (
        <div
          role="tooltip"
          id={tooltipId}
          aria-hidden={!isVisible}
          className={`
            ${getPositionClasses()}
            animate-in fade-in-0 zoom-in-95 duration-200
          `}
        >
          <div className={getArrowClasses()} />
          {content}
        </div>
      )}
    </div>
  );
};

// Convenience component for info icon with tooltip
export const InfoTooltip: React.FC<{
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}> = ({ content, position = 'top' }) => (
  <WalletTooltip content={content} position={position}>
    <Info className="w-4 h-4 text-gray-400 hover:text-gray-300 cursor-help" />
  </WalletTooltip>
);

// Convenience component for help icon with tooltip
export const HelpTooltip: React.FC<{
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}> = ({ content, position = 'top' }) => (
  <WalletTooltip content={content} position={position}>
    <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-300 cursor-help" />
  </WalletTooltip>
);

export default WalletTooltip;