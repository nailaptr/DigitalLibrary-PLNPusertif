<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tabel pivot standard_document — relasi M:N antara standards dan documents.
     *
     * PRD §10: "Satu standar memiliki banyak dokumen, satu dokumen dapat
     *   termasuk beberapa standar" → implementasi tabel penghubung.
     * PRD §10 (tabel relasi): Standar 1:N Standar_Dokumen N:1 Dokumen
     *
     * Kolom is_primary menandai apakah standar ini adalah standar utama
     * yang dikaitkan ke dokumen (untuk keperluan filter/display di UI CMS).
     */
    public function up(): void
    {
        Schema::create('standard_document', function (Blueprint $table) {
            $table->id();

            $table->foreignId('standard_id')
                  ->constrained('standards')
                  ->cascadeOnDelete();

            $table->foreignId('document_id')
                  ->constrained('documents')
                  ->cascadeOnDelete();

            $table->boolean('is_primary')->default(false); // Standar utama dokumen

            $table->timestamps();

            // Satu dokumen hanya bisa dikaitkan ke standar yang sama satu kali
            $table->unique(['standard_id', 'document_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('standard_document');
    }
};
