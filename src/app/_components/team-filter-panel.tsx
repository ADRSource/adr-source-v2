'use client';

import * as RadioGroup from '@radix-ui/react-radio-group';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { IconSearch } from '~/components/icons/IconSearch';
import {
  countActiveFilters,
  sameFocusArea,
  TEAM_ROLE_LABELS,
  TEAM_ROLES,
  type TeamRole,
} from './team-search';

const ANY_ROLE = 'any';
const ALL_FOCUS = '__all__';

export function TeamFilterPanel({
  role,
  focus,
  focusAreas,
  onRoleChange,
  onFocusChange,
  onClear,
}: {
  role?: TeamRole;
  focus?: string;
  focusAreas: readonly string[];
  onRoleChange: (role?: TeamRole) => void;
  onFocusChange: (focus?: string) => void;
  onClear: () => void;
}) {
  const [areaQuery, setAreaQuery] = React.useState('');
  const roleHeadingId = React.useId();
  const focusHeadingId = React.useId();
  const areaFilter = areaQuery.trim().toLowerCase();
  const visibleAreas =
    areaFilter.length > 0
      ? focusAreas.filter((area) => area.toLowerCase().includes(areaFilter))
      : [...focusAreas];
  const selectedFocus =
    focus == null ? ALL_FOCUS : (focusAreas.find((area) => sameFocusArea(area, focus)) ?? focus);
  const activeCount = countActiveFilters({ role, focus });

  return (
    <>
      <section className="stack-y-1">
        <h3
          id={roleHeadingId}
          className="text-xs font-medium uppercase tracking-[0.12em] text-brand-copper/80"
        >
          Role
        </h3>
        <RadioGroup.Root
          aria-labelledby={roleHeadingId}
          orientation="horizontal"
          value={role ?? ANY_ROLE}
          onValueChange={(value) => {
            if (value === ANY_ROLE) {
              onRoleChange(undefined);
              return;
            }
            if ((TEAM_ROLES as readonly string[]).includes(value)) {
              onRoleChange(value as TeamRole);
            }
          }}
          className="flex flex-wrap gap-1"
        >
          <RoleChip value={ANY_ROLE} label="Any" />
          {TEAM_ROLES.map((value) => (
            <RoleChip key={value} value={value} label={TEAM_ROLE_LABELS[value]} />
          ))}
        </RadioGroup.Root>
      </section>

      <hr className="my-2 border-brand-copper/25" />

      <section className="stack-y-1">
        <h3
          id={focusHeadingId}
          className="text-xs font-medium uppercase tracking-[0.12em] text-brand-copper/80"
        >
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
        <RadioGroup.Root
          aria-labelledby={focusHeadingId}
          orientation="vertical"
          value={selectedFocus}
          onValueChange={(value) => {
            onFocusChange(value === ALL_FOCUS ? undefined : value);
          }}
          className="max-h-48 overflow-y-auto py-1"
        >
          <FocusOption value={ALL_FOCUS} label="All areas of focus" />
          {visibleAreas.map((area) => (
            <FocusOption key={area} value={area} label={area} />
          ))}
          {visibleAreas.length === 0 ? (
            <p className="px-1 py-1 text-sm text-brand-copper/70">No matching areas</p>
          ) : null}
        </RadioGroup.Root>
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
    </>
  );
}

function RoleChip({ value, label }: { value: string; label: string }) {
  return (
    <RadioGroup.Item
      value={value}
      className={twMerge(
        'rounded-full border px-2 py-1 text-sm leading-none transition-colors',
        'border-brand-copper/50 text-brand-copper hover:border-brand-copper',
        'data-[state=checked]:border-brand-copper data-[state=checked]:bg-brand-copper/15',
      )}
    >
      {label}
    </RadioGroup.Item>
  );
}

function FocusOption({ value, label }: { value: string; label: string }) {
  return (
    <RadioGroup.Item
      value={value}
      className={twMerge(
        'group flex w-full items-center gap-1 rounded-lg px-1 py-1 text-left text-sm leading-tight transition-colors',
        'hover:bg-brand-copper/5 data-[state=checked]:bg-brand-copper/10',
      )}
    >
      <span
        aria-hidden="true"
        className={twMerge(
          'grid size-[14px] shrink-0 place-items-center rounded-full border border-brand-copper/50',
          'group-data-[state=checked]:border-brand-copper',
        )}
      >
        <RadioGroup.Indicator className="size-[6px] rounded-full bg-brand-copper" />
      </span>
      {label}
    </RadioGroup.Item>
  );
}
