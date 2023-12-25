import { SeoInfoFragment } from '~/graphql/generated/cms.generated';

export function getMetadataFromSeo(url: string, seo?: SeoInfoFragment) {
	const title = seo?.title ?? '';
	const description = seo?.description ?? '';
	const index = Boolean(seo?.index);

	return {
		title,
		description,
		robots: index ? 'index, follow' : 'noindex, nofollow',
		openGraph: {
			title,
			description,
			type: 'website',
			locale: 'en_US',
			url,
		},
	};
}
