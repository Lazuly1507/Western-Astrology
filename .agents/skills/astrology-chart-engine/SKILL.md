---
name: astrology-chart-engine
description: Specify and verify deterministic Western natal calculations using ephemerides, coordinates, timezone/DST, angles, house systems, retrograde and aspects.
---

# Deterministic natal engine

1. Read engine-evaluation, calculation-rules and validation-plan in `docs/astrology/`. Check owner approval and licenses before selecting dependencies.
2. Normalize local date/time, IANA timezone/version, DST fold/gap resolution and coordinates to a reproducible instant; retain raw input separately. Reject ambiguity rather than guessing.
3. Obtain positions from vetted ephemeris software, never an LLM. Pin observer, apparent/true flags, ecliptic frame/equinox, time scales and data files.
4. Derive sign/degree, ASC/MC, approved house cusps, retrograde speed and aspects using the approved orb policy. Normalize longitude to [0,360) and compare circular differences before rounding.
5. Unknown time produces a separate partial chart with no ASC/MC/houses and explicit planetary intervals/ambiguous signs. A noon reference instant must not become a claimed birth time.
6. Compare independent fixtures under matched settings and tolerances. Exclude metadata timestamps from deterministic content hashes.

Acceptance: provenance and exact versions; verified numerical results; explicit polar/house failures; no silent library/house fallback; no production implementation before approval.
