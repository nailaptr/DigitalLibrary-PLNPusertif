# Data & RBAC Contract — Compact Reference

Business behavior follows `docs/PRD.md` and `CLAUDE.md`.

## Roles
| Role | Login | Documents | Certificates | Statistics | Activity Log | Users/Roles | Findings |
|---|---|---|---|---|---|---|---|
| Admin | Yes | Manage | Manage | View | View | Manage | As permitted |
| Manager | Yes | Manage | Manage | View | Current repair: access required | Current repair: access required | Overview + Data access required |
| Staff | Yes | Manage | Manage | View | As permitted | No | As permitted |
| Guest | No | Public only | Public only | Public | No | No | Published public only |

This is a compact aid. When permission names differ, inspect the actual Spatie permissions before changing them.

## Hard authorization rules
- Backend authorization is mandatory.
- Hiding a sidebar item is not authorization.
- Direct URL access must be tested.
- Never grant wildcard permissions as a shortcut.

## Document status
Allowed only:
- `relevan`
- `tidak_relevan`

Do not introduce `draft`, `pending`, `revisi`, `approved`, or `rejected` unless the authoritative PRD changes.

## Findings
Current repair data contract may include:
- finding number
- person/name
- existing work area
- clause
- finding statement
- auditee/location
- cause
- objective evidence
- requirement
- preventive action
- finding type
- evaluation/internal note
- publication state
- creator/updater metadata
- timestamps

Finding type: `major`, `minor`, `pi`.
Only published findings are public. Internal evaluation/admin metadata is not public.

## Mutation contract
Success means the DB changed. Response must represent persisted state. Refresh must preserve it. Errors must be visible.

## Search/filter contract
Search + filters must work together. Reset must clear stale state. Pagination should preserve active filters when expected. Empty results are valid.

## Upload contract
Validate backend file type/size, persist file reference and metadata, return clear success/error, remain accessible after refresh.

## Activity log
Create/update/delete actions on Document, Certificate and Standard must be logged as required by `CLAUDE.md`.
