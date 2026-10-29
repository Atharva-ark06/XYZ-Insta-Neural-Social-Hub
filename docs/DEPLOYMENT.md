# Execution and Deployment

## Local development

The page is static and does not require a bundler.

Windows PowerShell:

~~~powershell
py -m http.server 8000
~~~

macOS/Linux:

~~~bash
python3 -m http.server 8000
~~~

Visit http://localhost:8000. Stop the server with Ctrl+C.

Run regression checks with Node.js 18 or newer:

~~~bash
npm test
~~~

## GitHub Pages

The repository contains a Pages workflow targeting the default branch. The lowercase index.html entry point is the expected static landing-page name. Check the Actions tab after merging; this branch's CI tests do not by themselves prove that Pages deployment succeeded.

Static hosting is appropriate for a frontend demo only. Do not put API keys, database credentials, private configuration, or secrets in the page.

## Production hardening checklist

Before any production service handles real users or personal data:

- [ ] Build a backend API and database with per-user authorization.
- [ ] Hash passwords on the server with a suitable password hashing algorithm and parameters.
- [ ] Use secure, HttpOnly, SameSite session cookies and rotate/invalidate sessions appropriately.
- [ ] Enforce validation, authorization, rate limits, and size limits on the server.
- [ ] Decode/re-encode uploaded images, inspect actual file content, and store them outside executable paths.
- [ ] Configure a Content Security Policy, HSTS, frame restrictions, MIME-sniffing protection, and a restrictive referrer policy using hosting/server headers.
- [ ] Remove inline scripts/styles to make a strict CSP practical.
- [ ] Add logging, monitoring, backups, account recovery, moderation, and incident-response ownership.
- [ ] Document data retention, deletion, and privacy choices.
- [ ] Run dependency, dynamic, and manual security testing.

GitHub Pages does not provide an application backend or let this static project enforce server-side authentication.
