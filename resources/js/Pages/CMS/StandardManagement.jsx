import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import StandardCardGrid from '@/Components/Standard/StandardCardGrid';
import StandardModal from '@/Components/Standard/StandardModal';
import DocumentTable from '@/Components/Standard/DocumentTable';
import DocumentModal from '@/Components/Standard/DocumentModal';

export default function StandardManagement({ onNavigate, initialStandards = [] }) {
  const [activeMenu, setActiveMenu] = useState('Standar');

  // Navigation Level State: 'level1' (Standard Cards) | 'level2' (Document Table)
  const [level, setLevel] = useState('level1');
  const [selectedStandard, setSelectedStandard] = useState(null);

  // Use props instead of mock data
  const standards = initialStandards;

  // Mock Documents List (for Level 2 - will be implemented later)
  const [documents, setDocuments] = useState([]);

  // Standard Modal States (Level 1)
  const [standardModalOpen, setStandardModalOpen] = useState(false);
  const [standardModalMode, setStandardModalMode] = useState('add');
  const [activeStandardForModal, setActiveStandardForModal] = useState(null);

  // Document Modal States (Level 2)
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [docModalType, setDocModalType] = useState('doc'); // 'doc' | 'review'
  const [activeDocForModal, setActiveDocForModal] = useState(null);

  // Level 1 Standard Handlers
  const handleOpenAddStandard = () => {
    setStandardModalMode('add');
    setActiveStandardForModal(null);
    setStandardModalOpen(true);
  };

  const handleOpenEditStandard = (std) => {
    setStandardModalMode('edit');
    setActiveStandardForModal(std);
    setStandardModalOpen(true);
  };

  const handleSaveStandard = (stdData) => {
    if (standardModalMode === 'add') {
      router.post(route('standards.store'), stdData, {
        onSuccess: () => setStandardModalOpen(false),
      });
    } else {
      router.put(route('standards.update', stdData.id), stdData, {
        onSuccess: () => setStandardModalOpen(false),
      });
    }
  };

  const handleDeleteStandard = (std) => {
    if (confirm(`Apakah Anda yakin ingin menghapus standar "${std.name}"?`)) {
      router.delete(route('standards.destroy', std.id));
    }
  };

  // Select standard to enter Level 2
  const handleSelectStandard = (std) => {
    setSelectedStandard(std);
    setLevel('level2');
  };

  // Level 2 Document Handlers
  const handleOpenAddDoc = () => {
    setDocModalType('doc');
    setActiveDocForModal(null);
    setDocModalOpen(true);
  };

  const handleOpenEditDoc = (doc) => {
    setDocModalType('doc');
    setActiveDocForModal(doc);
    setDocModalOpen(true);
  };

  const handleOpenReviewDoc = (doc) => {
    setDocModalType('review');
    setActiveDocForModal(doc);
    setDocModalOpen(true);
  };

  const handleSaveDoc = (docData) => {
    if (docData.id) {
      // Edit / Review existing doc
      setDocuments((prev) =>
        prev.map((d) => (d.id === docData.id ? { ...d, ...docData } : d))
      );
    } else {
      // Add new doc
      const newDoc = {
        ...docData,
        id: `doc-${Date.now()}`,
      };
      setDocuments((prev) => [newDoc, ...prev]);
    }
    setDocModalOpen(false);
  };

  const handleDeleteDoc = (docId) => {
    if (confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
    }
  };

  const handleBulkDeleteDocs = (ids) => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${ids.length} dokumen yang dipilih?`)) {
      setDocuments((prev) => prev.filter((d) => !ids.includes(d.id)));
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
        {level === 'level1' ? (
          <StandardCardGrid
            standards={standards}
            onOpenAddModal={handleOpenAddStandard}
            onOpenEditModal={handleOpenEditStandard}
            onDeleteStandard={handleDeleteStandard}
            onSelectStandard={handleSelectStandard}
          />
        ) : (
          <DocumentTable
            standard={selectedStandard}
            documents={documents}
            onBack={() => setLevel('level1')}
            onOpenAddDoc={handleOpenAddDoc}
            onOpenEditDoc={handleOpenEditDoc}
            onOpenReviewDoc={handleOpenReviewDoc}
            onDeleteDoc={handleDeleteDoc}
            onBulkDelete={handleBulkDeleteDocs}
          />
        )}

        {/* Modal Tambah / Edit Standar (Level 1) */}
        <StandardModal
          isOpen={standardModalOpen}
          mode={standardModalMode}
          standard={activeStandardForModal}
          onClose={() => setStandardModalOpen(false)}
          onSave={handleSaveStandard}
        />

        {/* Modal Tambah / Edit / Review Dokumen (Level 2) */}
        <DocumentModal
          isOpen={docModalOpen}
          modalType={docModalType}
          documentData={activeDocForModal}
          onClose={() => setDocModalOpen(false)}
          onSave={handleSaveDoc}
        />
      </main>
    </div>
  
    </AuthenticatedLayout>);
}
