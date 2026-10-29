# Contributing

## Development workflow

1. Fork or branch from master.
2. Keep each change focused and explain its purpose in the commit message.
3. Add or update tests for behavior and security-sensitive changes.
4. Run npm test with Node.js 18 or newer.
5. Review the complete diff for credentials, personal data, unsafe HTML, and accidental generated files.
6. Open a pull request describing behavior, risks, test results, and remaining limitations.

## Security-sensitive changes

Authentication, generated markup, file inputs, URL handling, browser storage, dependencies, and deployment workflows require extra review. Do not claim a vulnerability is fixed solely because a static test passes.

## Commit quality

Prefer small commits that represent a coherent change. Do not create empty or misleading commits to inflate activity. The contribution graph may count only qualifying commits after they reach the default branch and satisfy GitHub attribution rules.

## Data and secrets

Use synthetic data. Never commit real credentials, tokens, personal information, or private images. Report suspected vulnerabilities privately as described in the repository's SECURITY.md.
