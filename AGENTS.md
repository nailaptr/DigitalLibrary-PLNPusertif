# Project Agent Rules — DigitalLibrary-PLNPusertif

## Scope
This repository is the existing Digital Library / Sistem Manajemen Terintegrasi PLN Pusertif.
The current feature being implemented is **Monitoring Temuan**.

## Source of truth
- Product requirements: `docs/monitoring-temuan/PRD-Monitoring-Temuan.pdf`
- Short implementation context: `docs/monitoring-temuan/CONTEXT.md`
- Current implementation state: `docs/monitoring-temuan/IMPLEMENTATION-STATE.md`
- QA checklist: `docs/monitoring-temuan/QA-CHECKLIST.md`
- Source CSV and dashboard HTML are reference materials only; do not use them as runtime data sources.

## Mandatory behavior
1. Before modifying code, inspect the existing repository patterns relevant to the task.
2. Reuse existing architecture, layout, components, routing, validation, authorization, and testing patterns.
3. Do not invent a parallel architecture when an equivalent existing pattern exists.
4. Do not silently change or "correct" ambiguous source data.
5. Keep changes scoped to Monitoring Temuan unless a dependency requires a small supporting change.
6. Prefer database-backed data and server-side search/filter/pagination.
7. Public pages may only expose published findings and must not expose internal evaluation/audit fields.
8. Run the narrowest relevant tests/checks after each phase.
9. Update `docs/monitoring-temuan/IMPLEMENTATION-STATE.md` at the end of every implementation phase.
10. Do not ask for approval for routine implementation decisions; make the safest repository-consistent decision and document it.

## Token discipline
- Do not reread the entire PRD/source files on every turn.
- Read only the specific section/file needed for the current phase.
- Do not inspect unrelated modules.
- In your final response, report only: files changed, checks run, result, known issues, next recommended phase.

## Working rule
If repository conventions conflict with a PRD technical suggestion, follow the repository convention and record the deviation in `IMPLEMENTATION-STATE.md`.
