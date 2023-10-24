/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['media.graphassets.com'],
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
