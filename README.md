# XYZ Insta — Neural Social Hub

A futuristic, Instagram-inspired **frontend prototype** built with HTML, CSS, vanilla JavaScript, browser storage, and a WebGL neural background.

> **Security status:** This is a learning/demo project, not a production social network. Password hashing in the browser is a limited improvement for this prototype; it does not replace server-side authentication, authorization, rate limiting, or a database.

## Features

- Register, log in, and log out in the current browser
- Edit display name, bio, and profile picture
- Create text posts with optional HTTPS image URLs
- Like posts in the current page session
- Dark/light theme preference
- Responsive glassmorphism UI and animated WebGL background
- Client-side validation and safer text rendering
- PBKDF2 password hashes with per-account random salts for newly registered demo accounts

## Screenshots

### Access portal
![XYZ Insta access portal](https://res.cloudinary.com/wpop4xyo/image/upload/v1787929195/Screenshot_2026-08-28_201324.png)

### Profile studio
![XYZ Insta profile studio](https://res.cloudinary.com/wpop4xyo/image/upload/v1787929135/Screenshot_2026-08-28_201538.png)

## Tech stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Single-page structure |
| CSS | Responsive interface, theme variables, glass effects |
| Vanilla JavaScript | Demo interactions and client-side state |
| Web Crypto API | PBKDF2 password hashing for local demo accounts |
| WebGL | Animated neural background |
| localStorage | Local demo account records and theme preference |
| Node.js test runner | Lightweight security regression checks |

## Run locally

No build step or dependency installation is required to view the static page.

### 1. Clone the repository

~~~bash
git clone https://github.com/Atharva-ark06/XYZ-Insta-Neural-Social-Hub.git
cd XYZ-Insta-Neural-Social-Hub
~~~

### 2. Start a local web server

**Windows PowerShell:**

~~~powershell
py -m http.server 8000
~~~

**macOS / Linux:**

~~~bash
python3 -m http.server 8000
~~~

Open http://localhost:8000. Serving on localhost provides a suitable secure context for the Web Crypto API in modern browsers. You can also open index.html directly, but password hashing may be unavailable in some browser contexts.

### 3. Run the security regression checks

Install Node.js 18 or newer, then run:

~~~bash
node --test tests/security-static.test.mjs
~~~

Or, using npm:

~~~bash
npm test
~~~

The tests inspect important security guardrails in the source. They are not a substitute for browser testing, penetration testing, or a server-side security review.

## How the app works

1. **Access portal:** users register or sign in in the current browser.
2. **Local account store:** demo account records are kept in localStorage. New passwords are PBKDF2-derived with a random salt; legacy plaintext records are upgraded when their owner successfully signs in.
3. **Profile studio:** display name, bio, and an optional JPEG/PNG avatar are held in client-side state.
4. **Post composer and feed:** posts and likes are held in JavaScript memory for the current page session; they are not shared with other browsers or persisted to a server.
5. **Neural canvas:** WebGL draws a decorative background independently of social features.

## Security improvements in this branch

- Removed the hard-coded demo username/password.
- Replaced plaintext storage for newly registered accounts with salted PBKDF2 hashes.
- Added a legacy-account upgrade path at successful login.
- Escaped HTML special characters, including quotes, before interpolating user-controlled values into generated markup.
- Accepts only HTTPS image URLs for posts and avoids sending referrers for displayed images.
- Added username, email, password, display-name, bio, and post-length validation.
- Restricted avatar uploads to JPEG/PNG and 2 MB.
- Added a security lifecycle, threat model, review notes, deployment guidance, and automated regression checks.

See [Security Review](docs/SECURITY_REVIEW.md), [Threat Model](docs/THREAT_MODEL.md), and [Security Lifecycle](docs/SECURITY_LIFECYCLE.md).

## Important limitations

This remains a **frontend-only prototype**:

- Browser storage can be read or changed by the person using the browser and by any successful same-origin script injection.
- Client-side password hashing is not a secure authentication service; there is no server to verify identities or enforce authorization.
- There is no shared backend, database, session management, password reset, email verification, CSRF protection layer, rate limiting, moderation service, or server-side upload validation.
- Posts and likes reset when the page session ends; accounts are local to one browser.
- Client-provided image MIME types are not trustworthy proof of file contents.
- HTTPS-only image URLs reduce unsafe schemes but do not make third-party images trustworthy or prevent tracking by the image host.

**Do not use real passwords, personal data, private images, or sensitive information in this demo.** For production, implement a backend with secure password hashing (for example, Argon2id or a suitable bcrypt configuration), server-side sessions, authorization checks, validation, upload processing, logging, rate limiting, and a documented privacy policy. See [Deployment Guidance](docs/DEPLOYMENT.md).

## Security lifecycle

Discover → Design → Build → Verify → Release → Monitor → Respond → Improve

The lifecycle and its review gates are documented in [docs/SECURITY_LIFECYCLE.md](docs/SECURITY_LIFECYCLE.md).

## Project structure

~~~text
.
├── index.html
├── README.md
├── SECURITY.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── CONTRIBUTING.md
│   ├── DEPLOYMENT.md
│   ├── INCIDENT_RESPONSE.md
│   ├── PRIVACY.md
│   ├── SECURITY_LIFECYCLE.md
│   ├── SECURITY_REVIEW.md
│   ├── TESTING.md
│   └── THREAT_MODEL.md
├── tests/
│   └── security-static.test.mjs
└── .github/workflows/
    ├── security-checks.yml
    └── static.yml
~~~

## Contributing

Please read [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) and [SECURITY.md](SECURITY.md). Keep changes focused, add regression tests for security fixes, and never commit credentials or personal data.

## License

The repository currently does not include a verified license file. Add a license only after confirming the intended license terms.
