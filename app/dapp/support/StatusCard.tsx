import React from 'react';
import CheckNote from '@/svg/CheckNote';

interface StatusCardProps {
  className?: string;
  onClick?: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({ className = '', onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Navigate to status page - adjust URL as needed
      window.open('/status', '_blank');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`
        relative flex flex-col
        bg-white dark:bg-[#161616]
        border border-gray-200 dark:border-[#202020]
        rounded-2xl p-8 cursor-pointer
        transition-all duration-300 ease-in-out
        hover:bg-gray-50 dark:hover:bg-[#1a1a1a]
        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500 
        focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#161616]
        overflow-hidden
        group
        ${className}
      `}
      style={{
        width: '610px',
        height: '481px',
        borderRadius: '16px',
        opacity: 1,
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Navigate to Status Page to check system status"
    >
      {/* Title */}
      <div className="mb-2 relative z-10">
        <h3 className="text-black dark:text-[#9E9E9E] text-[20px] sm:text-[22px] lg:text-[24px] font-normal leading-[120%] tracking-[-0.02em] font-inter break-words">
          Status Page
        </h3>
      </div>

      {/* Subtitle */}
      <div className="mb-12 relative z-10">
        <p className="text-[#3A3A3A] dark:text-[#B2B2B2] text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[130%] sm:leading-[120%] tracking-[-0.02em] font-inter break-words">
          Check our system status
        </p>
      </div>

      {/* Decorative illustration */}
      <div className="absolute top-[55px] -left-[8px] w-[430px] h-[430px] pointer-events-none">
        <CheckNote className="w-full h-full opacity-70 group-hover:opacity-80 transition-all duration-300" />
      </div>

      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/5 dark:from-gray-600/0 dark:to-gray-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none z-20"></div>
    </div>
  );
};

export default StatusCard;