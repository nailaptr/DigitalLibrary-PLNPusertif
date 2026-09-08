import React from 'react';
import { RotateCcw, Check } from 'lucide-react';

export default function UserFilterPopover({
  isOpen,
  onClose,
  filterRole,
  setFilterRole,
  filterStatus,
  setFilterStatus,
  onReset,
  onApply,
}) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-12 z-30 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 transition-all duration-200 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
        <h3 className="font-bold text-slate-800 text-sm">Filter User</h3>
        <button
          onClick={onClose}
          className="text-xs text-gray-400 hover:text-gray-600 font-medium"
        >
          Tutup
        </button>
      </div>

      <div className="space-y-4">
        {/* Select Role */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Role
          </label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent bg-white font-medium text-slate-700"
          >
            <option value="Semua Role">Semua Role</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        {/* Select Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent bg-white font-medium text-slate-700"
          >
            <option value="Semua Status">Semua Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              onReset();
            }}
            className="text-xs font-semibold text-[#00838F] hover:text-[#006B7B] hover:underline px-2 py-1 flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filter</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onApply();
              onClose();
            }}
            className="px-4 py-2 bg-[#00838F] hover:bg-[#007A87] text-white text-xs font-semibold rounded-lg shadow-2xs transition flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Terapkan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
