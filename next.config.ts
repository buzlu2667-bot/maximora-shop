import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kcrmqenlfltuwymqfayb.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/falizo/:path*',
          destination: '/falizo/index.html',
        },
      ],
      beforeFiles: [],
      afterFiles: [],
    };
  },
};

export default nextConfig;
