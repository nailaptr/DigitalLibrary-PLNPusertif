# Architecture Context — PLN Pusertif

## Stack
- Laravel 12
- React + Inertia.js
- Tailwind CSS
- PostgreSQL
- Laravel Breeze
- Spatie Laravel Permission
- Redis
- Docker / Docker Compose
- Nginx
- PestPHP

## Expected ownership
- `routes/`: route definitions.
- `app/Http/Controllers/`: HTTP orchestration.
- `app/Models/`: Eloquent models/relationships.
- `database/migrations/`: schema.
- `database/seeders/`: reference data and permissions.
- `resources/js/Pages/`: Inertia pages.
- `resources/js/Components/`: reusable UI.
- `resources/js/Layouts/`: layouts.

## Public vs CMS
Public requires no authentication.
CMS requires authentication.

Public must never expose internal evaluation notes, internal audit metadata, creator/updater data unless explicitly public, or unpublished findings.

## Authorization
Authorization must be server-side. Sidebar visibility is not authorization. Direct URL/request access must also be tested.

## Persistence
For create/update/delete/upload:
- validate;
- persist;
- return authoritative state;
- refresh must show persisted result.

## Reuse
Before creating a route/controller/component/modal/form/table/filter/permission, search the repository for an existing implementation.

## Debug sequence
1. Reproduce.
2. Inspect browser/network symptom.
3. Locate route.
4. Locate middleware/permission.
5. Locate controller/service.
6. Locate validation.
7. Locate model/query.
8. Inspect DB state.
9. Fix root cause.
10. Re-test original scenario.
11. Re-test neighboring scenarios.

## Do not
- broad-refactor during a bug fix;
- migrate frameworks;
- upgrade dependencies without need;
- create duplicate auth/RBAC/layout systems;
- redesign schema without requirement;
- fabricate data;
- use temporary hardcoded production behavior.
