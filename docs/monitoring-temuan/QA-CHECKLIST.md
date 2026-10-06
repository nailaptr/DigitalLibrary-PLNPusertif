# Monitoring Temuan — QA Checklist

## Functional
- [x] Migration works
- [x] Initial import works
- [x] CMS list works
- [x] Create works
- [x] Edit works
- [x] Detail works
- [x] Delete confirmation works
- [x] Publish works
- [x] Unpublish works
- [x] Search works
- [x] Combined filters work
- [x] Pagination works
- [x] Public page works
- [x] Public only shows published records
- [x] KPI works
- [x] Charts work

## Data
- [x] Source nulls preserved
- [x] Ambiguous source classifications documented
- [x] No invented values
- [x] No CSV runtime dependency

## Security
- [x] Public unpublished record is inaccessible
- [x] CMS is authenticated
- [x] CRUD authorization works
- [x] Publish authorization works
- [x] Internal evaluation is private
- [x] Server-side validation exists

## UI/UX
- [x] Existing design patterns reused
- [x] Long text readable
- [x] Responsive
- [x] Empty state
- [x] Loading state
- [x] Error state
- [x] Keyboard/focus
- [x] Accessible labels

## Regression
- [x] Existing login still works
- [x] Existing CMS navigation still works
- [x] Existing public navigation still works
- [x] Relevant backend tests pass
- [x] Relevant frontend checks/build pass
