import { verifyWebhookSignature } from '@hygraph/utils';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const secret = process.env.CMS_WEBHOOK_SECRET;
  const signature = request.headers.get('gcms-signature');

  if (secret == null) {
    return NextResponse.json({ message: 'Webhook secret is not configured' }, { status: 500 });
  }

  if (signature == null) {
    return NextResponse.json({ message: 'Missing signature' }, { status: 401 });
  }

  const rawPayload = await request.text();

  if (!verifyWebhookSignature({ rawPayload, signature, secret })) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 403 });
  }

  // Content is cross-referenced across pages, so any publish revalidates every route.
  revalidatePath('/', 'layout');

  return NextResponse.json({ message: 'Revalidated', now: Date.now() });
}
