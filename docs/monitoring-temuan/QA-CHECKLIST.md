# Monitoring Temuan — QA Checklist

## Functional
- [ ] Migration works
- [ ] Initial import works
- [ ] CMS list works
- [ ] Create works
- [ ] Edit works
- [ ] Detail works
- [ ] Delete confirmation works
- [ ] Publish works
- [ ] Unpublish works
- [ ] Search works
- [ ] Combined filters work
- [ ] Pagination works
- [ ] Public page works
- [ ] Public only shows published records
- [ ] KPI works
- [ ] Charts work

## Data
- [ ] Source nulls preserved
- [ ] Ambiguous source classifications documented
- [ ] No invented values
- [ ] No CSV runtime dependency

## Security
- [ ] Public unpublished record is inaccessible
- [ ] CMS is authenticated
- [ ] CRUD authorization works
- [ ] Publish authorization works
- [ ] Internal evaluation is private
- [ ] Server-side validation exists

## UI/UX
- [ ] Existing design patterns reused
- [ ] Long text readable
- [ ] Responsive
- [ ] Empty state
- [ ] Loading state
- [ ] Error state
- [ ] Keyboard/focus
- [ ] Accessible labels

## Regression
- [ ] Existing login still works
- [ ] Existing CMS navigation still works
- [ ] Existing public navigation still works
- [ ] Relevant backend tests pass
- [ ] Relevant frontend checks/build pass
