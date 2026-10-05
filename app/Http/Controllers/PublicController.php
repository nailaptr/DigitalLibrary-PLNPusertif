<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Certificate;
use App\Models\Standard;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

class PublicController extends Controller
{
    /**
     * Halaman Utama (Landing)
     */
    public function landing()
    {
        $iso9001 = Standard::where('name', 'ILIKE', '%9001%')->first();
        $iso14001 = Standard::where('name', 'ILIKE', '%14001%')->first();
        $iso45001 = Standard::where('name', 'ILIKE', '%45001%')->first();

        $recentCertificates = Certificate::orderBy('created_at', 'desc')->take(3)->get()->map(function ($cert) {
            return [
                'id' => $cert->id,
                'title' => $cert->name,
                'recipient' => 'PLN', // Data fiktif jika tidak ada
                'issuer' => $cert->issuer,
                'image' => '/images/cert_thumb.png',
                'file_path' => $cert->file_path,
            ];
        });

        return Inertia::render('Public/MainDashboard', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            // Statistik
            'stats' => [
                'standardCount' => Standard::count(),
                'certificateCount' => Certificate::count(),
                'documentCount' => Document::count(),
            ],
            'isoIds' => [
                '9001' => $iso9001 ? $iso9001->id : null,
                '14001' => $iso14001 ? $iso14001->id : null,
                '45001' => $iso45001 ? $iso45001->id : null,
            ],
            'recentCertificates' => $recentCertificates,
        ]);
    }

    /**
     * Halaman Overview
     */
    public function overview()
    {
        $standardsData = collect(['ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018'])->mapWithKeys(function($stdName) {
            $standard = Standard::where('name', 'ILIKE', "%$stdName%")->first();
            $query = Document::whereHas('standards', function($q) use ($standard) {
                if ($standard) {
                    $q->where('standards.id', $standard->id);
                } else {
                    $q->whereRaw('1 = 0'); // Empty if not found
                }
            });
            return [
                $stdName => [
                    'total' => (clone $query)->count(),
                    'manual' => (clone $query)->where('document_type', 'Manual')->count(),
                    'prosedur' => (clone $query)->where('document_type', 'Prosedur')->count(),
                    'instruksi_kerja' => (clone $query)->where('document_type', 'Instruksi Kerja')->count(),
                    'formulir' => (clone $query)->where('document_type', 'Formulir')->count(),
                ]
            ];
        });

        $donutData = Document::select('field', \DB::raw('count(*) as value'))
            ->groupBy('field')
            ->get()
            ->map(function ($item, $index) {
                $colors = ['#00A3E0', '#1E40AF', '#10B981', '#D9252A', '#F59E0B', '#8B5CF6'];
                return [
                    'name' => $item->field,
                    'value' => $item->value,
                    'color' => $colors[$index % count($colors)]
                ];
            });

        // Dummy line data for now (or could aggregate by month if you have many)
        $lineData = [
            ['month' => 'Jan', 'revisi' => Document::whereMonth('created_at', 1)->count()],
            ['month' => 'Feb', 'revisi' => Document::whereMonth('created_at', 2)->count()],
            ['month' => 'Mar', 'revisi' => Document::whereMonth('created_at', 3)->count()],
            ['month' => 'Apr', 'revisi' => Document::whereMonth('created_at', 4)->count()],
            ['month' => 'May', 'revisi' => Document::whereMonth('created_at', 5)->count()],
            ['month' => 'Jun', 'revisi' => Document::whereMonth('created_at', 6)->count()],
            ['month' => 'Jul', 'revisi' => Document::whereMonth('created_at', 7)->count()],
            ['month' => 'Aug', 'revisi' => Document::whereMonth('created_at', 8)->count()],
            ['month' => 'Sep', 'revisi' => Document::whereMonth('created_at', 9)->count()],
            ['month' => 'Oct', 'revisi' => Document::whereMonth('created_at', 10)->count()],
            ['month' => 'Nov', 'revisi' => Document::whereMonth('created_at', 11)->count()],
            ['month' => 'Dec', 'revisi' => Document::whereMonth('created_at', 12)->count()],
        ];

        return Inertia::render('Public/Overview', [
            'stats' => [
                'standardCount' => Standard::count(),
                'certificateCount' => Certificate::count(),
                'documentCount' => Document::count(),
                'standardsData' => $standardsData,
            ],
            'donutData' => $donutData,
            'lineData' => $lineData,
        ]);
    }

    /**
     * Halaman Katalog Standar
     */
    public function standards()
    {
        // Ambil standar beserta jumlah dokumen
        $standards = Standard::with(['documents'])->get()->map(function ($std) {
            $docs = $std->documents;
            return [
                'id' => $std->id,
                'code' => $std->name, // Menggunakan nama sebagai kode
                'title' => $std->name,
                'category' => $std->description ?: 'Sistem Manajemen',
                'totalDoc' => $docs->count(),
                'manual' => $docs->where('document_type', 'Manual')->count(),
                'prosedur' => $docs->where('document_type', 'Prosedur')->count(),
                'instruksiKerja' => $docs->where('document_type', 'Instruksi Kerja')->count(),
                'formulir' => $docs->where('document_type', 'Formulir')->count(),
            ];
        });

        return Inertia::render('Public/StandarView', [
            'standardsList' => $standards,
        ]);
    }

    /**
     * Halaman Katalog Sertifikat
     */
    public function certificates()
    {
        $certificates = Certificate::orderBy('created_at', 'desc')->get()->map(function ($cert) {
            return [
                'id' => $cert->id,
                'title' => $cert->name,
                'recipient' => 'PLN', // Data fiktif jika tidak ada
                'nip' => '-',
                'issuer' => $cert->issuer,
                'date' => $cert->upload_date ? $cert->upload_date->format('F d, Y') : null,
                'category' => 'Sertifikat',
                'image' => $cert->file_path ? '/storage/' . $cert->file_path : '/images/cert_thumb.png',
                'remarks' => $cert->description,
                'status' => $cert->status, // 'aktif' atau 'kedaluwarsa'
            ];
        });

        return Inertia::render('Public/SertifikatPage', [
            'certificateList' => $certificates,
        ]);
    }

    /**
     * Detail Halaman Standar (menampilkan list dokumen untuk ISO tersebut)
     */
    public function showStandard($id)
    {
        $standard = Standard::with(['documents' => function($q) {
            $q->orderBy('created_at', 'desc');
        }])->findOrFail($id);
        
        $docs = $standard->documents->map(function ($doc) {
            return [
                'id' => $doc->id,
                'code' => 'DOC-' . str_pad($doc->id, 4, '0', STR_PAD_LEFT),
                'name' => $doc->title,
                'category' => $doc->document_type,
                'bidang' => $doc->field,
                'rev' => 'Rev. 0',
                'date' => $doc->upload_date ? $doc->upload_date->format('d F Y') : null,
                'type' => pathinfo($doc->file_path, PATHINFO_EXTENSION) ?: 'PDF',
                'size' => '-',
                'file_path' => $doc->file_path,
            ];
        });

        return Inertia::render('Public/StandarDetailView', [
            'standardData' => [
                'id' => $standard->id,
                'title' => $standard->name,
                'category' => 'Sistem Manajemen',
                'description' => $standard->description,
                'lastUpdate' => $standard->updated_at ? $standard->updated_at->format('F d, Y') : null,
                'status' => 'Active',
            ],
            'documentList' => $docs,
        ]);
    }

    /**
     * Halaman Semua Dokumen
     */
    public function documents()
    {
        $docs = Document::orderBy('created_at', 'desc')->get()->map(function ($doc) {
            return [
                'id' => $doc->id,
                'code' => 'DOC-' . str_pad($doc->id, 4, '0', STR_PAD_LEFT),
                'name' => $doc->title,
                'category' => $doc->document_type,
                'bidang' => $doc->field,
                'rev' => 'Rev. 0',
                'date' => $doc->upload_date ? $doc->upload_date->format('d F Y') : null,
                'type' => pathinfo($doc->file_path, PATHINFO_EXTENSION) ?: 'PDF',
                'size' => '-',
                'file_path' => $doc->file_path,
            ];
        });

        return Inertia::render('Public/DokumenPage', [
            'documents' => $docs,
        ]);
    }
}
