# Pre-release Security Checklist

## Input and output
- [ ] Every user-controlled value is treated as untrusted.
- [ ] Text is rendered with textContent or context-appropriate encoding.
- [ ] URL inputs are parsed and restricted to required schemes/hosts.
- [ ] Text and file size limits are enforced.
- [ ] Error messages do not expose secrets.

## Identity and storage
- [ ] No built-in credentials or secrets exist in source.
- [ ] No plaintext passwords are stored for new accounts.
- [ ] Reviewers understand browser storage is user-controlled.
- [ ] Production authentication and authorization are server-enforced.
- [ ] Session expiry, logout, recovery, and revocation are designed for production.

## Files and third parties
- [ ] File types and size are checked; production also validates actual file contents server-side.
- [ ] Third-party image requests and privacy implications are documented.
- [ ] Dependencies and workflow actions are reviewed and kept current.

## Release and response
- [ ] Automated tests pass and manual checks are completed.
- [ ] The PR diff and deployment target are reviewed.
- [ ] Known limitations and unresolved findings are documented.
- [ ] A reporting and incident response path exists.
