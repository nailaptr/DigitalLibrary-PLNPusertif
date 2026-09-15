<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tabel standards — menyimpan kategori/standar dokumen (ISO 9001, ISO 14001, dst.)
     * Relasi: M:N dengan documents melalui tabel pivot standard_document
     * PRD §9: "Standar — Nama standar, Deskripsi Standar Dokumen"
     * PRD §10: "Standar memiliki relasi M:N dengan Dokumen"
     */
    public function up(): void
    {
        Schema::create('standards', function (Blueprint $table) {
            $table->id();
            $table->string('name');                   // Nama standar (mis. ISO 9001:2015)
            $table->text('description')->nullable();  // Deskripsi standar dokumen
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('standards');
    }
};
