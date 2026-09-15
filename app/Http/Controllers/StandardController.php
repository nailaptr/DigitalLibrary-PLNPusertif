<?php

namespace App\Http\Controllers;

use App\Models\Standard;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StandardController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage standards');
    }

    public function index()
    {
        $standards = Standard::withCount('documents')->get()->map(function ($std) {
            return [
                'id' => $std->id, // Frontend uses 'id'
                'name' => $std->name,
                'description' => $std->description,
                'docCount' => $std->documents_count,
                'publishCount' => 0,
                'createdAt' => $std->created_at ? $std->created_at->format('d F Y, H:i A') : null,
                'updatedAt' => $std->updated_at ? $std->updated_at->format('d F Y, H:i A') : null,
            ];
        });

        // Juga mengirim dummy documents jika diperlukan oleh UI (Level 2)
        // Di tugas ini fokusnya standards dulu untuk StandardManagement
        // karena documents list (Level 2) akan difetch dari DocumentController?
        // Wait, the UI has it hardcoded, I will leave documents mock intact for now.
        
        return Inertia::render('CMS/StandardManagement', [
            'initialStandards' => $standards
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $standard = Standard::create($validated);
        ActivityLog::record(ActivityLog::ACTION_CREATE, $standard, "Menambah standar: {$standard->name}");

        return redirect()->back();
    }

    public function update(Request $request, Standard $standard)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $standard->update($validated);
        ActivityLog::record(ActivityLog::ACTION_UPDATE, $standard, "Mengubah standar: {$standard->name}");

        return redirect()->back();
    }

    public function destroy(Standard $standard)
    {
        ActivityLog::record(ActivityLog::ACTION_DELETE, $standard, "Menghapus standar: {$standard->name}");
        $standard->delete();

        return redirect()->back();
    }
}
