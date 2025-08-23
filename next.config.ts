import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable any experimental features if needed
  },
  // Ensure proper handling of static assets
  images: {
    unoptimized: false,
  },
  // Disable source maps in development if causing issues
  productionBrowserSourceMaps: false,
  // Optimize for development
  swcMinify: true,
}

export default nextConfig;


