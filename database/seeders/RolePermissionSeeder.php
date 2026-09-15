<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

/**
 * RolePermissionSeeder — Mendefinisikan seluruh permission dan role sistem.
 *
 * Perubahan dari versi lama (sesuai GAP_ANALYSIS.md §1 & instruksi Tahap 1):
 *   1. Permission 'review documents' DIPINDAH dari Manager ke Staff
 *      (GAP §1.1 — Manager tidak terlibat review per PRD v1.2 §4, §11)
 *   2. Permission 'view statistics' DITAMBAHKAN ke Staff
 *      (GAP §1.2 — PRD §4 Fase 1: Staff berhak "Lihat Dashboard Statistik")
 *   3. Permission baru ditambahkan: manage certificates, manage standards,
 *      view activity log (GAP §4.2 — permission yang sebelumnya samar)
 *
 * Matriks akhir per PRD §4 & CLAUDE.md:
 *   Admin   : semua permission
 *   Manager : view dashboard, manage documents, manage certificates,
 *             manage standards, view statistics
 *   Staff   : view dashboard, manage documents, manage certificates,
 *             manage standards, view statistics, review documents
 *   Guest   : tidak ada permission (akses publik tidak via Spatie)
 */
class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // ─────────────────────────────────────────────────────────────────────
        // 1. Definisi permission
        //    Semua permission dideklarasikan di sini agar mudah dilacak.
        // ─────────────────────────────────────────────────────────────────────
        $permissions = [
            // Akses dashboard & statistik
            'view dashboard',         // CMS dashboard (semua role login)
            'view statistics',        // Grafik statistik (Admin, Manager, Staff — PRD §4)

            // Manajemen konten dokumen (PRD §8 Fitur 6)
            'manage documents',       // CRUD dokumen standarisasi

            // Manajemen konten sertifikat (PRD §8 Fitur 8) — ditambahkan per GAP §4.2
            'manage certificates',    // CRUD sertifikat

            // Manajemen standar/kategori (PRD §8 Fitur 7) — ditambahkan per GAP §4.2
            'manage standards',       // CRUD standar/kategori dokumen

            // Manajemen pengguna (PRD §8 Fitur 4, khusus Admin)
            'manage users',           // CRUD user & role

            // Log aktivitas (PRD §8 Fitur 14, khusus Admin) — ditambahkan per GAP §4.2
            'view activity log',      // Melihat riwayat log aktivitas

            // Review dokumen (PRD §8 Fitur 10) — FASE 2, dideklarasikan sekarang
            // agar assignment role sudah benar saat Fase 2 dibangun.
            // PRD §4: "Hanya Staff yang mereview dokumen" — Manager TIDAK dapat ini.
            'review documents',       // Staff mereview & menentukan status dokumen (Fase 2)
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // ─────────────────────────────────────────────────────────────────────
        // 2. Role Admin — akses penuh ke seluruh sistem
        //    PRD §4: "Admin — hak akses penuh untuk mengelola pengguna,
        //    role, dokumen, standar, sertifikat, dan log aktivitas."
        // ─────────────────────────────────────────────────────────────────────
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $adminRole->syncPermissions(Permission::all());

        // ─────────────────────────────────────────────────────────────────────
        // 3. Role Manager — kelola konten, TIDAK review dokumen
        //    PRD §4: "Manager tidak terlibat dalam review atau penentuan
        //    status dokumen" (GAP §1.1 — perbaikan dari seeder lama)
        // ─────────────────────────────────────────────────────────────────────
        $managerRole = Role::firstOrCreate(['name' => 'Manager']);
        $managerRole->syncPermissions([
            'view dashboard',
            'view statistics',        // PRD §4: Manager "Lihat Dashboard Statistik"
            'manage documents',       // PRD §4: Manager "Menambah, mengelola, mengedit Dokumen"
            'manage certificates',    // PRD §4: Manager "Menambah, mengelola, mengedit Sertifikat"
            'manage standards',       // PRD §8 Fitur 7: Manager bisa kelola standar
            // 'review documents' TIDAK ada di Manager — PRD v1.2 §4 & GAP §1.1
        ]);

        // ─────────────────────────────────────────────────────────────────────
        // 4. Role Staff — kelola konten + review dokumen (Fase 2)
        //    PRD §4: "Staff — Menambah, mengelola, mengedit Dokumen dan Sertifikat"
        //    PRD §4 Fase 2: "Mendapat akses Review Dokumen"
        //    GAP §1.1: 'review documents' dipindah dari Manager ke Staff
        //    GAP §1.2: 'view statistics' ditambahkan ke Staff
        // ─────────────────────────────────────────────────────────────────────
        $staffRole = Role::firstOrCreate(['name' => 'Staff']);
        $staffRole->syncPermissions([
            'view dashboard',
            'view statistics',        // GAP §1.2 — sebelumnya tidak ada di Staff
            'manage documents',
            'manage certificates',
            'manage standards',
            'review documents',       // GAP §1.1 — dipindah dari Manager ke Staff
        ]);

        // ─────────────────────────────────────────────────────────────────────
        // 5. Role Guest — tidak ada permission Spatie
        //    PRD §4: Guest/Tamu tidak pernah login; akses publik tidak
        //    menggunakan middleware Spatie sama sekali.
        //    GAP §1.3: Hanya placeholder teknis, tidak perlu perubahan.
        // ─────────────────────────────────────────────────────────────────────
        Role::firstOrCreate(['name' => 'Guest']);
        // Guest tidak mendapat permission apapun — akses halaman publik
        // dikendalikan di level route (tanpa middleware auth/permission)

        // ─────────────────────────────────────────────────────────────────────
        // 6. User Admin default
        // ─────────────────────────────────────────────────────────────────────
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name'      => 'Super Admin',
                'password'  => Hash::make('password'),
                'is_active' => true,
            ]
        );

        $adminUser->assignRole($adminRole);
    }
}
