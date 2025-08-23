"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09050E] flex items-center justify-center text-center">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold text-[#a26dff] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#f0f0f0] mb-4">Page Not Found</h2>
        <p className="text-[#d4d4d4] mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-[#a26dff] text-white rounded-lg hover:bg-[#907DBD] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}