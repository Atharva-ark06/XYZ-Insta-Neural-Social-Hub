# Testing Guide

## Automated checks

Requirements: Node.js 18 or newer.

~~~bash
npm test
~~~

The tests check for critical source-level guardrails: salted password derivation, removal of the built-in credential, escaping coverage, HTTPS-only image URLs, input limits, avatar constraints, and legacy password migration.

These are static regression checks. They can pass even if a browser interaction has a bug, so complete the manual checklist as well.

## Manual functional checklist

- [ ] Register with valid fields and confirm success.
- [ ] Confirm passwords outside 12–128 characters are rejected.
- [ ] Confirm usernames outside the allowed pattern are rejected.
- [ ] Confirm duplicate usernames and emails are rejected.
- [ ] Log in with correct credentials and reject incorrect credentials.
- [ ] Edit display name and bio; confirm limits are enforced.
- [ ] Create a post and confirm it appears in the feed.
- [ ] Reject empty and overlong posts.
- [ ] Reject http:, javascript:, malformed, and empty image URLs when supplied.
- [ ] Confirm HTTPS images render and broken images are hidden.
- [ ] Reject unsupported avatar types and files over 2 MB.
- [ ] Switch themes and reload.
- [ ] Log out and confirm the login panel returns.
- [ ] Corrupt the local account JSON and confirm the app does not crash on registration/login.
- [ ] Test in a browser without WebGL support; core form behavior should remain usable.

## Security-specific checks

Use only local test data. Try HTML metacharacters and quotes in profile/post fields and verify they display as text rather than executing. Inspect localStorage to verify newly registered records contain a salt/hash instead of a password. Remember that the visitor can still edit or bypass all client-side state.

## CI

The Security checks workflow runs the Node test file on pull requests and pushes to master. The separate Pages workflow deploys the static site from master.
