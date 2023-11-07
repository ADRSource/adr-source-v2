import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { PATHS } from '~/constants/paths.constants';

const VALID_SLUGS = [PATHS.home, PATHS.about, PATHS.schedule, PATHS.team, PATHS.resources] as const;

export function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const secret = searchParams.get('secret');
	const slug = searchParams.get('slug') ?? '';

	if (secret !== 'MY_SECRET_TOKEN') {
		return new Response('Invalid token', { status: 401 });
	}

	if (!VALID_SLUGS.includes(slug)) {
		return new Response('Invalid slug', { status: 400 });
	}

	draftMode().enable();

	redirect(slug);
}
