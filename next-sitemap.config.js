/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://www.adrsource.com',
	generateRobotsTxt: true,
	exclude: ['/server-sitemap-index.xml', '/work/server-sitemap.xml'],
	robotsTxtOptions: {
		additionalSitemaps: ['https://www.adrsource.com/server-sitemap-index.xml'],
	},
};
