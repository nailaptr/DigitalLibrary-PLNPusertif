<?php

namespace Database\Seeders;

use App\Models\Finding;
use Illuminate\Database\Seeder;

class FindingSeeder extends Seeder
{
    public function run(): void
    {
        $csvPath = base_path('docs/monitoring-temuan/source/Tugas 1 Diklat AI BCMS 24-25 2026 - Tugas 1.csv');
        if (!file_exists($csvPath)) {
            $this->command->error("CSV not found at: $csvPath");
            return;
        }

        $file = fopen($csvPath, 'r');
        
        // Skip header lines (1-4)
        for ($i = 0; $i < 4; $i++) {
            fgetcsv($file);
        }

        while (($row = fgetcsv($file)) !== false) {
            // Cek jika row kosong
            if (empty(array_filter($row))) {
                continue;
            }

            // Aturan wajib: pertahankan NULL/blank, jangan ubah data ambigu
            $finding_type = null;
            if (!empty(trim($row[10] ?? ''))) {
                $finding_type = 'major';
            } elseif (!empty(trim($row[11] ?? ''))) {
                $finding_type = 'minor';
            } elseif (!empty(trim($row[12] ?? ''))) {
                $finding_type = 'pi';
            }

            Finding::create([
                'finding_number' => trim($row[0] ?? '') !== '' ? trim($row[0]) : null,
                'person_name' => trim($row[1] ?? '') !== '' ? trim($row[1]) : null,
                'existing_work_area' => trim($row[2] ?? '') !== '' ? trim($row[2]) : null,
                'clause' => trim($row[3] ?? '') !== '' ? trim($row[3]) : null,
                'finding_statement' => trim($row[4] ?? '') !== '' ? trim($row[4]) : null,
                'location_auditee' => trim($row[5] ?? '') !== '' ? trim($row[5]) : null,
                'cause' => trim($row[6] ?? '') !== '' ? trim($row[6]) : null,
                'objective_evidence' => trim($row[7] ?? '') !== '' ? trim($row[7]) : null,
                'requirement' => trim($row[8] ?? '') !== '' ? trim($row[8]) : null,
                'preventive_action' => trim($row[9] ?? '') !== '' ? trim($row[9]) : null,
                'finding_type' => $finding_type,
                'evaluation_note' => trim($row[13] ?? '') !== '' ? trim($row[13]) : null,
                'is_published' => false,
            ]);
        }

        fclose($file);
    }
}
