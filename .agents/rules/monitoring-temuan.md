---
trigger: model_decision
description: "Use for any Monitoring Temuan work: database/model/import, CMS CRUD, dashboard, public page, search/filter, QA, security, data integrity, UI/UX, or regression."
---

# Monitoring Temuan — Detailed Implementation Rules

## Product boundary
Build only the Monitoring Temuan feature described by the PRD.
Architecture:
- Public: Monitoring Temuan
- CMS: Overview + Data Temuan + Detail + Input + Edit

Do not add complex follow-up workflow, PIC/deadline/status/verification, notification, or unrelated refactors unless the repository already requires a small supporting change.

## Data model
Preferred conceptual fields:
`finding_number`, `person_name`, `existing_work_area`, `clause`, `finding_statement`, `location_auditee`, `cause`, `objective_evidence`, `requirement`, `preventive_action`, `finding_type`, `evaluation_note`, `is_published`, `created_by`, `updated_by`, timestamps.

`finding_type` is conceptually `major | minor | pi`.
Preserve source NULL/blank values. Ambiguous classification must not be silently normalized.

## Public boundary
Only `is_published = true`.
Do not expose `evaluation_note`, creator/updater fields, or other internal-only data.
Runtime source is the database, never the CSV/HTML reference files.

## Query/UI behavior
- Server/database-side search and filtering.
- Combined filters: work area + clause + finding type.
- Pagination must preserve query/filter state.
- KPI/chart statistics come from DB aggregate queries.
- Reuse existing UI patterns; do not add a new component library if equivalent components exist.
- Long text must remain readable and accessible.
- Responsive desktop/tablet/mobile behavior.
- Forms need labels, validation errors, loading/disabled state.
- Keyboard/focus/semantic/accessibility basics must be preserved.

## Security
- CMS CRUD/auth/authorization must use the repository's existing mechanism.
- Publish/unpublish requires appropriate permission.
- Server-side validation is mandatory.
- Follow repository mass-assignment and XSS/injection protections.
- No unpublished data may leak through public endpoints.

## Implementation discipline
- Inspect relevant existing examples first.
- Prefer the smallest coherent change set.
- Do not refactor unrelated code.
- Test after each logical phase.
- Update `IMPLEMENTATION-STATE.md` after each phase.
