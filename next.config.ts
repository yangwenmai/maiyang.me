import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output static site for Netlify
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Trailing slash for better compatibility
  trailingSlash: true,
};

export default nextConfig;
