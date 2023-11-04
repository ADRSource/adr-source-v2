/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://www.adrsource.com',
	generateRobotsTxt: true,
	exclude: ['/server-sitemap-index.xml'],
	robotsTxtOptions: {
		additionalSitemaps: ['https://www.adrsource.com/server-sitemap-index.xml'],
	},
};
