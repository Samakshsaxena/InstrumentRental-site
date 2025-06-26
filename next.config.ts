import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add this to skip linting during build on Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
