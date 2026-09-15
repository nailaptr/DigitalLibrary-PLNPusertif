<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

/**
 * Model User — Pengguna CMS (Admin, Manager, Staff).
 *
 * PRD §9: "Pengguna — Nama, Email, Password, Role, Status akun, Informasi profil"
 * PRD §12.2 Status User: Aktif | Nonaktif
 *
 * Relasi sesuai PRD §10:
 *   - "User mengelola Dokumen (1:N)"
 *   - "User mengelola Sertifikat (1:N)"
 *   - "User menghasilkan Log Aktivitas (1:N)"
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_active',   // PRD §12.2: Status akun (Aktif/Nonaktif)
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'is_active'         => 'boolean',  // PRD §12.2
        ];
    }

    protected $attributes = [
        'is_active' => true,  // Default: user baru langsung aktif
    ];

    // -------------------------------------------------------------------------
    // Relasi (PRD §10)
    // -------------------------------------------------------------------------

    /**
     * Dokumen yang diunggah oleh user ini.
     * PRD §10: "User mengelola Dokumen (1:N)"
     */
    public function documents(): HasMany
    {
        return $this->hasMany(Document::class, 'uploaded_by');
    }

    /**
     * Sertifikat yang dikelola oleh user ini.
     * PRD §10: "User mengelola Sertifikat (1:N)"
     */
    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class, 'uploaded_by');
    }

    /**
     * Log aktivitas yang dihasilkan oleh user ini.
     * PRD §10: "User menghasilkan Log Aktivitas (1:N)"
     */
    public function activityLogs(): HasMany
    {
        return $this->hasMany(ActivityLog::class);
    }
}
