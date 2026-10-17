import { cookies, draftMode } from 'next/headers';
import 'server-only';

// Next's draft mode cookie (COOKIE_NAME_PRERENDER_BYPASS in next/dist/server/api-utils).
const DRAFT_COOKIE = '__prerender_bypass';

// `Partitioned` requires `Secure`, which Next omits in development.
const canPartition = process.env.NODE_ENV !== 'development';

// Studio's live preview is a cross-site iframe, where browsers drop unpartitioned third-party cookies.
export async function enableDraftMode() {
  (await draftMode()).enable();

  if (canPartition) {
    const jar = await cookies();
    jar.set({
      name: DRAFT_COOKIE,
      value: jar.get(DRAFT_COOKIE)?.value ?? '',
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      partitioned: true,
    });
  }
}

// Partitioned and unpartitioned cookies are stored separately, so disabling expires both.
export function expiredDraftCookies() {
  const base = `${DRAFT_COOKIE}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly`;

  return canPartition
    ? [`${base}; Secure; SameSite=None`, `${base}; Secure; SameSite=None; Partitioned`]
    : [`${base}; SameSite=Lax`];
}
