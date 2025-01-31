/* eslint-disable @next/next/no-img-element */
import { makeCmsAssetUrl } from '~/app/_utils/make-cms-asset-url';
import { ogImageTemplate } from '~/app/_utils/og-image-template';

export async function ogImageDefault({
  size = { width: 1200, height: 630 },
}: {
  size: { width: number; height: number };
}) {
  return ogImageTemplate({
    size,
    markup: (
      <img
        tw="flex relative"
        style={{
          width: 500,
        }}
        src={makeCmsAssetUrl('DkECP7wSEm2h7vviDdHw')}
        alt=""
      />
    ),
  });
}
