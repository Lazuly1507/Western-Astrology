---
name: astrology-domain
description: Research Western Astrology concepts, zodiac frames, houses and aspect conventions, with source-backed recommendations and no Tu Vi rule reuse.
---

# Western astrology domain

1. Read active `docs/astrology/domain-spec.md`, `calculation-rules.md` and `docs/product/decision-recommendations.md`; distinguish proposed choices from approvals.
2. Separate astronomical measurements, coordinate conventions and symbolic interpretations. Signs, constellations, houses, Tu Vi palaces and animal-year branches are different concepts.
3. Compare Tropical/Sidereal and Whole Sign/Placidus/Equal through inspected primary references; Sidereal needs a named ayanamsha. Explain choices in plain Vietnamese before recommending a default.
4. Record each convention with ID, source/license, inputs/outputs, version, reviewer and fixtures. Do not treat popularity as predictive validity.
5. For missing time or DST ambiguity, identify valid, interval-dependent and unavailable fields. Never infer Rising or houses from a guessed noon birth.
6. Hand contracts to astrology-chart-engine, meanings to astrology-interpretation, and public educational text to astrology-content-seo only when relevant.

Acceptance: traceable sources, explicit alternatives and limits; no unapproved default hardened into code; no outside-MVP engine or prediction features implemented.
