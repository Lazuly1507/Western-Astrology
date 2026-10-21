---
name: tuvi-ui
description: Deprecated for current project. Legacy twelve-palace Tu Vi UI only, not a Western natal wheel. Use astrology-ui for the current website.
---

# Tử Vi product interface

**Deprecated for the active Western Astrology project.** Retain the old prototype/history; use astrology-ui for signs, houses and circular natal charts.

## Workflow

1. Establish audience, existing visual system and browser viewport constraints. This project is web-only. Evaluate the requested Next.js/React/TypeScript/Tailwind direction without treating the proposal as permission to implement the production app.
2. For design research read the installed `ui-ux-pro-max` skill and use its local search with public product keywords only. Inspect the returned category and fit; record any fallback rather than treating a search recommendation as a design mandate.
3. Define typography supporting Vietnamese diacritics, semantic color tokens, spacing, focus states, touch targets and loading/error/empty states. Add a visible uncertainty state for incomplete birth data.
4. Map the twelve palaces to the engine's branch positions explicitly. Keep role names and branch labels visible; do not reorder or calculate stars in presentation code. Use synthetic chart fixtures in previews.
5. On phone browsers, retain an overview, zoom/scroll controls and a readable selected-palace view. Provide a text/list equivalent for screen readers and keyboard access; selection and relationships must not rely on color alone.
6. Review PC/laptop/tablet/phone breakpoints, browser zoom, large text, Vietnamese wrapping, focus visibility, screen readers and reduced motion. Public landing/knowledge pages need metadata and SEO; private charts/chat/admin must not be indexed. Motion must clarify selection without changing chart meaning.

## Acceptance

- Layout preserves all twelve unique palace positions and stable star IDs from the input.
- Small screens and large text preserve access to every label and action.
- Contrast, focus order, non-color cues and text alternatives are checked on the implemented UI when one exists.
- Design research receives no birth records. Report prototype/browser checks separately from production acceptance. Do not create native apps or treat PWA as an MVP requirement.
