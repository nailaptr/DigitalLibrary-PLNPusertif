# Prompt Flow — Antigravity / Monitoring Temuan

Use one fresh Antigravity conversation per phase.
Do not paste the full PRD into every prompt.
The agent should read only the referenced files.

## Phase 0 — Prepare context
Prompt:
Read `AGENTS.md`, `docs/monitoring-temuan/CONTEXT.md`, `docs/monitoring-temuan/IMPLEMENTATION-STATE.md`, and the repository root documentation. Do not modify code. Confirm whether the context files are sufficient and list only missing documentation that would materially reduce future token usage. Then stop.

## Phase 1 — Repository analysis
Prompt:
Analyze the existing repository specifically for Monitoring Temuan.
Inspect only the Laravel/PHP, React/Inertia, routing, auth/permission, existing CMS CRUD, public page, tables/forms/dialogs, charts, database, and tests needed for this feature.
Also read the relevant PRD sections only.
Do not modify code.
Write verified findings to `docs/monitoring-temuan/IMPLEMENTATION-STATE.md`.
End with: `ANALYSIS COMPLETE — NO CODE MODIFIED.`

## Phase 2 — Database + import
Prompt:
Implement only the database foundation for Monitoring Temuan.
Follow the existing repository conventions discovered in Phase 1.
Create the smallest necessary migration/model/validation foundation and initial import/seeder mechanism.
Use the PRD field mapping.
Preserve source NULL/blank values and do not silently normalize ambiguous classifications.
Do not build CMS or public UI yet.
Run the narrowest relevant migration/import/tests.
Update `IMPLEMENTATION-STATE.md` with files changed, commands, results, and data anomalies.

## Phase 3 — CMS CRUD
Prompt:
Implement the CMS Data Temuan module only.
Reuse the existing CMS layout, components, routing pattern, auth, and permission system.
Add list, search/filter, pagination, detail, create, edit, delete confirmation, and publish/unpublish.
Keep internal fields such as evaluation private from public.
Do not build the public page yet and do not refactor unrelated modules.
Run focused tests/checks.
Update `IMPLEMENTATION-STATE.md`.

## Phase 4 — CMS Overview
Prompt:
Implement only the Monitoring Temuan CMS Overview.
Use database aggregate queries for KPIs and distributions.
Reuse the project's existing chart package/components if available; do not install a new chart/UI library unless strictly necessary.
KPIs: total, major, minor, PI, published, draft/unpublished.
Charts/distributions: finding type, clause, work area.
Keep data dynamic; no hardcoded statistics.
Run focused checks and update `IMPLEMENTATION-STATE.md`.

## Phase 5 — Public page
Prompt:
Implement only the public Monitoring Temuan page.
Use the existing public layout/navigation and repository conventions.
Public data must be scoped to `is_published = true`.
Add summary KPIs, server-side search, combined filters (work area, clause, finding type), paginated table, and detail interaction consistent with existing UI.
Do not expose internal evaluation/audit metadata.
Do not read the CSV/HTML at runtime.
Run focused checks and update `IMPLEMENTATION-STATE.md`.

## Phase 6 — Quality / data integrity
Prompt:
Review Monitoring Temuan end-to-end without adding new product scope.
Verify:
1. search + combined filters + pagination,
2. public published-only boundary,
3. CMS unpublished visibility,
4. source-to-database data integrity,
5. ambiguous/blank source handling,
6. KPI/chart correctness.
Compare against the source data only where necessary; do not rewrite ambiguous source values silently.
Fix only confirmed defects within scope.
Update `IMPLEMENTATION-STATE.md` and `QA-CHECKLIST.md`.

## Phase 7 — UI/UX + accessibility
Prompt:
Review only the Monitoring Temuan UI.
Compare against existing project patterns for spacing, typography, cards, badges, tables, forms, dialogs, responsive behavior, empty/loading/error states, long text, keyboard/focus, and labels.
Do not introduce a new UI library.
Fix confirmed UI/accessibility defects only.
Run the narrowest frontend checks and update state.

## Phase 8 — Security + regression
Prompt:
Perform a focused security and regression review for Monitoring Temuan.
Verify authentication/authorization for CMS CRUD and publish/unpublish, server-side validation, mass-assignment protection, public unpublished-data isolation, internal-field isolation, and injection/XSS risks.
Then run relevant backend/frontend tests/build/lint/type checks and verify core existing flows still work.
Fix only issues caused by this feature.
Document pre-existing failures separately from new failures.
Update `IMPLEMENTATION-STATE.md` and `QA-CHECKLIST.md`.

## Phase 9 — Cleanup
Prompt:
Perform a final scoped cleanup of Monitoring Temuan only.
Remove unused imports, dead routes, duplicate logic, temporary debug code, and unnecessary complexity.
Do not perform unrelated refactors.
Run the final focused checks.
Update `IMPLEMENTATION-STATE.md` with final status.

## Session discipline
At the start of every phase:
- Read `AGENTS.md`.
- Read `CONTEXT.md`.
- Read `IMPLEMENTATION-STATE.md`.
- Read only the specific PRD sections required for that phase.
Do not reread the entire source CSV or dashboard HTML unless the phase explicitly requires it.
