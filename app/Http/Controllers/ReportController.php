<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Certificate;
use App\Models\Standard;
use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        // 1. Laporan Data Dokumen (Total & list if needed, here just basic metrics)
        $docData = [
            'total' => Document::count(),
            'relevan' => Document::where('status', 'relevan')->count(),
            // Tidak relevan will be used in Fase 2
            'tidak_relevan' => Document::where('status', '!=', 'relevan')->count(),
        ];

        // 2. Laporan Data Sertifikat
        $certData = [
            'total' => Certificate::count(),
            'aktif' => Certificate::where('status', 'aktif')->count(),
            'kedaluwarsa' => Certificate::where('status', 'kedaluwarsa')->count(),
        ];

        // 3. Laporan Dokumen per Standar
        $docPerStandard = Standard::withCount('documents')->get()->map(function($std) {
            return [
                'name' => $std->name,
                'count' => $std->documents_count
            ];
        });

        // 4. Laporan Dokumen per Bidang
        $docPerBidang = Document::select('bidang', DB::raw('count(*) as count'))
            ->groupBy('bidang')
            ->get();

        // 5. Laporan Dokumen berdasarkan Jenis
        $docPerJenis = Document::select('jenis', DB::raw('count(*) as count'))
            ->groupBy('jenis')
            ->get();

        // 6. Laporan Aktivitas Pengguna
        // This calculates the number of activities per user
        $activityPerUser = ActivityLog::select('user_id', DB::raw('count(*) as count'))
            ->with('user:id,name,email')
            ->groupBy('user_id')
            ->get()
            ->map(function($log) {
                return [
                    'user_name' => $log->user ? $log->user->name : 'System/Unknown',
                    'count' => $log->count
                ];
            });

        return Inertia::render('CMS/Reports', [
            'docData' => $docData,
            'certData' => $certData,
            'docPerStandard' => $docPerStandard,
            'docPerBidang' => $docPerBidang,
            'docPerJenis' => $docPerJenis,
            'activityPerUser' => $activityPerUser,
        ]);
    }
}
