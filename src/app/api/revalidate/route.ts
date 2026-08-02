import { verifyWebhookSignature } from '@hygraph/utils';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = await request.json();
  const signature = request.headers.get('gcms-signature');
  const secret = process.env.CMS_WEBHOOK_SECRET;

  if (signature == null) {
    return NextResponse.json(
      { status: 401, message: 'Signature does not exist' },
      { status: 401 },
    );
  }

  if (secret == null) {
    return NextResponse.json(
      { status: 401, message: 'Secret does not exist' },
      { status: 401 },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const isValid = verifyWebhookSignature({ body, signature, secret });

  if (!isValid) {
    return NextResponse.json({ status: 403, message: 'Invalid signature' }, { status: 403 });
  }

  try {
    revalidatePath('/', 'layout');

    return NextResponse.json({
      status: 200,
      message: 'Revalidation successful for entire site',
      now: Date.now(),
    });
  } catch (_error) {
    return NextResponse.json(
      { status: 500, message: 'Revalidation failed' },
      { status: 500 },
    );
  }
}
