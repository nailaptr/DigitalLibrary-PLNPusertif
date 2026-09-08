import React from 'react';
import { X, Clock, Edit3, Trash2 } from 'lucide-react';

export default function UserDetailModal({
  isOpen,
  onClose,
  user,
  onEdit,
  onDelete,
}) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Banner Header Gradient Ungu */}
        <div className="bg-gradient-to-r from-[#8B5CF6] via-[#9333EA] to-[#A855F7] p-6 text-white relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges Top Right */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-[#2E6B12] text-white text-xs font-bold rounded-full shadow-xs tracking-wide">
              {user.status || 'Active'}
            </span>
            <span className="px-3 py-1 bg-[#FEF08A] text-yellow-900 text-xs font-bold rounded-full shadow-xs">
              {user.role || 'Admin'}
            </span>
          </div>

          {/* User Name & Email */}
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {user.name}
          </h2>
          <p className="text-purple-100 text-sm font-medium mt-0.5">
            {user.email}
          </p>
        </div>

        {/* Modal Body / Content */}
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-200 mb-4">
              <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase">
                Log Aktivitas
              </h3>
              <span className="text-xs text-gray-400 font-medium">Riwayat Perubahan</span>
            </div>

            {/* Log Item 1 */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="p-2 bg-slate-200/70 text-slate-600 rounded-lg shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-500">Dibuat Pada</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {user.createdAt || '14 November 2025, 14:59PM'}
                  </p>
                </div>
              </div>

              {/* Log Item 2 */}
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="p-2 bg-slate-200/70 text-slate-600 rounded-lg shrink-0 mt-0.5">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-500">Terakhir Diedit Pada</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {user.updatedAt || '17 November 2025, 14:59PM'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onDelete(user);
            }}
            className="w-full border border-red-500 text-red-600 hover:bg-red-50 font-semibold py-2.5 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Hapus User</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(user);
            }}
            className="w-full bg-[#00838F] hover:bg-[#007A87] text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-xs"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit User</span>
          </button>
        </div>
      </div>
    </div>
  );
}
