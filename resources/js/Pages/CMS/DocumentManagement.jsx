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

  const handleSaveDocFromForm = (docData) => {
    // We need to use FormData since we are uploading a file
    const formData = new FormData();
    for (const key in docData) {
      if (docData[key] !== null && docData[key] !== undefined) {
        if (key === 'standard_ids') {
          docData[key].forEach(id => formData.append('standard_ids[]', id));
        } else {
          formData.append(key, docData[key]);
        }
      }
    }

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

  const handleSaveReview = (docId, reviewData) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
              ...d,
              status: reviewData.reviewStatus || reviewData.reviewResult,
              reviewData,
            }
          : d
      )
    );
    if (selectedDoc && selectedDoc.id === docId) {
      setSelectedDoc((prev) => ({
        ...prev,
        status: reviewData.reviewStatus || reviewData.reviewResult,
        reviewData,
      }));
    }
  };

  const handleSaveRevision = (docId, revisionData) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
              ...d,
              title: revisionData.title,
              fileName: revisionData.fileName,
              status: 'Draft', // Set back to draft for new review
              updatedAt: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
            }
          : d
      )
    );
    if (selectedDoc && selectedDoc.id === docId) {
      setSelectedDoc((prev) => ({
        ...prev,
        title: revisionData.title,
        fileName: revisionData.fileName,
        status: 'Draft',
      }));
    }
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
            onViewAllStandards={() => handleSidebarMenuSelect('Standar')}
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
