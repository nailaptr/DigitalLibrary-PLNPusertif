import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import UserTable from '@/Components/UserTable';
import UserForm from '@/Components/UserForm';
import UserDetailModal from '@/Components/UserDetailModal';
import UserDeleteModal from '@/Components/UserDeleteModal';
import { router } from '@inertiajs/react';

export default function UserManagement({ auth, initialUsers = [], roles = [] }) {
  const [activeMenu, setActiveMenu] = useState('Manajemen User');
  
  // View Navigation States: 'table' | 'add' | 'edit'
  const [currentView, setCurrentView] = useState('table');
  const [selectedUser, setSelectedUser] = useState(null);

  // Modal States
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Handlers
  const handleViewDetail = (user) => {
    setSelectedUser(user);
    setDetailModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setCurrentView('edit');
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = (userId) => {
    router.delete(route('users.destroy', userId), {
      onSuccess: () => setDeleteModalOpen(false)
    });
  };

  const handleSaveUser = (userData) => {
    if (currentView === 'add') {
      router.post(route('users.store'), userData, {
        onSuccess: () => {
          setCurrentView('table');
          setSelectedUser(null);
        }
      });
    } else if (currentView === 'edit') {
      router.put(route('users.update', userData.id), userData, {
        onSuccess: () => {
          setCurrentView('table');
          setSelectedUser(null);
        }
      });
    }
  };

  const handleSidebarMenuSelect = (menuName) => {
    setActiveMenu(menuName);
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="flex h-screen bg-[#F4F6F8] overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Sidebar Component */}
        <Sidebar activeItem={activeMenu} onSelectMenu={handleSidebarMenuSelect} />

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto min-h-screen">
          {currentView === 'table' && (
            <UserTable
              users={initialUsers}
              onViewDetail={handleViewDetail}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
              onAddUser={() => setCurrentView('add')}
            />
          )}

          {currentView === 'add' && (
            <UserForm
              mode="add"
              roles={roles}
              onSave={handleSaveUser}
              onCancel={() => setCurrentView('table')}
            />
          )}

          {currentView === 'edit' && (
            <UserForm
              mode="edit"
              user={selectedUser}
              roles={roles}
              onSave={handleSaveUser}
              onCancel={() => {
                setCurrentView('table');
                setSelectedUser(null);
              }}
            />
          )}

          {/* Modal Detail User Component */}
          <UserDetailModal
            isOpen={detailModalOpen}
            onClose={() => setDetailModalOpen(false)}
            user={selectedUser}
            onEdit={(user) => {
              setSelectedUser(user);
              setDetailModalOpen(false);
              setCurrentView('edit');
            }}
            onDelete={(user) => {
              setUserToDelete(user);
              setDetailModalOpen(false);
              setDeleteModalOpen(true);
            }}
          />

          {/* Modal Delete Confirmation Component */}
          <UserDeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            user={userToDelete}
            onConfirmDelete={handleConfirmDelete}
          />
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
