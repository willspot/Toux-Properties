import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'touxproperties.com', '127.0.0.1', 'api.touxproperties.com'],
    unoptimized: true,
  },
};

export default nextConfig;
