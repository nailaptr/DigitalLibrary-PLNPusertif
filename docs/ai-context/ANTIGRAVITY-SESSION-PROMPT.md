# Antigravity Session Prompt — Compact Loader

Copy this at the start of a repair session.

```text
You are working on the Digital Library Dokumen Standarisasi PLN Pusertif repository.

FIRST READ:
1. CLAUDE.md
2. docs/PRD.md only for the relevant section
3. docs/ai-context/AI-CONTEXT.md
4. docs/ai-context/ARCHITECTURE-CONTEXT.md
5. docs/ai-context/DATA-RBAC-CONTRACT.md
6. docs/ai-context/IMPLEMENTATION-HANDOFF.md
7. docs/ai-context/OPEN-DECISIONS.md

Read only the relevant rows of:
docs/ai-context/QA-ACCEPTANCE-MATRIX.md

CURRENT TASK:
[PASTE ONE PHASE OR ONE BUG GROUP]

Rules:
- Do not modify code until the existing implementation is understood.
- Search for and reuse existing routes/components/controllers/permissions.
- Fix root cause, not symptoms.
- Do not create parallel architecture.
- Do not hide broken functionality by removing UI.
- Do not bypass Spatie authorization.
- Do not invent data, permissions, statuses, URLs or business workflows.
- Do not work on unrelated issues.
- For mutations, verify DB persistence after browser refresh.
- Run the narrowest useful tests/checks.
- Update docs/ai-context/IMPLEMENTATION-HANDOFF.md when done.

Before finishing report:
1. root cause;
2. changed files;
3. verification performed;
4. DB verification for mutations;
5. remaining blockers/open decisions;
6. relevant QA IDs as PASS/FAIL.

Never claim PASS without evidence.
```

## Token-saving rule

Do not paste the entire PRD or Prompt Playbook every session.

Use:
- `AI-CONTEXT.md` = general rules
- `ARCHITECTURE-CONTEXT.md` = code structure
- `DATA-RBAC-CONTRACT.md` = permissions/data
- `QA-ACCEPTANCE-MATRIX.md` = acceptance criteria
- `IMPLEMENTATION-HANDOFF.md` = previous progress
- `OPEN-DECISIONS.md` = unresolved business values

Open the full `PRD.md` only when the compact context is insufficient.
