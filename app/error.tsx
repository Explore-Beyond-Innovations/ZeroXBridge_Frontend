"use client";

import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-[#09050E] flex items-center justify-center text-center">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold text-[#a26dff] mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-[#f0f0f0] mb-4">Server Error</h2>
        <p className="text-[#d4d4d4] mb-8">
          Something went wrong on our end. We&apos;re working to fix it.
        </p>
        
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-6 p-4 bg-[#1e1e1e] rounded-lg border border-[#a26dff] text-left">
            <p className="text-[#a26dff] text-sm font-semibold mb-2">Error Details:</p>
            <p className="text-[#d4d4d4] text-sm font-mono break-all">{error.message}</p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#a26dff] text-white rounded-lg hover:bg-[#907DBD] transition-colors"
          >
            Try Again
          </button>
          <Link 
            href="/"
            className="inline-block px-6 py-3 border border-[#a26dff] text-[#a26dff] rounded-lg hover:bg-[#a26dff] hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}