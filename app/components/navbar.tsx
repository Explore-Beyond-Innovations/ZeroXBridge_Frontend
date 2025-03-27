"use client";
import { Search, Moon, Sun, Menu, X, SearchIcon, Bell, Settings } from "lucide-react";
import Notification from "../../public/bell.png";
import Image from "next/image";
import Logo from "../../public/zerologo.png";
import LogoWhite from "../../public/zerologo-white.svg";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import ConnectModal from "./connectWallet";
import { useAccount, useDisconnect } from "@starknet-react/core";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onConnectWallet?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleConnectWallet = () => {
    if (isConnected) {
      disconnect(); // Disconnect if already connected
    } else {
      setIsModalOpen(true); // Open modal to connect
    }
  };

  useEffect(() => {
    if (isConnected) {
      setIsModalOpen(false);
    }
  }, [isConnected]);
  
  const gradientBorder =
    "bg-gradient-to-b from-[#A26DFF] to-[#A26DFF] p-[0.7px] rounded-full";

  return (
    <>
      <header
        className={`${isDarkMode ? "bg-[#09050E]" : "bg-white"} border-b-2 ${
          isDarkMode ? "border-[#1F1333]" : "border-gray-300"
        } flex h-24 w-full fixed z-50`}
      >
        {/* Logo section with border */}
        <Link href='/'>
          <div
            className={`w-80 h-24 hidden lg:flex items-center justify-start pl-6 border-r-2 ${
              isDarkMode ? "border-[#1F1333]" : "border-gray-300"
            }`}
          >
            <Image
              src={isDarkMode ? Logo : LogoWhite}
              alt="ZeroxBridge Logo"
              width={140}
              height={50}
              className="object-contain"
            />
          </div>
        </Link>

        {/* Main content */}
        <div
          className={`flex-1 flex justify-between items-center px-8 h-24 border-r ${
            isDarkMode ? "border-gray-800" : "border-gray-300"
          }`}
        >
          <div className="hidden lg:flex items-center space-x-6">
            {/* Search Input with gradient border */}
            <div className="relative">
              <div className={gradientBorder}>
                <div
                  className={`${
                    isDarkMode ? "bg-[#09050E]" : "bg-white"
                  } rounded-full`}
                >
                  <input
                    type="text"
                    placeholder="Search"
                    className={`${
                      isDarkMode
                        ? "bg-black/30 text-white"
                        : "bg-gray-100 text-black"
                    }
                    pl-6 pr-12 py-3 rounded-full w-[220px] focus:outline-none`}
                  />
                </div>
              </div>
              <Search
                className={`absolute right-4 top-3.5 h-5 w-5 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>

            {/* Notification with gradient border */}
            <div className={gradientBorder}>
              <div
                className={`${
                  isDarkMode ? "bg-[#09050E]" : "bg-white"
                } rounded-full`}
              >
                <Image
                  src={Notification}
                  alt="bell"
                  height={45}
                  width={45}
                  className="p-2.5"
                />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-6">
            <button onClick={toggleMobileMenu}>
              <Menu className={`${isDarkMode ? 'text-[#A26DFF]' : 'text-[#A26DFF]'}`} />
            </button>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-6">
            {/* Dark mode toggle with gradient border */}
            {isDarkMode ? (
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors border border-[#291A43]`}
              > 
                <Sun size={18} color={`${isDarkMode ? "white" : "black"}`} />
              </button>
            ) : (
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors border border-[#291A43]`}
              >
                <Moon size={18} color={`${isDarkMode ? "white" : "black"}`} />
              </button>
            )}
            <div className={` ${gradientBorder} hidden lg:flex`}>
              <div
                className={`flex items-center justify-between ${
                  isDarkMode ? "bg-[#21192F]" : "bg-[#ECE1FF]"
                } rounded-full p-1 w-28`}
              >
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode
                      ? "bg-[#4E347B] text-white"
                      : "bg-transparent text-gray-400"
                  }`}
                >
                  <Moon size={18} color={`${isDarkMode ? "white" : "black"}`} />
                </button>
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full transition-colors ${
                    !isDarkMode
                      ? "bg-[#D9C4FF] text-white"
                      : "bg-transparent text-gray-400"
                  }`}
                >
                  <Sun size={18} color={`${isDarkMode ? "white" : "black"}`} />
                </button>
              </div>
            </div>

            {/* Connect Wallet button with gradient border */}
            <div className={gradientBorder}>
              <button
               onClick={handleConnectWallet}
                className={`${
                  isDarkMode ? "bg-[#09050E]" : "bg-white"
                } py-3 px-8 rounded-full text-sm ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {isConnected && address ? `${address.substring(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsModalOpen(false)} />
            {/* Modal Content */}
            <div className="bg-[#09050E] p-6 rounded-md z-10">
              <ConnectModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </div>
          </div>
        )}

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } ${isDarkMode ? 'bg-[#09050E]' : 'bg-white'}`}
      >
        <div className="flex flex-col h-full py-6 px-4 bg-[#21192F]">
          {/* Mobile Menu Header */}
          <div className={`flex justify-between items-center p-6 border-b ${isDarkMode ? "border-[#1F1333]" : "border-gray-300"}`}>
            {/* Logo for mobile */}
            <Link href='/'>
              <Image
                src={isDarkMode ? Logo : LogoWhite}
                alt="ZeroxBridge Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>
            
            {/* Close button */}
            <button onClick={toggleMobileMenu}>
              <X className={`${isDarkMode ? 'text-[#A26DFF]' : 'text-[#A26DFF]'}`} size={32} />
            </button>
          </div>
          
          {/* Menu Content */}
          <div className="flex flex-col px-4 py-3 space-y-2 flex-1">
            
            {/* Navigation Links */}
            <nav className="flex flex-col gap-3 ">
              <Link href="" className={`block py-3 px-4  border-b border-[#A26DFF] ${isDarkMode ? 'text-white hover:bg-[#1F1333]' : 'text-black hover:bg-gray-100'}`}>
              <span className="flex items-center w-full justify-between px-2 py-4">
                <p>Search</p>
                <SearchIcon className="text-white" size={24} />
              </span>
            
              </Link>
              <Link href="" className={`block py-3 px-4  border-b border-[#A26DFF]  ${isDarkMode ? 'text-white hover:bg-[#1F1333]' : 'text-black hover:bg-gray-100'}`}>
              <span className="flex items-center w-full justify-between px-2 py-4">
                <p>Notifications</p>
                <Bell className="text-white" size={24} />
              </span>
              </Link>
              <Link href="" className={`block py-3 px-4  ${isDarkMode ? 'text-white hover:bg-[#1F1333]' : 'text-black hover:bg-gray-100'}`}>
              <span className="flex items-center w-full justify-between px-2 py-4">
                <p>Settings</p>
                <Settings className="text-white" size={24} />
              </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;