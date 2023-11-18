import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import { getInternalResourceBySlug } from '~/api/resource';
import { Container } from '~/components/container';
import { text } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';
import { createFluidValue } from '~/utils/create-fluid-value';

export const revalidate = 300; // 5 minutes

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	try {
		const data = await getInternalResourceBySlug(params.slug);

		if (!data.internalResource) return {};

		const { seo } = data.internalResource;

		const { title, description } = seo;
		const index = Boolean(seo.index);

		return {
			title,
			description,
			robots: index ? 'index, follow' : 'noindex, nofollow',
			openGraph: {
				title,
				description,
				type: 'article',
				locale: 'en_US',
				url: `${PATHS.absolute}${PATHS.resources}/${params.slug}`,
			},
		};
	} catch (_error) {
		return {};
	}
}

export default async function Resource({ params }: { params: { slug: string } }) {
	const data = await getInternalResourceBySlug(params.slug);

	if (!data.internalResource) {
		return notFound();
	}

	const { internalResource } = data;
	const { title, author, resourceContent, resource } = internalResource;
	const prettyDate =
		resource != null && typeof resource.publishDate === 'string'
			? new Date(resource.publishDate).toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
			  })
			: null;

	return (
		<Container>
			<article className="pb-7 pt-6 stack-y-6">
				<header className="stack-y-4">
					<h1
						className="text-center font-serif leading-none"
						style={{
							fontSize: createFluidValue(32, 96),
						}}
					>
						<Balancer>{title}</Balancer>
					</h1>
					<div className="text-center text-base">
						{author?.memberPage?.slug != null && (
							<p>
								Posted by{' '}
								<span className="block">
									<Link
										href={`${PATHS.team}/${author.memberPage.slug}`}
										className="font-medium uppercase text-brand-toffee"
									>
										{author.info.name}
									</Link>
								</span>
							</p>
						)}
						{prettyDate != null && <p>{prettyDate}</p>}
					</div>
				</header>
				<section className="flex flex-col items-center">
					<RichText
						content={resourceContent.json as RichTextContent}
						renderers={{
							p: ({ children }) => {
								return (
									<p
										className={text({ type: 'body', className: 'mb-[1em] last:mb-0 empty:hidden' })}
									>
										{children}
									</p>
								);
							},
							img: ({ altText, src, width, height }) => {
								if (src == null) return <></>;
								return (
									<Image
										className="mb-4 w-full max-w-4xl overflow-clip rounded-lg bg-brand-black"
										src={src}
										alt={altText ?? ''}
										width={width}
										height={height}
									/>
								);
							},
							link: {
								MemberPage: (props: { slug: string; children: React.ReactNode }) => {
									return (
										<Link
											href={`${PATHS.team}/${props.slug}`}
											className="text-brand-toffee underline"
										>
											{props.children}
										</Link>
									);
								},
							},
						}}
						references={resourceContent.references}
					/>
				</section>
			</article>
		</Container>
	);
}
