<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Model Document — Dokumen standarisasi PLN Pusertif.
 *
 * PRD §9: "Dokumen — Standar terkait, Klausul, Sub klausul, Judul dokumen,
 *   Tanggal unggah, Jenis dokumen, Bidang, Status, File dokumen, Catatan (opsional)"
 *
 * Relasi sesuai PRD §10:
 *   - Standar M:N via standard_document (belongsToMany)
 *   - File dokumen 1:1 — disimpan langsung di kolom file_* pada tabel ini
 *   - User 1:N — uploaded_by FK ke users (belongsTo)
 *
 * Status hanya dua nilai sesuai CLAUDE.md Batasan Keras §1 & PRD §12.1:
 *   'relevan' (default) | 'tidak_relevan'
 *
 * CATATAN FASE 2: Relasi ke document_reviews akan ditambahkan saat Fase 2
 *   diimplementasikan. Jangan tambahkan sekarang.
 */
class Document extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'document_type',
        'field',
        'clause',
        'sub_clause',
        'status',
        'file_name',
        'file_path',
        'file_type',
        'file_size',
        'upload_date',
        'notes',
        'uploaded_by',
    ];

    protected $casts = [
        'upload_date' => 'date',
        'file_size'   => 'integer',
    ];

    /**
     * Nilai default status saat dokumen baru dibuat.
     * PRD §9, §11, §12.1 & GAP §4.1: "status default 'relevan'"
     */
    protected $attributes = [
        'status' => 'relevan',
    ];

    // -------------------------------------------------------------------------
    // Relasi
    // -------------------------------------------------------------------------

    /**
     * Relasi M:N ke Standard melalui tabel pivot standard_document.
     * PRD §10: "Standar mengelompokkan Dokumen (M:N)"
     */
    public function standards(): BelongsToMany
    {
        return $this->belongsToMany(Standard::class, 'standard_document')
                    ->withPivot('is_primary')
                    ->withTimestamps();
    }

    /**
     * Standard utama dokumen ini (is_primary = true di pivot).
     * Helper untuk menampilkan standar utama tanpa eager-loading semua standar.
     */
    public function primaryStandard(): BelongsToMany
    {
        return $this->belongsToMany(Standard::class, 'standard_document')
                    ->withPivot('is_primary')
                    ->wherePivot('is_primary', true);
    }

    /**
     * Relasi ke User yang mengunggah dokumen ini.
     * PRD §10: "User mengelola Dokumen (1:N)"
     */
    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    // -------------------------------------------------------------------------
    // Helper / Scope
    // -------------------------------------------------------------------------

    /**
     * Scope: filter hanya dokumen berstatus 'relevan'.
     * Berguna untuk statistik dashboard publik Fase 1.
     */
    public function scopeRelevan($query)
    {
        return $query->where('status', 'relevan');
    }

    /**
     * Scope: filter hanya dokumen berstatus 'tidak_relevan'.
     * Akan lebih sering dipakai setelah Fase 2 aktif.
     */
    public function scopeTidakRelevan($query)
    {
        return $query->where('status', 'tidak_relevan');
    }
}
