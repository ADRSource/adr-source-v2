/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://www.adrsource.com',
	generateRobotsTxt: true,
	exclude: [
		'/server-sitemap-index.xml',
		'/team/server-sitemap.xml',
		'/resources/server-sitemap.xml',
	],
	// Dynamic (they read searchParams), so the build never discovers them.
	additionalPaths: async (config) => [
		await config.transform(config, '/team'),
		await config.transform(config, '/resources'),
	],
	robotsTxtOptions: {
		additionalSitemaps: ['https://www.adrsource.com/server-sitemap-index.xml'],
	},
};
