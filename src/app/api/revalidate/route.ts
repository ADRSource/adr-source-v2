import { verifyWebhookSignature } from '@hygraph/utils';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const body = await request.json();
	const signature = headers().get('gcms-signature');
	const tag = request.nextUrl.searchParams.get('tag');
	const secret = process.env.CMS_WEBHOOK_SECRET;

	if (tag == null) {
		return NextResponse.json({
			status: 401,
			message: 'Tag does not exist. You must provide a tag to revalidate.',
		});
	}

	if (signature == null) {
		return NextResponse.json({
			status: 401,
			message: 'Signature does not exist',
		});
	}

	if (secret == null) {
		return NextResponse.json({
			status: 401,
			message: 'Secret does not exist',
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const isValid = verifyWebhookSignature({ body, signature, secret });

	if (!isValid) {
		return NextResponse.json({
			status: 403,
			message: 'Invalid signature',
		});
	}

	try {
		console.log('Revalidating tag:', tag);
		revalidateTag(tag);

		return NextResponse.json({
			status: 200,
			message: `Revalidation successful for: ${tag}`,
			now: Date.now(),
		});
	} catch (_error) {
		return NextResponse.json({
			status: 500,
			message: `Revalidation failed for: ${tag}`,
		});
	}
}
