# Prompt Playbook — Implementasi Digital Library PLN Pusertif

Kumpulan prompt siap pakai untuk AI Editor (Claude Code/dsb.), disusun urut sesuai roadmap di `CLAUDE.md`. Tujuan file ini: supaya tiap sesi kerja tetap fokus satu tahap, selalu merujuk PRD yang sama, dan tidak diam-diam melompat ke fitur Fase 2 sebelum waktunya.

## Cara Pakai File Ini

- Kerjakan **satu tahap per sesi**. Jangan tempel dua prompt sekaligus dalam satu pesan.
- Sebelum mulai tahap baru, pastikan tahap sebelumnya sudah dicek lewat "Checklist Verifikasi"-nya.
- Setiap prompt sudah dirancang untuk merujuk `CLAUDE.md` dan `docs/PRD.md` — jangan hapus baris rujukan itu meskipun terasa berulang, itu yang menjaga AI Editor tidak berasumsi sendiri.
- Kalau AI Editor mengusulkan sesuatu di luar PRD, jangan langsung setujui di chat — balikkan dulu ke pertanyaan "ini ada di bagian PRD yang mana?" sebelum lanjut.
- Setelah AI Editor selesai satu tahap, selalu commit dulu sebelum lanjut ke prompt tahap berikutnya.

## Sebelum Tahap 0: Siapkan Repo

Pastikan struktur berikut sudah ada sebelum prompt pertama dikirim:

```
repo/
├── _staging/
│   ├── desain_amel/     ← copy folder frontend CMS apa adanya ke sini
│   └── desain_nadia/    ← copy folder frontend web publik apa adanya ke sini
├── CLAUDE.md
├── docs/
│   ├── PRD.md
│   ├── GAP_ANALYSIS.md
│   └── PROMPT_PLAYBOOK.md
├── resources/
├── routes/
└── ...
```

---

## Tahap 0 — Merapikan Frontend `desain_amel` & `desain_nadia`

**Tujuan:** memindahkan isi `_staging/desain_amel/` (CMS) dan `_staging/desain_nadia/` (web publik) ke struktur `resources/js/` yang benar, tanpa menimpa komponen yang bentrok.

```
Ada dua folder mentah di _staging/ yang berisi hasil desain frontend,
belum masuk struktur final:
- _staging/desain_amel/   -> frontend CMS (dashboard, kelola dokumen,
  kelola sertifikat, dll — butuh login)
- _staging/desain_nadia/  -> frontend website publik (landing page,
  overview, page standar, page sertifikat — tanpa login)

Baca dulu isi kedua folder itu langsung dari disk, dan baca juga
struktur resources/js/ yang sudah ada di repo ini (Layouts, Pages,
Components) supaya paham konvensi Inertia/Breeze yang dipakai di
project ini.

Langkah kerja:
1. Untuk setiap file di _staging/desain_amel/, pindahkan ke
   resources/js/Pages/... dan pakai AuthenticatedLayout.
2. Untuk setiap file di _staging/desain_nadia/, pindahkan ke
   resources/js/Pages/Public/... dan pakai layout publik terpisah
   tanpa cek auth.
3. Komponen yang dipakai bersama di kedua folder (Button, Card,
   Navbar, dsb.) digabung SATU kali saja ke resources/js/Components/,
   jangan diduplikasi.
4. Kalau ada nama file/komponen yang bentrok antara desain_amel dan
   desain_nadia (isinya beda tapi nama sama), JANGAN langsung
   menimpa — laporkan ke saya dulu, biar saya putuskan.
5. Jangan ubah logic bisnis di file-file ini dulu (masih boleh pakai
   dummy data) — tugas tahap ini murni soal penempatan file dan
   perbaikan import path supaya npm run dev jalan tanpa error.
6. Setelah semua file berhasil dipindah dan dev server jalan normal,
   kosongkan isi _staging/desain_amel/ dan _staging/desain_nadia/
   (folder _staging/ boleh tetap ada untuk penggunaan berikutnya).

Tutup dengan ringkasan: file apa saja yang dipindah ke mana, dan
komponen apa saja yang tadinya bentrok antara desain_amel dan
desain_nadia.
```

**Checklist verifikasi sebelum lanjut:**
- [ ] `npm run dev` jalan tanpa error import
- [ ] Halaman CMS (eks `desain_amel`) dan halaman publik (eks `desain_nadia`) bisa dibuka manual di browser (meski masih dummy data)
- [ ] Tidak ada komponen ganda dengan isi berbeda di dua lokasi
- [ ] `_staging/desain_amel/` dan `_staging/desain_nadia/` sudah kosong
- [ ] Sudah di-commit: `feat: integrate CMS frontend (desain_amel) and public frontend (desain_nadia)`

---

## Tahap 1 — Fondasi Data

**Tujuan:** migration, model, dan perbaikan seeder permission sesuai PRD.

```
Kita mulai Tahap 1 dari roadmap di CLAUDE.md: Fondasi Data.

Sebelum menulis kode, baca docs/PRD.md bagian §9 (Data yang Disimpan)
dan §10 (Relasi Antar Data), lalu baca docs/GAP_ANALYSIS.md bagian 1
dan 4.1.

Tugas untuk sesi ini, HANYA ini dulu:
1. Buat migration untuk tabel: documents, certificates, standards,
   standard_document (pivot), activity_logs — kolom sesuai §9 PRD.
   Kolom status di tabel documents harus default 'relevan'.
2. Buat Eloquent model untuk masing-masing tabel di atas, lengkap
   dengan relasi sesuai §10 PRD.
3. Perbaiki RolePermissionSeeder.php:
   - Pindahkan permission `review documents` dari Manager ke Staff
   - Tambahkan permission `view statistics` ke Staff
   - Tambahkan permission baru: manage certificates, manage standards,
     view activity log

Jangan buat controller, route, atau halaman React dulu — itu Tahap 2.
Jangan buat apa pun terkait fitur review dokumen — itu Fase 2, di luar
scope sesi ini.

Setelah selesai, ringkas file apa saja yang kamu ubah/buat, dan sebutkan
kalau ada bagian §9/§10 PRD yang belum sepenuhnya kamu penuhi.
```

**Checklist verifikasi sebelum lanjut:**
- [ ] `php artisan migrate` jalan tanpa error
- [ ] Relasi model bisa dites lewat tinker (mis. `Standard::first()->documents`)
- [ ] Seeder permission sudah benar (Staff punya `review documents` & `view statistics`, Manager tidak punya `review documents`)
- [ ] Commit: `feat: add core migrations, models, and fix permission seeder`

---

## Tahap 2 — CMS Dasar (Sambungkan `desain_amel` ke Backend)

```
Lanjut Tahap 2 roadmap CLAUDE.md: CMS Dasar.

Baca docs/PRD.md §8 (Fitur Sistem, khusus baris berlabel Fase 1) dan
§4 (Aktor Sistem) untuk hak akses tiap role.

Halaman React eks desain_amel untuk kelola Dokumen dan Sertifikat
sudah ada di resources/js/Pages/ (hasil Tahap 0), masih pakai dummy
data. Tugas sesi ini:
1. Buat DocumentController, CertificateController, StandardController
   dengan CRUD lengkap, masing-masing dilindungi middleware
   permission: manage documents, manage certificates, manage standards
   sesuai tabel Role & Permission di CLAUDE.md.
2. Buat route resource untuk ketiganya.
3. Sambungkan halaman React yang sudah ada ke controller ini lewat
   Inertia (props, form submission) — ganti dummy data dengan data asli.
4. Setiap create/update/delete di ketiga controller ini wajib menulis
   ke activity_logs (lihat konvensi kode di CLAUDE.md).

Jangan sentuh fitur review dokumen (Fase 2). Jangan ubah struktur
tabel yang sudah dibuat di Tahap 1 kecuali memang ada yang kurang dan
sudah saya konfirmasi.

Tutup dengan ringkasan file yang diubah dan konfirmasi role mana saja
yang sudah bisa akses fitur apa (bandingkan ke tabel §4 PRD).
```

**Checklist verifikasi sebelum lanjut:**
- [ ] Login sebagai Admin/Manager/Staff, cek masing-masing bisa akses sesuai §4 PRD
- [ ] CRUD Dokumen & Sertifikat berfungsi, status dokumen baru selalu `relevan`
- [ ] activity_logs terisi setiap ada perubahan
- [ ] Commit: `feat: connect CMS pages (desain_amel) to Document/Certificate/Standard backend`

---

## Tahap 3 — Halaman Publik (Sambungkan `desain_nadia` ke Backend)

```
Lanjut Tahap 3 roadmap CLAUDE.md: Halaman Publik.

Baca docs/PRD.md §6.4 (Alur Pengunjung) dan §14.2 (Statistik Dashboard).

Halaman publik eks desain_nadia (Landing, Overview, Page Standar,
Page Sertifikat) sudah ada di resources/js/Pages/Public/ (hasil
Tahap 0), masih dummy data. Tugas sesi ini:
1. Buat controller publik TANPA middleware auth untuk keempat halaman
   ini, ambil data asli dari Document/Certificate/Standard.
2. Route publik: /, /overview, /standards, /certificates — pastikan
   bisa diakses tanpa login.
3. Grafik statistik di Overview harus menghitung SEMUA dokumen
   (status relevan maupun tidak relevan ikut dihitung, sesuai §11 PRD
   aturan bisnis "seluruh dokumen ditampilkan pada grafik").

Jangan tambahkan fitur pencarian/filter advanced kalau belum ada di
§8 PRD untuk halaman publik — cek dulu sebelum menambah.

Tutup dengan ringkasan file yang diubah dan konfirmasi apakah grafik
sudah mengikuti aturan bisnis di §11 PRD.
```

**Checklist verifikasi sebelum lanjut:**
- [ ] Buka `/`, `/overview`, `/standards`, `/certificates` dalam mode incognito (tanpa login) — semua bisa diakses
- [ ] Grafik menampilkan data asli, termasuk dokumen berstatus `tidak_relevan` (kalau sudah ada datanya)
- [ ] Commit: `feat: connect public pages (desain_nadia) to real data`

---

## Tahap 4 — Log Aktivitas & Laporan

```
Lanjut Tahap 4 roadmap CLAUDE.md: Log Aktivitas & Laporan.

Baca docs/PRD.md §14.1 (Laporan) — hanya baris berlabel Fase 1 dulu.

Tugas sesi ini:
1. Buat halaman Admin untuk melihat activity_logs (siapa, kapan,
   aksi apa, entitas apa) — akses khusus permission view activity log.
2. Buat laporan sederhana sesuai §14.1 yang berlabel Fase 1: Laporan
   Data Dokumen, Laporan Data Sertifikat, Laporan Dokumen per Standar,
   Laporan Dokumen per Bidang, Laporan Dokumen berdasarkan Jenis,
   Laporan Aktivitas Pengguna.

Jangan buat Laporan Hasil Review Dokumen — itu Fase 2.

Tutup dengan ringkasan laporan apa saja yang sudah dibuat dan
mana dari §14.1 yang masih Fase 1 tapi belum sempat dikerjakan
(kalau ada).
```

**Checklist verifikasi sebelum lanjut:**
- [ ] Semua laporan Fase 1 di §14.1 sudah ada dan datanya akurat
- [ ] Halaman log aktivitas hanya bisa diakses Admin
- [ ] Commit: `feat: add activity log page and Phase 1 reports`

---

## Tahap 5 — Fase 2: Review Dokumen

**Baru kerjakan tahap ini setelah Tahap 1–4 selesai dan sudah dites end-to-end.**

```
Seluruh Fase 1 PRD sudah selesai dan sudah saya tes. Sekarang mulai
Fase 2: Review Dokumen.

Baca docs/PRD.md §6.1 (bagian Fase 2), §7 (Matriks Transisi Status),
dan §11 (Aturan Bisnis Fase 2) sebelum menulis kode.

Ingat batasan keras dari CLAUDE.md:
- Hanya Staff yang bisa review dan menentukan status — TIDAK ada
  approval dari Manager dalam bentuk apa pun.
- Status akhir cuma dua nilai: relevan / tidak_relevan.

Tugas sesi ini:
1. Buat migration & model document_reviews sesuai §9 PRD (document_id,
   reviewer_id, status_hasil, catatan, tanggal_review).
2. Buat DocumentReviewController: Staff membuka dokumen, mereview,
   lalu langsung set status di tabel documents ke relevan/tidak_relevan,
   sekaligus menyimpan record ke document_reviews.
3. Buat halaman React Pages/Documents/Review.jsx untuk form review ini,
   hanya bisa diakses role dengan permission review documents (Staff).
4. Tambahkan statistik "jumlah dokumen direview per standar" dan
   "per bulan/tahun" ke dashboard sesuai §14.2 PRD.

Tutup dengan ringkasan, dan konfirmasi eksplisit: apakah di kode ini
ada jalur mana pun yang melibatkan Manager dalam proses review? Kalau
ada, itu bug — harus dihapus.
```

**Checklist verifikasi sebelum menganggap PRD selesai:**
- [ ] Manager login — pastikan TIDAK ada menu/akses review dokumen sama sekali
- [ ] Staff bisa review dan status berubah langsung tanpa langkah approval tambahan
- [ ] Riwayat review tersimpan lengkap (siapa, kapan, hasil, catatan)
- [ ] Statistik dashboard menghitung data review dengan benar
- [ ] Commit: `feat: implement Phase 2 document review workflow`
- [ ] Lakukan review manual seluruh sistem terhadap docs/PRD.md dari awal sampai akhir — cocokkan tiap fitur di §8 dengan yang benar-benar ada di aplikasi
