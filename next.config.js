/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_CMS_ASSET_ENV_ID: process.env.NEXT_CMS_ASSET_ENV_ID,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'media.graphassets.com',
        protocol: 'https',
      },
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/team/scott-m-baughan',
        destination: '/team/scott-baughan',
        permanent: true,
      },
      {
        source: '/values',
        destination: '/about',
        permanent: true,
      },
    ];
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

module.exports = nextConfig;
