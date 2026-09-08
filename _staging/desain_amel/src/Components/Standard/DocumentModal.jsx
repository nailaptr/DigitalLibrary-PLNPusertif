import React, { useState, useEffect } from 'react';
import { X, FileText, Check, FileCheck } from 'lucide-react';

export default function DocumentModal({
  isOpen,
  modalType = 'doc', // 'doc' (Add/Edit) | 'review' (Review status)
  documentData = null,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [jenis, setJenis] = useState('Manual');
  const [bidang, setBidang] = useState('Bidang A');
  const [status, setStatus] = useState('Draft');
  const [reviewNote, setReviewNote] = useState('');

  useEffect(() => {
    if (documentData) {
      setTitle(documentData.title || '');
      setCode(documentData.code || '');
      setJenis(documentData.jenis || 'Manual');
      setBidang(documentData.bidang || 'Bidang A');
      setStatus(documentData.status || 'Draft');
      setReviewNote(documentData.reviewNote || '');
    } else {
      setTitle('');
      setCode('');
      setJenis('Manual');
      setBidang('Bidang A');
      setStatus('Draft');
      setReviewNote('');
    }
  }, [documentData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'doc' && !title.trim()) return;

    onSave({
      ...documentData,
      title: title || documentData?.title || 'Dokumen Barcode ISO',
      code: code || documentData?.code || 'DOC-2025-001',
      jenis,
      bidang,
      status,
      reviewNote,
      updatedAt: '21/11/2025, 10:30 AM',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00838F]/10 text-[#00838F] flex items-center justify-center font-bold">
              {modalType === 'review' ? <FileCheck className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            </div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              {modalType === 'review'
                ? `Review Dokumen - ${documentData?.title}`
                : documentData
                ? 'Edit Dokumen'
                : 'Tambah Dokumen Baru'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {modalType === 'doc' ? (
            <>
              {/* Nama Dokumen */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Nama Dokumen <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masukkan judul / nama dokumen"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent font-medium text-slate-800 bg-white"
                />
              </div>

              {/* Kode Dokumen */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Kode / Nomor Dokumen
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Contoh: DOC-ISO-9001-01"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent font-medium text-slate-800 bg-white"
                />
              </div>

              {/* Grid 2 Kolom: Jenis & Bidang */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Jenis Dokumen <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={jenis}
                    onChange={(e) => setJenis(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent font-semibold text-slate-800 bg-white"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Prosedur">Prosedur</option>
                    <option value="Instruksi Kerja">Instruksi Kerja</option>
                    <option value="Formulir">Formulir</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Bidang <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={bidang}
                    onChange={(e) => setBidang(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent font-semibold text-slate-800 bg-white"
                  >
                    <option value="Bidang A">Bidang A</option>
                    <option value="Bidang B">Bidang B</option>
                    <option value="Bidang C">Bidang C</option>
                    <option value="Bidang D">Bidang D</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Status Dokumen <span className="text-red-500">*</span>
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent font-semibold text-slate-800 bg-white"
                >
                  <option value="Draft">Draft</option>
                  <option value="Relevan">Relevan</option>
                  <option value="Revisi">Revisi</option>
                  <option value="Tidak Relevan">Tidak Relevan</option>
                </select>
              </div>
            </>
          ) : (
            <>
              {/* Review Modal Form Controls */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                <p className="text-xs font-bold text-slate-700">Dokumen:</p>
                <p className="text-sm font-extrabold text-slate-900 mt-0.5">{documentData?.title}</p>
                <p className="text-xs text-gray-500 font-medium mt-1">{documentData?.jenis} • {documentData?.bidang}</p>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Hasil Review Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent font-bold text-slate-800 bg-white"
                >
                  <option value="Relevan">Relevan (Disetujui)</option>
                  <option value="Revisi">Revisi (Perlu Perbaikan)</option>
                  <option value="Tidak Relevan">Tidak Relevan (Ditolak)</option>
                  <option value="Draft">Draft (Belum Selesai)</option>
                </select>
              </div>

              {/* Review Note */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Catatan Reviewer
                </label>
                <textarea
                  rows={3}
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder="Berikan catatan atau instruksi review untuk dokumen ini..."
                  className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent font-medium text-slate-800 bg-white resize-none"
                />
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold border border-gray-300 text-slate-700 hover:bg-gray-50 rounded-xl transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold bg-[#00838F] hover:bg-[#007A87] text-white rounded-xl transition shadow-xs flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Simpan Dokumen</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
