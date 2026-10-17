import { expiredDraftCookies } from '~/utils/draft-mode';

// A route handler rather than a server action: `cookies()` keeps one cookie per name, and this needs two.
export function POST(request: Request) {
  const headers = new Headers({ Location: new URL('/', request.url).toString() });
  for (const cookie of expiredDraftCookies()) {
    headers.append('Set-Cookie', cookie);
  }

  return new Response(null, { status: 303, headers });
}
