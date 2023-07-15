/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // We can safely ignore ESLint errors linting the code in CI
    ignoreDuringBuilds: true,
  },
  typescript: {
    // We can safely ignore build errors when using TypeScript because we're type-checking the code in CI
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
