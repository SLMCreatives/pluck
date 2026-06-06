import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "encrypted-tbn0.gstatic.com" },
      { hostname: "*.ufs.sh" },
      { hostname: "images.unsplash.com" },
      { hostname: "randomuser.me" },
    ],
  }
};

export default nextConfig;
