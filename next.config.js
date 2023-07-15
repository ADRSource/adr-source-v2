/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // We can safely ignore build errors when using TypeScript because we're type-checking the code in CI
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
