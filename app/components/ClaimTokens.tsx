'use client';

import { useState } from 'react';
import { useAccount } from '@starknet-react/core';
import { toast } from 'react-hot-toast';
import { useZeroXBridge } from '@/lib/contracts';
import ConnectModal from './connectWallet';
import { useTheme } from '@/app/ThemeContext';
import { Wallet2 } from 'lucide-react';

export default function ClaimTokens() {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isConnected } = useAccount();
    const { isDarkMode } = useTheme();
    const { claimTokens } = useZeroXBridge();

    const handleClaim = async () => {
        if (!isConnected) {
            toast.error('Please connect your wallet first');
            setIsModalOpen(true);
            return;
        }

        try {
            setIsLoading(true);
            
            // Call the claim_tokens function
            await claimTokens('0', '0'); // Using '0' as placeholder values since the contract doesn't require specific amounts
            
            // Show success message
            toast.success('Tokens claimed successfully!');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to claim tokens';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`${
            isDarkMode ? "bg-[#332646]" : "bg-[#f8f4fe]"
        } w-full relative p-6 rounded-[1.25rem] shadow-lg text-white border-[0.4px] border-transparent before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#1F1333] before:to-[#614199] before:rounded-[1.25rem] before:-z-10 before:w-full before:h-full before:border-[0.4px] before:border-transparent`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className={`text-[1rem] font-bold ${
                    isDarkMode ? "text-white" : "text-black"
                }`}>
                    Claim Original Tokens
                </h2>
            </div>

            <div className={`border-[0.4px] border-[#8B8B8B] ${
                isDarkMode ? "bg-[#1F1333]" : "bg-[#e6d9ff]"
            } p-4 rounded-lg mb-4 relative`}>
                <div className="flex justify-between items-center">
                    <div>
                        <p className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-800"
                        }`}>
                            Claim your unlocked tokens from the bridge. This will transfer all your claimable tokens to your wallet.
                        </p>
                        <div className="flex items-center gap-x-1 mt-2">
                            <Wallet2 className={`${
                                isDarkMode ? "text-[#8B8B8B]" : "text-[#1F1333]"
                            } w-[10.94px] h-[9.63px]`} />
                            <p className={`text-[0.75rem] ${
                                isDarkMode ? "text-[#8B8B8B]" : "text-[#1F1333]"
                            }`}>
                                Claimable Balance: <span className={`${
                                    isDarkMode ? "text-white" : "text-[#1F1333]"
                                } font-bold`}>0.00</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={handleClaim}
                disabled={isLoading}
                className={`w-full py-3 rounded-full text-lg font-semibold text-white bg-gradient-to-t from-[#12081D] to-[#A26DFF] relative ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{
                    border: "0.7px solid transparent",
                    backgroundClip: "padding-box",
                    position: "relative",
                }}
            >
                <span
                    className="absolute inset-0 rounded-[16px] p-[2px]"
                    style={{
                        background: "linear-gradient(180deg, #A26DFF 0%, #12081D 100%)",
                        maskImage: "linear-gradient(white, white)",
                        WebkitMaskImage: "linear-gradient(white, white)",
                    }}
                />
                <span className="relative z-10">{isLoading ? 'Claiming...' : 'Claim Tokens'}</span>
            </button>
            
            <ConnectModal 
                isModalOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen}
            />
        </div>
    );
} 