import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const html = readFileSync(join(root, 'index.html'), 'utf8');

function extract(startMarker, endMarker) {
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker, start);
  assert.ok(start >= 0 && end > start, 'Expected source function boundaries');
  return html.slice(start, end);
}

// Execute the same security helpers used by the shipped page, not copies.
const source = [
  extract('  function escapeHtml(', '  // This is a browser-only'),
  extract('  function validUsername(', '  function bytesToHex('),
].join('\n');
const helpers = vm.runInNewContext(
  source + '\n({escapeHtml, validUsername, safeImageUrl})',
  { URL, window: { location: { href: 'https://demo.example/' } } },
);

const dir = join(root, 'tests', 'validation_cases');
const files = readdirSync(dir).filter((name) => /^CASE-\d{4}\.json$/.test(name)).sort();
test('test catalog has no gaps or duplicate case identifiers', () => {
  const ids = files.map((name) => Number(name.slice(5, 9)));
  assert.ok(ids.length > 0);
  assert.equal(new Set(ids).size, ids.length);
  for (let i = 1; i < ids.length; i++) assert.equal(ids[i], ids[i - 1] + 1);
});
for (const name of files) {
  const scenario = JSON.parse(readFileSync(join(dir, name), 'utf8'));
  test(name + ': ' + scenario.description, () => {
    assert.equal(scenario.case_id + '.json', name);
    assert.equal(scenario.synthetic, true);
    assert.equal(typeof scenario.input, 'string');
    assert.equal(typeof scenario.description, 'string');
    switch (scenario.kind) {
      case 'username':
        assert.equal(helpers.validUsername(scenario.input), scenario.expected);
        break;
      case 'image_url':
        assert.equal(helpers.safeImageUrl(scenario.input), scenario.expected);
        break;
      case 'escape_html':
        assert.equal(helpers.escapeHtml(scenario.input), scenario.expected);
        break;
      default:
        assert.fail('Unknown test kind: ' + scenario.kind);
    }
  });
}
