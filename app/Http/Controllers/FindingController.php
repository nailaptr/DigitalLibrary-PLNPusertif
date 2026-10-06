<?php

namespace App\Http\Controllers;

use App\Models\Finding;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class FindingController extends Controller
{
    public function overview()
    {
        $total = Finding::count();
        $major = Finding::where('finding_type', 'major')->count();
        $minor = Finding::where('finding_type', 'minor')->count();
        $pi = Finding::where('finding_type', 'pi')->count();
        $published = Finding::where('is_published', true)->count();
        $draft = Finding::where('is_published', false)->count();

        $byType = Finding::select('finding_type', \DB::raw('count(*) as value'))
            ->groupBy('finding_type')
            ->get()
            ->map(function ($item, $index) {
                $colors = ['#EF4444', '#F97316', '#3B82F6', '#9CA3AF']; // Red, Orange, Blue, Gray
                $name = $item->finding_type ? strtoupper($item->finding_type) : 'UNCLASSIFIED';
                return [
                    'name' => $name,
                    'value' => $item->value,
                    'color' => $colors[$index % count($colors)]
                ];
            });

        $byClause = Finding::select('clause', \DB::raw('count(*) as value'))
            ->whereNotNull('clause')
            ->where('clause', '!=', '')
            ->groupBy('clause')
            ->get()
            ->map(function ($item, $index) {
                $colors = ['#00A2B9', '#006B7B', '#E67E22', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#F59E0B', '#64748B'];
                return [
                    'name' => 'Klausul ' . $item->clause,
                    'value' => $item->value,
                    'color' => $colors[$index % count($colors)]
                ];
            });

        $byWorkArea = Finding::select('existing_work_area', \DB::raw('count(*) as value'))
            ->whereNotNull('existing_work_area')
            ->where('existing_work_area', '!=', '')
            ->groupBy('existing_work_area')
            ->get()
            ->map(function ($item, $index) {
                $colors = ['#8B5CF6', '#EC4899', '#F59E0B', '#64748B', '#00A2B9', '#006B7B', '#E67E22', '#3B82F6', '#10B981'];
                return [
                    'name' => $item->existing_work_area,
                    'value' => $item->value,
                    'color' => $colors[$index % count($colors)]
                ];
            });

        $stats = [
            'total' => $total,
            'major' => $major,
            'minor' => $minor,
            'pi' => $pi,
            'published' => $published,
            'draft' => $draft,
            'byType' => $byType,
            'byClause' => $byClause,
            'byWorkArea' => $byWorkArea,
        ];

        return Inertia::render('CMS/FindingOverview', [
            'stats' => $stats
        ]);
    }

    public function index(Request $request)
    {
        $query = Finding::query();

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            // PostgreSQL uses ilike for case-insensitive, but Laravel where(lower) is safer if cross-db or just use like.
            // Assuming SQLite or PG.
            $query->where(function($q) use ($search) {
                $q->whereRaw('LOWER(finding_number) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(person_name) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(finding_statement) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(clause) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(existing_work_area) LIKE ?', ["%{$search}%"]);
            });
        }

        if ($request->filled('type') && $request->type !== 'Semua Jenis') {
            $query->where('finding_type', strtolower($request->type));
        }

        if ($request->filled('status') && $request->status !== 'Semua Status') {
            $isPublished = $request->status === 'Published';
            $query->where('is_published', $isPublished);
        }

        $findings = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('CMS/FindingManagement', [
            'findings' => $findings,
            'filters' => $request->only(['search', 'type', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate($this->rules());
        $validated['created_by'] = auth()->id();

        $finding = Finding::create($validated);
        ActivityLog::record(ActivityLog::ACTION_CREATE, $finding, "Menambah data temuan: {$finding->finding_number}");

        return redirect()->back()->with('success', 'Data temuan berhasil ditambahkan.');
    }

    public function update(Request $request, Finding $finding)
    {
        $validated = $request->validate($this->rules($finding->id));
        $validated['updated_by'] = auth()->id();

        $finding->update($validated);
        ActivityLog::record(ActivityLog::ACTION_UPDATE, $finding, "Mengubah data temuan: {$finding->finding_number}");

        return redirect()->back()->with('success', 'Data temuan berhasil diperbarui.');
    }

    public function destroy(Finding $finding)
    {
        ActivityLog::record(ActivityLog::ACTION_DELETE, $finding, "Menghapus data temuan: {$finding->finding_number}");
        $finding->delete();

        return redirect()->back()->with('success', 'Data temuan berhasil dihapus.');
    }

    public function publish(Finding $finding)
    {
        $finding->update(['is_published' => true, 'updated_by' => auth()->id()]);
        ActivityLog::record(ActivityLog::ACTION_UPDATE, $finding, "Mempublish data temuan: {$finding->finding_number}");
        
        return redirect()->back()->with('success', 'Temuan dipublish.');
    }

    public function unpublish(Finding $finding)
    {
        $finding->update(['is_published' => false, 'updated_by' => auth()->id()]);
        ActivityLog::record(ActivityLog::ACTION_UPDATE, $finding, "Membatalkan publish data temuan: {$finding->finding_number}");
        
        return redirect()->back()->with('success', 'Publish temuan dibatalkan.');
    }

    private function rules($id = null)
    {
        return [
            'finding_number' => ['nullable', 'string', 'max:255'],
            'person_name' => ['nullable', 'string', 'max:255'],
            'existing_work_area' => ['nullable', 'string', 'max:255'],
            'clause' => ['nullable', 'string', 'max:255'],
            'finding_statement' => ['nullable', 'string'],
            'location_auditee' => ['nullable', 'string', 'max:255'],
            'cause' => ['nullable', 'string'],
            'objective_evidence' => ['nullable', 'string'],
            'requirement' => ['nullable', 'string'],
            'preventive_action' => ['nullable', 'string'],
            'finding_type' => ['nullable', 'string', Rule::in(['major', 'minor', 'pi'])],
            'evaluation_note' => ['nullable', 'string'],
            'is_published' => ['boolean'],
        ];
    }
}
