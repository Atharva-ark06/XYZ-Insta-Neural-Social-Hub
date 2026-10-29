import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('new account passwords use salted PBKDF2 derivation', () => {
  assert.match(html, /PBKDF2_ITERATIONS\s*=\s*210000/);
  assert.match(html, /async function hashPassword/);
  assert.match(html, /name:\s*'PBKDF2'.*hash:\s*'SHA-256'/s);
  assert.match(html, /passwordSalt:\s*credentials\.salt/);
  assert.match(html, /passwordHash:\s*credentials\.hash/);
});

test('the known demo credential is not embedded in the application', () => {
  assert.doesNotMatch(html, /username\s*===\s*['"]atharva123['"]/);
  assert.doesNotMatch(html, /password\s*===\s*['"]password123['"]/);
});

test('HTML escaping includes quotes as well as markup delimiters', () => {
  assert.match(html, /function escapeHtml\(value\)/);
  assert.ok(html.includes('&quot;'));
  assert.ok(html.includes('&#39;'));
});

test('post images must use HTTPS URLs', () => {
  assert.match(html, /function safeImageUrl/);
  assert.match(html, /url\.protocol === 'https:'/);
  assert.match(html, /referrerpolicy="no-referrer"/);
});

test('user-provided content and avatar files have size and format limits', () => {
  assert.match(html, /MAX_POST_LENGTH\s*=\s*2000/);
  assert.match(html, /MAX_BIO_LENGTH\s*=\s*240/);
  assert.match(html, /MAX_AVATAR_BYTES\s*=\s*2 \* 1024 \* 1024/);
  assert.match(html, /\['image\/jpeg', 'image\/png'\]\.includes\(file\.type\)/);
  assert.match(html, /file\.size > MAX_AVATAR_BYTES/);
});

test('legacy plaintext passwords are removed after successful migration', () => {
  assert.match(html, /One-time migration for accounts created by the previous prototype/);
  assert.match(html, /delete user\.password/);
});

test('the source warns that this is not production authentication', () => {
  assert.match(html, /not a production authentication boundary/);
});

test('the inline application script parses without syntax errors', () => {
  const match = html.match(/<script>([\\s\\S]*?)<\\/script>/);
  assert.ok(match, 'expected the application script to exist');
  assert.doesNotThrow(() => new vm.Script(match[1]));
});
