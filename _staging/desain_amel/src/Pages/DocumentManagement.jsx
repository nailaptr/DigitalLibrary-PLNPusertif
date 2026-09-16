import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import DocumentList from '../Components/Document/DocumentList';
import DocumentForm from '../Components/Document/DocumentForm';
import DocumentDetail from '../Components/Document/DocumentDetail';

export default function DocumentManagement({ onNavigate }) {
  const [activeMenu, setActiveMenu] = useState('Dokumen');

  // Navigation Level State: 'level1' (Document List) | 'level2_add' | 'level2_edit' | 'level3_detail'
  const [level, setLevel] = useState('level1');
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Mock Standards List for quick summary and dropdowns
  const [standards] = useState([
    { id: 'std-1', name: 'ISO 9001:2015', description: 'Sistem Manajemen Mutu PLN Pusertif.', docCount: 25 },
    { id: 'std-2', name: 'ISO 14001:2015', description: 'Sistem Manajemen Lingkungan fasilitas penerbitan.', docCount: 25 },
    { id: 'std-3', name: 'ISO 45001:2018', description: 'Sistem Manajemen K3 industri ketenagalistrikan.', docCount: 25 },
    { id: 'std-4', name: 'ISO Lainnya', description: 'Standar teknis khusus & akreditasi laboratorium.', docCount: 25 },
  ]);

  // Mock Documents State
  const [documents, setDocuments] = useState([
    {
      id: 'doc-101',
      code: 'DOC-2025-001',
      title: 'Prosedur Sertifikasi Produk Kabel PLN',
      jenis: 'Prosedur',
      bidang: 'Bidang A',
      status: 'Draft',
      uploadDate: '2025-11-21',
      updatedAt: '21/11/2025, 09:41 AM',
      fileName: 'Prosedur_Sertifikasi_Kabel_PLN.pdf',
      fileSize: '4.2 MB',
      sdgRelations: [
        {
          id: 'sdg-1',
          standard: 'ISO 9001:2015',
          clause: 'Klausul 4: Konteks Organisasi',
          subClause: 'Sub 4.1: Memahami Organisasi & Konteksnya',
          isPrimary: true,
        },
        {
          id: 'sdg-2',
          standard: 'ISO 14001:2015',
          clause: 'Klausul 8: Operasional',
          subClause: 'Sub 8.1: Perencanaan & Pengendalian Operasional',
          isPrimary: false,
        },
      ],
    },
    {
      id: 'doc-102',
      code: 'DOC-2025-002',
      title: 'Manual Mutu Laboratorium Pusertif',
      jenis: 'Manual',
      bidang: 'Bidang B',
      status: 'Relevan',
      uploadDate: '2025-11-20',
      updatedAt: '20/11/2025, 14:15 PM',
      fileName: 'Manual_Mutu_Laboratorium.pdf',
      fileSize: '8.5 MB',
      reviewData: {
        reviewerWho: 'Jane Smith (Senior Auditor PLN)',
        reviewerWhen: '20/11/2025',
        reviewResult: 'Relevan',
        reviewStatus: 'Relevan',
        reviewNotes: 'Dokumen lengkap dan telah terakreditasi KAN sesuai ISO 17025 & ISO 9001.',
      },
      sdgRelations: [
        {
          id: 'sdg-1',
          standard: 'ISO 9001:2015',
          clause: 'Klausul 5: Kepemimpinan',
          subClause: 'Sub 5.1: Kepemimpinan & Komitmen',
          isPrimary: true,
        },
      ],
    },
    {
      id: 'doc-103',
      code: 'DOC-2025-003',
      title: 'Instruksi Kerja Pengujian Trafo Distribusi',
      jenis: 'Instruksi Kerja',
      bidang: 'Bidang C',
      status: 'Revisi',
      uploadDate: '2025-11-19',
      updatedAt: '19/11/2025, 11:30 AM',
      fileName: 'IK_Pengujian_Trafo.pdf',
      fileSize: '3.1 MB',
      reviewData: {
        reviewerWho: 'Budi Santoso (Manajer Mutu)',
        reviewerWhen: '19/11/2025',
        reviewResult: 'Revisi',
        reviewStatus: 'Revisi',
        reviewNotes: 'Perlu pembaruan toleransi suhu batas uji sesuai standar SPLN terbaru.',
      },
      sdgRelations: [
        {
          id: 'sdg-1',
          standard: 'ISO 45001:2018',
          clause: 'Klausul 6: Perencanaan',
          subClause: 'Sub 6.1: Tindakan Mengatasi Risiko',
          isPrimary: true,
        },
      ],
    },
    {
      id: 'doc-104',
      code: 'DOC-2025-004',
      title: 'Formulir Audit Internal Sistem Mutu',
      jenis: 'Formulir',
      bidang: 'Bidang D',
      status: 'Tidak Relevan',
      uploadDate: '2025-11-18',
      updatedAt: '18/11/2025, 16:20 PM',
      fileName: 'Formulir_Audit_Internal.pdf',
      fileSize: '1.8 MB',
      sdgRelations: [
        {
          id: 'sdg-1',
          standard: 'ISO Lainnya',
          clause: 'Klausul 7: Dukungan',
          subClause: 'Sub 7.5: Informasi Terdokumentasi',
          isPrimary: true,
        },
      ],
    },
    {
      id: 'doc-105',
      code: 'DOC-2025-005',
      title: 'Prosedur Kalibrasi Alat Ukur Listrik',
      jenis: 'Prosedur',
      bidang: 'Bidang A',
      status: 'Pending',
      uploadDate: '2025-11-17',
      updatedAt: '17/11/2025, 08:45 AM',
      fileName: 'Prosedur_Kalibrasi_Alat_Ukur.pdf',
      fileSize: '5.4 MB',
      sdgRelations: [
        {
          id: 'sdg-1',
          standard: 'ISO 9001:2015',
          clause: 'Klausul 8: Operasional',
          subClause: 'Sub 8.1: Perencanaan & Pengendalian Operasional',
          isPrimary: true,
        },
      ],
    },
  ]);

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
    if (level === 'level2_add') {
      const newDoc = {
        ...docData,
        id: `doc-${Date.now()}`,
        code: `DOC-2025-00${documents.length + 1}`,
      };
      setDocuments((prev) => [newDoc, ...prev]);
    } else if (level === 'level2_edit') {
      setDocuments((prev) =>
        prev.map((d) => (d.id === docData.id ? { ...d, ...docData } : d))
      );
    }
    setLevel('level1');
    setSelectedDoc(null);
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
  );
}
