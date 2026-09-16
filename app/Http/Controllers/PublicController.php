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
        return Inertia::render('Public/LandingDashboard', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            // Statistik
            'stats' => [
                'standardCount' => Standard::count(),
                'certificateCount' => Certificate::count(),
                // Sesuai Aturan Bisnis PRD §11 & §14.2: menghitung semua dokumen tanpa filter status
                'documentCount' => Document::count(),
            ]
        ]);
    }

    /**
     * Halaman Overview
     */
    public function overview()
    {
        return Inertia::render('Public/MainDashboard', [
            // Statistik
            'stats' => [
                'standardCount' => Standard::count(),
                'certificateCount' => Certificate::count(),
                // Menghitung semua dokumen
                'documentCount' => Document::count(),
            ]
        ]);
    }

    /**
     * Halaman Katalog Standar
     */
    public function standards()
    {
        // Ambil standar beserta jumlah dokumen
        $standards = Standard::withCount('documents')->get()->map(function ($std) {
            return [
                'id' => $std->id,
                'code' => $std->name, // Menggunakan nama sebagai kode
                'title' => $std->name,
                'desc' => $std->description,
                'tag' => 'ISO', // Placeholder atau bisa diturunkan dari nama
                'tagColor' => 'bg-[#00A3E0]', // Default color
                'docsCount' => $std->documents_count . ' Dokumen',
            ];
        });

        return Inertia::render('Public/StandarPage', [
            'standardsList' => $standards,
        ]);
    }

    /**
     * Halaman Katalog Sertifikat
     */
    public function certificates()
    {
        // Hanya menampilkan sertifikat yang 'aktif' atau semua? 
        // Biasanya publik menampilkan semua, atau yang aktif saja.
        // PRD §12.3: Aktif | Kedaluwarsa. Kita tampilkan semua untuk saat ini.
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
}
