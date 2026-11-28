import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const html = readFileSync(join(root, 'index.html'), 'utf8');
function sourceBetween(a, b) {
  const first = html.indexOf(a);
  const last = html.indexOf(b, first);
  assert.ok(first >= 0 && last > first, 'Missing function in index.html: ' + a);
  return html.slice(first, last);
}
const code = [
  sourceBetween('  function validUsername(', '  function bytesToHex('),
  sourceBetween('  function createSyntheticPosts(', '  function renderFeed('),
  sourceBetween('  function escapeHtml(', '  // This is a browser-only'),
  sourceBetween('  function bytesToHex(', '  async function hashPassword('),
].join('\n');
const context = { URL, Date, window: { location: { href: 'https://example.test/' } } };
const helpers = vm.runInNewContext(code + '\n({validUsername,safeImageUrl,createSyntheticPosts,escapeHtml,bytesToHex,hexToBytes})', context);
const fixtures = join(root, 'tests', 'review_cases');
const cases = readdirSync(fixtures).filter(name => /^REVIEW-\d{4}\.json$/.test(name)).sort();
test('review case identifiers are sequential and unique', () => {
  assert.ok(cases.length > 0);
  const ids = cases.map(name => Number(name.slice(7, 11)));
  assert.equal(ids[0], 1);
  assert.equal(new Set(ids).size, ids.length);
  ids.forEach((id, index) => assert.equal(id, index + 1));
});
for (const name of cases) {
  const caseFile = JSON.parse(readFileSync(join(fixtures, name), 'utf8'));
  test(name + ' ' + caseFile.description, () => {
    assert.equal(name, caseFile.case_id + '.json');
    assert.equal(caseFile.synthetic, true);
    switch (caseFile.kind) {
      case 'username':
        assert.equal(helpers.validUsername(caseFile.input), caseFile.expected);
        break;
      case 'image_url':
        assert.equal(helpers.safeImageUrl(caseFile.input), caseFile.expected);
        break;
      case 'escape_html':
        assert.equal(helpers.escapeHtml(caseFile.input), caseFile.expected);
        break;
      case 'hex_valid':
        assert.deepEqual(Array.from(helpers.hexToBytes(caseFile.input)), caseFile.expected);
        break;
      case 'hex_invalid':
        assert.throws(() => helpers.hexToBytes(caseFile.input), /Invalid password hash/);
        break;
      case 'synthetic_feed':
        assert.equal(helpers.createSyntheticPosts().length, 8);
        assert.ok(helpers.createSyntheticPosts().every(post => post.text.startsWith('[SYNTHETIC POST]')));
        break;
      default: assert.fail('Unknown review case ' + caseFile.kind);
    }
  });
}
