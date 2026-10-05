import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import { Plus, Edit2, Trash2, Calendar, FileText, Download, Building2 } from 'lucide-react';

export default function CertificateManagement({ onNavigate, initialCertificates = [] }) {
  const [activeMenu, setActiveMenu] = useState('Sertifikat');
  const certificates = initialCertificates;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [activeCert, setActiveCert] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    valid_until: '',
    description: '',
    upload_date: new Date().toISOString().split('T')[0],
    file: null,
  });

  const handleOpenAdd = () => {
    setModalMode('add');
    setActiveCert(null);
    setFormData({
      name: '',
      issuer: '',
      valid_until: '',
      description: '',
      upload_date: new Date().toISOString().split('T')[0],
      file: null,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setModalMode('edit');
    setActiveCert(cert);
    setFormData({
      name: cert.name,
      issuer: cert.issuer,
      valid_until: cert.validUntil || '',
      description: cert.description || '',
      upload_date: cert.uploadDate || new Date().toISOString().split('T')[0],
      file: null,
    });
    setModalOpen(true);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
        data.append(key, formData[key]);
      }
    }

    if (modalMode === 'add') {
      router.post(route('certificates.store'), data, {
        onSuccess: () => setModalOpen(false),
      });
    } else {
      data.append('_method', 'PUT');
      router.post(route('certificates.update', activeCert.id), data, {
        onSuccess: () => setModalOpen(false),
      });
    }
  };

  const handleDelete = (cert) => {
    if (confirm(`Apakah Anda yakin ingin menghapus sertifikat "${cert.name}"?`)) {
      router.delete(route('certificates.destroy', cert.id));
    }
  };

  const handleSidebarMenuSelect = (menuName) => {
    setActiveMenu(menuName);
    if (onNavigate) {
      onNavigate(menuName);
    }
  };

  return (
    <AuthenticatedLayout user={ { name: 'Admin User' } }>
      <div className="flex h-screen bg-[#F4F6F8] overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
        <Sidebar activeItem={activeMenu} onSelectMenu={handleSidebarMenuSelect} />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto min-h-screen">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Manajemen Sertifikat</h1>
              <p className="text-sm text-slate-500 mt-1">Kelola data sertifikat PLN Pusertif</p>
            </div>
            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 bg-[#00A2B9] hover:bg-[#008A9E] text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition"
            >
              <Plus className="w-5 h-5" />
              Tambah Sertifikat
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div key={cert.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 bg-[#00A2B9]/10 rounded-lg">
                      <Building2 className="w-6 h-6 text-[#00A2B9]" />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cert.status === 'aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {cert.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="mt-4 font-bold text-slate-800 text-lg leading-snug line-clamp-2">{cert.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{cert.issuer}</p>
                </div>
                
                <div className="mt-5 space-y-2 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Berlaku s/d: {cert.validUntil || 'Selamanya'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span>{cert.fileName || 'Belum ada file'} {cert.fileSize && `(${cert.fileSize})`}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  {cert.fileName ? (
                    <button className="text-[#00A2B9] hover:text-[#008A9E] font-medium text-sm flex items-center gap-1">
                      <Download className="w-4 h-4" /> Unduh File
                    </button>
                  ) : (
                    <span className="text-slate-400 text-sm">Tidak ada file</span>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(cert)}
                      className="p-1.5 text-slate-400 hover:text-[#00A2B9] bg-slate-50 hover:bg-[#00A2B9]/10 rounded-md transition"
                      title="Edit Sertifikat"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cert)}
                      className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50 rounded-md transition"
                      title="Hapus Sertifikat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {certificates.length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-500">
                Belum ada sertifikat yang diunggah.
              </div>
            )}
          </div>
        </main>

        {modalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-800">
                  {modalMode === 'add' ? 'Tambah Sertifikat Baru' : 'Edit Sertifikat'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>
              
              <div className="p-5 overflow-y-auto">
                <form id="cert-form" onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Sertifikat *</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-[#00A2B9] focus:ring-1 focus:ring-[#00A2B9] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Penerbit *</label>
                    <input type="text" required value={formData.issuer} onChange={e => setFormData({...formData, issuer: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-[#00A2B9] focus:ring-1 focus:ring-[#00A2B9] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Berlaku Sampai</label>
                    <input type="date" value={formData.valid_until} onChange={e => setFormData({...formData, valid_until: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-[#00A2B9] focus:ring-1 focus:ring-[#00A2B9] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal Unggah *</label>
                    <input type="date" required value={formData.upload_date} onChange={e => setFormData({...formData, upload_date: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-[#00A2B9] focus:ring-1 focus:ring-[#00A2B9] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi</label>
                    <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-[#00A2B9] focus:ring-1 focus:ring-[#00A2B9] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">File Dokumen (Opsional saat edit)</label>
                    <input type="file" onChange={handleFileChange} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#00A2B9] hover:file:bg-blue-100" />
                  </div>
                </form>
              </div>
              
              <div className="p-5 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-slate-600 text-sm font-semibold hover:bg-slate-200 rounded-lg transition">Batal</button>
                <button type="submit" form="cert-form" className="px-4 py-2 bg-[#00A2B9] hover:bg-[#008A9E] text-white text-sm font-semibold rounded-lg transition">Simpan</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
