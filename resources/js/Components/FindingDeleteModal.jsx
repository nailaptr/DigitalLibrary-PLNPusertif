import React from 'react';
import Modal from './Modal';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function FindingDeleteModal({ isOpen, onClose, finding, onConfirmDelete }) {
  if (!finding) return null;

  return (
    <Modal show={isOpen} onClose={onClose} maxWidth="md">
      <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-red-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <AlertTriangle className="w-6 h-6" />
            <h2 className="text-lg font-bold tracking-wide">Konfirmasi Hapus</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8" />
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Hapus Temuan Ini?
          </h3>
          
          <p className="text-sm text-slate-500 mb-4">
            Anda yakin ingin menghapus data temuan <span className="font-bold text-slate-800">"{finding.finding_number || finding.finding_statement?.substring(0, 30) + '...'}"</span>?
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700 font-medium flex items-start text-left gap-2">
             <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
             <p>Data yang dihapus tidak dapat dikembalikan. Aksi ini juga akan tercatat di log aktivitas.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => onConfirmDelete(finding.id)}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow-sm"
          >
            Ya, Hapus Data
          </button>
        </div>
      </div>
    </Modal>
  );
}
