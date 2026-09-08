# Product Requirement Document (PRD)
## Sistem Digital Library Dokumen Standarisasi PLN Pusertif

| Item | Keterangan |
| --- | --- |
| Nama Sistem | Digital Library Dokumen Standarisasi PLN Pusertif |
| Status Dokumen PRD | Revisi 2 |
| Versi | 1.2 |
| Tanggal Penyusunan | 20 Agustus 2026 |
| Cakupan Rilis | Fase 1 (MVP) dan Fase 2 (Pengembangan Berikutnya) |

> **Catatan mengenai revisi ini:** proses pengajuan hasil review ke Manager, login Manager untuk melihat List Ajuan Review Dokumen, serta keputusan Approve/Reject oleh Manager **dihapus sepenuhnya** — baik untuk Fase 1 maupun Fase 2. Tidak ada lagi proses approval berjenjang di sistem ini. Sebagai gantinya, pada Fase 2, **Staff sendiri yang menentukan status akhir dokumen** (Relevan atau Tidak Relevan) langsung pada saat melakukan review, tanpa perlu pengajuan atau persetujuan dari Manager. Status dokumen tetap hanya terdiri dari dua nilai: **Relevan** (default otomatis di Fase 1, atau hasil review Staff di Fase 2) dan **Tidak Relevan** (hanya muncul sebagai hasil review Staff di Fase 2). Seluruh bagian dokumen yang menyinggung Manager, approval, atau List Ajuan Review Dokumen telah disesuaikan mengikuti perubahan ini.

---

## 1. Latar Belakang

Perkembangan teknologi informasi mendorong organisasi untuk mengelola dokumen secara digital agar proses penyimpanan, pencarian, dan penyebaran informasi menjadi lebih efektif dan efisien. PLN Pusertif sebagai unit yang mengelola berbagai dokumen standarisasi dan sertifikat memerlukan sistem yang mampu menyimpan serta mengelola dokumen secara terpusat.

Sistem Digital Library Dokumen Standarisasi PLN Pusertif dikembangkan sebagai media pengelolaan dokumen standarisasi dan sertifikat milik PLN Pusertif. Sistem ini menyediakan halaman publik yang dapat diakses umum untuk melihat statistik jumlah dokumen yang dikelola, serta halaman administrasi (CMS) yang hanya dapat diakses oleh pengguna yang sudah login. Melalui CMS, pengguna internal dapat menambahkan, mengubah, dan mengelola data dokumen serta sertifikat yang selanjutnya ditampilkan pada halaman publik.

## 2. Tujuan

- Menyediakan repositori digital terpusat untuk dokumen standarisasi dan sertifikat PLN Pusertif.
- Mempermudah pencarian dan penyajian data dokumen melalui dashboard statistik publik.
- Menyediakan mekanisme kendali mutu dokumen melalui proses review oleh Staff, yang secara langsung menentukan status akhir dokumen — **dikembangkan pada Fase 2**.
- Menjaga jejak audit (log aktivitas) atas seluruh operasi penting di dalam sistem.

## 3. Ruang Lingkup dan Pembagian Fase

### Fase 1 — Rilis Awal (siap diimplementasikan)
- Autentikasi (login/logout) untuk Admin, Manager, dan Staff.
- Input, unggah, dan pengelolaan data Dokumen Standarisasi — dokumen yang baru diunggah otomatis berstatus **Relevan** (default, belum melalui review).
- Input, unggah, dan pengelolaan data Sertifikat (langsung aktif tanpa proses tambahan).
- Manajemen pengguna, role, dan parameter master (kategori/standar) oleh Admin.
- Log aktivitas (audit trail).
- Halaman publik: Dashboard, Page Overview, Page Standar, Page Sertifikat, dan grafik statistik.
- Pencarian dan filter dokumen/sertifikat.

### Fase 2 — Pengembangan Berikutnya (Next Update)
- Staff mereview dokumen yang sudah diunggah.
- Staff input data review, yaitu langsung menentukan status akhir dokumen — **Relevan** atau **Tidak Relevan** — beserta catatan review.
- Pencatatan Riwayat Review Dokumen yang merekam siapa yang mereview, tanggal review, status hasil review, dan catatan.

Dengan perubahan ini, tidak ada lagi proses pengajuan ke Manager maupun approve/reject di kedua fase. Yang berubah dari Fase 1 ke Fase 2 hanyalah *bagaimana* status dokumen ditentukan: otomatis oleh sistem (default Relevan) di Fase 1, atau langsung oleh Staff melalui proses review di Fase 2.

## 4. Aktor Sistem

Pada Fase 1, Manager memiliki hak akses yang setara dengan Staff untuk menambah, mengelola, dan mengedit Dokumen maupun Sertifikat. Karena proses approval tidak lagi menjadi bagian dari sistem ini, hak akses Manager **tidak berubah** dari Fase 1 ke Fase 2 — Manager tetap berfungsi sebagai pengelola konten dokumen/sertifikat, bukan sebagai penyetuju hasil review.

| Role | Deskripsi | Hak Akses Fase 1 | Penyesuaian pada Fase 2 |
| --- | --- | --- | --- |
| Admin | Bertanggung jawab mengelola sistem dan seluruh pengguna. | Login; Kelola User (CRUD); Kelola Role & Hak Akses; Kelola Dokumen Standarisasi (CRUD); Kelola Sertifikat (CRUD); Kelola Kategori Dokumen; Upload/Hapus File; Lihat Dashboard Statistik; Lihat Log Aktivitas | Tidak ada penambahan wewenang khusus; tetap dapat memantau seluruh proses review melalui log aktivitas. |
| Manager (Master User) | Mengelola dokumen dan sertifikat bersama Staff. | Login; Lihat Dashboard Statistik; Menambah, mengelola, mengedit Dokumen dan Sertifikat (setara Staff) | Tidak berubah — Manager tidak terlibat dalam proses review maupun penentuan status dokumen. |
| Staff (User) | Menginput dan memperbarui data dokumen. | Login; Lihat Dashboard Statistik; Menambah, mengelola, mengedit Dokumen dan Sertifikat | Mendapat akses **Review Dokumen**, yaitu menentukan status akhir dokumen (Relevan/Tidak Relevan) secara langsung. |
| Guest (Tamu) | Pengunjung umum tanpa login. | Lihat Dashboard Publik; Lihat Grafik Statistik; Lihat detail informasi dokumen dalam bentuk grafik (Landing Page, Page Overview, Page Sertifikat, Page Standar) | Tidak berubah. |

## 5. Objek Utama dalam Sistem

| Objek | Deskripsi | Fase |
| --- | --- | --- |
| Dokumen Standarisasi | Dokumen utama berisi standar, pedoman, atau regulasi yang dikelola PLN Pusertif. | Fase 1 |
| Sertifikat | Dokumen sertifikat yang dikelola dan dipublikasikan melalui sistem. | Fase 1 |
| Kategori Dokumen | Mengelompokkan dokumen berdasarkan jenis/kategori agar mudah dicari dan ditampilkan di dashboard overview. | Fase 1 |
| Pengguna (User) | Data pengguna yang dapat mengakses CMS (Admin, Manager, Staff). | Fase 1 |
| Role | Menentukan hak akses masing-masing pengguna. | Fase 1 |
| File Dokumen | File digital (PDF, DOCX, XLSX, JPG, PNG) yang terhubung dengan dokumen atau sertifikat. | Fase 1 |
| Statistik Dashboard | Data hasil perhitungan jumlah dokumen/sertifikat yang ditampilkan dalam grafik pada halaman publik. | Fase 1 |
| Riwayat Aktivitas (Log Aktivitas) | Mencatat aktivitas pengguna seperti login, tambah, ubah, hapus. | Fase 1 |
| Status Dokumen | Menyimpan status dokumen — hanya dua nilai: Relevan (default di Fase 1) dan Tidak Relevan (baru dapat muncul setelah Staff melakukan review di Fase 2). | Fase 1 (nilai Relevan) / Fase 2 (kedua nilai, ditentukan langsung oleh Staff) |
| Riwayat Review Dokumen | Menyimpan siapa yang mereview dokumen beserta tanggal, hasil status, dan catatannya. | Fase 2 |

## 6. Alur Bisnis

### 6.1 Alur Pengelolaan Dokumen

**Fase 1 (aktif pada rilis awal):**
1. Mulai
2. Staff/Manager Login
3. Input Data Dokumen
4. Upload File Dokumen
5. Simpan Data — dokumen tersimpan dengan Status Dokumen = **Relevan** (default; belum ada mekanisme review, sehingga seluruh dokumen yang berhasil diunggah dianggap relevan sampai Fase 2 berjalan)
6. Statistik data dokumen ditampilkan pada dashboard Website Publik

**Fase 2 (Pengembangan Berikutnya):**

7. Staff Mereview Dokumen
8. Staff Input Data Review — Staff langsung menentukan status akhir dokumen: **Relevan** atau **Tidak Relevan**, beserta catatan review

> Setelah Fase 2 diimplementasikan, langkah 5 pada Fase 1 (Simpan Data) akan bermuara ke langkah 7–8 di atas, menggantikan status default otomatis dengan hasil review Staff. Tidak ada proses pengajuan ke Manager, login Manager, List Ajuan Review, maupun keputusan approve/reject — Staff berwenang penuh menetapkan status dokumen berdasarkan hasil reviewnya sendiri. Jika hasilnya Tidak Relevan, dokumen tetap dapat diedit dan direview ulang oleh Staff kapan saja hingga statusnya berubah menjadi Relevan.

### 6.2 Alur Pengelolaan Sertifikat (Fase 1)

1. Mulai
2. Staff Login
3. Input Data Sertifikat
4. Upload File Sertifikat
5. Simpan Data
6. Data ditampilkan pada dashboard Website Publik

Sertifikat tidak memerlukan proses review atau approval pada fase mana pun; setelah disimpan, data langsung dinyatakan aktif.

### 6.3 Alur Pengelolaan Sistem (Fase 1)

1. Mulai
2. Admin Login
3. Dashboard (Overview, Manajemen User)
4. Manajemen Konten (Dokumen, Standar, Sertifikat)
5. Monitoring Aktivitas

### 6.4 Alur Pengunjung (Tamu) — Fase 1

1. Pengunjung membuka website.
2. Masuk ke Landing Page (Dashboard Publik) — melihat ringkasan standar dan sertifikat.
3. Melihat Page Overview — grafik jumlah dokumen per jenis, per standar, per periode, dan distribusi per bidang.
4. Melihat Page Sertifikat — daftar sertifikat dan detailnya.
5. Melihat Page Standar — daftar standar dan detailnya.

Karena pada Fase 1 seluruh dokumen berstatus Relevan (default), grafik publik akan menampilkan seluruh dokumen apa adanya. Setelah Fase 2 berjalan, dokumen berstatus Tidak Relevan tetap ikut dihitung dalam grafik publik (lihat aturan bisnis di §11).

### 6.5 Business Process Keseluruhan (End-to-End)

1. Mulai
2. Staff/Manager Login ke CMS
3. Input Data Dokumen Baru / Sertifikat
4. Upload File Dokumen Baru / Sertifikat
5. Simpan Data ke Database — Status Dokumen = Relevan (default, Fase 1)
6. **[Fase 2]** Staff Mereview Dokumen
7. **[Fase 2]** Staff Input Data Review — Staff langsung menentukan status akhir: Relevan atau Tidak Relevan
8. Statistik data dokumen ditampilkan pada dashboard Website Publik (Fase 1, berjalan terus di kedua fase)
9. Pengunjung melihat dokumen (dalam bentuk grafik, Fase 1)
10. Selesai

## 7. Matriks Transisi Status Dokumen (State Transition Table)

Status dokumen hanya terdiri dari dua nilai pada kedua fase: **Relevan** dan **Tidak Relevan**. Tidak ada proses approval — seluruh perubahan status setelah unggah awal dilakukan langsung oleh Staff melalui review.

| Status Awal | Aksi/Pemicu | Aktor | Status Akhir | Dampak pada Sistem | Fase |
| --- | --- | --- | --- | --- | --- |
| - | Mengisi form dokumen baru & simpan | Staff/Manager | Relevan | Dokumen tersimpan di database internal CMS dengan status default Relevan (belum melalui review). | Fase 1 |
| Relevan | Staff mereview dokumen & menandai hasilnya | Staff | Relevan / Tidak Relevan | Status dikukuhkan tetap Relevan, atau diubah menjadi Tidak Relevan sesuai hasil review; grafik statistik publik ter-update. | Fase 2 |
| Tidak Relevan | Staff memperbaiki dokumen & mereview ulang | Staff | Relevan / Tidak Relevan | Dokumen direview ulang hingga menghasilkan status akhir Relevan atau tetap Tidak Relevan. | Fase 2 |

Pada Fase 1, hanya baris pertama (status default Relevan) yang aktif; baris berikutnya menunggu implementasi Fase 2.

## 8. Fitur Sistem

| No | Fitur | Deskripsi | Admin | Manager | Staff | Tamu | Fase |
| --- | --- | --- | :---: | :---: | :---: | :---: | --- |
| | **Website Publik** | | | | | | |
| 1 | Dashboard | Ringkasan grafik statistik publik. | - | - | - | ✓ | Fase 1 |
| 2 | Page Overview | Grafik jumlah dokumen berdasarkan jenis, standar, periode, bidang. | - | - | - | ✓ | Fase 1 |
| 3 | Page Standar | Daftar standar dan detailnya. | - | - | - | ✓ | Fase 1 |
| 4 | Page Sertifikat | Daftar sertifikat dan detailnya. | - | - | - | ✓ | Fase 1 |
| 5 | Grafik Statistik Data | Visualisasi jumlah dokumen dan sertifikat. | - | - | - | ✓ | Fase 1 |
| | **CMS** | | | | | | |
| 1 | Login | Autentikasi pengguna untuk mengakses CMS. | ✓ | ✓ | ✓ | - | Fase 1 |
| 2 | Dashboard - Overview | Ringkasan jumlah dokumen, sertifikat, dan statistik pengelolaan. | ✓ | ✓ | ✓ | - | Fase 1 |
| 3 | Grafik Statistik Data | Grafik dokumen/sertifikat berdasarkan kategori, periode, atau bidang. | ✓ | ✓ | ✓ | - | Fase 1 |
| 4 | Dashboard - Manajemen User | Menambah, mengubah, menghapus, dan mengatur akun pengguna. | ✓ | - | - | - | Fase 1 |
| 5 | Manajemen Role | Mengatur hak akses tiap pengguna berdasarkan role. | ✓ | - | - | - | Fase 1 |
| 6 | Manajemen Konten - Dokumen | Menambah, mengubah, menghapus, melihat, mengelola data dokumen standarisasi. | ✓ | ✓ | ✓ | - | Fase 1 |
| 7 | Manajemen Konten - Standar | Mengelola kategori/klasifikasi dokumen berdasarkan standar. | ✓ | ✓ | ✓ | - | Fase 1 |
| 8 | Manajemen Konten - Sertifikat | Menambah, mengubah, menghapus, melihat, mengelola data sertifikat. | ✓ | ✓ | ✓ | - | Fase 1 |
| 9 | Upload File Dokumen | Mengunggah file dokumen atau sertifikat ke sistem. | ✓ | ✓ | ✓ | - | Fase 1 |
| 10 | Review Dokumen | Staff mereview dokumen dan langsung menentukan status akhir (Relevan/Tidak Relevan) beserta catatan. | - | - | ✓ | - | **Fase 2** |
| 11 | Pencarian / Filter Dokumen | Mencari dokumen berdasarkan judul, kategori, atau kata kunci. | ✓ | ✓ | ✓ | - | Fase 1 |
| 12 | Lihat Detail Dokumen | Menampilkan informasi lengkap dokumen atau sertifikat. | ✓ | ✓ | ✓ | - | Fase 1 |
| 13 | Unduh Dokumen | Mengunduh dokumen yang telah diunggah. | ✓ | ✓ | ✓ | - | Fase 1 |
| 14 | Log Aktivitas | Mencatat aktivitas pengguna, termasuk perubahan status dokumen. | ✓ | - | - | - | Fase 1 (cakupan bertambah untuk mencatat aktivitas review di Fase 2) |
| 15 | Profil Pengguna | Melihat dan memperbarui informasi profil pengguna yang login. | ✓ | ✓ | ✓ | - | Fase 1 |
| 16 | Logout | Keluar dari sistem CMS dengan aman. | ✓ | ✓ | ✓ | - | Fase 1 |

### Pengelompokan Fitur Berdasarkan Modul

| Modul | Fitur | Fase |
| --- | --- | --- |
| Modul Autentikasi | Login, Logout, Profil Pengguna | Fase 1 |
| Modul Dashboard | Dashboard CMS, Dashboard Publik, Grafik Statistik | Fase 1 |
| Modul Manajemen Dokumen | Kelola Dokumen Standarisasi, Kelola Sertifikat, Upload File, Pencarian Dokumen, Lihat Detail, Unduh Dokumen | Fase 1 |
| Modul Review Dokumen | Review Dokumen (penentuan status langsung oleh Staff), Publikasi Grafik Dokumen (grafik tetap tampil sejak Fase 1) | **Fase 2** (kecuali publikasi grafik: Fase 1) |
| Modul Administrasi | Kelola Pengguna/User, Kelola Role, Kelola Kategori Dokumen, Log Aktivitas | Fase 1 |
| Modul Pelaporan | Laporan Pengelolaan & Statistik Dokumen dan Sertifikat | Fase 1 (laporan terkait hasil review menyusul di Fase 2) |

## 9. Data yang Disimpan

| Entity | Data yang Disimpan | Fase |
| --- | --- | --- |
| Pengguna (User) | Nama, Email, Password, Role, Status akun, Informasi profil | Fase 1 |
| User - Role | Admin, Manager (Master User), Staff (User) | Fase 1 |
| Dokumen | Standar terkait, Klausul, Sub klausul, Judul dokumen, Tanggal unggah, Jenis dokumen, Bidang, Status (Relevan sebagai default di Fase 1; Relevan/Tidak Relevan hasil review Staff di Fase 2), File dokumen, Catatan (opsional) | Fase 1 (nilai default Relevan) / Fase 2 (nilai ditentukan lewat review) |
| Dokumen - File Dokumen | Nama file, Lokasi penyimpanan, Tipe file, Ukuran file, Tanggal unggah | Fase 1 |
| Dokumen - Status Dokumen | Relevan, Tidak Relevan | Fase 1 (Relevan) / Fase 2 (kedua nilai) |
| Dokumen - Review Dokumen | Status hasil review (Relevan/Tidak Relevan), Siapa yang mereview, Tanggal review, Catatan (opsional) | **Fase 2** |
| Standar | Nama standar, Deskripsi Standar Dokumen | Fase 1 |
| Sertifikat | Nama sertifikat, Penerbit, Masa berlaku, Deskripsi (opsional) | Fase 1 |
| Grafik Statistik - Jumlah dokumen per standar | Total dokumen, jumlah per jenis (manual/prosedur/IK/formulir) | Fase 1 |
| Grafik Statistik - Jumlah dokumen direview per standar | Total dokumen yang direview | **Fase 2** |
| Grafik Statistik - Jumlah dokumen direview per bulan/tahun | Total dokumen yang direview | **Fase 2** |
| Grafik Statistik - Distribusi dokumen per bidang | Nama bidang, total dokumen, tanggal terakhir diperbarui | Fase 1 |
| Log Aktivitas | Riwayat login/logout, tambah/ubah/hapus user, dokumen, standar, sertifikat | Fase 1 (pencatatan aktivitas review menyusul di Fase 2) |

## 10. Relasi Antar Data

| Entitas 1 | Relasi | Entitas 2 | Kardinalitas | Keterangan | Fase |
| --- | --- | --- | --- | --- | --- |
| Role | memiliki | User | 1 : N | Satu role dapat dimiliki banyak user; satu user hanya memiliki satu role. | Fase 1 |
| User | mengelola | Dokumen / Sertifikat | 1 : N | Satu staff/admin/manager dapat mengunggah banyak dokumen/sertifikat. | Fase 1 |
| Standar | mengelompokkan | Dokumen | M : N | Satu standar memiliki banyak dokumen, satu dokumen dapat termasuk beberapa standar. | Fase 1 |
| Dokumen | memiliki | File Dokumen | 1 : 1 | Setiap dokumen memiliki satu file digital yang dapat diunduh. | Fase 1 |
| Status Dokumen | digunakan oleh | Dokumen | 1 : N | Banyak dokumen dapat memiliki status yang sama (Relevan atau Tidak Relevan). | Fase 1 (nilai Relevan) / Fase 2 (kedua nilai) |
| Dokumen | memiliki | Review Dokumen | 1 : N | Satu dokumen dapat direview beberapa kali oleh Staff. | **Fase 2** |
| Staff | melakukan | Review Dokumen | 1 : N | Seorang Staff dapat mereview banyak dokumen. | **Fase 2** |
| User | mengelola | Sertifikat | 1 : N | Seorang staff/admin/manager dapat mengelola banyak sertifikat. | Fase 1 |
| Sertifikat | memiliki | File Dokumen | 1 : 1 | Setiap sertifikat memiliki satu file digital. | Fase 1 |
| User | menghasilkan | Log Aktivitas | 1 : N | Setiap aktivitas pengguna dicatat sebagai log. | Fase 1 |

Karena relasi Standar–Dokumen bersifat M:N, implementasinya menggunakan tabel penghubung:

| Entitas 1 | Relasi | Entitas Penghubung | Relasi | Entitas 2 |
| :---: | :---: | :---: | :---: | :---: |
| Standar | 1 : N | Standar_Dokumen | N : 1 | Dokumen |

## 11. Aturan Bisnis (Business Rules)

**Berlaku sejak Fase 1:**
- Setiap pengguna yang mengakses CMS wajib memiliki akun terdaftar dan melakukan login terlebih dahulu.
- Setiap pengguna hanya memiliki satu role dalam sistem: Administrator, Manager, atau Staff.
- Hak akses pengguna ditentukan berdasarkan role; pengguna hanya dapat mengakses fitur sesuai hak aksesnya.
- Administrator memiliki hak akses penuh untuk mengelola pengguna, role, dokumen, standar, sertifikat, dan log aktivitas.
- Staff dan Manager dapat menambahkan, mengubah, dan mengunggah dokumen atau sertifikat.
- Setiap dokumen yang diunggah otomatis berstatus **Relevan** sampai alur review pada Fase 2 diimplementasikan.
- Satu standar dapat memiliki banyak dokumen dan satu dokumen dapat terkait satu atau lebih standar melalui relasi Standar_Dokumen.
- Setiap dokumen wajib memiliki file digital yang dapat diunggah ke sistem.
- Setiap dokumen yang disimpan wajib memiliki: Standar terkait, Klausul, Sub klausul, Judul dokumen, Tanggal unggah, Jenis dokumen, Bidang, Status, File dokumen, dan Catatan (opsional).
- Setiap sertifikat yang disimpan wajib memiliki: nama sertifikat, penerbit, deskripsi, dan file sertifikat.
- Setiap aktivitas penting pengguna (login, logout, tambah, ubah, hapus) harus dicatat pada log aktivitas.
- Dashboard statistik menampilkan data secara otomatis berdasarkan data dokumen, sertifikat, standar, dan distribusi bidang.
- Pengunjung (Guest) tidak perlu login untuk mengakses halaman publik, namun hanya dapat melihat grafik dokumen dan sertifikat.
- Seluruh dokumen ditampilkan pada grafik statistik website publik, baik berstatus Relevan maupun Tidak Relevan.
- Sistem menyediakan pencarian dokumen dan sertifikat berdasarkan judul, standar, jenis dokumen, bidang, atau kata kunci.
- Username dan email pengguna harus unik.
- File dokumen yang dapat diunggah hanya dalam format tertentu: dokumen (PDF, DOCX, XLSX), foto sertifikat (JPG, PNG), dengan batas ukuran maksimum yang ditentukan sistem.
- Pengguna hanya dapat mengubah data sesuai kewenangan role-nya.
- Data yang dihapus oleh Administrator tidak dapat diakses kembali oleh pengguna umum dan harus tercatat dalam log aktivitas.

**Berlaku mulai Fase 2 (Pengembangan Berikutnya):**
- Staff bertugas melakukan review terhadap dokumen dan secara langsung menentukan status akhir dokumen (Relevan atau Tidak Relevan); tidak ada proses pengajuan atau persetujuan ke pihak lain.
- Setiap dokumen yang diunggah harus melalui proses review Staff agar status defaultnya (Relevan) dikukuhkan atau diubah menjadi Tidak Relevan.
- Setiap proses review harus menyimpan informasi reviewer, tanggal review, status hasil review, dan catatan apabila diperlukan.
- Status dokumen tetap hanya terdiri dari dua nilai (Relevan, Tidak Relevan); tidak ada status perantara atau proses approval tambahan.

## 12. Status Master

### 12.1 Status Dokumen

| Status | Deskripsi | Fase |
| --- | --- | --- |
| Relevan | Nilai default saat dokumen baru diunggah (Fase 1); pada Fase 2 juga berarti dokumen telah direview dan dinyatakan sesuai oleh Staff. | Fase 1 (default) / Fase 2 (hasil review) |
| Tidak Relevan | Dokumen dinilai tidak sesuai oleh Staff saat proses review, sehingga perlu diperbaiki dan direview ulang. | Fase 2 |

### 12.2 Status User

| Status | Deskripsi |
| --- | --- |
| Aktif | Pengguna dapat login dan menggunakan sistem. |
| Nonaktif | Pengguna tidak dapat login hingga status diaktifkan kembali. |

### 12.3 Status Sertifikat

| Status | Deskripsi |
| --- | --- |
| Aktif | Sertifikat masih berlaku. |
| Kedaluwarsa (Expired) | Masa berlaku sertifikat telah berakhir. |

## 13. Format Dokumen Digital

| Jenis Dokumen Digital | Digunakan Untuk | Keterangan |
| --- | --- | --- |
| PDF (.pdf) | Dokumen standarisasi | Format utama untuk dokumen standar yang dipublikasikan. |
| Microsoft Word (.doc/.docx) | Dokumen standarisasi | Digunakan sebagai dokumen kerja atau dokumen yang masih dapat diedit. |
| Microsoft Excel (.xls/.xlsx) | Dokumen standarisasi | Digunakan apabila dokumen berupa formulir atau data pendukung. |
| Gambar (.jpg/.jpeg/.png) | Sertifikat | Digunakan untuk menyimpan file atau hasil scan sertifikat. |

## 14. Laporan dan Statistik Dashboard

### 14.1 Laporan

| Laporan | Sumber Data | Fase |
| --- | --- | --- |
| Laporan Data Dokumen Standarisasi | Dokumen, Standar, User | Fase 1 |
| Laporan Data Sertifikat | Sertifikat, User | Fase 1 |
| Laporan Status Dokumen (Relevan, Tidak Relevan) | Dokumen, Status Dokumen | Fase 1 (hanya Relevan) / Fase 2 (kedua status) |
| Laporan Hasil Review Dokumen | Review Dokumen, Dokumen, User | **Fase 2** |
| Laporan Dokumen per Standar | Standar, Standar_Dokumen, Dokumen | Fase 1 |
| Laporan Dokumen per Bidang | Dokumen | Fase 1 |
| Laporan Dokumen berdasarkan Jenis | Dokumen | Fase 1 |
| Laporan Aktivitas Pengguna | Log Aktivitas, User | Fase 1 |
| Laporan Statistik Dashboard | Dokumen, Standar, Sertifikat, Review Dokumen | Fase 1 (komponen review menyusul di Fase 2) |

### 14.2 Statistik pada Dashboard

| Statistik | Sumber Data | Fase |
| --- | --- | --- |
| Jumlah dokumen berdasarkan standar | Dokumen, Standar | Fase 1 |
| Jumlah dokumen berdasarkan jenis | Dokumen | Fase 1 |
| Jumlah dokumen yang telah direview per standar | Dokumen, Review Dokumen | **Fase 2** |
| Jumlah dokumen yang telah direview per bulan/tahun | Review Dokumen | **Fase 2** |
| Distribusi dokumen berdasarkan bidang | Dokumen | Fase 1 |

## 15. Tech Stack

- Backend: Laravel 12
- Frontend: React + Inertia.js + Tailwind CSS
- Database: PostgreSQL
- Container: Docker + Docker Compose
- Authentication: Laravel Breeze
- Authorization: Spatie Laravel Permission
- Cache & Queue: Redis
- Storage: Laravel Storage (Local saat development, S3/MinIO saat production)
- Web Server: Nginx
- Version Control: Git + GitHub
- CI/CD: GitHub Actions
- Testing: PestPHP (atau PHPUnit)

## 16. Struktur File (Rencana)

```
digital-library-pln
│
├── app
│   ├── Domains
│   ├── Services
│   ├── Repositories
│   ├── DTOs
│   ├── Enums
│   ├── Models
│   ├── Events
│   ├── Listeners
│   ├── Policies
│   └── Notifications
│
├── resources
│   └── js
│       ├── Pages
│       ├── Components
│       ├── Features
│       ├── Layouts
│       ├── Hooks
│       ├── Services
│       └── Utils
│
├── routes
├── database
├── storage
├── docker
├── tests
├── docs
└── .github
```

## 17. Dokumen Pendukung yang Masih Perlu Disusun

Dokumen-dokumen berikut belum tersedia dan direkomendasikan untuk disusun pada tahap berikutnya, idealnya mengikuti pembagian Fase 1/Fase 2 pada PRD ini:

- Use Case Diagram
- Use Case Description
- Activity Diagram
- Sequence Diagram
- Class Diagram
- SRS (Software Requirement Specification)
- Mockup / UI
- Data Dictionary

## 18. Ringkasan Perubahan pada Revisi Ini

| Bagian | Perubahan |
| --- | --- |
| Alur Pengelolaan Dokumen (Fase 2) & Business Process Keseluruhan | Proses pengajuan hasil review ke Manager, login Manager, List Ajuan Review Dokumen, serta keputusan Approve/Reject dihapus sepenuhnya. Fase 2 kini hanya terdiri dari dua langkah: Staff mereview dokumen, lalu Staff langsung menentukan status akhir (Relevan/Tidak Relevan). |
| Aktor Sistem | Kolom "Penyesuaian pada Fase 2" untuk Manager diubah menjadi "tidak berubah", karena Manager tidak lagi terlibat dalam proses review atau penentuan status dokumen. |
| Objek Utama & Data yang Disimpan | "Riwayat Status Dokumen (Approval Log)" diganti nama menjadi "Riwayat Review Dokumen"; entitas "Dokumen - Review/Revisi" diganti nama menjadi "Dokumen - Review Dokumen" dan tidak lagi menyimpan referensi ke keputusan Manager. |
| Matriks Transisi Status Dokumen | Baris terkait Manager (Pending → Relevan/Tidak Relevan lewat Approve/Reject) dihapus; transisi status di Fase 2 kini seluruhnya dilakukan oleh Staff. |
| Fitur Sistem & Pengelompokan Modul | Fitur "Manajemen Konten - Status Dokumen" (approval oleh Manager) dihapus. "Modul Persetujuan Dokumen" diganti nama menjadi "Modul Review Dokumen" tanpa komponen Approval Dokumen. |
| Relasi Antar Data | Relasi "User melakukan Review/Revisi Dokumen" disederhanakan menjadi "Staff melakukan Review Dokumen", karena hanya Staff yang melakukan review. |
| Aturan Bisnis | Aturan terkait tugas approval Manager dihapus; aturan Staff diperbarui menjadi "secara langsung menentukan status akhir dokumen ... tidak ada proses pengajuan atau persetujuan ke pihak lain". |
| Status Dokumen (master) & Laporan | Deskripsi status Tidak Relevan diubah dari "ditolak Manager" menjadi "dinilai tidak sesuai oleh Staff saat review". |
