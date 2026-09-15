<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tabel activity_logs — mencatat semua aktivitas penting pengguna di CMS.
     *
     * PRD §9: "Log Aktivitas — Riwayat login/logout, tambah/ubah/hapus
     *   user, dokumen, standar, sertifikat"
     * PRD §10: "User menghasilkan Log Aktivitas (1:N)"
     * PRD §11: "Setiap aktivitas penting pengguna (login, logout, tambah,
     *   ubah, hapus) harus dicatat pada log aktivitas."
     *
     * Kolom:
     *   - user_id       : Siapa yang melakukan aksi (nullable jika user dihapus)
     *   - action        : Jenis aksi (login, logout, create, update, delete)
     *   - subject_type  : Kelas entitas yang dikenai aksi (mis. App\Models\Document)
     *   - subject_id    : ID entitas yang dikenai aksi
     *   - description   : Deskripsi naratif aktivitas
     *   - properties    : Data tambahan dalam JSON (nilai lama/baru saat edit, dsb.)
     *   - ip_address    : IP address request (untuk audit trail)
     *   - user_agent    : Browser/klien yang digunakan
     */
    public function up(): void
    {
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();

            // Relasi ke user yang melakukan aksi (PRD §10, 1:N)
            $table->foreignId('user_id')
                  ->nullable()
                  ->constrained('users')
                  ->nullOnDelete();

            // Aksi yang dilakukan — enum terbatas sesuai PRD §11
            $table->string('action');          // login, logout, create, update, delete

            // Polimorfik entitas yang dikenai aksi (dokumen, sertifikat, standar, user)
            $table->string('subject_type')->nullable(); // Nama kelas model (mis. App\Models\Document)
            $table->unsignedBigInteger('subject_id')->nullable();

            // Deskripsi dan data detail
            $table->text('description')->nullable();     // Deskripsi naratif aktivitas
            $table->json('properties')->nullable();      // Data tambahan (nilai lama/baru)

            // Informasi request (untuk keperluan audit)
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();

            $table->timestamp('created_at')->useCurrent();

            // Index untuk query log per user dan per entitas
            $table->index(['user_id', 'created_at']);
            $table->index(['subject_type', 'subject_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
