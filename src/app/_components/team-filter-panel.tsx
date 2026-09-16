import { Combobox } from '@base-ui/react/combobox';
import { Radio } from '@base-ui/react/radio';
import { RadioGroup } from '@base-ui/react/radio-group';
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

const listScrollbarClassName =
  'max-h-[min(16rem,40vh)] min-h-0 overflow-y-auto py-1 [scrollbar-width:thin] [scrollbar-color:rgb(248_197_150_/_0.3)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-copper/30';

export function TeamFilterPanel({
  role,
  focus,
  focusAreas,
  onRoleChange,
  onFocusChange,
  onClear,
}: {
  role?: TeamRole;
  focus: readonly string[];
  focusAreas: readonly string[];
  onRoleChange: (role?: TeamRole) => void;
  onFocusChange: (focus: string[]) => void;
  onClear: () => void;
}) {
  const roleHeadingId = React.useId();
  const focusHeadingId = React.useId();
  const focusInputId = React.useId();
  const selectedFocus = React.useMemo(
    () =>
      focus.map((selected) => focusAreas.find((area) => sameFocusArea(area, selected)) ?? selected),
    [focus, focusAreas],
  );
  const activeCount = countActiveFilters({
    role,
    focus: selectedFocus.length > 0 ? [...selectedFocus] : undefined,
  });

  return (
    <>
      <section className="stack-y-1">
        <h3
          id={roleHeadingId}
          className="text-xs font-medium uppercase tracking-[0.12em] text-brand-copper/80"
        >
          Role
        </h3>
        <RadioGroup
          aria-labelledby={roleHeadingId}
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
        </RadioGroup>
      </section>

      <hr className="my-2 border-brand-copper/25" />

      <section>
        <h3
          id={focusHeadingId}
          className="text-xs font-medium uppercase tracking-[0.12em] text-brand-copper/80"
        >
          Areas of Focus
        </h3>
        <Combobox.Root
          items={[...focusAreas]}
          multiple
          inline
          open
          value={[...selectedFocus]}
          onValueChange={(next) => {
            onFocusChange(next);
          }}
          isItemEqualToValue={sameFocusArea}
          onInputValueChange={(_value, eventDetails) => {
            if (eventDetails.isItemPress === true) eventDetails.cancel();
          }}
        >
          <div className="flex items-center gap-1 border-b border-brand-copper/25 focus-within:border-brand-copper/50">
            <IconSearch aria-hidden="true" className="size-[15px] shrink-0" />
            <label htmlFor={focusInputId} className="sr-only">
              Filter areas
            </label>
            <Combobox.Input
              id={focusInputId}
              placeholder="Filter areas..."
              className="h-3 w-full border-none bg-transparent text-sm text-brand-copper placeholder:text-brand-copper/70 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          {selectedFocus.length > 0 ? (
            <Combobox.Chips className="flex flex-wrap gap-1 pb-1 pt-1" aria-label="Selected areas">
              {selectedFocus.map((area) => (
                <Combobox.Chip
                  key={area}
                  className="flex items-center gap-[calc(theme(spacing.1)/2)] rounded-full border border-brand-copper/50 bg-brand-copper/15 px-1 py-[calc(theme(spacing.1)/2)] text-xs leading-none text-brand-copper"
                  aria-label={area}
                  aria-description="Press Backspace or Delete to remove"
                >
                  {area}
                  <Combobox.ChipRemove
                    className="grid size-[14px] place-items-center text-brand-copper/80 hover:text-brand-copper"
                    aria-label={`Remove ${area}`}
                  >
                    <XIcon />
                  </Combobox.ChipRemove>
                </Combobox.Chip>
              ))}
            </Combobox.Chips>
          ) : null}
          <Combobox.Empty className="px-1 py-1 text-sm text-brand-copper/70 empty:hidden">
            No matching areas
          </Combobox.Empty>
          <Combobox.List className={listScrollbarClassName}>
            {(area: string) => (
              <Combobox.Item
                key={area}
                value={area}
                className={twMerge(
                  'group flex w-full cursor-default items-center gap-1 rounded-lg px-1 py-1 text-left text-sm leading-tight',
                  'data-[highlighted]:bg-brand-copper/5 data-[selected]:bg-brand-copper/10',
                )}
              >
                <span
                  aria-hidden="true"
                  className="grid size-[14px] shrink-0 place-items-center rounded-sm border border-brand-copper/50 group-data-[selected]:border-brand-copper"
                >
                  <Combobox.ItemIndicator>
                    <CheckIcon />
                  </Combobox.ItemIndicator>
                </span>
                {area}
              </Combobox.Item>
            )}
          </Combobox.List>
        </Combobox.Root>
      </section>

      {activeCount > 0 && (
        <div className="border-t border-brand-copper/25 pt-1">
          <button
            type="button"
            onClick={onClear}
            className="px-1 text-xs text-brand-copper underline decoration-transparent transition-colors hover:decoration-current"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}

function RoleChip({ value, label }: { value: string; label: string }) {
  return (
    <Radio.Root
      value={value}
      nativeButton
      render={<button type="button" />}
      className={twMerge(
        'rounded-full border px-[calc(theme(spacing.1)*2)] py-1 text-xs leading-none transition-colors',
        'border-brand-copper/50 text-brand-copper hover:border-brand-copper',
        'data-[checked]:border-brand-copper data-[checked]:bg-brand-copper/15',
      )}
    >
      {label}
    </Radio.Root>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M2 5.2 4.1 7.2 8 2.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M2.5 2.5 7.5 7.5M7.5 2.5 2.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
