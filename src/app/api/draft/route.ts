import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const secret = searchParams.get('secret');
	const slug = searchParams.get('slug') ?? '';

	if (secret !== process.env.DRAFT_SECRET) {
		return new Response('Invalid token', { status: 401 });
	}

	draftMode().enable();

	redirect(slug);
}
