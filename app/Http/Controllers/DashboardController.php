<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Document;
use App\Models\Standard;
use App\Models\Certificate;

class DashboardController extends Controller
{
    public function index()
    {
        // Kalkulasi Statistik Dashboard
        $totalDocuments = Document::count();
        $relevantDocuments = Document::where('status', 'relevan')->count();
        $totalStandards = Standard::count();
        $totalCertificates = Certificate::count();
        $totalUsers = \App\Models\User::count();
        
        $bidangData = Document::select('field', \DB::raw('count(*) as value'))
            ->groupBy('field')
            ->get()
            ->map(function ($item, $index) {
                $colors = ['#00A2B9', '#006B7B', '#E67E22', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#F59E0B', '#64748B'];
                return [
                    'name' => $item->field,
                    'value' => $item->value,
                    'color' => $colors[$index % count($colors)]
                ];
            });

        $stats = [
            'totalDocuments' => $totalDocuments,
            'relevantDocuments' => $relevantDocuments,
            'totalStandards' => $totalStandards,
            'totalCertificates' => $totalCertificates,
            'totalUsers' => $totalUsers,
            'bidangData' => $bidangData,
            'trendData' => Document::selectRaw("EXTRACT(YEAR FROM created_at)::integer AS year, count(*) as count")
                ->groupBy('year')
                ->orderBy('year')
                ->get()
                ->map(fn($r) => ['year' => (string) $r->year, 'count' => (int) $r->count])
                ->toArray(),
            'recentlyAdded' => Document::with('standards')->orderBy('created_at', 'desc')->take(3)->get()->map(function ($doc) {
                return [
                    'id' => $doc->id,
                    'title' => $doc->title,
                    'jenis' => $doc->document_type,
                    'status' => $doc->status,
                    'timestamp' => $doc->updated_at ? $doc->updated_at->format('d/m/Y, H:i A') : null,
                    'statusType' => $doc->status === 'relevan' ? 'success' : 'warning',
                    'tags' => $doc->standards->pluck('name')->merge([$doc->document_type, $doc->field])->filter()->values()->all(),
                    'note' => $doc->notes ? 'Catatan: ' . $doc->notes : 'Catatan: -',
                ];
            })
        ];

        return Inertia::render('CMS/OverviewDashboard', [
            'stats' => $stats
        ]);
    }
}
