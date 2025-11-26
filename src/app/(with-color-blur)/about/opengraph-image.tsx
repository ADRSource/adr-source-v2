import { ogImageDefault } from '~/app/_utils/og-image-default';

// Route segment config
export const alt = 'ADRsource';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return await ogImageDefault({ size });
}
