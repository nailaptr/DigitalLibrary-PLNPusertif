# QA Acceptance Matrix — PLN Pusertif Repair

Do not mark PASS from code inspection alone.

Phase 8 convention used below: `STATIC-OK` = static code/class audit done, live
browser test still pending. `BLOCKED` = cannot pass without a decision/spec.
No row is marked PASS in Phase 8 (no browser tool in this environment).

## Severity
- P0 = blocker/core workflow/authorization failure
- P1 = important functional/UX defect
- P2 = polish/minor consistency

## Public
| ID | Check | PASS |
|---|---|---|
| PUB-01 | Landing hero | Image loads |
| PUB-02 | Slider | Arrows work |
| PUB-03 | Title | `sistem manajemen terintegrasi pln pusertif` used consistently |
| PUB-04 | Page headers | Overview/Dokumen/Sertifikat/Temuan share title pattern |
| PUB-05 | Certificate icon | Matches surrounding UI |
| PUB-06 | Certificate heading | `Daftar Sertifikat Terbitan` consistent |
| PUB-07 | English | Switch works without overflow |
| PUB-08 | Search | Works desktop/mobile |

Phase 8 static result: PUB-01–PUB-08 STATIC-OK (hero alt/loading/fallback, slider
aria i18n, unified h1 scale, section icons, EN switcher, responsive search +
pagination). Live check pending at 1920/1366/768/390.

## Login
| ID | Check | PASS |
|---|---|---|
| AUTH-01 | Logo | Correct PLN logo |
| AUTH-02 | English | No overflow |
| AUTH-03 | CAPTCHA | Actual configured behavior works |
| AUTH-04 | Login | Valid/invalid flows work |

Phase 8 static result: AUTH-01/AUTH-02 STATIC-OK (asset logo, hero/feature strings
via i18n, EN/ID switcher, captcha input min-w-0 fix). AUTH-03 STATIC-OK as
configured (client-only; server-side tracked as B-001/OD-003). AUTH-04 needs
live valid/invalid test.

## CMS dashboard
| ID | Check | PASS |
|---|---|---|
| DASH-01 | Bell | Responsive/clickable |
| DASH-02 | Calendar | Responsive/usable |
| DASH-03 | Search | Responsive/usable |
| DASH-04 | Cards | No overlap/overflow |
| DASH-05 | Activity search | Works |
| DASH-06 | User password | Rules visible and validation consistent |

Phase 8 static result: DASH-01–DASH-06 STATIC-OK (bell/calendar a11y tokens,
search visible on mobile + filters, sm:grid-cols-2 cards, controlled activity
search, password helper/backend consistency). Live check pending.

## Content
| ID | Check | PASS |
|---|---|---|
| DOC-01 | All standards | Correct destination |
| DOC-02 | Clause | Optional blank saves |
| DOC-03 | Sub-clause | Optional blank saves |
| DOC-04 | Standard upload | Persists after refresh |
| DOC-05 | Search | Expected results |
| DOC-06 | Filter/reset | Works |
| DOC-07 | Document status | Intended action persists |
| DOC-08 | FAQ | Open/close works |
| DOC-09 | Document edit | Persists after refresh |

Phase 8 static result: DOC-01/DOC-02/DOC-03/DOC-05/DOC-06/DOC-07/DOC-09
STATIC-OK. DOC-04 N/A as written (standards have no file-upload schema; modal
save persists incl. empty description). DOC-08 BLOCKED (OD-005, no implementation).

## Findings
| ID | Check | PASS |
|---|---|---|
| FIND-01 | Calendar | Works responsively |
| FIND-02 | Search | Finds records |
| FIND-03 | Filters | Individual + combined |
| FIND-04 | View | Detail opens/closes |
| FIND-05 | Edit | Persists |
| FIND-06 | Delete | Cancel/confirm correct |
| FIND-07 | Publish | Public visibility updates |
| FIND-08 | Unpublish | Public visibility removed |
| FIND-09 | Privacy | Internal fields never public |

Phase 8 static result: FIND-01–FIND-09 STATIC-OK by trace (backend writes DB,
public is_published filter + field whitelist, combined search/filter,
withQueryString pagination, confirm dialog, loading/error/success states).
CMS pagination responsive fix applied in Phase 8. Live + refresh test pending.

## Manager
| ID | Check | PASS |
|---|---|---|
| RBAC-01 | Activity Log | Manager access works |
| RBAC-02 | User Management | Manager access works |
| RBAC-03 | Temuan Overview | Manager access works |
| RBAC-04 | Data Temuan | Manager access works |
| RBAC-05 | Direct URL | Required access works |
| RBAC-06 | Backend auth | Server enforces access |

Phase 8 static result: RBAC-01–RBAC-06 STATIC-OK by audit (menu gate ==
route middleware == seeder grant for Manager; no controller role checks; no
wildcards). Live login-as-Manager + direct-URL test pending.

## Responsive
Test 1920×1080, 1366×768, 768px, 390×844.
PASS = no unintended horizontal scroll, overlap, clipping; controls/forms/tables/modals remain usable.

Phase 8 static result: audited via class tokens across all changed areas —
max-w-7xl + px-4 sm:px-8 shells, flex-col→row breakpoints, 1-col grids at 390px,
overflow-x-auto tables, scrollable modals, wrapping topbars/pagination/footers,
focus-visible rings, labelled inputs, role=alert errors, empty states.
No live viewport run (no browser tool). No horizontal-overflow pattern remains
in changed files.

## Final gate
P0 must be 100% PASS.
P1/P2 may remain only if explicitly documented in `OPEN-DECISIONS.md` or the final regression report.
