"use client";

import Image from "next/image";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-[#09050E] flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient Effects */}
      <div 
        className="absolute w-[250px] h-[200px] bg-[#a26dff] backdrop-blur-[150px] filter blur-[130px] opacity-20 pointer-events-none"
        style={{
          right: "-70px",
          top: "40%",
          transform: "rotate(-114.2deg)",
        }}
      />
      
      <div 
        className="absolute w-[250px] h-[200px] bg-[#a26dff] backdrop-blur-[150px] filter blur-[130px] opacity-20 pointer-events-none"
        style={{
          left: "-50px",
          bottom: "-150px",
          transform: "rotate(-114.2deg)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-2xl mx-auto">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Image
              src="/images/error-404-500.png"
              alt="500 Error Icon"
              width={200}
              height={200}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
              priority
            />
            {/* Floating dots for 500 page */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#a26dff] rounded-full opacity-70" />
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-[#907DBD] rounded-full opacity-80" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-[#a26dff] mb-4 font-manrope">
          500
        </h1>

        {/* Error Message */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#f0f0f0] mb-4 font-manrope">
          Server Error
        </h2>

        {/* Descriptive Text */}
        <p className="text-[#d4d4d4] text-lg sm:text-xl mb-8 max-w-md mx-auto font-geist-sans">
          Something went wrong on our end. Don&apos;t worry, our team has been notified and is working to fix the issue.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-6 p-4 bg-[#1e1e1e] rounded-lg border border-[#a26dff] text-left">
            <p className="text-[#a26dff] text-sm font-semibold mb-2">Error Details (Development):</p>
            <p className="text-[#d4d4d4] text-sm font-mono break-all">{error.message}</p>
            {error.digest && (
              <p className="text-[#907DBD] text-xs mt-2">Error ID: {error.digest}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-[#a26dff] text-white rounded-full hover:bg-[#907DBD] transition-all duration-300 font-medium transform hover:scale-105 active:scale-95"
          >
            Try Again
          </button>
          
          <Link 
            href="/"
            className="inline-block px-8 py-3 border border-[#a26dff] text-[#a26dff] rounded-full hover:bg-[#a26dff] hover:text-white transition-all duration-300 font-medium transform hover:scale-105 active:scale-95"
          >
            Back to Home
          </Link>
        </div>

        {/* Additional Help Text */}
        <div className="mt-8 text-[#907DBD] text-sm">
          <p>If the problem persists, please{" "}
            <Link href="/about" className="text-[#a26dff] hover:underline">
              contact our support team
            </Link>
            {" "}or check our{" "}
            <Link href="/dashboard" className="text-[#a26dff] hover:underline">
              status page
            </Link>
          </p>
        </div>
      </div>

      {/* Floating Elements for 500 page */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-[#a26dff] rounded-full opacity-60" />
      <div className="absolute bottom-20 right-10 w-3 h-3 bg-[#907DBD] rounded-full opacity-60" />
      <div className="absolute top-1/2 left-20 w-1 h-1 bg-[#a26dff] rounded-full opacity-40" />
      <div className="absolute bottom-1/3 right-20 w-2 h-2 bg-[#907DBD] rounded-full opacity-40" />
    </div>
  );
}