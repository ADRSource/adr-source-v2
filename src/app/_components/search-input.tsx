'use client';

import { useDebouncedCallback } from '@tanstack/react-pacer';
import { motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { IconCrossCircled } from '~/components/icons/IconCrossCircled';
import { IconLoader } from '~/components/icons/IconLoader';
import { IconSearch } from '~/components/icons/IconSearch';

const springTransition = { type: 'spring', stiffness: 120, damping: 14 } as const;

export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();
  const [isInputFocused, setInputFocused] = React.useState(false);

  const currentTerm = searchParams.get('term');

  const handleSearch = React.useCallback(
    (term: string) => {
      const params = new URLSearchParams();
      if (term.length > 0) {
        params.set('term', term);
      } else {
        params.delete('term');
      }

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router],
  );

  const debouncedHandleSearch = useDebouncedCallback(handleSearch, { wait: 300 });
  const inputRef = React.useRef<HTMLInputElement>(null);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = React.useState(false);

  // Scroll to the search section after navigation completes.
  // Fires when searchParams update (not on initial mount).
  const isInitialRender = React.useRef(true);
  React.useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    containerRef.current?.parentElement?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [currentTerm]);

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

  const compact = isSticky && !isInputFocused && currentTerm == null;

  return (
    <motion.div
      ref={containerRef}
      initial={false}
      animate={{
        width: compact ? '120px' : '100%',
      }}
      className="sticky top-[calc(var(--nav-spacing)_+_(theme(spacing.2)_/_2))] z-10 mx-auto flex w-full max-w-xs"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
        className="w-full"
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        <motion.div
          className={twMerge(
            'relative z-0 flex h-[40px] w-full items-center rounded-full border border-brand-copper bg-brand-black/70 pl-[calc(theme(spacing.2)_/_2)] pr-[calc(theme(spacing.2)_*_2)] text-base text-brand-copper backdrop-blur-sm backdrop-saturate-150 transition-colors placeholder:text-brand-toffee focus-within:ring-2 focus-within:ring-brand-copper focus-within:ring-offset-2 focus-within:ring-offset-brand-black md:text-sm',
            compact && 'border-brand-copper/40 pr-0',
          )}
          initial={false}
          animate={{
            scale: compact ? 0.9 : 1,
          }}
          transition={springTransition}
        >
          <div className="relative grid size-[15px] place-items-center">
            {isPending ? (
              <IconLoader className="size-[15px]" animate />
            ) : (
              <IconSearch aria-hidden="true" />
            )}
          </div>
          <label htmlFor="search" className="sr-only">
            Search team members
          </label>
          <input
            id="search"
            spellCheck={false}
            className="h-full w-full border-none bg-transparent px-1 text-current placeholder:text-current focus:shadow-none focus:outline-none focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0"
            type="text"
            placeholder={compact ? 'Search' : 'Search team...'}
            defaultValue={currentTerm?.toString()}
            ref={inputRef}
            onFocus={() => {
              setInputFocused(true);
            }}
            onBlur={() => {
              setInputFocused(false);
            }}
            onChange={(e) => {
              debouncedHandleSearch(e.target.value);
            }}
          />
        </motion.div>
        {currentTerm != null ? (
          <button
            type="button"
            onClick={() => {
              handleSearch('');
              if (inputRef.current) {
                inputRef.current.value = '';
                inputRef.current.focus();
              }
            }}
            className="absolute right-2 top-1/2 z-10 grid size-2 -translate-y-1/2 place-items-center md:right-[calc(theme(spacing.2)_/_2)]"
          >
            <IconCrossCircled />
            <span className="sr-only">Clear</span>
          </button>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
