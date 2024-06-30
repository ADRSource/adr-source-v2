import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { twMerge } from 'tailwind-merge';
import { getSchedulePage } from '~/api/schedule';
import { Container } from '~/components/container';
import { IconLink } from '~/components/ui/link';
import { heading, text } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';
import { getMetadataFromSeo } from '~/utils/seo';
import styles from './page.module.css';

export async function generateMetadata(): Promise<Metadata> {
	const preview = draftMode().isEnabled;
	try {
		const data = await getSchedulePage(preview);
		const { seo } = data.schedulePage ?? {};
		return getMetadataFromSeo(`${PATHS.absolute}${PATHS.schedule}`, seo);
	} catch (_error) {
		console.error('Error generating metadata for schedule page');

		return {};
	}
}

export default function Schedule() {
	return (
		<Container>
			<main className={styles.root}>
				<div className="items-center pb-7 pt-6 stack-y-4">
					<h1
						className={heading({
							type: '3',
							className: 'text-center',
						})}
					>
						All Schedules
					</h1>
					<p className={text({ type: 'body', className: 'text-center text-xl' })}>
						For individual neutral schedules, vist the{' '}
						<IconLink
							href={PATHS.team}
							className="text-brand-toffee underline stack-x-[4px]/inline"
						>
							team page
						</IconLink>
						.
					</p>
					<div className="w-full overflow-y-auto rounded-lg bg-white p-0 sm:p-1 md:p-2">
						<iframe
							className={twMerge('max-w-full', styles.schedule)}
							width="100%"
							src="https://nadn.org/dateselector/adrsource"
						/>
					</div>
				</div>
			</main>
		</Container>
	);
}
