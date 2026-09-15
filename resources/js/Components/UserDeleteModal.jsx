import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function UserDeleteModal({ isOpen, onClose, user, onConfirmDelete }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 overflow-hidden text-center animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">Hapus User?</h3>
        <p className="text-sm text-gray-500 mb-6">
          Apakah Anda yakin ingin menghapus user <span className="font-semibold text-slate-800">"{user.name}"</span>? Tindakan ini tidak dapat dibatalkan.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-gray-300 text-slate-700 font-semibold text-sm hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirmDelete(user.id);
              onClose();
            }}
            className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition shadow-xs"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
