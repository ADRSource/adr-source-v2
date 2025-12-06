import { draftMode } from 'next/headers';
import { getInternalResourceBySlug } from '~/api/resource';
import { makeCmsAssetUrl } from '~/app/_utils/make-cms-asset-url';
import { ogImageDefault } from '~/app/_utils/og-image-default';
import { ogImageTemplate } from '~/app/_utils/og-image-template';

// Route segment config
export const runtime = 'edge';
export const alt = 'Resource';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const preview = (await draftMode()).isEnabled;
  const { slug } = params;
  const data = await getInternalResourceBySlug(slug, preview);
  const { internalResource } = data;

  if (!internalResource) {
    return await ogImageDefault({ size });
  }

  const { title, excerpt, resource } = internalResource;

  return await ogImageTemplate({
    size,
    markup: (
      <div tw="flex h-full w-full">
        <img
          tw="flex absolute top-10 right-15 m-0"
          style={{
            width: 132,
          }}
          src={makeCmsAssetUrl('DkECP7wSEm2h7vviDdHw')}
          alt=""
        />
        <div tw="flex h-full w-full p-20 items-end">
          <div tw="flex flex-col max-w-[66%]">
            <p
              tw="uppercase absolute m-0 mb-[24px] font-medium p-[6px]"
              style={{
                border: '1px solid #F8C596',
                fontSize: 16,
                lineHeight: 1,
                borderRadius: 9999,
                transform: 'translateY(-200%)',
              }}
            >
              {resource?.resourceType?.type}
            </p>
            <h1
              tw="m-0 mb-[28px]"
              style={{
                fontFamily: 'Gloock',
                fontSize: 48,
                lineHeight: 1,
              }}
            >
              {title}
            </h1>
            <p
              tw="m-0"
              style={{
                fontFamily: 'Inter',
                lineHeight: 1.25,
                fontSize: 24,
              }}
            >
              {excerpt.text}
            </p>
          </div>
        </div>
      </div>
    ),
  });
}
