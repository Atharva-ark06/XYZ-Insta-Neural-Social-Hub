# Roadmap

## Completed in this hardening branch

- Remove the built-in demo credential.
- Store PBKDF2 password verifiers with per-account salts for new demo registrations.
- Upgrade legacy plaintext records when the matching account signs in.
- Escape quotes and markup delimiters in generated feed content.
- Validate HTTPS post image URLs and cap content/avatar sizes.
- Add lifecycle, threat model, review, privacy, deployment, testing, and incident-response documentation.
- Add source-level regression checks and CI.

## Next frontend improvements

- Move inline CSS and JavaScript into dedicated files.
- Replace HTML-string rendering with DOM construction and textContent.
- Add browser-level end-to-end tests.
- Improve accessibility and reduced-motion behavior for the neural background.
- Add explicit handling for storage quota errors and corrupted avatar data.

## Production architecture (not implemented)

- Backend API and database with per-user authorization.
- Server-side password hashing, secure sessions, account recovery, and verification.
- Validated image processing and object storage.
- Rate limiting, moderation, abuse reporting, and audit logs.
- Security headers, monitoring, backups, and documented data deletion.
- Independent security testing before handling real user data.
