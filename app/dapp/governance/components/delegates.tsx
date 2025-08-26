'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Delegate {
  name: string;
  delegatedVotes: number;
  work: string[];
  description: string;
  xLink?: string;
  telegramLink?: string;
  discordLink?: string;
  avatar?: string;
}

const delegatesData: Delegate[] = [
  {
    name: "Tester",
    delegatedVotes: 7000000,
    work: ["Cairo Dev", "Starknet", "DApps"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    xLink: "https://x.com/placeholder",
    telegramLink: "https://t.me/placeholder",
    discordLink: "https://discord.gg/placeholder"
  },
  {
    name: "Beta Tester",
    delegatedVotes: 5800000,
    work: ["Web3 community", "Web3 developer", "Community Builder"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    xLink: "https://x.com/placeholder",
    telegramLink: "https://t.me/placeholder"
  },
  {
    name: "Alpha Tester",
    delegatedVotes: 20000,
    work: ["Cairo Dev"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    xLink: "https://x.com/placeholder"
  }
];

const formatVotes = (votes: number): string => {
  if (votes >= 1000000) {
    return `${(votes / 1000000).toFixed(1)}M DELEGATED VOTES`;
  } else if (votes >= 1000) {
    return `${(votes / 1000).toFixed(1)}K DELEGATED VOTES`;
  }
  return `${votes} DELEGATED VOTES`;
};

// Skeleton component for loading state
const DelegateCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-300 p-6 py-7 animate-pulse">
      {/* Top section - Profile info skeleton */}
      <div className="flex items-start mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
          <div className="mt-3 h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
      </div>

      {/* Description skeleton */}
      <div className="space-y-2 mb-6">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
      </div>

    </div>
  );
};

const DelegateCard: React.FC<{ delegate: Delegate }> = ({ delegate }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-300 p-6 py-7 hover:border-gray-400 transition-all duration-200 cursor-pointer">
      {/* Top section - Profile info */}
      <div className="flex items-start mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
          {delegate.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg">{delegate.name}</h3>
          <p className="text-gray-500 text-xs">{formatVotes(delegate.delegatedVotes)}</p>
        </div>
      </div>

      {/* Tags section */}
      <div className="flex flex-wrap gap-2 mb-4">
        {delegate.work.slice(0, 2).map((tag, index) => (
          <span
            key={index}
            className="py-1 px-1.5 bg-gray-100 text-gray-700 text-xs rounded-md"
          >
            {tag}
          </span>
        ))}
        {delegate.work.length > 2 && (
          <span className="py-1 px-1.5 bg-gray-100 text-gray-700 text-xs rounded-md">
            +{delegate.work.length - 2}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-6 line-clamp-3">
        {delegate.description}
      </p>

      {/* Bottom section - Actions */}
      <div className="flex items-center justify-between">
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 font-medium">
          Delegate
        </button>
        
        <div className="flex gap-2">
          {delegate.xLink && (
            <a
              href={delegate.xLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            >
                <Image 
                src= '/icons/social-media-logos/twitter.svg'
                width={23}
                height={23}
                className='text-gray-500'
                alt='X logo'
                />
            </a>
          )}
          {delegate.telegramLink && (
            <a
              href={delegate.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            >
              <Image 
                src= '/icons/social-media-logos/telegram.svg'
                width={23}
                height={23}
                className='text-gray-500'
                alt='Telegram logo'
                />
            </a>
          )}
          {delegate.discordLink && (
            <a
              href={delegate.discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            >
              <Image 
                src= '/icons/social-media-logos/discord.svg'
                width={20}
                height={20}
                className='text-gray-500'
                alt='Discord logo'
                />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Delegates = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [delegates, setDelegates] = useState<Delegate[]>([]);

  // Simulate loading state - replace this with actual API call when implementing DB
  useEffect(() => {
    const loadDelegates = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDelegates(delegatesData);
      setIsLoading(false);
    };

    loadDelegates();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Delegates</h1>
          <p className="text-gray-600 max-w-2xl">
            ZeroXBridge delegates vote to approve protocol upgrades on behalf of token holders, influencing the direction of the protocol.
          </p>
        </div>
        {/* TODO: Add functionality to button, redirect to all delegates */}
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 font-medium">
          All delegates
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Show skeleton placeholders while loading
          Array.from({ length: 6 }).map((_, index) => (
            <DelegateCardSkeleton key={index} />
          ))
        ) : (
          // Show actual delegate cards when data is loaded
          delegates.slice(0, 6).map((delegate, index) => (
            <DelegateCard key={index} delegate={delegate} />
          ))
        )}
      </div>
    </div>
  );
};

export default Delegates;