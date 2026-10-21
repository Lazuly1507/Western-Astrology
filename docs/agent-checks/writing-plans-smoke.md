# Agent skill verification plan

> **For Codex:** Native execution in the current workspace. This is a setup-only planning exercise, not approval to implement the application.

**Goal:** Verify that installed skill manifests can be parsed, discovered and used without changing global configuration or calculating a chart.

**Architecture:** Project-local skill folders hold instructions. Node tooling validates YAML and asks the existing Codex app-server to enumerate skills; Python executes reviewed UI research tooling locally.

**Tech Stack:** Existing Codex CLI 0.132.0, Node 24.19.0, Python 3.15.0; YAML parser 2.8.1 isolated in the workspace.

**Spec:** User attachment, “MASTER PROMPT — TỰ ĐỘNG CÀI ĐẶT AGENT SKILLS CHO CODEX”; scope and routing recorded in `AGENTS.md`.

## Global Constraints

- No application code, global settings changes, sandbox bypass, paid model requests, or production credentials.
- Six custom skills and selected upstream skills use `.agents/skills/`.
- Keep chart calculation separate from AI interpretation; use synthetic sample inputs.

## Review Focus

- A valid manifest can still be undiscoverable: check the actual CLI, not just the directory.
- A Claude path can parse but fail at runtime: replace plugin-root paths in the installed UI entrypoint.
- An upstream skill can require absent subskills: adapt the planning handoff and namespaced references.
- Self-consistent calendar output is not an independent accuracy oracle: no chart accuracy claim.
- A generic UI match can be irrelevant to this product: inspect the result before adopting it.

### Task 1: Validate installed artifacts

**Files:** `.agents/skills/*/SKILL.md`, `docs/agent-sources/installed-skills.json`, `scripts/validate-agent-setup.cjs`.

**Interfaces:** Consumes installed skill files and hash manifest; produces `docs/agent-checks/validation.json` with failure list.

- [x] Run `node scripts/validate-agent-setup.cjs`.
- [x] Check eleven valid manifests and an empty failure list, including local-link and checksum checks.

### Task 2: Confirm discovery without a model call

**Files:** `scripts/check-codex-skills.cjs`, `docs/agent-checks/codex-discovery.json`.

**Interfaces:** Consumes actual local CLI app-server protocol; produces discovered skill metadata, missing names, duplicate names and parser errors.

- [x] Run `node scripts/check-codex-skills.cjs`.
- [x] Confirm eleven enabled project skills, no missing names, no duplicate names and no parser errors.

### Task 3: Exercise runtime and instruction boundaries

**Files:** `scripts/run-ui-checks.cjs`, `docs/agent-checks/ui-checks.json`, `docs/agent-checks/tuvi-skill-smoke.md`.

**Interfaces:** Consumes reviewed local UI search/data and synthetic requests; produces command logs and manual skill walkthroughs with limitations.

- [x] Run `node scripts/run-ui-checks.cjs`; expect all six commands to exit 0.
- [x] Review the generated style/product fit rather than accepting the landing pattern automatically.
- [x] Apply each custom skill to a small synthetic request; distinguish manual walkthroughs from model-trigger evals and chart tests.

## Self-review and handoff

The tasks cover syntax, discovery, dependencies, runtime and the most consequential chart/AI boundary. No rule tables, confirmed charts or application exist, so algorithm accuracy and app/device behavior are outside what these checks prove. Execution used the existing session; no additional model turn or delegated agent was launched. Results are recorded in the setup report.
