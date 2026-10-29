# Privacy Notes

## What the current prototype stores

- Account records (including username, email, display name, bio, avatar data, and a password verifier) in the browser's localStorage.
- Theme preference in localStorage.
- Posts and like state in page memory for the current session.
- When a post includes an external HTTPS image, the browser requests that image from its host.

There is no application server or shared database in this version. Data stored in one browser is not automatically available to another user or device.

## Risks and user controls

Anyone with access to the browser profile may inspect or alter local storage. A successful same-origin script injection can access it too. The remote image host can receive network metadata when the image is loaded. Clearing site data removes the local demo accounts and theme preference; posts and likes are already temporary.

Do not enter real passwords, private information, or sensitive images. Use unique test-only credentials.

## Before collecting real user data

Define a lawful purpose and retention period, collect only necessary data, provide appropriate notice and deletion controls, secure backups, restrict access, and document third-party services. A production privacy notice should reflect actual behavior and applicable law; this file is not a legal compliance statement.
