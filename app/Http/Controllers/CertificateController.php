<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CertificateController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage certificates');
    }

    public function index()
    {
        $certificates = Certificate::orderBy('created_at', 'desc')->get()->map(function ($cert) {
            return [
                'id' => $cert->id,
                'name' => $cert->name,
                'issuer' => $cert->issuer,
                'validUntil' => $cert->valid_until ? $cert->valid_until->format('Y-m-d') : null,
                'description' => $cert->description,
                'status' => $cert->status,
                'uploadDate' => $cert->upload_date ? $cert->upload_date->format('Y-m-d') : null,
                'fileName' => $cert->file_name,
                'fileSize' => $cert->file_size ? round($cert->file_size / 1024 / 1024, 2) . ' MB' : null,
            ];
        });

        return Inertia::render('CMS/CertificateManagement', [
            'initialCertificates' => $certificates,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'valid_until' => 'nullable|date',
            'description' => 'nullable|string',
            'upload_date' => 'required|date',
            'file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:20480',
        ]);

        $data = [
            'name' => $validated['name'],
            'issuer' => $validated['issuer'],
            'valid_until' => $validated['valid_until'],
            'description' => $validated['description'],
            'upload_date' => $validated['upload_date'],
            'uploaded_by' => auth()->id(),
            'status' => 'aktif',
        ];

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $data['file_name'] = $file->getClientOriginalName();
            $data['file_size'] = $file->getSize();
            $data['file_type'] = $file->getClientMimeType();
            $data['file_path'] = $file->store('certificates', 'public');
        }

        $certificate = Certificate::create($data);

        ActivityLog::record(ActivityLog::ACTION_CREATE, $certificate, "Menambah sertifikat: {$certificate->name}");

        return redirect()->back();
    }

    public function update(Request $request, Certificate $certificate)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'valid_until' => 'nullable|date',
            'description' => 'nullable|string',
            'upload_date' => 'required|date',
            'file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:20480',
        ]);

        $data = [
            'name' => $validated['name'],
            'issuer' => $validated['issuer'],
            'valid_until' => $validated['valid_until'],
            'description' => $validated['description'],
            'upload_date' => $validated['upload_date'],
        ];

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $data['file_name'] = $file->getClientOriginalName();
            $data['file_size'] = $file->getSize();
            $data['file_type'] = $file->getClientMimeType();
            
            if ($certificate->file_path) {
                Storage::disk('public')->delete($certificate->file_path);
            }
            $data['file_path'] = $file->store('certificates', 'public');
        }

        $certificate->update($data);

        ActivityLog::record(ActivityLog::ACTION_UPDATE, $certificate, "Mengubah sertifikat: {$certificate->name}");

        return redirect()->back();
    }

    public function destroy(Certificate $certificate)
    {
        ActivityLog::record(ActivityLog::ACTION_DELETE, $certificate, "Menghapus sertifikat: {$certificate->name}");
        $certificate->delete();

        return redirect()->back();
    }
}
