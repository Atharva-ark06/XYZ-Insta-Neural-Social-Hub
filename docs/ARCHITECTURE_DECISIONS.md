# Architecture Decision Records

## ADR-001: Keep the current application static

**Status:** Accepted for the learning prototype.

**Decision:** Keep the demo runnable as a static page without requiring a backend.

**Reason:** The project explores frontend interactions and visual design.

**Consequence:** There is no trusted identity, authorization, shared persistence, or production-grade privacy boundary. These limitations must remain explicit.

## ADR-002: Hash local demo passwords

**Status:** Accepted as defense-in-depth only.

**Decision:** Use the Web Crypto API with PBKDF2-SHA-256, a random per-account salt, and a fixed iteration count for new local demo records.

**Reason:** Avoid storing newly registered demo passwords as readable text.

**Consequence:** Browser storage remains editable and the verifier remains accessible to the browser owner. This does not replace server-side password hashing or authentication.

## ADR-003: Restrict post image URLs to HTTPS

**Status:** Accepted.

**Decision:** Parse image URLs with the URL API and allow only HTTPS schemes.

**Reason:** Reject obviously unsafe URL schemes and malformed input.

**Consequence:** HTTPS does not establish that the remote host is trustworthy or prevent tracking. Production media should use a controlled upload pipeline or approved host policy.
