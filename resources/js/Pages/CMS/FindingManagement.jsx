import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import FindingTable from '@/Components/FindingTable';
import FindingForm from '@/Components/FindingForm';
import FindingDetailModal from '@/Components/FindingDetailModal';
import FindingDeleteModal from '@/Components/FindingDeleteModal';
import { router, usePage } from '@inertiajs/react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export default function FindingManagement({ auth, findings, filters }) {
  const { errors } = usePage().props;
  const [activeMenu, setActiveMenu] = useState('Monitoring Temuan');
  
  const [currentView, setCurrentView] = useState('table');
  const [selectedFinding, setSelectedFinding] = useState(null);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [findingToDelete, setFindingToDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [notice, setNotice] = useState(null); // { type: 'success' | 'error', message }

  const handleViewDetail = (finding) => {
    setSelectedFinding(finding);
    setDetailModalOpen(true);
  };

  const handleEditFinding = (finding) => {
    setSelectedFinding(finding);
    setCurrentView('edit');
  };

  const handleDeleteFinding = (finding) => {
    setFindingToDelete(finding);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = (findingId) => {
    setDeleting(true);
    setNotice(null);
    router.delete(route('findings.destroy', findingId), {
      onSuccess: () => {
        setDeleteModalOpen(false);
        setFindingToDelete(null);
        setNotice({ type: 'success', message: 'Data temuan berhasil dihapus.' });
      },
      onError: () => setNotice({ type: 'error', message: 'Gagal menghapus data temuan. Silakan coba lagi.' }),
      onFinish: () => setDeleting(false),
    });
  };

  const handleSaveFinding = (findingData) => {
    setSaving(true);
    setNotice(null);
    const done = {
      onSuccess: () => {
        setCurrentView('table');
        setSelectedFinding(null);
        setNotice({
          type: 'success',
          message: currentView === 'add' ? 'Data temuan berhasil disimpan.' : 'Perubahan data temuan berhasil disimpan.',
        });
      },
      onError: () => setNotice({ type: 'error', message: 'Gagal menyimpan. Periksa kembali isian formulir.' }),
      onFinish: () => setSaving(false),
    };
    if (currentView === 'add') {
      router.post(route('findings.store'), findingData, done);
    } else if (currentView === 'edit') {
      router.put(route('findings.update', findingData.id), findingData, done);
    }
  };

  const handlePublishToggle = (finding) => {
    setNotice(null);
    const done = {
      onSuccess: () => setNotice({
        type: 'success',
        message: finding.is_published ? 'Temuan berhasil di-unpublish (tidak lagi tampil di publik).' : 'Temuan berhasil dipublish ke publik.',
      }),
      onError: () => setNotice({ type: 'error', message: 'Gagal mengubah status publish. Silakan coba lagi.' }),
    };
    if (finding.is_published) {
      router.post(route('findings.unpublish', finding.id), {}, done);
    } else {
      router.post(route('findings.publish', finding.id), {}, done);
    }
  };

  const handleSidebarMenuSelect = (menuName) => {
    setActiveMenu(menuName);
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="flex h-screen bg-[#F4F6F8] overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
        <Sidebar activeItem={activeMenu} onSelectMenu={handleSidebarMenuSelect} />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto min-h-screen">
          {currentView === 'table' && notice && (
            <div
              role={notice.type === 'error' ? 'alert' : 'status'}
              className={`mb-4 flex items-start gap-3 rounded-xl border px-4 py-3 text-xs font-semibold ${
                notice.type === 'error'
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}
            >
              {notice.type === 'error'
                ? <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                : <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />}
              <p className="flex-1">{notice.message}</p>
              <button
                type="button"
                onClick={() => setNotice(null)}
                aria-label="Tutup notifikasi"
                className="p-0.5 rounded hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          )}
          {currentView === 'table' && (
            <FindingTable
              findings={findings}
              filters={filters}
              onViewDetail={handleViewDetail}
              onEditFinding={handleEditFinding}
              onDeleteFinding={handleDeleteFinding}
              onAddFinding={() => setCurrentView('add')}
              onPublishToggle={handlePublishToggle}
            />
          )}

          {currentView === 'add' && (
            <FindingForm
              mode="add"
              errors={errors}
              isSubmitting={saving}
              onSave={handleSaveFinding}
              onCancel={() => { setNotice(null); setCurrentView('table'); }}
            />
          )}

          {currentView === 'edit' && (
            <FindingForm
              mode="edit"
              finding={selectedFinding}
              errors={errors}
              isSubmitting={saving}
              onSave={handleSaveFinding}
              onCancel={() => {
                setNotice(null);
                setCurrentView('table');
                setSelectedFinding(null);
              }}
            />
          )}

          <FindingDetailModal
            isOpen={detailModalOpen}
            onClose={() => setDetailModalOpen(false)}
            finding={selectedFinding}
            onEdit={(finding) => {
              setSelectedFinding(finding);
              setDetailModalOpen(false);
              setCurrentView('edit');
            }}
            onDelete={(finding) => {
              setFindingToDelete(finding);
              setDetailModalOpen(false);
              setDeleteModalOpen(true);
            }}
            onPublishToggle={(finding) => {
                handlePublishToggle(finding);
                setDetailModalOpen(false);
            }}
          />

          <FindingDeleteModal
            isOpen={deleteModalOpen}
            onClose={() => { setDeleteModalOpen(false); setFindingToDelete(null); }}
            finding={findingToDelete}
            isDeleting={deleting}
            onConfirmDelete={handleConfirmDelete}
          />
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
