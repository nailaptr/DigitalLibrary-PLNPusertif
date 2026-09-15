<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tambahkan kolom is_active ke tabel users.
     *
     * PRD §9: "Pengguna — Status akun"
     * PRD §12.2 Status User: Aktif | Nonaktif
     * CLAUDE.md: "Admin dapat mengelola pengguna (CRUD)"
     *
     * Default true supaya user yang sudah ada tetap bisa login.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_active')
                  ->default(true)
                  ->after('password')
                  ->comment('PRD §12.2: true=Aktif, false=Nonaktif');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }
};
