import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Check, ChevronRight } from 'lucide-react';

export default function UserForm({
  mode = 'add', // 'add' | 'edit'
  user = null,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    role: user?.role || 'Admin',
    status: user?.status || 'Active',
  });

  const [showPassword, setShowPassword] = useState(false);

  // Password Validation Logic
  const hasLetterAndNumber =
    /[a-zA-Z]/.test(formData.password) && /\d/.test(formData.password);
  const isEightChars = formData.password.length >= 8;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...user,
      ...formData,
    });
  };

  const titleText = mode === 'edit' ? 'Edit User' : 'Tambah User';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb & Title Header */}
      <div>
        <nav className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-2">
          <button
            type="button"
            onClick={onCancel}
            className="hover:text-[#00838F] transition"
          >
            Manajemen User
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-bold">{titleText}</span>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 text-gray-500 hover:text-slate-800 hover:bg-gray-100 rounded-lg transition"
            title="Kembali ke Manajemen User"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            {titleText}
          </h1>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-6">
        {/* Row 1: Nama (Full Width) */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">
            Nama <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama calon user"
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent font-medium text-slate-800 bg-white"
          />
        </div>

        {/* Row 2: Email & Password (2 Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@sdgs-unj.com"
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent font-medium text-slate-800 bg-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Password {mode === 'add' && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required={mode === 'add'}
                value={formData.password}
                onChange={handleChange}
                placeholder={mode === 'edit' ? 'Isi jika ingin merubah password' : 'Masukkan password'}
                className="w-full pl-4 pr-11 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent font-medium text-slate-800 bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Requirements Helper Text */}
            <div className="mt-2.5 space-y-1">
              <div className={`flex items-center gap-1.5 text-xs font-medium ${hasLetterAndNumber ? 'text-emerald-600 font-semibold' : 'text-gray-400'}`}>
                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${hasLetterAndNumber ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-500'}`}>
                  ✓
                </span>
                <span>Mengandung huruf dan angka</span>
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-medium ${isEightChars ? 'text-emerald-600 font-semibold' : 'text-gray-400'}`}>
                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${isEightChars ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-500'}`}>
                  ✓
                </span>
                <span>Terdiri dari 8 karakter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Role & Status (2 Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Role */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent font-medium text-slate-800 bg-white"
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent font-medium text-slate-800 bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <p className="text-xs text-gray-400 italic mt-1.5">
              * Hanya user aktif yang bisa login ke portal admin
            </p>
          </div>
        </div>

        {/* Form Footer Buttons (Kanan Bawah) */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 text-xs font-bold border border-gray-300 text-slate-700 hover:bg-gray-50 rounded-lg transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-bold bg-[#00838F] hover:bg-[#007A87] text-white rounded-lg transition shadow-xs"
          >
            {mode === 'edit' ? 'Edit User' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  );
}
