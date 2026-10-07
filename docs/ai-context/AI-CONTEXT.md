# AI Context — Digital Library PLN Pusertif

Purpose: compact context for Antigravity / AI coding assistant. Read this before the full PRD for implementation/debugging.

## Canonical sources
1. `CLAUDE.md` — hard engineering rules.
2. `docs/PRD.md` — business requirements.
3. `docs/GAP_ANALYSIS.md` — baseline gaps.
4. `docs/PROMPT_PLAYBOOK.md` — original roadmap.
5. `docs/ai-context/*` — compact repair context.

If these conflict, `CLAUDE.md` and `docs/PRD.md` win.

## AI operating rules
- Work on ONE phase/task at a time.
- Inspect existing implementation before coding.
- Fix existing architecture; do not create parallel routes/components/services.
- Reuse existing layouts, components, hooks, validation, middleware, models and permissions.
- Do not add dependencies unless necessary.
- Do not invent business data, URLs, contacts, statuses, fields, roles or workflows.
- Do not hide broken functionality by removing menus.
- Do not bypass Spatie authorization.
- Do not swallow exceptions to make UI appear successful.
- For persistence bugs trace: UI → request → route → middleware → validation → controller/service → model → DB → response → UI.
- A button responding is not proof of success; verify persistence after refresh.
- Keep changes scoped.
- End every task with changed files, fix summary, verification, and blockers.

## Business invariants
### Roles
- Admin: system/user/role management, content management, statistics, activity log.
- Manager: statistics and content management; no review approval workflow.
- Staff: statistics and content management; Phase 2 document review.
- Guest: public pages only; never login.

### Document status
Only `relevan` and `tidak_relevan`.
Phase 1 new uploads default to `relevan`.
Phase 2 Staff directly determines final status. No Manager approval.

### Current repair scope
Public website, login/i18n/CAPTCHA, CMS dashboard, content persistence, standards, document status/FAQ, Monitoring Temuan, Manager access, map/contact, responsive/accessibility, security/RBAC, regression.

### Current Manager repair requirement
Manager must access:
- Activity Log
- User Management
- Temuan Overview
- Data Temuan

Do not infer extra privileges.

## Verification rule
1. Inspect code.
2. Run narrow automated check.
3. Test browser flow.
4. Verify DB for mutations.
5. Re-test after refresh/navigation.

## Stop conditions
Stop and report if required business data is missing, an official URL/contact is unknown, architecture conflicts with requirements, or a schema/permission change has wider impact.

Use `OPEN-DECISIONS.md` for unresolved decisions.
