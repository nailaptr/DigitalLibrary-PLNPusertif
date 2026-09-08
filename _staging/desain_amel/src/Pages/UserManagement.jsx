import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import UserTable from '../Components/UserTable';
import UserForm from '../Components/UserForm';
import UserDetailModal from '../Components/UserDetailModal';
import UserDeleteModal from '../Components/UserDeleteModal';

export default function UserManagement({ onNavigate }) {
  const [activeMenu, setActiveMenu] = useState('Manajemen User');
  
  // Initial Mock Users List
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@sdgs-unj.com',
      role: 'Admin',
      status: 'Active',
      createdAtDate: 'Nov 15, 2025',
      createdAt: '14 November 2025, 14:59PM',
      updatedAt: '17 November 2025, 14:59PM',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@pln.co.id',
      role: 'Manager',
      status: 'Active',
      createdAtDate: 'Nov 14, 2025',
      createdAt: '14 November 2025, 10:00AM',
      updatedAt: '16 November 2025, 11:20AM',
    },
    {
      id: 3,
      name: 'Budi Santoso',
      email: 'budi.s@pln.co.id',
      role: 'Staff',
      status: 'Active',
      createdAtDate: 'Nov 12, 2025',
      createdAt: '12 November 2025, 08:30AM',
      updatedAt: '15 November 2025, 09:15AM',
    },
    {
      id: 4,
      name: 'Siti Aminah',
      email: 'siti.a@pln.co.id',
      role: 'Staff',
      status: 'Active',
      createdAtDate: 'Nov 10, 2025',
      createdAt: '10 November 2025, 13:45PM',
      updatedAt: '12 November 2025, 16:30PM',
    },
  ]);

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
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleSaveUser = (userData) => {
    if (currentView === 'add') {
      const newUser = {
        ...userData,
        id: Date.now(),
        createdAtDate: 'Nov 17, 2025',
        createdAt: '17 November 2025, 15:00PM',
        updatedAt: '17 November 2025, 15:00PM',
      };
      setUsers((prev) => [newUser, ...prev]);
    } else if (currentView === 'edit') {
      setUsers((prev) =>
        prev.map((u) => (u.id === userData.id ? { ...u, ...userData, updatedAt: '17 November 2025, 15:30PM' } : u))
      );
    }
    setCurrentView('table');
    setSelectedUser(null);
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
        {currentView === 'table' && (
          <UserTable
            users={users}
            onViewDetail={handleViewDetail}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
            onAddUser={() => setCurrentView('add')}
          />
        )}

        {currentView === 'add' && (
          <UserForm
            mode="add"
            onSave={handleSaveUser}
            onCancel={() => setCurrentView('table')}
          />
        )}

        {currentView === 'edit' && (
          <UserForm
            mode="edit"
            user={selectedUser}
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
            setCurrentView('edit');
          }}
          onDelete={(user) => {
            setUserToDelete(user);
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
  );
}
