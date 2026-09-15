<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tabel certificates — menyimpan sertifikat PLN Pusertif.
     *
     * PRD §9: "Sertifikat — Nama sertifikat, Penerbit, Masa berlaku,
     *   Deskripsi (opsional)"
     * PRD §9 "Dokumen - File Dokumen" berlaku juga untuk sertifikat:
     *   "Nama file, Lokasi penyimpanan, Tipe file, Ukuran file, Tanggal unggah"
     * PRD §10: "Setiap sertifikat memiliki satu file digital" (1:1)
     * PRD §10: "User mengelola Sertifikat (1:N)"
     *
     * PRD §12.3 Status Sertifikat: Aktif | Kedaluwarsa
     * Tidak ada proses review/approval untuk sertifikat (PRD §6.2).
     */
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();

            // Data sertifikat sesuai PRD §9
            $table->string('name');                                      // Nama sertifikat
            $table->string('issuer');                                    // Penerbit
            $table->date('valid_until')->nullable();                     // Masa berlaku
            $table->text('description')->nullable();                     // Deskripsi (opsional)

            // Status sertifikat sesuai PRD §12.3
            $table->enum('status', ['aktif', 'kedaluwarsa'])
                  ->default('aktif');

            // Metadata file sertifikat (PRD §9, relasi 1:1 per §10)
            $table->string('file_name')->nullable();                     // Nama file asli
            $table->string('file_path')->nullable();                     // Path di storage
            $table->string('file_type')->nullable();                     // Tipe MIME / ekstensi (JPG, PNG)
            $table->unsignedBigInteger('file_size')->nullable();         // Ukuran file dalam bytes
            $table->date('upload_date');                                 // Tanggal unggah

            // Relasi ke users — "User mengelola Sertifikat" (PRD §10, 1:N)
            $table->foreignId('uploaded_by')
                  ->nullable()
                  ->constrained('users')
                  ->nullOnDelete();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
