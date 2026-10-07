# Open Decisions — PLN Pusertif Repair

Only unresolved decisions/external dependencies belong here.

## Rules
- Never invent missing business data.
- If PLN confirmation is required, record it here.
- After a decision, move it to authoritative documentation and remove it here.

## OD-001 — Official IT support contact
Status: OPEN
Need official support name/team, email/phone, and display wording.
Current placeholders (copied verbatim from pre-existing UI into resources/js/config/site.js, NOT confirmed):
website https://pusertif.pln.co.id, email support@pusertif.pln.co.id, phone +62217982245.
After confirmation, update site.js and close this entry.

## OD-002 — Official PLN Pusertif map/location URL
Status: OPEN
Need confirmed official map/location destination. Do not invent a URL.
Current placeholders (copied verbatim from pre-existing UI into resources/js/config/site.js, NOT confirmed):
Google Maps embed pb + address Jl. Laboratorium No. 1, Duren Tiga, Pancoran, Jakarta Selatan 12760.
After confirmation, update site.js and close this entry.

## OD-003 — CAPTCHA policy
Status: VERIFY
Confirm case sensitivity, normalization, refresh/attempt behavior, and error wording.

## OD-004 — Public Temuan scope
Status: VERIFY
Confirm public route/menu label and exact fields intended for public display.
Safety rule: only published findings are public; internal evaluation/admin metadata stays private.

## OD-005 — FAQ scope
Status: OPEN
No FAQ implementation exists (no route/controller/model/migration/page; sidebar entry points to '#').
Need confirmed spec before building: FAQ content source, CMS manageability, public visibility, and placement.
