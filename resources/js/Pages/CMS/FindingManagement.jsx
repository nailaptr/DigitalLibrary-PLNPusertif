import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import FindingTable from '@/Components/FindingTable';
import FindingForm from '@/Components/FindingForm';
import FindingDetailModal from '@/Components/FindingDetailModal';
import FindingDeleteModal from '@/Components/FindingDeleteModal';
import { router } from '@inertiajs/react';

export default function FindingManagement({ auth, findings, filters }) {
  const [activeMenu, setActiveMenu] = useState('Monitoring Temuan');
  
  const [currentView, setCurrentView] = useState('table');
  const [selectedFinding, setSelectedFinding] = useState(null);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [findingToDelete, setFindingToDelete] = useState(null);

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
    router.delete(route('findings.destroy', findingId), {
      onSuccess: () => setDeleteModalOpen(false)
    });
  };

  const handleSaveFinding = (findingData) => {
    if (currentView === 'add') {
      router.post(route('findings.store'), findingData, {
        onSuccess: () => {
          setCurrentView('table');
          setSelectedFinding(null);
        }
      });
    } else if (currentView === 'edit') {
      router.put(route('findings.update', findingData.id), findingData, {
        onSuccess: () => {
          setCurrentView('table');
          setSelectedFinding(null);
        }
      });
    }
  };

  const handlePublishToggle = (finding) => {
    if (finding.is_published) {
      router.post(route('findings.unpublish', finding.id));
    } else {
      router.post(route('findings.publish', finding.id));
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
              onSave={handleSaveFinding}
              onCancel={() => setCurrentView('table')}
            />
          )}

          {currentView === 'edit' && (
            <FindingForm
              mode="edit"
              finding={selectedFinding}
              onSave={handleSaveFinding}
              onCancel={() => {
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
            onClose={() => setDeleteModalOpen(false)}
            finding={findingToDelete}
            onConfirmDelete={handleConfirmDelete}
          />
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
