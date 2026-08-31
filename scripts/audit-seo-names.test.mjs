/** Run: node --test scripts/audit-seo-names.test.mjs */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { findings, identify, scanForForeignNames } from './audit-seo-names.mjs';

const roster = [
  { name: 'Chris M. Knopik', informalName: 'Chris' },
  { name: 'Richard Ambrose', informalName: 'Rich' },
  { name: 'Scott Baughan, Esq.', informalName: null },
].map(identify);

/** Runs one page through the scanner and returns only that run's findings. */
function scan(seo, ownerName, level = 'ERROR') {
  const before = findings.length;
  scanForForeignNames({
    page: '/team/test',
    seo,
    roster,
    owner: ownerName == null ? null : identify({ name: ownerName, informalName: null }),
    level,
  });
  return findings.splice(before);
}

test('flags another member named in a title, the reported bug', () => {
  const [finding, ...rest] = scan(
    { title: 'Chris Knopik | Richard Ambrose | ADR Source', description: '' },
    'Chris M. Knopik',
  );

  assert.equal(rest.length, 0);
  assert.equal(finding.level, 'ERROR');
  assert.equal(finding.code, 'FOREIGN_NAME');
  assert.match(finding.detail, /Richard Ambrose/);
});

test('accepts a title that only names its own member', () => {
  const seo = { title: 'Chris M. Knopik | ADR Source', description: 'Chris mediates.' };
  assert.deepEqual(scan(seo, 'Chris M. Knopik'), []);
});

test('matches a stored name across middle initials, suffixes and punctuation', () => {
  const [finding] = scan({ title: 'Book with Scott Baughan today!' }, 'Chris M. Knopik');
  assert.equal(finding.code, 'FOREIGN_NAME');
});

test('downgrades a bare surname to a warning, since surnames collide with words', () => {
  const [finding] = scan({ title: 'Ambrose | ADR Source' }, 'Chris M. Knopik');
  assert.equal(finding.level, 'WARN');
  assert.equal(finding.code, 'POSSIBLE_FOREIGN_NAME');
});

test('scans the description as well as the title', () => {
  const [finding] = scan(
    {
      title: 'Chris M. Knopik | ADR Source',
      description: 'Schedule a mediation with Richard Ambrose.',
    },
    'Chris M. Knopik',
  );
  assert.match(finding.detail, /seo\.description/);
});

test('reports shared pages at the level the caller asks for', () => {
  const [finding] = scan({ title: 'Meet Richard Ambrose' }, null, 'REVIEW');
  assert.equal(finding.level, 'REVIEW');
});

test('ignores empty and missing seo records', () => {
  assert.deepEqual(scan({ title: '', description: null }, 'Chris M. Knopik'), []);
  assert.deepEqual(scan(undefined, 'Chris M. Knopik'), []);
});
