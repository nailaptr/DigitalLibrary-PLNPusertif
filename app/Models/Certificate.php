<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Model Certificate — Sertifikat PLN Pusertif.
 *
 * PRD §9: "Sertifikat — Nama sertifikat, Penerbit, Masa berlaku,
 *   Deskripsi (opsional)"
 * PRD §9 "Dokumen - File Dokumen" berlaku juga untuk sertifikat:
 *   "Nama file, Lokasi penyimpanan, Tipe file, Ukuran file, Tanggal unggah"
 *
 * Relasi sesuai PRD §10:
 *   - File sertifikat 1:1 — disimpan langsung di kolom file_* (sama dengan Document)
 *   - User 1:N — uploaded_by FK ke users
 *
 * PRD §12.3 Status Sertifikat: 'aktif' | 'kedaluwarsa'
 * PRD §6.2: Sertifikat tidak memerlukan review atau approval — langsung aktif setelah simpan.
 */
class Certificate extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'issuer',
        'valid_until',
        'description',
        'status',
        'file_name',
        'file_path',
        'file_type',
        'file_size',
        'upload_date',
        'uploaded_by',
    ];

    protected $casts = [
        'valid_until' => 'date',
        'upload_date' => 'date',
        'file_size'   => 'integer',
    ];

    /**
     * Nilai default status saat sertifikat baru dibuat.
     * PRD §12.3: Aktif — Sertifikat masih berlaku.
     */
    protected $attributes = [
        'status' => 'aktif',
    ];

    // -------------------------------------------------------------------------
    // Relasi
    // -------------------------------------------------------------------------

    /**
     * Relasi ke User yang mengunggah sertifikat ini.
     * PRD §10: "User mengelola Sertifikat (1:N)"
     */
    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    // -------------------------------------------------------------------------
    // Helper / Scope
    // -------------------------------------------------------------------------

    /**
     * Scope: filter sertifikat yang masih aktif.
     */
    public function scopeAktif($query)
    {
        return $query->where('status', 'aktif');
    }

    /**
     * Scope: filter sertifikat yang sudah kedaluwarsa.
     */
    public function scopeKedaluwarsa($query)
    {
        return $query->where('status', 'kedaluwarsa');
    }
}
