import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // Allow local images from public folder
    unoptimized: false,
  },
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
