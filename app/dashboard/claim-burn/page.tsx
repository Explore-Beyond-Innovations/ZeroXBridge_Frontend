"use client";
import BurnTokens from '../../components/BurnTokens';
import ClaimTokens from '../../components/ClaimTokens';
import { useTheme } from '@/app/ThemeContext';

export default function ClaimBurnPage() {
    const { isDarkMode } = useTheme();
    
    return (
        <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
            isDarkMode ? "bg-[#09050E]" : "bg-gray-100"
        }`}>
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className={`text-3xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                        Token Redemption Process
                    </h1>
                    <p className={`mt-4 text-lg ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                        Follow these steps to redeem your xZB tokens for original tokens
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Step 1: Burn */}
                    <div className={`rounded-lg shadow p-6 ${
                        isDarkMode ? "bg-[#1A1A1A]" : "bg-white"
                    }`}>
                        <div className="flex items-center mb-4">
                            <div className="flex-shrink-0">
                                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white">
                                    1
                                </span>
                            </div>
                            <h2 className={`ml-4 text-xl font-semibold ${
                                isDarkMode ? "text-white" : "text-gray-900"
                            }`}>
                                Step 1: Burn xZB Tokens
                            </h2>
                        </div>
                        <p className={`mb-4 ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                            First, you need to burn your xZB tokens to start the redemption process.
                        </p>
                        <BurnTokens />
                    </div>

                    {/* Step 2: Claim */}
                    <div className={`rounded-lg shadow p-6 ${
                        isDarkMode ? "bg-[#1A1A1A]" : "bg-white"
                    }`}>
                        <div className="flex items-center mb-4">
                            <div className="flex-shrink-0">
                                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white">
                                    2
                                </span>
                            </div>
                            <h2 className={`ml-4 text-xl font-semibold ${
                                isDarkMode ? "text-white" : "text-gray-900"
                            }`}>
                                Step 2: Claim Original Tokens
                            </h2>
                        </div>
                        <p className={`mb-4 ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                            Once the burn is completed, you can claim your original tokens.
                        </p>
                        <ClaimTokens />
                    </div>
                </div>

                {/* Additional Information */}
                <div className={`mt-12 rounded-lg shadow p-6 ${
                    isDarkMode ? "bg-[#1A1A1A]" : "bg-white"
                }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                        Important Information
                    </h3>
                    <ul className={`space-y-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            This is a two-step process and must be completed in order
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Make sure you have enough xZB tokens before starting the process
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Save the commitment hash you will receive after the burn
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            The claim process will be available after completing the burn
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
