import { verifyWebhookSignature } from '@hygraph/utils';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const body = await request.json();
	const signature = request.headers.get('gcms-signature');
	const url = new URL(request.url);
	const tag = url.searchParams.get('tag');
	const path = url.searchParams.get('path');
	const secret = process.env.CMS_WEBHOOK_SECRET;

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

	switch (true) {
		case path !== null && tag !== null: {
			return NextResponse.json({
				status: 401,
				message: 'Only one query parameter can be provided. Either path or tag.',
			});
		}
		case path !== null: {
			try {
				console.log('Revalidating path:', path);
				revalidatePath(path);

				return NextResponse.json({
					status: 200,
					message: `Revalidation successful for: ${path}`,
					now: Date.now(),
				});
			} catch (_error) {
				return NextResponse.json({
					status: 500,
					message: `Revalidation failed for: ${path}`,
				});
			}
		}
		case tag !== null: {
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
		default: {
			return NextResponse.json({
				status: 401,
				message: 'A valid query parameter must be provided.',
			});
		}
	}
}
