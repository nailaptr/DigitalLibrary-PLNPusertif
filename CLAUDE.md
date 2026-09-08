# Digital Library Dokumen Standarisasi PLN Pusertif

Proyek CMS + halaman publik untuk mengelola dokumen standarisasi dan sertifikat PLN Pusertif. Dokumen ini adalah memori kerja untuk AI coding assistant (Claude Code / AI Editor lain) — dibaca otomatis di setiap sesi.

## Sumber Kebenaran

- Requirement bisnis lengkap ada di **`docs/PRD.md`** — SELALU baca bagian yang relevan sebelum membuat atau mengubah fitur. Jangan berasumsi.
- Status implementasi terkini (apa yang sudah ada vs belum) ada di **`docs/GAP_ANALYSIS.md`**.
- Prompt siap pakai per tahap ada di **`docs/PROMPT_PLAYBOOK.md`**.
- Kalau ada instruksi task yang bertentangan dengan PRD, **berhenti dan tanyakan** — jangan diam-diam mengikuti salah satu.
- Jangan menambah field, status, entitas, atau alur baru yang tidak tercantum di PRD tanpa konfirmasi eksplisit dari saya.

## Bahan Frontend yang Perlu Dirapikan (Tahap 0)

Ada dua folder mentah di `_staging/` yang berisi hasil desain frontend, belum masuk struktur final:

| Folder | Isi | Tujuan akhir |
| --- | --- | --- |
| `_staging/desain_amel/` | Frontend CMS (dashboard, kelola dokumen, kelola sertifikat, dll — butuh login) | `resources/js/Pages/...` pakai `AuthenticatedLayout` |
| `_staging/desain_nadia/` | Frontend website publik (landing page, overview, page standar, page sertifikat — tanpa login) | `resources/js/Pages/Public/...` pakai layout publik terpisah |

Komponen yang dipakai bersama dari kedua folder (Button, Card, Navbar, dsb.) digabung satu kali saja ke `resources/js/Components/`, jangan diduplikasi. Setelah isi kedua folder ini dipindah dan dirapikan, `_staging/` boleh dikosongkan/dihapus.

## Batasan Keras (Jangan Dilanggar)

1. **Status dokumen hanya dua nilai**: `relevan` dan `tidak_relevan`. Tidak ada `draft`, `pending`, atau `revisi` dalam bentuk apa pun — baik di database, enum, maupun UI.
2. **Tidak ada proses approval Manager.** Manager punya hak akses yang sama dengan Staff untuk kelola dokumen/sertifikat, tapi TIDAK terlibat dalam review atau penentuan status dokumen.
3. **Hanya Staff yang mereview dokumen** dan langsung menentukan status akhirnya (Relevan/Tidak Relevan) — tanpa langkah pengajuan atau persetujuan ke pihak lain.
4. **Dokumen baru diunggah otomatis berstatus `relevan`** (default), sampai fitur review Fase 2 diimplementasikan.
5. **Fase 1 vs Fase 2 tidak boleh tercampur.** Cek §3 PRD sebelum membangun sesuatu — kalau fiturnya berlabel "Fase 2" di PRD, jangan bangun sebelum saya minta secara eksplisit, meskipun secara teknis terasa "sekalian saja".
6. Guest/Tamu **tidak pernah login** — semua halaman publik harus bisa diakses tanpa autentikasi.

## Tech Stack

- Backend: Laravel 12
- Frontend: React + Inertia.js + Tailwind CSS
- Database: PostgreSQL
- Auth: Laravel Breeze
- Otorisasi: Spatie Laravel Permission
- Cache/Queue: Redis
- Container: Docker + Docker Compose, Nginx
- Testing: PestPHP

## Role & Permission (acuan, lihat §4 & §8 PRD untuk detail)

| Role | Bisa kelola Dokumen/Sertifikat | Bisa review dokumen (Fase 2) | Lihat statistik | Kelola user/role |
| --- | :---: | :---: | :---: | :---: |
| Admin | ✓ | - | ✓ | ✓ |
| Manager | ✓ | - | ✓ | - |
| Staff | ✓ | ✓ | ✓ | - |
| Guest | - | - | ✓ (publik saja) | - |

> Catatan implementasi: di `RolePermissionSeeder` saat ini permission `review documents` masih salah ditempel ke Manager dan `view statistics` belum ada di Staff — ini perlu diperbaiki di Tahap 1 sebelum lanjut, lihat `docs/GAP_ANALYSIS.md` §1.

## Status Implementasi Saat Ini

Baru ada: autentikasi (Breeze), RBAC dasar (Spatie), manajemen profil, plus dua folder frontend mentah (`_staging/desain_amel/`, `_staging/desain_nadia/`) yang belum dirapikan ke struktur final. **Belum ada** model/migration untuk Document, Certificate, Standard, ActivityLog, atau controller yang menyambungkan frontend ke data asli. Detail lengkap: `docs/GAP_ANALYSIS.md`.

## Roadmap Bertahap

0. **Rapikan frontend** — pindahkan isi `_staging/desain_amel/` dan `_staging/desain_nadia/` ke struktur Inertia yang benar.
1. **Fondasi data** — migration & model Document/Certificate/Standard, perbaiki seeder permission.
2. **CMS dasar** — controller & sambungkan halaman React (eks `desain_amel`) ke data asli.
3. **Halaman publik** — sambungkan halaman React (eks `desain_nadia`) ke data asli, grafik statistik.
4. **Log aktivitas & laporan.**
5. **Fase 2 — Review Dokumen** — Staff review & set status langsung, riwayat review.

Kerjakan satu tahap dalam satu waktu. Jangan lompat ke tahap berikutnya sebelum tahap sebelumnya saya konfirmasi selesai.

## Konvensi Kode

- Penamaan tabel/kolom database: `snake_case`, Bahasa Inggris.
- Penamaan file React/Inertia: `PascalCase.jsx` di `resources/js/Pages/...`.
- Setiap controller baru wajib pakai middleware `permission:...` sesuai tabel Role & Permission di atas — jangan cek role secara manual di controller.
- Setiap aksi tambah/ubah/hapus pada Document, Certificate, atau Standard wajib tercatat ke `activity_logs`.

## Setelah Menyelesaikan Sebuah Task

Selalu tutup dengan ringkasan singkat: apa yang dibuat, file apa saja yang berubah, dan apakah ada bagian `docs/PRD.md` yang belum terpenuhi atau sengaja disimpangi (sebutkan alasannya kalau ada).
