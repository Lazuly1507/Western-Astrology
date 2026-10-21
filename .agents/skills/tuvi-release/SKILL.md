---
name: tuvi-release
description: Deprecated for current project. Legacy Tu Vi release guidance only; use astrology-release for the current Western Astrology website.
---

# Tử Vi release workflow

**Deprecated for the current Western Astrology project.** Use astrology-release; preserve these historical instructions rather than deleting them.

## Workflow

1. Detect actual web build tools, hosting and release scope. Inventory prerequisites; the project is website-only. Do not create native packages, EAS jobs, store listings or signing workflows. PWA remains a future option.
2. Prepare reproducible CI with pinned dependencies and least-privilege credentials held in the CI secret store. Run static checks and the relevant `tuvi-qa` suite before packaging.
3. Version the application, chart engine, rules and interpretation templates together. Check migrations and whether old charts need recomputation or can retain their original version.
4. Build the approved Next.js target, record toolchain/artifact checksum, and verify preview versus production environment separation. Check server-only AI keys, default Mock mode and real-provider activation authorization. Use Vitest, Playwright and GitHub Actions as appropriate; no native toolchain is required.
5. Review runtime configuration, secret references, birth-data redaction, backup/restore and account isolation. Prepare a staging smoke test and an explicit rollback target, migration reversal/restore strategy and trigger.
6. Present concrete artifacts, release notes, checks and rollback procedure before any approval required for publication, paid builds or production mutation. User authorization applies only to the stated release scope.
7. After an authorized release, verify health and schema/rule version compatibility; execute the pre-agreed rollback if its conditions apply and permission covers it.

## Acceptance

- Build and deployment results are tied to actual artifacts and environments.
- Secret values never appear in logs, reports or skill files.
- Rollback covers both application version and data changes; irreversible migration risks are explicit.
- No publishing, paid hosting, account creation or production access occurs during discovery/prototype work without the required authorization.
