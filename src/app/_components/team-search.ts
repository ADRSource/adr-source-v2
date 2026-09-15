import { z } from 'zod';

export const TEAM_ROLES = ['arbitrator', 'mediator', 'special-magistrate'] as const;

export type TeamRole = (typeof TEAM_ROLES)[number];

export const TEAM_ROLE_LABELS: Record<TeamRole, string> = {
  arbitrator: 'Arbitrator',
  mediator: 'Mediator',
  'special-magistrate': 'Special Magistrate',
};

/**
 * Substring matched against CMS `roleDescription` values such as
 * "Mediator", "Mediator & Arbitrator", and
 * "Mediator, Arbitrator & Special Magistrate".
 */
export const TEAM_ROLE_MATCH: Record<TeamRole, string> = {
  arbitrator: 'Arbitrator',
  mediator: 'Mediator',
  'special-magistrate': 'Special Magistrate',
};

// Cap query values so overlong `?term=` / `?focus=` can't be forwarded
// verbatim. Repeated keys arrive as arrays and fail `z.string()`, which
// the catch turns into "no filter" rather than an empty-string term
// (that would otherwise render `No Results for ""`).
export const TeamSearchParamSchema = z.object({
  term: z.string().max(100).optional().catch(undefined),
  role: z.enum(TEAM_ROLES).optional().catch(undefined),
  focus: z.string().min(1).max(100).optional().catch(undefined),
});

export type TeamSearchParams = z.infer<typeof TeamSearchParamSchema>;

export function countActiveFilters(filters: Pick<TeamSearchParams, 'role' | 'focus'>): number {
  return (filters.role != null ? 1 : 0) + (filters.focus != null ? 1 : 0);
}

export function matchesRole(roleDescription: string | null | undefined, role?: TeamRole): boolean {
  if (role == null) return true;
  return (roleDescription ?? '').toLowerCase().includes(TEAM_ROLE_MATCH[role].toLowerCase());
}

/**
 * CMS focus-area strings may be prefixed with `~` to mark a section header
 * (bold + uppercase on the member page). Filters and labels use the
 * unprefixed form so a header and an area never collide in the URL.
 */
export function normalizeFocusArea(area: string): string {
  return area.startsWith('~') ? area.slice(1) : area;
}

export function isFocusAreaHeader(area: string): boolean {
  return area.startsWith('~');
}

export function matchesFocusArea(
  focusAreas: readonly string[] | null | undefined,
  focus?: string,
): boolean {
  if (focus == null || focus.length === 0) return true;
  return (focusAreas ?? []).some((area) => normalizeFocusArea(area) === focus);
}

export function uniqueFocusAreas(
  members: readonly { focusAreas?: readonly string[] | null }[],
): string[] {
  const seen = new Set<string>();
  const areas: string[] = [];

  for (const member of members) {
    for (const area of member.focusAreas ?? []) {
      if (isFocusAreaHeader(area)) continue;
      const label = normalizeFocusArea(area);
      if (label.length === 0 || seen.has(label)) continue;
      seen.add(label);
      areas.push(label);
    }
  }

  return areas.sort((a, b) => a.localeCompare(b));
}

export function memberMatchesFilters(
  member: {
    roleDescription?: string | null;
    focusAreas?: readonly string[] | null;
  },
  filters: Pick<TeamSearchParams, 'role' | 'focus'>,
): boolean {
  return (
    matchesRole(member.roleDescription, filters.role) &&
    matchesFocusArea(member.focusAreas, filters.focus)
  );
}
