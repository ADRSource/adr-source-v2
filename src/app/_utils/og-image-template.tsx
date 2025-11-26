/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { makeCmsAssetUrl } from '~/app/_utils/make-cms-asset-url';

async function getInterFont() {
  const fontPath = path.join(process.cwd(), 'src/app/_assets/fonts/Inter-Regular.ttf');
  return await readFile(fontPath);
}
async function getGloockFont() {
  const fontPath = path.join(process.cwd(), 'src/app/_assets/fonts/Gloock-Regular.ttf');
  return await readFile(fontPath);
}

export async function ogImageTemplate({
  markup,
  size = { width: 1200, height: 630 },
}: {
  markup: React.ReactNode;
  size: { width: number; height: number };
}) {
  return new ImageResponse(
    (
      <div tw="flex h-full w-full items-center justify-center relative bg-[#1B1B1B] text-[#F8C596]">
        <img
          tw="flex absolute top-0 left-0"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          src={makeCmsAssetUrl('Y0Typvo2RwWXxSZcDvTQ')}
          alt=""
        />
        {markup}
      </div>
    ),
    {
      ...size,
      // debug: true,
      fonts: [
        {
          data: await getInterFont(),
          name: 'Inter',
          weight: 400,
          style: 'normal',
        },
        {
          data: await getGloockFont(),
          name: 'Gloock',
          weight: 400,
          style: 'normal',
        },
      ],
    },
  );
}
