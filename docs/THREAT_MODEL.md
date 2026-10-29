# Threat Model

## System boundary

The current application is a static page running entirely in the visitor's browser. It stores demo account records and theme preference in browser storage. Posts and likes are held in page memory. Post images may be fetched from third-party HTTPS hosts.

## Assets

- Demo account identifiers and password verifiers
- Profile display names, bios, and avatar data
- Post text, image URLs, and like state
- Browser storage integrity and application availability
- Repository integrity and deployment workflow

## Trust boundaries

1. **User input → DOM:** names, bios, post text, usernames, and URLs are untrusted.
2. **Application → localStorage:** browser storage is editable by the user and accessible to same-origin scripts.
3. **Browser → remote image host:** an HTTPS image host is external and may observe requests.
4. **Repository → deployment:** repository changes can alter the code delivered to visitors.

## Threats and controls

| Threat | Example | Current mitigation | Residual risk |
| --- | --- | --- | --- |
| Stored/reflected XSS | Markup supplied as post text | Contextual escaping before generated HTML | Prefer DOM APIs as the app grows; test every output context |
| Credential exposure | Password stored as readable text | PBKDF2 salt/hash for new records; legacy upgrade on successful login | Local storage and client code are not a production credential store |
| Authentication bypass | Editing localStorage or JavaScript state | Clear demo-only warning; removed shared hard-coded credential | No trusted server exists to authenticate or authorize |
| Unsafe image URL | javascript: or other non-HTTPS scheme | HTTPS-only URL validation | Remote image tracking and malicious remote content remain possible |
| Resource exhaustion | Huge post text or avatar | Character and 2 MB file limits | Browser limits can be bypassed; server limits are required in production |
| Data tampering | Modify profile/account records | Parse guard and basic validation | No integrity protection or trusted persistence |
| Supply-chain risk | Compromised dependency/action | Minimal runtime dependencies; CI checks | Workflow action and dependency updates still require review |
| Privacy leakage | Third-party image request | referrerpolicy=no-referrer on post images | The host still receives a request and network metadata |

## Abuse cases to test

- Submit HTML and quotes in display name, bio, and post text.
- Try non-HTTPS, malformed, and empty image URLs.
- Attempt to register duplicate usernames/emails and invalid usernames.
- Try passwords outside the allowed length range.
- Upload a file larger than 2 MB or with an unsupported declared MIME type.
- Corrupt the local account JSON and reload the page.
- Modify localStorage and confirm documentation does not imply it is tamper-proof.

## Out of scope for the frontend prototype

Network-level account security, server-side authorization, database isolation, rate limiting, account recovery, moderation, verified media processing, and secure session management cannot be established by this static page. These are prerequisites for a real social network.
