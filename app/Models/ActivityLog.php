<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * Model ActivityLog — Audit trail aktivitas pengguna di CMS.
 *
 * PRD §9: "Log Aktivitas — Riwayat login/logout, tambah/ubah/hapus
 *   user, dokumen, standar, sertifikat"
 * PRD §10: "User menghasilkan Log Aktivitas (1:N)"
 * PRD §11: "Setiap aktivitas penting pengguna (login, logout, tambah,
 *   ubah, hapus) harus dicatat pada log aktivitas."
 *
 * Tabel ini tidak menggunakan softDeletes karena log bersifat immutable —
 * tidak boleh diedit maupun dihapus secara normal.
 * Tabel juga tidak menggunakan updated_at (hanya created_at) karena
 * setiap entri log adalah snapshot waktu tertentu.
 *
 * CLAUDE.md: "Setiap aksi tambah/ubah/hapus pada Document, Certificate,
 *   atau Standard wajib tercatat ke activity_logs."
 */
class ActivityLog extends Model
{
    /**
     * Nonaktifkan updated_at — log hanya punya created_at.
     */
    public const UPDATED_AT = null;

    protected $fillable = [
        'user_id',
        'action',
        'subject_type',
        'subject_id',
        'description',
        'properties',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'properties' => 'array',
        'created_at' => 'datetime',
    ];

    // -------------------------------------------------------------------------
    // Konstanta Aksi — nilai yang valid untuk kolom 'action'
    // Sesuai PRD §11: login, logout, tambah (create), ubah (update), hapus (delete)
    // -------------------------------------------------------------------------

    const ACTION_LOGIN  = 'login';
    const ACTION_LOGOUT = 'logout';
    const ACTION_CREATE = 'create';
    const ACTION_UPDATE = 'update';
    const ACTION_DELETE = 'delete';

    // -------------------------------------------------------------------------
    // Relasi
    // -------------------------------------------------------------------------

    /**
     * Relasi ke User yang menghasilkan log ini.
     * PRD §10: "User menghasilkan Log Aktivitas (1:N)"
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi polimorfik ke entitas yang dikenai aksi
     * (Document, Certificate, Standard, User, dsb.)
     */
    public function subject(): MorphTo
    {
        return $this->morphTo();
    }

    // -------------------------------------------------------------------------
    // Helper statis
    // -------------------------------------------------------------------------

    /**
     * Catat aktivitas ke log.
     * Dipakai dari Controller, Observer, atau Event Listener.
     *
     * Contoh penggunaan:
     *   ActivityLog::record('create', $document, 'Menambah dokumen baru');
     *
     * @param string     $action      Jenis aksi (gunakan konstanta ACTION_*)
     * @param Model|null $subject     Entitas yang dikenai aksi (nullable untuk login/logout)
     * @param string     $description Deskripsi naratif
     * @param array      $properties  Data tambahan (nilai lama/baru)
     */
    public static function record(
        string $action,
        ?Model $subject = null,
        string $description = '',
        array $properties = []
    ): self {
        return static::create([
            'user_id'      => auth()->id(),
            'action'       => $action,
            'subject_type' => $subject ? get_class($subject) : null,
            'subject_id'   => $subject?->getKey(),
            'description'  => $description,
            'properties'   => $properties ?: null,
            'ip_address'   => request()->ip(),
            'user_agent'   => request()->userAgent(),
        ]);
    }
}
