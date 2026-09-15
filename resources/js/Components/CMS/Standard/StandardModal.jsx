import React, { useState, useEffect } from 'react';
import { X, Trash2, Edit3, Clock, Check } from 'lucide-react';

export default function StandardModal({
  isOpen,
  mode = 'add', // 'add' | 'edit'
  standard = null,
  onClose,
  onSave,
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (standard && mode === 'edit') {
      setName(standard.name || '');
      setDescription(standard.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [standard, mode, isOpen]);

  if (!isOpen) return null;

  const MAX_CHAR = 100;

  const handleNameChange = (e) => {
    if (e.target.value.length <= MAX_CHAR) {
      setName(e.target.value);
    }
  };

  const handleDescChange = (e) => {
    if (e.target.value.length <= MAX_CHAR) {
      setDescription(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    onSave({
      ...standard,
      name,
      description,
    });
  };

  const isEdit = mode === 'edit';
  const titleText = isEdit ? 'Edit Standar' : 'Tambah Standar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00838F]/10 text-[#00838F] flex items-center justify-center font-bold">
              <Edit3 className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              {titleText}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Field 1: Nama Standar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Nama Standar <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] font-semibold text-gray-400">
                {name.length}/{MAX_CHAR} Karakter
              </span>
            </div>
            <input
              type="text"
              required
              maxLength={MAX_CHAR}
              value={name}
              onChange={handleNameChange}
              placeholder="Masukkan nama standar (misal: ISO 9001)"
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent font-medium text-slate-800 bg-white"
            />
          </div>

          {/* Field 2: Deskripsi Standar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Deskripsi Standar <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] font-semibold text-gray-400">
                {description.length}/{MAX_CHAR} Karakter
              </span>
            </div>
            <textarea
              required
              rows={3}
              maxLength={MAX_CHAR}
              value={description}
              onChange={handleDescChange}
              placeholder="Masukkan deskripsi ringkas standar..."
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent font-medium text-slate-800 bg-white resize-none"
            />
          </div>

          {/* Audit Log Section (Read-Only) for Edit Mode */}
          {isEdit && (
            <div className="pt-4 border-t border-gray-100 space-y-2.5 bg-slate-50 p-4 rounded-xl">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Audit Log
              </h4>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  Dibuat Pada
                </span>
                <span className="font-bold text-slate-800">
                  {standard?.createdAt || '14 November 2025, 14:59 PM'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200/60">
                <span className="text-gray-500 flex items-center gap-1.5 font-medium">
                  <Edit3 className="w-3.5 h-3.5 text-gray-400" />
                  Terakhir Diedit Pada
                </span>
                <span className="font-bold text-slate-800">
                  {standard?.updatedAt || '17 November 2025, 14:59 PM'}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            {/* Cancel Button (Outline Merah + Trash Icon) */}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold border border-red-500 text-red-600 hover:bg-red-50 rounded-xl transition flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>

            {/* Submit Button (Solid Teal + Edit Icon) */}
            <button
              type="submit"
              className="px-4 py-2.5 text-xs font-bold bg-[#00838F] hover:bg-[#007A87] text-white rounded-xl transition shadow-xs flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEdit ? 'Edit Standar' : 'Simpan Standar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
