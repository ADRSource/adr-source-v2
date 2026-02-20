import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { root } from '~/components/ui/button';

async function disableDraft() {
  'use server';
  (await draftMode()).disable();
  redirect('/');
}

export async function DraftModeControls() {
  const { isEnabled } = await draftMode();

  return isEnabled ? (
    <div className="fixed bottom-2 left-2 z-[9999]">
      <form action={disableDraft}>
        <button type="submit" className={root()}>
          Disable Draft Mode
        </button>
      </form>
    </div>
  ) : null;
}
