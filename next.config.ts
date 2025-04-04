import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "via.placeholder.com", // Existing domain
      "helpert-user-avatars.s3.ap-south-1.amazonaws.com", // Add this domain
    ],
  },
};

export default nextConfig;
