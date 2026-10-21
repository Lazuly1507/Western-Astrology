---
name: tuvi-chart-engine
description: Deprecated for current project. Legacy Tu Vi chart calculation only, never Western natal positions or houses. Use astrology-chart-engine for the active MVP.
---

# Deterministic chart engine

**Deprecated for the active Western Astrology project.** Keep these Tu Vi rules separate; do not translate their placements into zodiac signs or houses.

## Workflow

1. Read [chart-contract.md](references/chart-contract.md). Establish input calendar, timezone history, leap-month flag, birth-time uncertainty and school/rule version before computing.
2. Obtain accepted rules from `tuvi-domain`. If absent, specify the missing rule and a test that will distinguish alternatives; do not invent an answer.
3. Select a calendar implementation only after inspecting license, supported date range, timezone assumptions and leap-month behavior. Test solar/lunar round trips with an independent oracle; a round trip alone cannot prove correctness.
4. Normalize date/time deterministically, then calculate Can Chi, Mệnh/Thân/Cục, palace allocation, star placement and requested cycles as separate testable stages. Never use an LLM to calculate or guess star positions.
5. Return structured data with stable identifiers and complete provenance. Preserve the original input separately from normalized values; fail explicitly on invalid or ambiguous inputs that prevent calculation.
6. Compare results against independently confirmed charts for the same school. Record expected value, source, rule version and discrepancy per star/palace/cycle. Do not certify output with model-generated expected values.

## Acceptance

- Identical input and versioned rules produce identical chart content.
- Boundary-hour, timezone, leap-month, invalid-date and supported-range cases have explicit outcomes.
- Twelve palace branches are unique; star multiplicity constraints come from the adopted rules.
- Chart data can be consumed without AI; interpretation cannot mutate it.
- No accuracy claim until independent fixtures are available and passing. This setup installs instructions, not an algorithm implementation.
