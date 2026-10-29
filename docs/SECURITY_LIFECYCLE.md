# Security Lifecycle

This project follows a lightweight security lifecycle that can be repeated for every feature and release.

## 1. Discover

- Identify assets: account records, profile data, post text, image URLs, and browser storage.
- Identify users and trust boundaries: browser, local storage, remote image hosts, GitHub Pages, and future backend services.
- Record assumptions and abuse cases in the threat model.

**Gate:** a feature has a clear owner, data flow, and expected security properties.

## 2. Design

- Minimize data collection and retention.
- Prefer safe DOM APIs; if HTML strings are unavoidable, contextually encode every untrusted value.
- Define limits for text, uploads, URLs, and stored records.
- Decide which controls must be enforced on a trusted server before designing production features.

**Gate:** design review covers authentication, authorization, privacy, validation, error handling, and misuse cases.

## 3. Build

- Keep secrets out of source control.
- Validate user input for usability, but never treat browser validation as authoritative security.
- Use secure password hashing only as a local-demo improvement; production verification belongs on a server.
- Keep changes small and document security-sensitive decisions.

**Gate:** changes include focused tests and no new hard-coded credentials.

## 4. Verify

- Run npm test.
- Review all changes to authentication, generated markup, image handling, storage, and deployment.
- Test the page in a modern browser over localhost/HTTPS.
- Test negative cases, malformed input, oversized files, and missing WebGL support.

**Gate:** tests pass and unresolved findings are documented honestly.

## 5. Release

- Review the exact PR diff and workflow results.
- Deploy only from the intended default branch.
- Use HTTPS and platform-supported security headers where available.
- Never deploy this prototype as a service that handles real credentials or sensitive data.

**Gate:** release notes state known limitations and the reviewer approves the changes.

## 6. Monitor

- Review dependency and workflow alerts.
- Revisit the threat model when adding external libraries, APIs, persistence, or user-generated media.
- Avoid collecting telemetry until its purpose, retention, and consent requirements are defined.

**Gate:** an owner and review cadence are identified for any production deployment.

## 7. Respond

- Triage reports privately when possible.
- Reproduce issues in a controlled local environment.
- Contain the issue, fix the root cause, add a regression test, and document user impact.
- Rotate exposed credentials and invalidate sessions if a future backend is affected.

## 8. Improve

- Track findings by severity and remediation status.
- Turn recurring review findings into automated tests.
- Reassess the lifecycle after architectural changes.

This lifecycle is intentionally lightweight. It does not constitute a certification or formal compliance claim.
