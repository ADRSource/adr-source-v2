'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Loaded only when rendered, so the SDK never ships to visitors outside draft mode.
const HygraphPreview = dynamic(
  () => import('@hygraph/preview-sdk/react').then((mod) => mod.HygraphPreview),
  { ssr: false },
);

// Finds `data-hygraph-*` elements anywhere in the document, so it doesn't need to wrap the page.
export function ClickToEdit({ endpoint, studioUrl }: { endpoint: string; studioUrl: string }) {
  const router = useRouter();

  return (
    <HygraphPreview
      endpoint={endpoint}
      studioUrl={studioUrl}
      onSave={() => {
        router.refresh();
      }}
    >
      {null}
    </HygraphPreview>
  );
}
