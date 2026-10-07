import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DocumentList from '@/Components/Document/DocumentList';
import DocumentForm from '@/Components/Document/DocumentForm';
import DocumentDetail from '@/Components/Document/DocumentDetail';

export default function DocumentManagement({ onNavigate, initialDocuments = [], initialStandards = [] }) {
  const [activeMenu, setActiveMenu] = useState('Dokumen');

  // Navigation Level State: 'level1' (Document List) | 'level2_add' | 'level2_edit' | 'level3_detail'
  const [level, setLevel] = useState('level1');
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Use props instead of mock data
  const standards = initialStandards;
  const documents = initialDocuments;

  // Handlers
  const handleNavigateAddDoc = () => {
    setSelectedDoc(null);
    setLevel('level2_add');
  };

  const handleNavigateEditDoc = (doc) => {
    setSelectedDoc(doc);
    setLevel('level2_edit');
  };

  const handleNavigateDetailDoc = (doc) => {
    setSelectedDoc(doc);
    setLevel('level3_detail');
  };

  const buildDocFormData = (docData) => {
    // Shared FormData builder (Laravel file-upload pattern), reused by
    // edit form, review submit, and revision submit so every mutation persists.
    const formData = new FormData();
    for (const key in docData) {
      if (docData[key] !== null && docData[key] !== undefined) {
        if (key === 'standard_ids') {
          docData[key].forEach(id => formData.append('standard_ids[]', id));
        } else if (key === 'file') {
          if (docData[key] instanceof File) {
            formData.append(key, docData[key]);
          }
        } else {
          formData.append(key, docData[key]);
        }
      }
    }
    return formData;
  };

  const handleSaveDocFromForm = (docData) => {
    // We need to use FormData since we are uploading a file
    const formData = buildDocFormData(docData);

    if (level === 'level2_add') {
      router.post(route('documents.store'), formData, {
        onSuccess: () => {
          setLevel('level1');
          setSelectedDoc(null);
        },
      });
    } else if (level === 'level2_edit') {
      // For PUT requests with file uploads in Laravel, we need to send POST with _method=PUT
      formData.append('_method', 'PUT');
      router.post(route('documents.update', docData.id), formData, {
        onSuccess: () => {
          setLevel('level1');
          setSelectedDoc(null);
        },
      });
    }
  };

  // Maps a list-row doc (index mapping keys) back to backend update keys.
  const toUpdatePayload = (doc, overrides = {}) => {
    const relations = doc.sdgRelations || [];
    return {
      id: doc.id,
      title: doc.title,
      document_type: doc.jenis,
      field: doc.bidang,
      status: doc.status,
      notes: doc.notes ?? null,
      upload_date: doc.uploadDate,
      file: null,
      standard_ids: relations.map((r) => r.id),
      primary_standard_id: relations.find((r) => r.isPrimary)?.id || relations[0]?.id,
      clause: doc.clause ?? null,
      sub_clause: doc.subClause ?? null,
      ...overrides,
    };
  };

  const persistDocPut = (docData, onDone) => {
    const formData = buildDocFormData(docData);
    // For PUT requests with file uploads in Laravel, we need to send POST with _method=PUT
    formData.append('_method', 'PUT');
    router.post(route('documents.update', docData.id), formData, {
      preserveState: true,
      onSuccess: () => { if (onDone) onDone(); },
    });
  };

  const handleSaveReview = (docId, reviewData) => {
    // Contract statuses only: Relevan -> relevan, Tidak Relevan -> tidak_relevan.
    // 'Revisi' has no valid status target, so it stays local-only (see handoff).
    const nextStatus =
      reviewData.reviewResult === 'Tidak Relevan' ? 'tidak_relevan'
      : reviewData.reviewResult === 'Relevan' ? 'relevan' : null;
    setSelectedDoc((prev) => (prev && prev.id === docId ? { ...prev, status: nextStatus || prev.status, reviewData } : prev));
    if (!nextStatus || !selectedDoc || selectedDoc.id !== docId) return;
    persistDocPut(toUpdatePayload(selectedDoc, { status: nextStatus }));
  };

  const handleSaveRevision = (docId, revisionData) => {
    if (!selectedDoc || selectedDoc.id !== docId) return;
    const overrides = { title: revisionData.title };
    let nextFileName = null;
    if (revisionData.fileName instanceof File) {
      overrides.file = revisionData.fileName;
      nextFileName = revisionData.fileName.name;
    }
    setSelectedDoc((prev) => (prev ? { ...prev, title: revisionData.title, fileName: nextFileName || prev.fileName } : prev));
    persistDocPut(toUpdatePayload(selectedDoc, overrides));
  };

  const handleDeleteDoc = (docId) => {
    if (confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
      router.delete(route('documents.destroy', docId));
    }
  };

  const handleBulkDeleteDocs = (ids) => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${ids.length} dokumen yang dipilih?`)) {
      // For simplicity in Tahap 1, we delete one by one or create a bulk route later.
      ids.forEach(id => router.delete(route('documents.destroy', id)));
    }
  };

  const handleSidebarMenuSelect = (menuName) => {
    setActiveMenu(menuName);
    if (onNavigate) {
      onNavigate(menuName);
    }
  };

  return (
    <AuthenticatedLayout user={ { name: 'Dummy User' } }>

    <div className="flex h-screen bg-[#F4F6F8] overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sidebar Component */}
      <Sidebar activeItem={activeMenu} onSelectMenu={handleSidebarMenuSelect} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto min-h-screen">
        {level === 'level1' && (
          <DocumentList
            documents={documents}
            standards={standards}
            onNavigateAddDoc={handleNavigateAddDoc}
            onNavigateEditDoc={handleNavigateEditDoc}
            onNavigateDetailDoc={handleNavigateDetailDoc}
            onDeleteDoc={handleDeleteDoc}
            onBulkDelete={handleBulkDeleteDocs}
            onViewAllStandards={() => router.visit(route('standards.index'))}
          />
        )}

        {(level === 'level2_add' || level === 'level2_edit') && (
          <DocumentForm
            mode={level === 'level2_edit' ? 'edit' : 'add'}
            documentData={selectedDoc}
            standardsList={standards}
            onSave={handleSaveDocFromForm}
            onCancel={() => {
              setLevel('level1');
              setSelectedDoc(null);
            }}
          />
        )}

        {level === 'level3_detail' && (
          <DocumentDetail
            documentData={selectedDoc}
            onBack={() => {
              setLevel('level1');
              setSelectedDoc(null);
            }}
            onEditDoc={handleNavigateEditDoc}
            onSaveReview={handleSaveReview}
            onSaveRevision={handleSaveRevision}
          />
        )}
      </main>
    </div>
  
    </AuthenticatedLayout>);
}
