import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
    JWT_KEY: process.env.JWT_KEY,
  },
};

export default nextConfig;
