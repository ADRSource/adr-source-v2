'use client';

import { useDebouncer } from '@tanstack/react-pacer';
import { motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { IconCrossCircled } from '~/components/icons/IconCrossCircled';
import { IconLoader } from '~/components/icons/IconLoader';
import { IconMixerHorizontal } from '~/components/icons/IconMixerHorizontal';
import { IconSearch } from '~/components/icons/IconSearch';
import { TeamFilterPanel } from './team-filter-panel';
import { TEAM_ROLES, countActiveFilters, type TeamRole } from './team-search';

const springTransition = { type: 'spring', stiffness: 120, damping: 14 } as const;

// useLayoutEffect warns during SSR, where it would be a no-op anyway.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

function isTeamRole(value: string | null): value is TeamRole {
  return value != null && (TEAM_ROLES as readonly string[]).includes(value);
}

export function SearchInput({ focusAreas }: { focusAreas: readonly string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();
  const [isInputFocused, setInputFocused] = React.useState(false);
  const [isFilterOpen, setFilterOpen] = React.useState(false);
  const filterPanelId = React.useId();

  const currentTerm = searchParams.get('term');
  const roleParam = searchParams.get('role');
  const currentRole = isTeamRole(roleParam) ? roleParam : undefined;
  const focusParam = searchParams.get('focus');
  const currentFocus = focusParam != null && focusParam.length > 0 ? focusParam : undefined;
  const activeFilterCount = countActiveFilters({ role: currentRole, focus: currentFocus });
  const panelFocusAreas =
    currentFocus != null && !focusAreas.includes(currentFocus)
      ? [currentFocus, ...focusAreas]
      : focusAreas;

  const replaceParams = React.useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      // Seed from the current params so unrelated ones (campaign tags on a
      // shared link, say) survive a search or filter change.
      const params = new URLSearchParams(searchParams);
      mutate(params);

      startTransition(() => {
        const qs = params.toString();
        router.replace(qs.length > 0 ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  const handleSearch = React.useCallback(
    (term: string) => {
      replaceParams((params) => {
        if (term.length > 0) {
          params.set('term', term);
        } else {
          params.delete('term');
        }
      });
    },
    [replaceParams],
  );

  const handleRoleChange = React.useCallback(
    (role?: TeamRole) => {
      replaceParams((params) => {
        if (role != null) {
          params.set('role', role);
        } else {
          params.delete('role');
        }
      });
    },
    [replaceParams],
  );

  const handleFocusChange = React.useCallback(
    (focus?: string) => {
      replaceParams((params) => {
        if (focus != null && focus.length > 0) {
          params.set('focus', focus);
        } else {
          params.delete('focus');
        }
      });
    },
    [replaceParams],
  );

  const handleClearFilters = React.useCallback(() => {
    replaceParams((params) => {
      params.delete('role');
      params.delete('focus');
    });
  }, [replaceParams]);

  const handleCloseFilters = React.useCallback(() => {
    setFilterOpen(false);
  }, []);

  // `useDebouncer` rather than `useDebouncedCallback` so the clear button can
  // cancel a keystroke that is still waiting out its 300ms — otherwise that
  // pending call lands after the clear and puts the term back in the URL while
  // the input sits empty.
  const searchDebouncer = useDebouncer(handleSearch, { wait: 300 });
  const inputRef = React.useRef<HTMLInputElement>(null);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = React.useState(false);

  // Scroll to the search section once a search or filter actually changes
  // the results. Before paint, not after: fewer results shorten the page, and
  // the browser clamps scroll to the new bottom — a plain effect paints that
  // clamped frame (a flash of footer) before this runs.
  const resultsKey = `${currentTerm ?? ''}\t${currentRole ?? ''}\t${currentFocus ?? ''}`;
  const previousResultsKey = React.useRef(resultsKey);
  useIsomorphicLayoutEffect(() => {
    if (previousResultsKey.current === resultsKey) return;

    previousResultsKey.current = resultsKey;
    containerRef.current?.parentElement?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [resultsKey]);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function createObserver() {
      const topPx = parseFloat(getComputedStyle(el!).top);

      const observer = new IntersectionObserver(
        ([entry]) => {
          const stuck = entry?.intersectionRect.top === entry?.rootBounds?.top;
          setIsSticky((prev) => (prev === stuck ? prev : stuck));
        },
        {
          rootMargin: `-${String(topPx + 1)}px 0px 0px 0px`,
          threshold: [1],
        },
      );

      observer.observe(el!);
      return observer;
    }

    let observer = createObserver();

    // --nav-height changes at 768px (60px → 78px), which changes the
    // sticky top offset. Re-create the observer so rootMargin stays in sync.
    const mql = window.matchMedia('(min-width: 768px)');
    function handleBreakpoint() {
      observer.disconnect();
      observer = createObserver();
    }
    mql.addEventListener('change', handleBreakpoint);

    return () => {
      observer.disconnect();
      mql.removeEventListener('change', handleBreakpoint);
    };
  }, []);

  const compact =
    isSticky && !isInputFocused && currentTerm == null && !isFilterOpen && activeFilterCount === 0;

  return (
    <motion.div
      ref={containerRef}
      initial={false}
      animate={{
        width: compact ? '168px' : '100%',
      }}
      className="sticky top-[calc(var(--nav-spacing)_+_(theme(spacing.2)_/_2))] z-10 mx-auto flex w-full max-w-lg"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
        className="relative w-full"
      >
        <motion.div
          className={twMerge(
            'relative z-0 flex h-[40px] w-full items-center rounded-full border border-brand-copper bg-brand-black/70 text-base text-brand-copper backdrop-blur-sm backdrop-saturate-150 transition-colors placeholder:text-brand-toffee focus-within:ring-2 focus-within:ring-brand-copper focus-within:ring-offset-2 focus-within:ring-offset-brand-black md:text-sm',
            compact && 'border-brand-copper/40',
          )}
          initial={false}
          animate={{
            scale: compact ? 0.9 : 1,
          }}
          transition={springTransition}
        >
          <div
            className="relative flex min-w-0 flex-1 items-center pl-[calc(theme(spacing.2)_/_2)]"
            onClick={() => {
              inputRef.current?.focus();
            }}
          >
            <div className="relative grid size-[15px] place-items-center">
              {isPending ? (
                <IconLoader className="size-[15px]" animate aria-hidden="true" />
              ) : (
                <IconSearch aria-hidden="true" />
              )}
            </div>
            <label htmlFor="search" className="sr-only">
              Search team members by name
            </label>
            <input
              id="search"
              spellCheck={false}
              // The native WebKit clear button is suppressed in favour of the
              // custom one below, which stays in sync with the URL term.
              className="h-full w-full min-w-0 border-none bg-transparent px-1 pr-3 text-current placeholder:text-current focus:shadow-none focus:outline-none focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 [&::-webkit-search-cancel-button]:appearance-none"
              type="search"
              placeholder={compact ? 'Search' : 'Search team by name...'}
              defaultValue={currentTerm?.toString()}
              ref={inputRef}
              onFocus={() => {
                setInputFocused(true);
              }}
              onBlur={() => {
                setInputFocused(false);
              }}
              onChange={(e) => {
                searchDebouncer.maybeExecute(e.target.value);
              }}
            />
            {currentTerm != null ? (
              <button
                type="button"
                onClick={() => {
                  searchDebouncer.cancel();
                  handleSearch('');
                  if (inputRef.current) {
                    inputRef.current.value = '';
                    inputRef.current.focus();
                  }
                }}
                className="absolute right-1 top-1/2 z-10 grid size-2 -translate-y-1/2 place-items-center"
              >
                <IconCrossCircled />
                <span className="sr-only">Clear search</span>
              </button>
            ) : null}
          </div>
          <div className="w-px h-5 shrink-0 self-center bg-brand-copper/50" aria-hidden="true" />
          <button
            type="button"
            aria-label="Filter"
            aria-expanded={isFilterOpen}
            aria-controls={filterPanelId}
            aria-haspopup="dialog"
            onClick={(event) => {
              event.stopPropagation();
              setFilterOpen((open) => !open);
            }}
            onPointerDown={(event) => {
              // The panel's outside-click listener lives on `document`.
              // Without this, clicking Filter to close fires close-then-toggle
              // and the panel stays open.
              event.stopPropagation();
            }}
            className={twMerge(
              'flex h-full shrink-0 items-center gap-1 px-2 text-sm text-brand-copper',
              compact && 'px-1.5',
            )}
          >
            <span className={twMerge('leading-none', compact && 'sr-only')}>Filter</span>
            {activeFilterCount > 0 ? (
              <span className="grid size-[18px] place-items-center rounded-full bg-brand-copper text-[11px] font-medium leading-none text-brand-black">
                {activeFilterCount}
              </span>
            ) : null}
            <IconMixerHorizontal aria-hidden="true" />
          </button>
        </motion.div>
        {isFilterOpen ? (
          <TeamFilterPanel
            id={filterPanelId}
            role={currentRole}
            focus={currentFocus}
            focusAreas={panelFocusAreas}
            onRoleChange={handleRoleChange}
            onFocusChange={handleFocusChange}
            onClear={handleClearFilters}
            onClose={handleCloseFilters}
          />
        ) : null}
      </motion.div>
    </motion.div>
  );
}
