import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Your existing Sensationz S3 config
        protocol: "https",
        hostname: "sensationz.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
      {
        // Add this for Google Profile Pictures
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
