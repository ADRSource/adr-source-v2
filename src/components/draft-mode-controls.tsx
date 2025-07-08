import { draftMode } from 'next/headers';
import { ButtonLink } from '~/components/ui/button';

export async function DraftModeControls() {
  const { isEnabled } = await draftMode();

  return isEnabled ? (
    <div className="fixed bottom-2 left-2 z-[9999]">
      <ButtonLink href="/api/draft/disable" prefetch={false}>
        Disable Draft Mode
      </ButtonLink>
    </div>
  ) : null;
}
