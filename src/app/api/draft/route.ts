import { redirect } from 'next/navigation';
import { getPreviewPath } from '~/api/preview';
import { enableDraftMode } from '~/utils/draft-mode';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const id = searchParams.get('id');

  if (secret !== process.env.DRAFT_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  if (slug == null && id == null) {
    return new Response('Missing slug or id', { status: 400 });
  }

  // Preview URL templates pass `{id}` for models whose page path lives on a related entry.
  const path = id == null ? slug : await getPreviewPath(id);
  if (path == null) {
    return new Response('No page for this entry', { status: 404 });
  }

  // Resolve against our own origin so only same-site paths are followed.
  const destination = new URL(path, request.url);
  if (destination.origin !== new URL(request.url).origin) {
    return new Response('Invalid slug', { status: 400 });
  }

  await enableDraftMode();

  redirect(`${destination.pathname}${destination.search}${destination.hash}`);
}
