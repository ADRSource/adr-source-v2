import { Metadata } from 'next';
import { PATHS } from '~/constants/paths.constants';

const TITLE = 'Resources';
const DESCRIPTION = `Resources for ADRsource. Get the latest news, updates, and more.`;
export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		url: `${PATHS.absolute}${PATHS.resources}`,
		type: 'website',
		locale: 'en_US',
	},
};

export default function Resources() {
	return null;
}
