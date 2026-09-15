<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Model Standard — Kategori/klasifikasi dokumen standarisasi.
 *
 * PRD §9: "Standar — Nama standar, Deskripsi Standar Dokumen"
 * PRD §10: "Standar memiliki relasi M:N dengan Dokumen"
 *          "Satu standar memiliki banyak dokumen,
 *           satu dokumen dapat termasuk beberapa standar."
 */
class Standard extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Relasi M:N ke Document melalui tabel pivot standard_document.
     * PRD §10: "Standar mengelompokkan Dokumen (M:N)"
     */
    public function documents(): BelongsToMany
    {
        return $this->belongsToMany(Document::class, 'standard_document')
                    ->withPivot('is_primary')
                    ->withTimestamps();
    }
}
