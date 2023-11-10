import { Metadata } from 'next';

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
	// TODO: Update this to pull data from the CMS
	return {
		title: params.slug,
		openGraph: {
			title: params.slug,
		},
	};
};

export default function Resource() {
	return null;
}
