<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tabel documents — menyimpan dokumen standarisasi PLN Pusertif.
     *
     * Kolom sesuai PRD §9:
     *   "Standar terkait, Klausul, Sub klausul, Judul dokumen, Tanggal unggah,
     *    Jenis dokumen, Bidang, Status (Relevan sebagai default di Fase 1),
     *    File dokumen, Catatan (opsional)"
     *
     * PRD §9 "Dokumen - File Dokumen": Nama file, Lokasi penyimpanan, Tipe file,
     *   Ukuran file, Tanggal unggah — disimpan langsung di baris dokumen (1:1 per §10).
     *
     * Status hanya dua nilai sesuai CLAUDE.md Batasan Keras §1:
     *   'relevan' (default) | 'tidak_relevan' (hanya via review Staff di Fase 2)
     *
     * uploaded_by: FK ke users, mewakili relasi "User mengelola Dokumen" (PRD §10, 1:N)
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();

            // Identitas dokumen
            $table->string('title');                                         // Judul dokumen
            $table->string('document_type');                                 // Jenis: Manual, Prosedur, Instruksi Kerja, Formulir
            $table->string('field');                                         // Bidang (Bidang A, B, C, dst.)

            // Klausul & sub-klausul sesuai standar
            $table->string('clause')->nullable();                            // Klausul standar terkait
            $table->string('sub_clause')->nullable();                        // Sub-klausul standar terkait

            // Status — HANYA dua nilai sesuai PRD §12.1 & CLAUDE.md batasan keras §1
            $table->enum('status', ['relevan', 'tidak_relevan'])
                  ->default('relevan');                                      // Default 'relevan' (PRD §9, §11, GAP §4.1)

            // Metadata file dokumen (PRD §9 "Dokumen - File Dokumen", relasi 1:1 per §10)
            $table->string('file_name')->nullable();                         // Nama file asli
            $table->string('file_path')->nullable();                         // Path di storage
            $table->string('file_type')->nullable();                         // Tipe MIME / ekstensi
            $table->unsignedBigInteger('file_size')->nullable();             // Ukuran file dalam bytes

            // Tanggal upload & catatan
            $table->date('upload_date');                                     // Tanggal unggah
            $table->text('notes')->nullable();                               // Catatan (opsional)

            // Relasi ke users — "User mengelola Dokumen" (PRD §10, 1:N)
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
        Schema::dropIfExists('documents');
    }
};
