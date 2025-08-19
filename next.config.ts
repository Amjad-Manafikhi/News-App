import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"**",
      },
      {
        protocol:"http",
        hostname:"**",
      }
    ],
    // Set a longer timeout in milliseconds (e.g., 30 seconds)
    minimumCacheTTL: 30000, 
  }
};

export default nextConfig;
