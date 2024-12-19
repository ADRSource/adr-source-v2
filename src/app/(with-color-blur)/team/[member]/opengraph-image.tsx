/* eslint-disable @next/next/no-img-element */
import { draftMode } from 'next/headers';
import { getMemberPageBySlug } from '~/api/member';
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

export default async function Image({ params }: { params: { member: string } }) {
  const preview = draftMode().isEnabled;
  const { member } = params;
  const data = await getMemberPageBySlug(member, preview);
  const { memberPage } = data;

  if (!memberPage?.member) {
    return await ogImageDefault({ size });
  }

  const { member: memberData } = memberPage;
  const { info } = memberData;

  return await ogImageTemplate({
    size,
    markup: (
      <div tw="flex h-full w-full">
        <img
          tw="flex absolute top-10 right-15 m-0"
          style={{
            width: 132,
          }}
          src="https://media.graphassets.com/DkECP7wSEm2h7vviDdHw"
          alt=""
        />
        <div tw="flex h-full w-full p-20 items-end">
          <div tw="flex flex-col max-w-[66%]">
            <h1
              tw="m-0 mb-[18px]"
              style={{
                fontFamily: 'Gloock',
                fontSize: 96,
                lineHeight: 1,
              }}
            >
              {info.name}
            </h1>
            <p
              tw="m-0"
              style={{
                fontFamily: 'Inter',
                lineHeight: 1.25,
                fontSize: 28,
              }}
            >
              {ROLE[memberData.__typename]}
            </p>
          </div>
        </div>
      </div>
    ),
  });
}

const ROLE = {
  Neutral: 'Neutral',
  CaseManager: 'Case Manager',
};
