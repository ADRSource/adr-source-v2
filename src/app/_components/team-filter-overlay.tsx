import { Drawer } from '@base-ui/react/drawer';
import { Popover } from '@base-ui/react/popover';
import * as React from 'react';

const DESKTOP_MQ = '(min-width: 768px)';

function subscribeToDesktop(onStoreChange: () => void) {
  const mql = window.matchMedia(DESKTOP_MQ);
  mql.addEventListener('change', onStoreChange);
  return () => {
    mql.removeEventListener('change', onStoreChange);
  };
}

function getDesktopSnapshot() {
  return window.matchMedia(DESKTOP_MQ).matches;
}

function useIsDesktop() {
  return React.useSyncExternalStore(subscribeToDesktop, getDesktopSnapshot, () => false);
}

type OverlayTrigger = React.ComponentType<{
  className?: string;
  children?: React.ReactNode;
}>;

export function TeamFilterOverlay({
  open,
  onOpenChange,
  panel,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  panel: (layout: 'popover' | 'sheet') => React.ReactNode;
  children: (Trigger: OverlayTrigger) => React.ReactNode;
}) {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <Popover.Root open={open} onOpenChange={onOpenChange}>
        {children(Popover.Trigger)}
        <Popover.Portal keepMounted>
          <Popover.Positioner side="bottom" align="end" sideOffset={8} className="z-20">
            <Popover.Popup
              aria-label="Team filters"
              className="w-[min(20rem,calc(100vw-2rem))] origin-[var(--transform-origin)] rounded-2xl border border-brand-copper bg-brand-black/90 p-[calc(theme(spacing.1)*2)] text-brand-copper shadow-lg outline-none backdrop-blur-sm backdrop-saturate-150 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] [&[hidden]]:hidden data-[ending-style]:translate-y-1 data-[starting-style]:translate-y-1 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
            >
              {panel('popover')}
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    );
  }

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      {children(Drawer.Trigger)}
      <Drawer.VirtualKeyboardProvider>
        <Drawer.Portal keepMounted>
          <Drawer.Backdrop className="fixed inset-0 z-40 min-h-dvh bg-brand-black/70 opacity-[calc(1-var(--drawer-swipe-progress))] transition-opacity duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] [&[hidden]]:hidden data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[swiping]:duration-0 supports-[-webkit-touch-callout:none]:absolute" />
          <Drawer.Viewport className="fixed inset-0 z-40 flex items-end justify-center [&[hidden]]:hidden">
            <Drawer.Popup className="flex max-h-[85dvh] w-full flex-col rounded-t-2xl border border-b-0 border-brand-copper bg-brand-black/90 text-brand-copper shadow-lg outline-none backdrop-blur-sm backdrop-saturate-150 transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform [transform:translateY(var(--drawer-swipe-movement-y))] [&[hidden]]:hidden data-[swiping]:select-none data-[ending-style]:duration-200 data-[swiping]:duration-0 data-[ending-style]:[transform:translateY(calc(100%+2px))] data-[starting-style]:[transform:translateY(calc(100%+2px))]">
              <div
                aria-hidden="true"
                className="w-12 mx-auto mt-1 h-1 shrink-0 rounded-full bg-brand-copper/40"
              />
              <Drawer.Title className="px-2 pt-1 text-sm font-medium uppercase tracking-[0.12em] text-brand-copper/80">
                Filters
              </Drawer.Title>
              <Drawer.Description className="sr-only">
                Filter team members by role and area of focus.
              </Drawer.Description>
              <Drawer.Content
                data-base-ui-swipe-ignore=""
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-[calc(theme(spacing.1)*2)] pb-[max(theme(spacing.2),env(safe-area-inset-bottom,0px))]"
              >
                {panel('sheet')}
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.VirtualKeyboardProvider>
    </Drawer.Root>
  );
}
