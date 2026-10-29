# Incident Response Playbook

This playbook is for repository or prototype incidents. It is not a substitute for an organization's formal response plan.

## 1. Prepare

- Keep the repository maintainer and deployment owner identifiable.
- Know which workflow deploys the site.
- Keep test data synthetic and avoid collecting sensitive information.

## 2. Identify and triage

- Record the affected feature, likely impact, first known time, and reproducible steps.
- Avoid copying passwords, tokens, or personal data into public issues.
- Use private vulnerability reporting where available.

## 3. Contain

- For a dangerous release, stop or roll back deployment using the hosting platform's supported controls.
- Revert or disable the affected feature if that is the safest short-term action.
- If a secret was committed, revoke and rotate it immediately; deleting it from the latest commit alone is not sufficient.

## 4. Eradicate and recover

- Fix the root cause, add a regression test, and review related code paths.
- Check workflow logs and the exact deployed commit.
- For a future backend incident, invalidate affected sessions and rotate credentials according to the backend's response plan.

## 5. Learn

- Document timeline, impact, root cause, remediation, and follow-up owner.
- Update the threat model and lifecycle checklist.
- Do not publish exploit details that would put other users at risk before a fix is available.
