import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (secret !== process.env.DRAFT_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  if (slug == null) {
    return new Response('Missing slug', { status: 400 });
  }

  // Resolve against our own origin so only same-site paths are followed.
  const destination = new URL(slug, request.url);
  if (destination.origin !== new URL(request.url).origin) {
    return new Response('Invalid slug', { status: 400 });
  }

  (await draftMode()).enable();

  redirect(`${destination.pathname}${destination.search}${destination.hash}`);
}
