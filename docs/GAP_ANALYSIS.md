# Gap Analysis & Rencana Implementasi
## PRD Digital Library Dokumen Standarisasi PLN Pusertif vs. Kondisi Sistem Saat Ini (`recent_system.md`)

| Item | Keterangan |
| --- | --- |
| Dibandingkan dengan | PRD v1.2 (Revisi 2) & `recent_system.md` (20 Agustus 2026) |
| Tujuan | Memetakan apa yang sudah sesuai, apa yang belum dibangun, dan konflik yang perlu diputuskan sebelum lanjut implementasi |

---

## 1. Konflik yang Perlu Diputuskan Lebih Dulu

Sebelum bicara soal "apa yang belum dibangun", ada **satu konflik nyata** antara PRD terbaru dan kode yang sudah ada — ini yang paling penting untuk diselesaikan dulu:

### 1.1 Permission `review documents` masih melekat ke Manager, bukan Staff

Di `RolePermissionSeeder.php` (§8 `recent_system.md`):

| Role | Permission saat ini |
| --- | --- |
| Manager | `view dashboard`, `manage documents`, **`review documents`**, `view statistics` |
| Staff | `view dashboard`, `manage documents` |

Ini masih mencerminkan model lama (Manager yang mereview/menyetujui dokumen). Padahal PRD v1.2 sudah eksplisit menghapus peran Manager dari alur review — **Staff yang mereview dan langsung menentukan status Relevan/Tidak Relevan**, Manager tidak terlibat sama sekali (§4, §11 PRD). Kalau kode dibiarkan seperti ini, saat Fase 2 dibangun, Manager-lah yang akan mendapat akses ke fitur Review Dokumen, bukan Staff — bertentangan langsung dengan PRD.

**Rekomendasi:** perbarui seeder — pindahkan `review documents` dari Manager ke Staff. Deskripsi permission juga sebaiknya diubah dari *"Mereview dan menyetujui dokumen"* menjadi *"Mereview dan menentukan status dokumen (Relevan/Tidak Relevan)"* supaya konsisten dengan §11 PRD yang menegaskan tidak ada proses persetujuan/approval lagi.

### 1.2 Staff belum punya `view statistics`

PRD §4 Fase 1 menyebutkan Staff berhak "Lihat Dashboard Statistik", tapi di seeder permission `view statistics` hanya diberikan ke Admin dan Manager. Perlu ditambahkan ke Staff.

### 1.3 (Catatan minor, tidak perlu diubah) Role `Guest` terdaftar di Spatie tanpa permission

Ini kemungkinan hanya placeholder teknis Spatie dan tidak bertentangan dengan PRD, karena Guest/Tamu memang tidak login. Tidak perlu tindakan, hanya dicatat.

---

## 2. Jawaban: Apakah PRD Perlu Disesuaikan?

**Tidak untuk substansi PRD.** Alur bisnis di PRD v1.2 (status default Relevan di Fase 1, Staff-only review di Fase 2, tanpa approval Manager) sudah final dan konsisten di seluruh dokumen. Yang perlu disesuaikan adalah **kode** — khususnya `RolePermissionSeeder.php` — supaya mengikuti keputusan PRD terbaru, bukan sebaliknya.

Satu-satunya penambahan yang sifatnya opsional pada PRD: menambahkan kolom nama **permission Spatie** yang sesuai di tabel §4 Aktor Sistem dan §8 Fitur Sistem (mis. `manage documents`, `review documents`, `view statistics`), supaya PRD dan implementasi RBAC tetap saling tertaut sebagai dokumentasi teknis. Ini murni untuk keterlacakan, bukan perubahan alur bisnis.

---

## 3. Yang Sudah Terbangun dan Sudah Sejalan dengan PRD

| Area | Status | Referensi PRD |
| --- | --- | --- |
| Autentikasi (login, register, logout, forgot/reset password, verifikasi email, konfirmasi password) | ✅ Sudah ada (Laravel Breeze) | §8 Fitur "Login", "Logout" |
| RBAC dasar (Admin/Manager/Staff/Guest via Spatie) | ✅ Sudah ada, perlu penyesuaian isi permission (lihat §1) | §4 Aktor Sistem |
| Manajemen profil pengguna | ✅ Sudah ada (`ProfileController`) | §8 Fitur "Profil Pengguna" |
| Tech stack (Laravel 12, React 19, Inertia, Tailwind 4, PostgreSQL, Redis, Docker, Nginx, PestPHP) | ✅ Cocok 100% | §15 Tech Stack |
| Dashboard route | ⚠️ Baru placeholder (closure kosong), belum menampilkan data nyata | §8 Fitur "Dashboard - Overview" |

---

## 4. Yang Belum Ada dan Perlu Dibangun (Fase 1)

Saat ini sistem baru berupa skeleton autentikasi + RBAC. Seluruh domain inti PRD (Dokumen, Sertifikat, Standar, Log Aktivitas, halaman publik) belum ada modelnya sama sekali.

### 4.1 Database / Migrations
- `documents` — kolom sesuai §9 PRD: standar terkait, klausul, sub klausul, judul, tanggal unggah, jenis dokumen, bidang, **status (default `relevan`)**, file, catatan.
- `certificates` — nama, penerbit, masa berlaku, deskripsi, file.
- `standards` — nama standar, deskripsi.
- `standard_document` — tabel pivot M:N (§10 PRD).
- `activity_logs` — user_id, aksi, entitas, waktu, detail (§9, §11 PRD).
- *(Fase 2)* `document_reviews` — document_id, reviewer_id (Staff), status_hasil (Relevan/Tidak Relevan), catatan, tanggal_review (§9, §12 PRD).

### 4.2 Permission & Seeder
- Tambahkan permission granular yang belum ada: `manage certificates`, `manage standards`, `download documents`, `view activity log` (saat ini semua tergabung samar dalam `manage documents`).
- Perbaiki assignment sesuai §1 di atas (`review documents` → Staff, `view statistics` → tambahkan ke Staff).

### 4.3 Model & Controller
- `Document`, `Certificate`, `Standard`, `ActivityLog` — model + controller CRUD.
- `DashboardController` — ganti closure route jadi controller yang mengambil data statistik nyata.
- Controller halaman publik (Landing Page, Overview, Page Standar, Page Sertifikat) — tanpa middleware `auth`, sesuai §6.4 & §8 PRD.
- *(Fase 2)* `DocumentReviewController` — Staff submit hasil review, langsung mengubah `documents.status`.

### 4.4 Routes
- CRUD untuk `/documents`, `/certificates`, `/standards` dengan middleware `permission:...` sesuai matriks §8 PRD.
- Route publik tanpa `auth`: `/`, `/overview`, `/standards`, `/certificates` (guest-accessible, §6.4 PRD).
- `/activity-logs` (khusus Admin).
- *(Fase 2)* `/documents/{id}/review`.

### 4.5 Frontend (React/Inertia)
- `Pages/Documents/{Index,Create,Edit,Show}.jsx`
- `Pages/Certificates/{Index,Create,Edit,Show}.jsx`
- `Pages/Standards/...`
- `Pages/Public/{Landing,Overview,Standards,Certificates}.jsx` dengan grafik (mis. Chart.js/Recharts) sesuai §14.2 PRD.
- `Pages/Admin/{Users,ActivityLog}.jsx`
- Isi `Dashboard.jsx` dengan data ringkasan nyata (dokumen, sertifikat, statistik).
- *(Fase 2)* `Pages/Documents/Review.jsx` — form review Staff yang langsung set status.

---

## 5. Rencana Bertahap yang Disarankan

1. **Fondasi data** — buat migration & model Document/Certificate/Standard, perbaiki `RolePermissionSeeder`.
2. **CMS dasar** — controller & halaman React untuk kelola Dokumen dan Sertifikat (Admin/Manager/Staff, §8 PRD Fase 1).
3. **Halaman publik** — landing page, overview, grafik statistik (guest, tanpa login).
4. **Log aktivitas & laporan** — sesuai §14 PRD.
5. **Fase 2 — Review Dokumen** — Staff review & set status langsung, riwayat review, statistik review.

Urutan ini mengikuti pembagian Fase 1/Fase 2 di PRD, sehingga setiap tahap tetap bisa dirilis dan didemokan secara bertahap tanpa menunggu seluruh sistem selesai.
