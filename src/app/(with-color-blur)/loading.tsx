import { PageLoader } from '~/components/page-loader/page-loader';

export default function Loading() {
	return (
		<div className="grid h-full min-h-[calc(100vh_-_theme(spacing.nav-height)_-_theme(spacing.1))] place-items-center md:min-h-[calc(100vh_-_theme(spacing.nav-height)_-_theme(spacing.2))]">
			<PageLoader />
		</div>
	);
}
