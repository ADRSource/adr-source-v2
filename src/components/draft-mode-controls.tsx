import { draftMode } from 'next/headers';
import { ClickToEdit } from '~/components/click-to-edit';
import { root } from '~/components/ui/button';
import { CMS_STUDIO_URL, CMS_URL } from '~/constants/cms.constants';

export async function DraftModeControls() {
  const { isEnabled } = await draftMode();

  return isEnabled ? (
    <>
      <ClickToEdit endpoint={CMS_URL} studioUrl={CMS_STUDIO_URL} />
      <div className="fixed bottom-2 left-2 z-[9999]">
        <form method="post" action="/api/draft/disable">
          <button type="submit" className={root()}>
            Disable Draft Mode
          </button>
        </form>
      </div>
    </>
  ) : null;
}
