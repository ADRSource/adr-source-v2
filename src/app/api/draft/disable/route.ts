import { draftMode } from 'next/headers';

export default function GET() {
	draftMode().disable();

	return new Response('Draft mode disabled');
}
