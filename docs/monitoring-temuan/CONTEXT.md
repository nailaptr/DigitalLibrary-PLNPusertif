# Monitoring Temuan — Compact Context

## Goal
Add a Monitoring Temuan feature to the existing DigitalLibrary-PLNPusertif application.

## Surfaces
1. Public Website: published findings only.
2. CMS Overview: KPIs/charts.
3. CMS Data Temuan: list/search/filter/pagination/detail/create/edit/delete/publish-unpublish.

## Data source
Initial source is the CSV in `docs/monitoring-temuan/source/`.
Reference dashboard is the HTML in the same folder.
Neither should be read by the application at runtime.

## Core fields
finding_number
person_name
existing_work_area
clause
finding_statement
location_auditee
cause
objective_evidence
requirement
preventive_action
finding_type (major/minor/pi)
evaluation_note (internal)
is_published
created_by / updated_by
timestamps

## Important source-data rule
Keep blank/null values. Do not fabricate missing values. Do not silently resolve ambiguous classifications.

## Public columns/content
No, Jenis, Bidang, Klausul, Lokasi/Auditee, Ringkasan Temuan.
Detail can show published finding content only.
Internal evaluation and audit metadata stay private.

## CMS overview
Total, Major, Minor, PI, Published, Draft/Unpublished.
Distributions: type, clause, work area.
All stats must come from database aggregates.

## Query behavior
Server-side search/filter/pagination.
Combined filters must work.
Public query must always scope to published.

## Technical direction
Follow the existing Laravel + React + Inertia + Tailwind architecture and current project conventions.
Do not assume package versions or component names; inspect the repository.
