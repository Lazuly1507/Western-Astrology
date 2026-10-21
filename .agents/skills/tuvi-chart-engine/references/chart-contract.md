# Proposed chart boundary

This is a design contract to refine with the selected school before application coding, not an implemented API.

Inputs: calendar (`solar` or `lunar`), date, lunar leap-month flag where applicable, local birth time or uncertainty interval, birthplace/timezone identifier and rule-required sex convention. Avoid collecting legal name when calculation does not need it.

Normalization records: original calendar fields, timezone and historical offset used, normalized solar/lunar dates, leap-month status, hour branch, day-boundary convention and unsupported/ambiguous input errors. A fixed UTC+7 assumption must never substitute for a supplied location/timezone without a documented decision. Date-only inputs are not UTC instants.

Output envelope: `schemaVersion`, `engineVersion`, `rulesetId`, `rulesetVersion`, `calendarVersion`, `inputProvenance`, `normalization`, `palaces`, `cycles`, `warnings`. Chart IDs, timestamps and other metadata must be separated from deterministic chart content for equality checks.

Each palace has a stable ID, a unique Earthly Branch, its role, and star records with stable IDs and rule provenance. Cycles record period, age convention, direction and triggering rule. Unknown means unknown, never an empty value interpreted as absence. Distinguish an uncomputed cycle from a computed cycle without an event.

Confirmed fixtures must record source permission, source/edition or engine version, school, synthetic or consented input, timezone, expected placements, reviewer and date. Two implementations sharing the same source table are not fully independent oracles. No confirmed fixtures are currently supplied.
