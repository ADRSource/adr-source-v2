'use client';

import { FocusScope } from '@react-aria/focus';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { IconSearch } from '~/components/icons/IconSearch';
import { countActiveFilters, TEAM_ROLE_LABELS, TEAM_ROLES, type TeamRole } from './team-search';

export function TeamFilterPanel({
  id,
  role,
  focus,
  focusAreas,
  onRoleChange,
  onFocusChange,
  onClear,
  onClose,
}: {
  id: string;
  role?: TeamRole;
  focus?: string;
  focusAreas: readonly string[];
  onRoleChange: (role?: TeamRole) => void;
  onFocusChange: (focus?: string) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  const [areaQuery, setAreaQuery] = React.useState('');
  const panelRef = React.useRef<HTMLDivElement>(null);
  const areaFilter = areaQuery.trim().toLowerCase();
  const visibleAreas =
    areaFilter.length > 0
      ? focusAreas.filter((area) => area.toLowerCase().includes(areaFilter))
      : [...focusAreas];
  const activeCount = countActiveFilters({ role, focus });

  React.useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (panelRef.current?.contains(target) === true) return;
      onClose();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <FocusScope restoreFocus contain={false} autoFocus>
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-label="Team filters"
        className="absolute right-0 top-[calc(100%+8px)] z-20 w-[min(100%,20rem)] rounded-2xl border border-brand-copper bg-brand-black/90 p-2 text-brand-copper shadow-lg backdrop-blur-sm backdrop-saturate-150"
      >
        <section className="stack-y-1">
          <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-brand-copper/80">
            Role
          </h3>
          <div role="radiogroup" aria-label="Role" className="flex flex-wrap gap-1">
            <RoleChip
              label="Any"
              selected={role == null}
              onSelect={() => {
                onRoleChange(undefined);
              }}
            />
            {TEAM_ROLES.map((value) => (
              <RoleChip
                key={value}
                label={TEAM_ROLE_LABELS[value]}
                selected={role === value}
                onSelect={() => {
                  onRoleChange(value);
                }}
              />
            ))}
          </div>
        </section>

        <hr className="my-2 border-brand-copper/25" />

        <section className="stack-y-1">
          <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-brand-copper/80">
            Areas of Focus
          </h3>
          <div className="flex items-center gap-1 border-b border-brand-copper/25 pb-1">
            <IconSearch aria-hidden="true" className="size-[15px] shrink-0" />
            <label htmlFor="filter-areas" className="sr-only">
              Filter areas
            </label>
            <input
              id="filter-areas"
              type="search"
              value={areaQuery}
              onChange={(event) => {
                setAreaQuery(event.target.value);
              }}
              placeholder="Filter areas..."
              className="h-3 w-full border-none bg-transparent text-sm text-brand-copper placeholder:text-brand-copper/70 focus:outline-none focus-visible:outline-none [&::-webkit-search-cancel-button]:appearance-none"
            />
          </div>
          <div
            role="radiogroup"
            aria-label="Areas of Focus"
            className="max-h-48 overflow-y-auto py-1"
          >
            <FocusOption
              label="All areas of focus"
              selected={focus == null}
              onSelect={() => {
                onFocusChange(undefined);
              }}
            />
            {visibleAreas.map((area) => (
              <FocusOption
                key={area}
                label={area}
                selected={focus === area}
                onSelect={() => {
                  onFocusChange(area);
                }}
              />
            ))}
            {visibleAreas.length === 0 ? (
              <p className="px-1 py-1 text-sm text-brand-copper/70">No matching areas</p>
            ) : null}
          </div>
        </section>

        <hr className="mb-2 mt-1 border-brand-copper/25" />

        {activeCount === 0 ? (
          <p className="px-1 text-sm text-brand-copper/80">No filters applied</p>
        ) : (
          <button
            type="button"
            onClick={onClear}
            className="px-1 text-sm text-brand-copper underline decoration-transparent transition-colors hover:decoration-current"
          >
            Clear filters
          </button>
        )}
      </div>
    </FocusScope>
  );
}

function RoleChip({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={twMerge(
        'rounded-full border px-2 py-1 text-sm leading-none transition-colors',
        selected
          ? 'border-brand-copper bg-brand-copper/15 text-brand-copper'
          : 'border-brand-copper/50 text-brand-copper hover:border-brand-copper',
      )}
    >
      {label}
    </button>
  );
}

function FocusOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={twMerge(
        'flex w-full items-center gap-1 rounded-lg px-1 py-1 text-left text-sm leading-tight transition-colors',
        selected ? 'bg-brand-copper/10' : 'hover:bg-brand-copper/5',
      )}
    >
      <span
        aria-hidden="true"
        className={twMerge(
          'grid size-[14px] shrink-0 place-items-center rounded-full border',
          selected ? 'border-brand-copper' : 'border-brand-copper/50',
        )}
      >
        {selected ? <span className="size-[6px] rounded-full bg-brand-copper" /> : null}
      </span>
      {label}
    </button>
  );
}
