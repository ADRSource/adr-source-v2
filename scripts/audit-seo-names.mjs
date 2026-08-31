/**
 * Audits every CMS `Seo` record for the wrong person's name.
 *
 * A member page's SEO title/description is authored by hand in Hygraph, usually
 * by duplicating the previous member's entry, so a name from the page it was
 * copied from can survive the edit and end up in Google's result for someone
 * else. `getMetadataFromSeo` renders `<title>`, the meta description and the
 * OpenGraph tags straight from that record, so auditing the CMS covers every
 * tag the crawler sees -- there is nothing name-shaped in the rendered head
 * that does not come from here.
 *
 * Run: pnpm run audit:seo   (reads CMS_* from .env.local)
 * Exits 1 when an ERROR-level finding is present, so CI can gate on it.
 */

import { pathToFileURL } from 'node:url';

const CMS_HOST = 'https://api-us-east-1-shared-usea1-02.hygraph.com';
const ENDPOINT = `${CMS_HOST}/v2/${process.env.CMS_SPACE}/${process.env.CMS_ENV}`;
const TOKEN = process.env.CMS_PROD_TOKEN;

/** List container ids the site queries through, used as the roster fallback. */
const NEUTRAL_LIST_ID = 'clonox8ds7npt0bk1jsjz6wb9';
const CASE_MANAGER_LIST_ID = 'clonp2m207nw30bk1grlirghc';

/** Tokens that are never the distinguishing part of a name. */
const NAME_NOISE = new Set([
  'jr', 'sr', 'ii', 'iii', 'iv', 'esq', 'esquire', 'dr', 'mr', 'mrs', 'ms', 'mx',
  'jd', 'llm', 'phd', 'the', 'of', 'and',
]);

async function cms(query, variables = {}) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error(`CMS responded ${res.status} ${res.statusText}`);

  const body = await res.json();
  if (body.errors?.length) throw new Error(body.errors.map((e) => e.message).join('; '));

  return body.data;
}

const SEO_FIELDS = 'seo { title description index }';
const MEMBER_FIELDS = `memberPage { slug } info { name informalName }`;

/**
 * Hygraph exposes both the plural root field and the hand-curated lists the
 * site reads. Prefer the plural field -- it also covers members that fell out
 * of a list but still have a live, indexed page -- and fall back to the lists
 * if this project's schema does not expose it.
 */
async function fetchRoster() {
  try {
    const data = await cms(`
      query Roster {
        neutrals(first: 500) { ${MEMBER_FIELDS} }
        caseManagers(first: 500) { ${MEMBER_FIELDS} }
      }
    `);
    return { members: [...data.neutrals, ...data.caseManagers], source: 'all members' };
  } catch (error) {
    console.warn(`  note: plural roster query unavailable (${error.message}); using site lists\n`);
    const data = await cms(
      `
      query RosterFromLists($neutralList: ID!, $caseManagerList: ID!) {
        neutralList(where: { id: $neutralList }) { neutrals(first: 500) { ${MEMBER_FIELDS} } }
        caseManagerList(where: { id: $caseManagerList }) {
          caseManagers(first: 500) { ${MEMBER_FIELDS} }
        }
      }
    `,
      { neutralList: NEUTRAL_LIST_ID, caseManagerList: CASE_MANAGER_LIST_ID },
    );
    return {
      members: [
        ...(data.neutralList?.neutrals ?? []),
        ...(data.caseManagerList?.caseManagers ?? []),
      ],
      source: 'members reachable from the site lists',
    };
  }
}

function fetchMemberPage(slug) {
  return cms(
    `
    query MemberPage($slug: String!) {
      memberPage(where: { slug: $slug }) {
        slug
        ${SEO_FIELDS}
        member {
          __typename
          ... on Neutral { info { name informalName } }
          ... on CaseManager { info { name informalName } }
        }
      }
    }
  `,
    { slug },
  ).then((data) => data.memberPage);
}

function fetchStaticPages() {
  return cms(`
    query StaticPages {
      homePage(where: { id: "clolon43n44d60aliirff1nct" }) { ${SEO_FIELDS} }
      aboutPage(where: { id: "clolorbch44fg0alieql4kgmq" }) { ${SEO_FIELDS} }
      teamPage(where: { id: "cloloqgmo43uh0bk1wehax5j0" }) { ${SEO_FIELDS} }
      schedulePage(where: { id: "clom2orhq4dfn0alilnwb4oyx" }) { ${SEO_FIELDS} }
      resourcesPage(where: { id: "clom3ez9d4dub0alisjn42xnu" }) { ${SEO_FIELDS} }
    }
  `);
}

function fetchInternalResources() {
  return cms(`
    query InternalResources {
      internalResources(first: 500) {
        slug
        title
        ${SEO_FIELDS}
        author {
          ... on Neutral { info { name } }
          ... on CaseManager { info { name } }
        }
      }
    }
  `).then((data) => data.internalResources ?? []);
}

/* ---------------------------------------------------------------- matching */

/** Lowercases and reduces to bare word tokens so "Chris M. Knopik!" == "chris m knopik". */
function words(value) {
  return (value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[‘’]/g, "'")
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean);
}

/**
 * Reduces a stored name ("Chris M. Knopik, Esq.") to the parts that actually
 * identify the person: middle initials, honorifics and suffixes are dropped so
 * a title reading "Chris Knopik" still matches the record.
 */
function identify({ name, informalName }) {
  const parts = words(name).filter((w) => w.length > 1 && !NAME_NOISE.has(w));
  const given = new Set([parts[0], ...words(informalName)].filter(Boolean));

  return {
    name,
    surname: parts.at(-1),
    given,
    isMentionedIn(haystack) {
      const found = new Set(haystack);
      const surnameHit = this.surname != null && found.has(this.surname);
      const givenHit = [...this.given].some((g) => found.has(g));

      if (surnameHit && givenHit) return 'full';
      if (surnameHit || (givenHit && this.given.size > 0 && this.surname == null)) return 'partial';
      return null;
    },
  };
}

const findings = [];
const record = (level, page, code, detail) => findings.push({ level, page, code, detail });

/** Scans one title/description pair for names belonging to anyone but `owner`. */
function scanForForeignNames({ page, seo, roster, owner, level }) {
  for (const field of ['title', 'description']) {
    const haystack = words(seo?.[field]);
    if (haystack.length === 0) continue;

    for (const person of roster) {
      if (owner != null && person.surname === owner.surname) continue;

      const hit = person.isMentionedIn(haystack);
      if (hit == null) continue;

      const ownership = owner != null ? `, but this page is ${owner.name}` : '';

      // A surname alone can collide with an ordinary word; only a given name
      // plus surname is certain enough to fail a build over.
      record(
        hit === 'full' ? level : 'WARN',
        page,
        hit === 'full' ? 'FOREIGN_NAME' : 'POSSIBLE_FOREIGN_NAME',
        `seo.${field} mentions "${person.name}"${ownership}: ${JSON.stringify(seo[field])}`,
      );
    }
  }
}

async function main() {
  if (!process.env.CMS_SPACE || !process.env.CMS_ENV || !TOKEN) {
    console.error(
      'Missing CMS_SPACE, CMS_ENV or CMS_PROD_TOKEN.\n' +
        'Run through `pnpm run audit:seo`, which loads them from .env.local.',
    );
    process.exit(2);
  }

  const { members, source } = await fetchRoster();
  const roster = members.map((m) => identify(m.info));
  const slugs = members.map((m) => m.memberPage?.slug).filter(Boolean);

  console.log(`Auditing SEO records against ${roster.length} ${source}.\n`);

  const titlesSeen = new Map();

  for (const slug of slugs) {
    const page = await fetchMemberPage(slug);
    const label = `/team/${slug}`;

    if (page == null) {
      record('WARN', label, 'NO_PAGE', 'member has a slug but no member page');
      continue;
    }

    const { seo } = page;
    const owner = identify(page.member?.info ?? {});

    if (!seo?.title?.trim()) record('WARN', label, 'EMPTY_TITLE', 'renders an empty <title>');
    if (!seo?.description?.trim())
      record('WARN', label, 'EMPTY_DESCRIPTION', 'renders an empty meta description');
    if (seo?.index === false)
      record('WARN', label, 'NOINDEX', 'seo.index is off, so the page is noindex, nofollow');

    // The bug this audit exists for: someone else's name in this member's tags.
    scanForForeignNames({ page: label, seo, roster, owner, level: 'ERROR' });

    if (seo?.title?.trim() && owner.isMentionedIn(words(seo.title)) == null) {
      record(
        'WARN',
        label,
        'MISSING_OWN_NAME',
        `seo.title never names ${owner.name}: ${JSON.stringify(seo.title)}`,
      );
    }

    if (seo?.title?.trim()) {
      const key = seo.title.trim().toLowerCase();
      const seen = titlesSeen.get(key);
      if (seen != null)
        record('WARN', label, 'DUPLICATE_TITLE', `shares its seo.title with ${seen}`);
      else titlesSeen.set(key, label);
    }
  }

  const staticPages = await fetchStaticPages();
  const staticRoutes = {
    homePage: '/',
    aboutPage: '/about',
    teamPage: '/team',
    schedulePage: '/schedule',
    resourcesPage: '/resources',
  };

  for (const [key, route] of Object.entries(staticRoutes)) {
    // A name on a shared page is often deliberate, so surface it for review
    // rather than failing on it.
    scanForForeignNames({
      page: route,
      seo: staticPages[key]?.seo,
      roster,
      owner: null,
      level: 'REVIEW',
    });
  }

  for (const resource of await fetchInternalResources()) {
    const author = resource.author?.info != null ? identify(resource.author.info) : null;
    scanForForeignNames({
      page: `/resources/${resource.slug}`,
      seo: resource.seo,
      roster,
      owner: author,
      level: 'REVIEW',
    });
  }

  /* ------------------------------------------------------------- reporting */

  const order = ['ERROR', 'WARN', 'REVIEW'];
  const counts = Object.fromEntries(order.map((l) => [l, 0]));

  for (const level of order) {
    const group = findings.filter((f) => f.level === level);
    counts[level] = group.length;
    if (group.length === 0) continue;

    console.log(`${level} (${group.length})`);
    for (const { page, code, detail } of group) console.log(`  ${page} [${code}] ${detail}`);
    console.log('');
  }

  if (findings.length === 0) {
    console.log('No name mix-ups, empty titles or duplicate titles found.');
    return;
  }

  console.log(
    `${counts.ERROR} error(s), ${counts.WARN} warning(s), ${counts.REVIEW} to review.` +
      (counts.ERROR > 0
        ? '\nFix errors in Hygraph, publish, then re-request indexing in Search Console.'
        : ''),
  );

  if (counts.ERROR > 0) process.exitCode = 1;
}

export { identify, scanForForeignNames, findings, words };

const isEntrypoint =
  process.argv[1] != null && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isEntrypoint) {
  main().catch((error) => {
    console.error(`Audit failed: ${error.message}`);
    process.exit(2);
  });
}
