# Security Review

## Review scope

Static review of the single-page HTML/JavaScript application and its storage, rendering, image, and deployment behavior. This is not a full penetration test and does not certify the application as secure.

## Findings

### Addressed in this branch

- **Hard-coded demo credential:** removed the built-in username/password path.
- **Plaintext password storage for new registrations:** new records store a per-account random salt and PBKDF2-SHA-256 derived verifier instead of the submitted password.
- **Legacy plaintext records:** successful login attempts upgrade the matching legacy record and delete its plaintext password field. Other legacy records remain until each account is used; clearing the old demo data is safest if it contains real or reused passwords.
- **Incomplete HTML escaping:** the encoder now handles ampersand, angle brackets, single quotes, and double quotes.
- **Unrestricted post image schemes:** only valid HTTPS URLs are accepted and rendered.
- **Unbounded user content:** length limits are enforced for username, email, display name, bio, password, and post text.
- **Avatar upload checks:** restricts the declared type to JPEG/PNG and caps size at 2 MB.
- **Static entry-point casing:** renamed Index.HTML to lowercase index.html for common static hosting conventions.
- **Regression coverage:** adds Node test-runner checks and a GitHub Actions workflow.

### Still open by architecture

- **No server-side identity or authorization:** local state can be changed by the browser owner; anyone can alter client code and storage.
- **No shared data model:** accounts are browser-local and posts/likes are session-memory only.
- **Client MIME types are untrusted:** production uploads must be inspected and decoded server-side.
- **No rate limiting, recovery, verification, moderation, or audit trail:** these require backend services.
- **Content Security Policy and response headers:** inline CSS/JavaScript currently make a strict CSP difficult; move code into separate files and configure hosting headers as a separate hardening step.
- **Third-party image privacy:** HTTPS and referrer suppression do not prevent the image host from observing the request.

## Severity interpretation

The local plaintext password and hard-coded credential patterns were high-priority prototype issues because they could expose demo credentials or encourage unsafe reuse. The new browser-side hash is a mitigation for accidental casual disclosure, not a secure server authentication design. Remaining architectural gaps are blockers for production use.

## Verification

Run npm test with Node.js 18+. CI runs the same source-level checks on pull requests. A reviewer should also manually test registration, login, legacy-account migration, profile edits, post creation, and rejected image inputs in a browser.

## Recommendation

Keep the application explicitly labelled as a frontend prototype. Before production use, implement a trusted backend, server-side password hashing, session management, authorization, validated uploads, rate limiting, and security headers; then conduct a separate security review.
