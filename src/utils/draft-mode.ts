import { cookies, draftMode } from 'next/headers';
import 'server-only';

// Next's draft mode cookie (COOKIE_NAME_PRERENDER_BYPASS in next/dist/server/api-utils).
const DRAFT_COOKIE = '__prerender_bypass';

// Studio's live preview is a cross-site iframe, where browsers drop unpartitioned third-party cookies.
async function partitionDraftCookie(expires?: Date) {
  // `Partitioned` requires `Secure`, which Next omits in development.
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  const jar = await cookies();
  jar.set({
    name: DRAFT_COOKIE,
    value: jar.get(DRAFT_COOKIE)?.value ?? '',
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    partitioned: true,
    expires,
  });
}

export async function enableDraftMode() {
  (await draftMode()).enable();
  await partitionDraftCookie();
}

// Expiring an unpartitioned cookie leaves a partitioned one in place, so disabling partitions too.
export async function disableDraftMode() {
  (await draftMode()).disable();
  await partitionDraftCookie(new Date(0));
}
