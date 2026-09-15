import React, { useState } from 'react';
import {
  Users,
  CheckCircle,
  Search,
  SlidersHorizontal,
  Plus,
  Eye,
  Edit3,
  Trash2,
  ChevronUp,
  ChevronDown,
  Check
} from 'lucide-react';
import UserFilterPopover from './UserFilterPopover';

export default function UserTable({
  users,
  onViewDetail,
  onEditUser,
  onDeleteUser,
  onAddUser,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('Semua Role');
  const [filterStatus, setFilterStatus] = useState('Semua Status');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      filterRole === 'Semua Role' || user.role === filterRole;
    const matchesStatus =
      filterStatus === 'Semua Status' || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const activeUserCount = users.filter((u) => u.status === 'Active').length;

  const handleResetFilter = () => {
    setFilterRole('Semua Role');
    setFilterStatus('Semua Status');
    setSearchTerm('');
  };

  return (
    <div className="space-y-6">
      {/* Header & Top Stat Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manajemen User
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Kelola user portal admin PLN Pusertif
          </p>
        </div>
      </div>

      {/* Grid Stat Cards (2 Kolom) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1: Total User */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total User
            </p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              {users.length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#00838F]/10 text-[#00838F] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: User Aktif */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              User Aktif
            </p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              {activeUserCount}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#00838F]/10 text-[#00838F] flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Table Card Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-5 space-y-4">
        {/* Action Bar Above Table */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 relative">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari User..."
                className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent bg-white shadow-2xs font-medium text-slate-700"
              />
            </div>

            {/* Filter Toggle Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border transition shadow-2xs ${
                  isFilterOpen || filterRole !== 'Semua Role' || filterStatus !== 'Semua Status'
                    ? 'border-[#00838F] bg-[#00838F]/10 text-[#00838F]'
                    : 'border-gray-300 text-slate-700 hover:bg-gray-50'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filter</span>
                {isFilterOpen ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Filter Popover Component */}
              <UserFilterPopover
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filterRole={filterRole}
                setFilterRole={setFilterRole}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                onReset={handleResetFilter}
                onApply={() => setIsFilterOpen(false)}
              />
            </div>
          </div>

          {/* Add User Button (Right) */}
          <button
            type="button"
            onClick={onAddUser}
            className="w-full sm:w-auto px-4 py-2.5 bg-[#00838F] hover:bg-[#007A87] text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah User</span>
          </button>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            {/* Table Header Bar */}
            <thead>
              <tr className="bg-[#00838F] text-white text-xs uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 font-bold rounded-tl-lg">Nama</th>
                <th className="py-3.5 px-4 font-bold">Role</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold">Dibuat</th>
                <th className="py-3.5 px-4 font-bold text-center rounded-tr-lg">Aksi</th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="divide-y divide-gray-200 text-xs font-medium text-slate-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Nama + Subtext Email */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">
                        {user.name}
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5">
                        {user.email}
                      </div>
                    </td>

                    {/* Role Badge (Kuning Pucat) */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#FEF08A] text-yellow-900 text-xs font-bold shadow-2xs">
                        {user.role}
                      </span>
                    </td>

                    {/* Status Badge (Hijau Tua Capsule) */}
                    <td className="py-3.5 px-4">
                      {user.status === 'Active' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#2E6B12] text-white text-xs font-bold shadow-2xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-500 text-white text-xs font-bold shadow-2xs">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Dibuat (Tanggal) */}
                    <td className="py-3.5 px-4 text-gray-500 font-medium">
                      {user.createdAtDate || 'Nov 15, 2025'}
                    </td>

                    {/* Aksi (3 Icon: Eye, Edit3, Trash2) */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Eye Icon (Teal) */}
                        <button
                          type="button"
                          onClick={() => onViewDetail(user)}
                          className="p-1.5 text-[#00838F] hover:bg-[#00838F]/10 rounded-lg transition"
                          title="Lihat Detail User"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Edit3 Icon (Teal) */}
                        <button
                          type="button"
                          onClick={() => onEditUser(user)}
                          className="p-1.5 text-[#00838F] hover:bg-[#00838F]/10 rounded-lg transition"
                          title="Edit User"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Trash2 Icon (Red) */}
                        <button
                          type="button"
                          onClick={() => onDeleteUser(user)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Hapus User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-400 text-sm font-medium">
                    Tidak ada data user yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
