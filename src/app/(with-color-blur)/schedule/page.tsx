import { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';
import { getSchedulePage } from '~/api/schedule';
import { Container } from '~/components/container';
import { heading } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';
import { getMetadataFromSeo } from '~/utils/seo';
import styles from './page.module.css';

export async function generateMetadata(): Promise<Metadata> {
	try {
		const data = await getSchedulePage();
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
				<div className="pb-7 pt-6 stack-y-4">
					<h1
						className={heading({
							type: '3',
							className: 'text-center',
						})}
					>
						Schedule
					</h1>
					<div className="overflow-y-auto rounded-lg bg-white p-0 sm:p-1 md:p-2">
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
