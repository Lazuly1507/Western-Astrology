---
name: tuvi-qa
description: Deprecated for current project. Legacy Tu Vi rule tests only; use astrology-qa for Western astronomy and website verification.
---

# Tử Vi quality assurance

**Deprecated for the current Western Astrology domain.** Tu Vi golden charts are not numerical oracles for Western ephemerides.

## Workflow

1. Identify the changed behavior and actual test tooling. Build a risk matrix with requirement, input, independent expected result, test layer and status. Do not claim an unavailable runner passed.
2. For algorithm changes, use confirmed school-specific fixtures and a regression that fails before the fix. Cover supported endpoints, invalid solar/lunar dates, absent/incorrect leap flags, midnight and giờ Tý conventions, hour boundaries, historical offsets and uncertainty intervals.
3. Check deterministic invariants: calendar round trips, twelve unique palace branches, rule-defined star multiplicities and cycle direction/age boundaries. Keep invariants distinct from oracle-based accuracy tests.
4. Integration: verify normalization → chart → interpretation preserves chart content and versions. Remove fields and inject hostile text into synthetic chart/source data; the explanation must flag gaps and ignore embedded instructions.
5. E2E: use Playwright for responsive PC/laptop/tablet/phone browser flows, birth form errors, chart zoom/list/details, consented saving/export/deletion, SEO privacy and accessibility when implemented. Use Vitest for approved application units. Verify Mock AI and real-provider-disabled states without needing a key; native tools and store tests are outside scope.
6. Privacy/security: inspect logs and reports for synthetic marker leakage, access isolation, authorization, retention/deletion and unintended AI payload fields. Use no production birth records or live credentials.
7. Run available checks and report command, exit status, observed result, skipped coverage and unresolved defects.

## Acceptance

- Tests distinguish actual correctness from self-consistency and trace expected chart values to independent sources.
- A passing setup validator is never described as passing chart-engine or app tests.
- Known ambiguity and unavailable fixtures/runners are named; no invented green status.
