import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import StandardCardGrid from '../Components/Standard/StandardCardGrid';
import StandardModal from '../Components/Standard/StandardModal';
import DocumentTable from '../Components/Standard/DocumentTable';
import DocumentModal from '../Components/Standard/DocumentModal';

export default function StandardManagement({ onNavigate }) {
  const [activeMenu, setActiveMenu] = useState('Standar');

  // Navigation Level State: 'level1' (Standard Cards) | 'level2' (Document Table)
  const [level, setLevel] = useState('level1');
  const [selectedStandard, setSelectedStandard] = useState(null);

  // Mock Standards List
  const [standards, setStandards] = useState([
    {
      id: 'std-1',
      name: 'ISO 9001:2015',
      description: 'Sistem Manajemen Mutu standar internasional untuk sertifikasi PLN Pusertif.',
      docCount: 25,
      publishCount: 10,
      createdAt: '14 November 2025, 14:59 PM',
      updatedAt: '17 November 2025, 14:59 PM',
    },
    {
      id: 'std-2',
      name: 'ISO 14001:2015',
      description: 'Sistem Manajemen Lingkungan untuk operasional dan fasilitas penerbitan sertifikat.',
      docCount: 25,
      publishCount: 8,
      createdAt: '12 November 2025, 10:00 AM',
      updatedAt: '16 November 2025, 11:20 AM',
    },
    {
      id: 'std-3',
      name: 'ISO 45001:2018',
      description: 'Sistem Manajemen Keselamatan dan Kesehatan Kerja (K3) industri ketenagalistrikan.',
      docCount: 25,
      publishCount: 12,
      createdAt: '10 November 2025, 08:30 AM',
      updatedAt: '15 November 2025, 09:15 AM',
    },
    {
      id: 'std-4',
      name: 'ISO Lainnya',
      description: 'Kelompok standar teknis khusus, ISO 27001, ISO 17025, dan kualifikasi mutu tambahan.',
      docCount: 25,
      publishCount: 5,
      createdAt: '08 November 2025, 13:45 PM',
      updatedAt: '12 November 2025, 16:30 PM',
    },
  ]);

  // Mock Documents List (for Level 2)
  const [documents, setDocuments] = useState([
    {
      id: 'doc-1',
      code: 'DOC-ISO-9001-01',
      title: 'Prosedur Sertifikasi Produk Kabel PLN',
      jenis: 'Prosedur',
      bidang: 'Bidang A',
      status: 'Draft',
      updatedAt: '21/11/2025, 09:41 AM',
    },
    {
      id: 'doc-2',
      code: 'DOC-ISO-9001-02',
      title: 'Manual Mutu Laboratorium Pusertif',
      jenis: 'Manual',
      bidang: 'Bidang B',
      status: 'Relevan',
      updatedAt: '20/11/2025, 14:15 PM',
    },
    {
      id: 'doc-3',
      code: 'DOC-ISO-9001-03',
      title: 'Instruksi Kerja Pengujian Trafo Distribusi',
      jenis: 'Instruksi Kerja',
      bidang: 'Bidang C',
      status: 'Revisi',
      updatedAt: '19/11/2025, 11:30 AM',
    },
    {
      id: 'doc-4',
      code: 'DOC-ISO-9001-04',
      title: 'Formulir Audit Internal Sistem Mutu',
      jenis: 'Formulir',
      bidang: 'Bidang D',
      status: 'Tidak Relevan',
      updatedAt: '18/11/2025, 16:20 PM',
    },
    {
      id: 'doc-5',
      code: 'DOC-ISO-9001-05',
      title: 'Prosedur Kalibrasi Alat Ukur Listrik',
      jenis: 'Prosedur',
      bidang: 'Bidang A',
      status: 'Relevan',
      updatedAt: '17/11/2025, 08:45 AM',
    },
    {
      id: 'doc-6',
      code: 'DOC-ISO-9001-06',
      title: 'Manual Keselamatan Operasional PLN',
      jenis: 'Manual',
      bidang: 'Bidang B',
      status: 'Draft',
      updatedAt: '16/11/2025, 13:10 PM',
    },
  ]);

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
      const newStd = {
        ...stdData,
        id: `std-${Date.now()}`,
        docCount: 0,
        publishCount: 0,
        createdAt: '17 November 2025, 15:00 PM',
        updatedAt: '17 November 2025, 15:00 PM',
      };
      setStandards((prev) => [newStd, ...prev]);
    } else {
      setStandards((prev) =>
        prev.map((s) => (s.id === stdData.id ? { ...s, ...stdData, updatedAt: '17 November 2025, 15:30 PM' } : s))
      );
    }
    setStandardModalOpen(false);
  };

  const handleDeleteStandard = (std) => {
    if (confirm(`Apakah Anda yakin ingin menghapus standar "${std.name}"?`)) {
      setStandards((prev) => prev.filter((s) => s.id !== std.id));
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
  );
}
