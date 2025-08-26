"use client";
import ArrowIcon from './ui/ArrowIcon';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="justify-between py-4 items-center flex w-full mx-auto px-[clamp(16px,5vw,80px)] 3xl:px-[18.75rem] relative">
      <div className="w-12 h-12 flex items-center justify-center z-20">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <ul className="flex items-center gap-6">
          <li>
            <Link href="/Landing-v2/about">About</Link>
          </li>
          <li>
            <Link href="#">Docs</Link>
          </li>
          <li>
            <Link target="_blank" href="https://t.me/ZeroXBridge1">
              Community
            </Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="#">X</Link>
          </li>
        </ul>
        <a
          href="https://app.zeroxbridge.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-base rounded-full text-black px-3 py-1.5 flex items-center gap-2"
        >
          Launch App
          <ArrowIcon direction="right" />
        </a>
      </nav>

      {/* Mobile menu icon */}
      <button className="flex md:hidden items-center z-20" onClick={() => setMobileMenuOpen(true)}>
        <Menu className="text-white w-8 h-8" />
      </button>

      {/* Mobile sidebar navigation */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black bg-opacity-95 shadow-lg transform transition-transform duration-300 ease-in-out z-30 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
          <div className="w-10 h-10 flex items-center justify-center">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Image src="/logo.png" alt="logo" width={100} height={80} />
            </Link>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <X className="text-white w-7 h-7" />
          </button>
        </div>
        <nav className="flex flex-col items-start gap-6 px-6 py-8">
          <Link href="/Landing-v2/about" onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          <Link href="#" onClick={() => setMobileMenuOpen(false)}>
            Docs
          </Link>
          <Link
            target="_blank"
            href="https://t.me/ZeroXBridge1"
            onClick={() => setMobileMenuOpen(false)}
          >
            Community
          </Link>
          <Link href="#" onClick={() => setMobileMenuOpen(false)}>
            Blog
          </Link>
          <Link href="#" onClick={() => setMobileMenuOpen(false)}>
            X
          </Link>
          <a
            href="https://app.zeroxbridge.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-base rounded-full text-black px-3 py-1.5 flex items-center gap-2 mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Launch App
            <ArrowIcon direction="right" />
          </a>
        </nav>
      </div>

      {/* Overlay when sidebar is open */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
