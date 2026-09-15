<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Standard;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:manage documents');
    }

    public function index()
    {
        $documents = Document::with('standards')->orderBy('created_at', 'desc')->get()->map(function ($doc) {
            return [
                'id' => $doc->id,
                'code' => 'DOC-' . str_pad($doc->id, 4, '0', STR_PAD_LEFT),
                'title' => $doc->title,
                'jenis' => $doc->document_type,
                'bidang' => $doc->field,
                'status' => $doc->status, // 'relevan' or 'tidak_relevan'
                'uploadDate' => $doc->upload_date ? $doc->upload_date->format('Y-m-d') : null,
                'updatedAt' => $doc->updated_at ? $doc->updated_at->format('d/m/Y, H:i A') : null,
                'fileName' => $doc->file_name,
                'fileSize' => $doc->file_size ? round($doc->file_size / 1024 / 1024, 2) . ' MB' : null,
                'clause' => $doc->clause,
                'subClause' => $doc->sub_clause,
                'notes' => $doc->notes,
                'sdgRelations' => $doc->standards->map(function ($std) use ($doc) {
                    return [
                        'id' => $std->id,
                        'standard' => $std->name,
                        'clause' => $doc->clause, // Since clause is on document
                        'subClause' => $doc->sub_clause,
                        'isPrimary' => $std->pivot->is_primary,
                    ];
                }),
            ];
        });

        $standards = Standard::all()->map(function($std) {
            return [
                'id' => $std->id,
                'name' => $std->name,
                'description' => $std->description,
            ];
        });

        return Inertia::render('CMS/DocumentManagement', [
            'initialDocuments' => $documents,
            'initialStandards' => $standards,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'document_type' => 'required|string|max:255',
            'field' => 'required|string|max:255',
            'clause' => 'nullable|string|max:255',
            'sub_clause' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'upload_date' => 'required|date',
            'standard_ids' => 'required|array',
            'standard_ids.*' => 'exists:standards,id',
            'primary_standard_id' => 'required|exists:standards,id',
            'file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx|max:20480', // max 20MB
        ]);

        $data = [
            'title' => $validated['title'],
            'document_type' => $validated['document_type'],
            'field' => $validated['field'],
            'clause' => $validated['clause'],
            'sub_clause' => $validated['sub_clause'],
            'notes' => $validated['notes'],
            'upload_date' => $validated['upload_date'],
            'uploaded_by' => auth()->id(),
            'status' => 'relevan', // Default per PRD
        ];

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $data['file_name'] = $file->getClientOriginalName();
            $data['file_size'] = $file->getSize();
            $data['file_type'] = $file->getClientMimeType();
            $data['file_path'] = $file->store('documents', 'public');
        }

        $document = Document::create($data);

        // Attach standards
        $syncData = [];
        foreach ($validated['standard_ids'] as $stdId) {
            $syncData[$stdId] = ['is_primary' => ($stdId == $validated['primary_standard_id'])];
        }
        $document->standards()->sync($syncData);

        ActivityLog::record(ActivityLog::ACTION_CREATE, $document, "Menambah dokumen: {$document->title}");

        return redirect()->back();
    }

    public function update(Request $request, Document $document)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'document_type' => 'required|string|max:255',
            'field' => 'required|string|max:255',
            'clause' => 'nullable|string|max:255',
            'sub_clause' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'upload_date' => 'required|date',
            'standard_ids' => 'required|array',
            'standard_ids.*' => 'exists:standards,id',
            'primary_standard_id' => 'required|exists:standards,id',
            'file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx|max:20480',
        ]);

        $data = [
            'title' => $validated['title'],
            'document_type' => $validated['document_type'],
            'field' => $validated['field'],
            'clause' => $validated['clause'],
            'sub_clause' => $validated['sub_clause'],
            'notes' => $validated['notes'],
            'upload_date' => $validated['upload_date'],
        ];

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $data['file_name'] = $file->getClientOriginalName();
            $data['file_size'] = $file->getSize();
            $data['file_type'] = $file->getClientMimeType();
            
            if ($document->file_path) {
                Storage::disk('public')->delete($document->file_path);
            }
            $data['file_path'] = $file->store('documents', 'public');
        }

        $document->update($data);

        // Sync standards
        $syncData = [];
        foreach ($validated['standard_ids'] as $stdId) {
            $syncData[$stdId] = ['is_primary' => ($stdId == $validated['primary_standard_id'])];
        }
        $document->standards()->sync($syncData);

        ActivityLog::record(ActivityLog::ACTION_UPDATE, $document, "Mengubah dokumen: {$document->title}");

        return redirect()->back();
    }

    public function destroy(Document $document)
    {
        ActivityLog::record(ActivityLog::ACTION_DELETE, $document, "Menghapus dokumen: {$document->title}");
        
        // Note: because of soft deletes, we don't delete the physical file yet
        $document->delete();

        return redirect()->back();
    }
}
