/**
 * Content Signals (https://contentsignals.org) declaring how we permit
 * automated systems to use this site's content. Stay discoverable in search
 * and AI answers (with attribution), but opt out of model training.
 */
const CONTENT_SIGNAL = 'search=yes, ai-input=yes, ai-train=no';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://www.adrsource.com',
	generateRobotsTxt: true,
	exclude: [
		'/server-sitemap-index.xml',
		'/team/server-sitemap.xml',
		'/resources/server-sitemap.xml',
	],
	robotsTxtOptions: {
		additionalSitemaps: ['https://www.adrsource.com/server-sitemap-index.xml'],
		// next-sitemap has no native field for Content-Signal, so we inject it
		// into the `User-agent: *` group after the file is generated.
		transformRobotsTxt: async (_config, robotsTxt) => {
			const comment =
				'# Content-Signal directives express how we permit automated use of this content.\n' +
				'# search=yes, ai-input=yes, ai-train=no — see https://contentsignals.org\n';
			return robotsTxt.replace(
				/User-agent: \*\n/,
				`${comment}User-agent: *\nContent-Signal: ${CONTENT_SIGNAL}\n`,
			);
		},
	},
};
