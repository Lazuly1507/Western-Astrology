---
name: astrology-qa
description: Verify Western natal calculations, timezone/DST edge cases, unknown-time partial charts, grounded Mock AI and responsive browser privacy and security flows.
---

# Western astrology verification

1. Read the current validation plan; distinguish numerical astronomy, symbolic content review and product/security checks from predictive accuracy.
2. Use independent fixtures with matched frame/observer/timescale/house flags and tolerance. Cover longitude wrap, sign boundaries, stations, aspect/orb boundaries and polar-house failure.
3. Cover DST gaps/folds, half/quarter-hour offsets, historical zones, coordinate limits and unknown time. Partial charts must not invent ASC/MC/houses or definite Moon sign across a boundary interval.
4. Use Vitest for approved units/contracts and Playwright for browser E2E across engines/viewports. Chrome prototype checks are not production E2E or engine certification.
5. Mock AI tests include missing/wrong evidence, injection, refusal, timeout, quota/retry and system mismatch with no key. Test RLS/API/storage isolation, export/delete, private noindex/cache and rate limits.
6. Report actual commands/output and skipped coverage; do not implement future features merely to test them.

Acceptance: no self-generated oracle from the code under test, correct known/unknown-time schemas, provenance for expected data and no claims beyond observed evidence.
