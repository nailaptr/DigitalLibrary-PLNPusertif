import React, { useState } from 'react';
import {
  ArrowLeft,
  Edit3,
  FileCheck,
  Star,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Upload,
  Calendar,
  User,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function DocumentDetail({
  documentData,
  onBack,
  onEditDoc,
  onSaveReview,
  onSaveRevision,
}) {
  if (!documentData) return null;

  const [isReviewed, setIsReviewed] = useState(
    documentData.reviewData ? true : documentData.status !== 'Draft'
  );

  // Review Form States
  const [reviewResult, setReviewResult] = useState('Relevan');
  const [reviewStatus, setReviewStatus] = useState('Relevan');
  const [reviewerWho, setReviewerWho] = useState('John Doe (Auditor Pusertif)');
  const [reviewerWhen, setReviewerWhen] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [reviewNotes, setReviewNotes] = useState('');

  // Revision Form States (Expandable)
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const [revisionTitle, setRevisionTitle] = useState(
    `${documentData.title} (Revisi v2)`
  );
  const [revisionFile, setRevisionFile] = useState(null);
  const [revisionNote, setRevisionNote] = useState('');

  // Review Submission Handler
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const updatedReview = {
      reviewerWho,
      reviewerWhen,
      reviewResult,
      reviewStatus,
      reviewNotes,
    };
    onSaveReview(documentData.id, updatedReview);
    setIsReviewed(true);
  };

  // Revision Submission Handler
  const handleRevisionSubmit = (e) => {
    e.preventDefault();
    onSaveRevision(documentData.id, {
      title: revisionTitle,
      fileName: revisionFile || 'Dokumen_Revisi_v2.pdf',
      note: revisionNote,
    });
    setShowRevisionForm(false);
  };

  // Color System badge renderer
  const renderBadge = (status) => {
    switch (status) {
      case 'Draft':
        return (
          <span className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-[#e0f2fe] text-[#0369a1] border border-[#00a8cc]">
            Draft
          </span>
        );
      case 'Relevan':
        return (
          <span className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-[#dcfce7] text-[#15803d] border border-[#16a34a] flex items-center gap-1 w-fit">
            <CheckCircle className="w-3.5 h-3.5 text-[#16a34a]" />
            Relevan
          </span>
        );
      case 'Pending':
        return (
          <span className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-[#fef3c7] text-[#b45309] border border-[#d97706]">
            Pending
          </span>
        );
      case 'Revisi':
        return (
          <span className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-[#ffedd5] text-[#c2410c] border border-[#d97706] flex items-center gap-1 w-fit">
            <AlertTriangle className="w-3.5 h-3.5 text-[#c2410c]" />
            Revisi
          </span>
        );
      case 'Tidak Relevan':
        return (
          <span className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-[#ffe4e6] text-[#be123c] border border-[#dc2626] flex items-center gap-1 w-fit">
            <XCircle className="w-3.5 h-3.5 text-[#dc2626]" />
            Tidak Relevan
          </span>
        );
      default:
        return (
          <span className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header & Back Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00838F] hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Dokumen</span>
          </button>

          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            {documentData.title}
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Kode: {documentData.code || 'DOC-2025-001'} • Diunggah {documentData.uploadDate || '21/11/2025'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {renderBadge(documentData.status)}

          <button
            type="button"
            onClick={() => onEditDoc(documentData)}
            className="px-4 py-2 bg-[#00838F] hover:bg-[#007A87] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Dokumen</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Kolom): Review Workflow & Inline Revision Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* SECTION 1: Hasil Review / Form Review */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#00838F]/10 text-[#00838F] flex items-center justify-center font-bold">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-slate-800 text-base">
                  Hasil Peninjauan (Review Workflow)
                </h2>
              </div>

              {isReviewed && (
                <button
                  type="button"
                  onClick={() => setIsReviewed(false)}
                  className="text-xs font-semibold text-[#00838F] hover:underline"
                >
                  Edit Review
                </button>
              )}
            </div>

            {/* Condition 1: Belum Direview / Edit Review Form */}
            {!isReviewed ? (
              <form onSubmit={handleReviewSubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Hasil Review */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Hasil Review <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={reviewResult}
                      onChange={(e) => setReviewResult(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] font-bold text-slate-800 bg-white"
                    >
                      <option value="Relevan">Relevan (Disetujui)</option>
                      <option value="Revisi">Revisi (Perlu Perbaikan)</option>
                      <option value="Tidak Relevan">Tidak Relevan (Ditolak)</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Status Dokumen <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={reviewStatus}
                      onChange={(e) => setReviewStatus(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] font-bold text-slate-800 bg-white"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Relevan">Relevan</option>
                      <option value="Pending">Pending</option>
                      <option value="Revisi">Revisi</option>
                      <option value="Tidak Relevan">Tidak Relevan</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Who (Reviewer) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Who (Nama Reviewer) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewerWho}
                      onChange={(e) => setReviewerWho(e.target.value)}
                      placeholder="Masukkan nama peninjau"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] font-medium text-slate-800 bg-white"
                    />
                  </div>

                  {/* When (Tanggal) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      When (Tanggal Peninjauan) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={reviewerWhen}
                      onChange={(e) => setReviewerWhen(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] font-medium text-slate-800 bg-white"
                    />
                  </div>
                </div>

                {/* Catatan */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Catatan Reviewer (Opsional)
                  </label>
                  <textarea
                    rows={3}
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Masukkan uraian atau instruksi hasil peninjauan..."
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] font-medium text-slate-800 bg-white resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewed(true)}
                    className="px-4 py-2 text-xs font-bold border border-gray-300 text-slate-700 hover:bg-gray-50 rounded-xl transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#00838F] hover:bg-[#007A87] text-white text-xs font-bold rounded-xl shadow-xs transition"
                  >
                    Ajukan Hasil Review
                  </button>
                </div>
              </form>
            ) : (
              /* Condition 2: Sudah Direview Display Banner */
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Hasil Review Status:
                      </span>
                      {renderBadge(documentData.reviewData?.reviewResult || documentData.status)}
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      Peninjauan dilakukan oleh{' '}
                      <span className="font-bold text-slate-800">
                        {documentData.reviewData?.reviewerWho || 'John Doe (Auditor Pusertif)'}
                      </span>{' '}
                      pada tanggal{' '}
                      <span className="font-bold text-slate-800">
                        {documentData.reviewData?.reviewerWhen || '21/11/2025'}
                      </span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowRevisionForm(!showRevisionForm)}
                    className="px-4 py-2 bg-[#00838F] hover:bg-[#007A87] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
                  >
                    <span>Revisi Dokumen</span>
                    {showRevisionForm ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Review Notes Display */}
                {(documentData.reviewData?.reviewNotes || reviewNotes) && (
                  <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900 font-medium">
                    <p className="font-bold mb-1">Catatan Reviewer:</p>
                    <p>{documentData.reviewData?.reviewNotes || reviewNotes || 'Dokumen memenuhi standar ISO 9001:2015 dan relevan dengan kualifikasi PLN Pusertif.'}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SECTION 2: Form Dokumen Revisi (Inline / Expandable) */}
          {showRevisionForm && (
            <div className="bg-white rounded-2xl border-2 border-[#00838F] p-6 shadow-md space-y-4 animate-in fade-in slide-in-from-top-2">
              <h3 className="font-bold text-slate-800 text-base border-b border-gray-100 pb-2">
                Form Dokumen Revisi (Unggah Berkas Baru)
              </h3>

              <form onSubmit={handleRevisionSubmit} className="space-y-4">
                {/* Nama Dokumen Revisi */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Nama Dokumen Revisi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={revisionTitle}
                    onChange={(e) => setRevisionTitle(e.target.value)}
                    placeholder="Nama berkas revisi baru"
                    className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] font-semibold text-slate-800 bg-white"
                  />
                </div>

                {/* Unggah Dokumen Revisi (PDF Max 100MB Dropzone) */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Unggah Dokumen Revisi (PDF Max 100MB) <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 hover:border-[#00838F] rounded-xl p-4 text-center bg-slate-50 transition cursor-pointer relative">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        if (e.target.files[0]) setRevisionFile(e.target.files[0].name);
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-6 h-6 text-[#00838F] mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-800">
                      {revisionFile ? revisionFile : 'Klik atau tarik file PDF revisi ke sini'}
                    </p>
                  </div>
                </div>

                {/* Catatan Revisi */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Catatan Revisi (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={revisionNote}
                    onChange={(e) => setRevisionNote(e.target.value)}
                    placeholder="Jelaskan perubahan yang dibuat pada versi revisi ini..."
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] font-medium text-slate-800 bg-white resize-none"
                  />
                </div>

                {/* Revision Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRevisionForm(false)}
                    className="px-4 py-2 text-xs font-bold border border-gray-300 text-slate-700 hover:bg-gray-50 rounded-xl transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#00838F] hover:bg-[#007A87] text-white text-xs font-bold rounded-xl shadow-xs transition"
                  >
                    Ajukan Berkas Revisi
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SECTION 3: Preview Dokumen PDF Embedded Viewer */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00838F]" />
                Preview Dokumen PDF
              </h2>
              <span className="text-xs text-gray-400 font-semibold">
                Ukuran: {documentData.fileSize || '4.2 MB'}
              </span>
            </div>

            {/* Embedded PDF Frame / Fallback Viewer */}
            <div className="w-full h-96 rounded-xl border border-gray-200 bg-slate-900 flex flex-col items-center justify-center p-6 text-white text-center relative overflow-hidden group">
              <div className="w-16 h-16 rounded-2xl bg-[#00838F]/20 text-[#00838F] flex items-center justify-center mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-white">{documentData.fileName || 'Dokumen_Mutu_PLN_2025.pdf'}</h3>
              <p className="text-xs text-gray-400 max-w-md mt-1 font-medium">
                Berkas PDF terdaftar resmi pada repositori CMS PLN Pusertif.
              </p>

              <div className="flex items-center gap-3 mt-6">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="px-4 py-2 bg-[#00838F] hover:bg-[#007A87] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Buka PDF Terpisah</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Kolom): Keterkaitan Dokumen (Read-Only Summary) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <h2 className="font-bold text-slate-800 text-base pb-3 border-b border-gray-100">
              Keterkaitan Dokumen (Read-Only)
            </h2>

            {/* List of linked Standar Acuan */}
            <div className="space-y-3">
              {(documentData.standarAcuanRelations || documentData.sdgRelations || [
                {
                  id: 'standar-1',
                  standard: 'ISO 9001:2015',
                  clause: 'Klausul 4: Konteks Organisasi',
                  subClause: 'Sub 4.1: Memahami Organisasi & Konteksnya',
                  isPrimary: true,
                },
              ]).map((rel, idx) => (
                <div
                  key={rel.id || idx}
                  className={`p-3.5 rounded-xl border text-xs ${
                    rel.isPrimary
                      ? 'border-[#00838F] bg-[#00838F]/5'
                      : 'border-gray-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-slate-900">{rel.standard}</span>
                    {rel.isPrimary && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full border border-amber-300">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        STANDAR UTAMA
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 font-semibold">{rel.clause}</p>
                  <p className="text-gray-400 font-medium text-[11px] mt-0.5">{rel.subClause}</p>
                </div>
              ))}
            </div>

            {/* Metadata Badges Summary */}
            <div className="pt-4 border-t border-gray-100 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Jenis Dokumen:</span>
                <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">
                  {documentData.jenis}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Bidang:</span>
                <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">
                  {documentData.bidang}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Status:</span>
                <div>{renderBadge(documentData.status)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
