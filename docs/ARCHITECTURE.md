# Architecture

## Current implementation

The application is a single static HTML page containing markup, CSS, and JavaScript.

- **Presentation:** semantic HTML and responsive CSS variables.
- **Interactions:** vanilla JavaScript manages registration, login, profile updates, post creation, and likes.
- **Demo account records:** localStorage key gm_users.
- **Theme preference:** localStorage key theme.
- **Posts and likes:** in-memory arrays; they are not synchronized to a server and do not survive a page reload.
- **Neural background:** a WebGL canvas renders a decorative effect.
- **Delivery:** the static page can be served by a local HTTP server or a static hosting platform.

## Data flow

1. The user enters form data.
2. Client-side validation rejects common malformed or oversized input.
3. Account registration derives a password verifier using the Web Crypto API and stores the record locally.
4. Login checks the local record and establishes in-memory UI state.
5. The UI renders profile and post content after escaping untrusted strings.
6. Post images are parsed as URLs and only HTTPS URLs are accepted.

## Trust assumptions

The browser and local storage are controlled by the visitor. Client-side validation, hashing, and login state are not authoritative controls. They are useful for a local learning demo only.

## Production target architecture

A production version should separate the frontend from a backend API, use server-managed sessions, store account and post data in a database with per-user authorization, and process uploads through a validated media pipeline. Every endpoint must authenticate and authorize requests independently of the UI. Secrets belong in a managed server-side secret store, never in frontend source or browser storage.
