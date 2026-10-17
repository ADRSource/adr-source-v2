import { draftMode } from 'next/headers';
import { root } from '~/components/ui/button';

export async function DraftModeControls() {
  const { isEnabled } = await draftMode();

  return isEnabled ? (
    <div className="fixed bottom-2 left-2 z-[9999]">
      <form method="post" action="/api/draft/disable">
        <button type="submit" className={root()}>
          Disable Draft Mode
        </button>
      </form>
    </div>
  ) : null;
}
