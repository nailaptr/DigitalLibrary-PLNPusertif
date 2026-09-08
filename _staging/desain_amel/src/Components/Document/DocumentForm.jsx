import React, { useState } from 'react';
import {
  Star,
  Trash2,
  Plus,
  Upload,
  FileText,
  ArrowLeft,
  Check,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function DocumentForm({
  mode = 'add', // 'add' | 'edit'
  documentData = null,
  standardsList = [],
  onSave,
  onCancel,
}) {
  const isEdit = mode === 'edit';

  // State 1: Multi-Standar Acuan Relation Repeater
  const [standarAcuanRelations, setStandarAcuanRelations] = useState(
    documentData?.standarAcuanRelations || documentData?.sdgRelations || [
      {
        id: 'standar-1',
        standard: 'ISO 9001:2015',
        clause: 'Klausul 4: Konteks Organisasi',
        subClause: 'Sub 4.1: Memahami Organisasi & Konteksnya',
        isPrimary: true,
      },
    ]
  );

  // State 2: Document Details
  const [title, setTitle] = useState(documentData?.title || '');
  const [uploadDate, setUploadDate] = useState(
    documentData?.uploadDate || new Date().toISOString().split('T')[0]
  );
  const [jenis, setJenis] = useState(documentData?.jenis || 'Manual');
  const [bidang, setBidang] = useState(documentData?.bidang || 'Bidang A');
  const [status, setStatus] = useState(documentData?.status || 'Draft');
  const [note, setNote] = useState(documentData?.note || '');
  const [uploadedFile, setUploadedFile] = useState(documentData?.fileName || null);

  const MAX_TITLE_CHAR = 100;

  // Handlers for Multi-Standar Acuan Repeater
  const handleAddStandarAcuanRow = () => {
    const newRow = {
      id: `standar-${Date.now()}`,
      standard: 'ISO 14001:2015',
      clause: 'Klausul 5: Kepemimpinan',
      subClause: 'Sub 5.1: Kepemimpinan & Komitmen',
      isPrimary: standarAcuanRelations.length === 0, // Auto primary if first
    };
    setStandarAcuanRelations([...standarAcuanRelations, newRow]);
  };

  const handleRemoveStandarAcuanRow = (id) => {
    if (standarAcuanRelations.length <= 1) return; // Must keep at least 1
    const updated = standarAcuanRelations.filter((row) => row.id !== id);
    // If we removed the primary row, assign primary to the first row remaining
    if (!updated.some((r) => r.isPrimary) && updated.length > 0) {
      updated[0].isPrimary = true;
    }
    setStandarAcuanRelations(updated);
  };

  const handleSetPrimaryStandarAcuan = (id) => {
    setStandarAcuanRelations(
      standarAcuanRelations.map((row) => ({
        ...row,
        isPrimary: row.id === id,
      }))
    );
  };

  const handleStandarAcuanRowChange = (id, field, value) => {
    setStandarAcuanRelations(
      standarAcuanRelations.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  // Drag and drop file handler simulation
  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    if (files && files[0]) {
      setUploadedFile(files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      ...documentData,
      title,
      uploadDate,
      jenis,
      bidang,
      status,
      note,
      fileName: uploadedFile || 'Dokumen_Mutu_PLN_2025.pdf',
      fileSize: '4.2 MB',
      standarAcuanRelations,
      sdgRelations: standarAcuanRelations,
      updatedAt: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header & Breadcrumb */}
      <div>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00838F] hover:underline mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Dokumen</span>
        </button>

        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isEdit ? 'Edit Dokumen' : 'Tambah Dokumen Baru'}
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-1">
          Lengkapi data keterkaitan standar mutu acuan, detail dokumen, dan unggah berkas PDF.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: Keterkaitan Standar Acuan Multi-Sistem */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h2 className="font-bold text-slate-800 text-base">
                Keterkaitan Standar Acuan Multi-Sistem
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Kaitkan dokumen ini dengan satu atau lebih standar acuan. Klik bintang untuk menetapkan <span className="font-bold text-[#00838F]">Standar Mutu Utama</span>.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddStandarAcuanRow}
              className="px-3 py-1.5 bg-[#00838F]/10 hover:bg-[#00838F] text-[#00838F] hover:text-white font-bold rounded-lg transition text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Standar Acuan</span>
            </button>
          </div>

          {/* Repeater Rows */}
          <div className="space-y-3">
            {standarAcuanRelations.map((row, index) => (
              <div
                key={row.id}
                className={`p-4 rounded-xl border transition-all ${
                  row.isPrimary
                    ? 'border-[#00838F] bg-[#00838F]/5 shadow-2xs'
                    : 'border-gray-200 bg-slate-50/50'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  {/* Primary Standar Badge & Star Icon */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSetPrimaryStandarAcuan(row.id)}
                      className={`p-1.5 rounded-lg transition ${
                        row.isPrimary
                          ? 'text-amber-500 bg-amber-100'
                          : 'text-gray-300 hover:text-amber-400'
                      }`}
                      title={row.isPrimary ? 'Standar Mutu Utama saat ini' : 'Klik untuk set sebagai Standar Mutu Utama'}
                    >
                      <Star className={`w-5 h-5 ${row.isPrimary ? 'fill-amber-500' : ''}`} />
                    </button>
                    {row.isPrimary && (
                      <span className="px-2.5 py-0.5 bg-[#00838F] text-white text-[11px] font-extrabold rounded-full">
                        STANDAR UTAMA
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-500">
                      Baris #{index + 1}
                    </span>
                  </div>

                  {/* Dropdowns: Standar Terkait, Klausul, Sub Klausul */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                    {/* Standar Terkait */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Standar Terkait <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={row.standard}
                        onChange={(e) => handleStandarAcuanRowChange(row.id, 'standard', e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] font-semibold text-slate-800 bg-white"
                      >
                        <option value="ISO 9001:2015">ISO 9001:2015</option>
                        <option value="ISO 14001:2015">ISO 14001:2015</option>
                        <option value="ISO 45001:2018">ISO 45001:2018</option>
                        <option value="ISO Lainnya">ISO Lainnya</option>
                      </select>
                    </div>

                    {/* Klausul */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Klausul <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={row.clause}
                        onChange={(e) => handleStandarAcuanRowChange(row.id, 'clause', e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] font-semibold text-slate-800 bg-white"
                      >
                        <option value="Klausul 4: Konteks Organisasi">Klausul 4: Konteks Organisasi</option>
                        <option value="Klausul 5: Kepemimpinan">Klausul 5: Kepemimpinan</option>
                        <option value="Klausul 6: Perencanaan">Klausul 6: Perencanaan</option>
                        <option value="Klausul 7: Dukungan">Klausul 7: Dukungan</option>
                        <option value="Klausul 8: Operasional">Klausul 8: Operasional</option>
                      </select>
                    </div>

                    {/* Sub Klausul */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Sub Klausul <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={row.subClause}
                        onChange={(e) => handleStandarAcuanRowChange(row.id, 'subClause', e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] font-semibold text-slate-800 bg-white"
                      >
                        <option value="Sub 4.1: Memahami Organisasi & Konteksnya">Sub 4.1: Memahami Organisasi & Konteksnya</option>
                        <option value="Sub 4.2: Memahami Kebutuhan Pihak Berkepentingan">Sub 4.2: Memahami Kebutuhan Pihak Berkepentingan</option>
                        <option value="Sub 5.1: Kepemimpinan & Komitmen">Sub 5.1: Kepemimpinan & Komitmen</option>
                        <option value="Sub 6.1: Tindakan Mengatasi Risiko">Sub 6.1: Tindakan Mengatasi Risiko</option>
                        <option value="Sub 8.1: Perencanaan & Pengendalian Operasional">Sub 8.1: Perencanaan & Pengendalian Operasional</option>
                      </select>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    disabled={standarAcuanRelations.length <= 1}
                    onClick={() => handleRemoveStandarAcuanRow(row.id)}
                    className="p-2 text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition self-end md:self-center"
                    title="Hapus Baris Standar Acuan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Detail Dokumen */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-5">
          <h2 className="font-bold text-slate-800 text-base pb-3 border-b border-gray-100">
            Detail Informasi Dokumen
          </h2>

          {/* Judul Dokumen (Max 100 Char) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Judul Dokumen <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] font-semibold text-gray-400">
                {title.length}/{MAX_TITLE_CHAR} Karakter
              </span>
            </div>
            <input
              type="text"
              required
              maxLength={MAX_TITLE_CHAR}
              value={title}
              onChange={(e) => {
                if (e.target.value.length <= MAX_TITLE_CHAR) {
                  setTitle(e.target.value);
                }
              }}
              placeholder="Masukkan judul dokumen mutu (misal: Manual Pengujian Trafo PLN)"
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] font-medium text-slate-800 bg-white"
            />
          </div>

          {/* Grid 2 Kolom: Tanggal Unggah & Jenis Dokumen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tanggal Unggah (Datepicker) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Tanggal Unggah <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={uploadDate}
                  onChange={(e) => setUploadDate(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] font-medium text-slate-800 bg-white"
                />
              </div>
            </div>

            {/* Jenis Dokumen */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Jenis Dokumen <span className="text-red-500">*</span>
              </label>
              <select
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] font-semibold text-slate-800 bg-white"
              >
                <option value="Manual">Manual</option>
                <option value="Prosedur">Prosedur</option>
                <option value="Instruksi Kerja">Instruksi Kerja</option>
                <option value="Formulir">Formulir</option>
              </select>
            </div>
          </div>

          {/* Grid 2 Kolom: Bidang & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Bidang */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Bidang <span className="text-red-500">*</span>
              </label>
              <select
                value={bidang}
                onChange={(e) => setBidang(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] font-semibold text-slate-800 bg-white"
              >
                <option value="Bidang A">Bidang A</option>
                <option value="Bidang B">Bidang B</option>
                <option value="Bidang C">Bidang C</option>
                <option value="Bidang D">Bidang D</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] font-bold text-slate-800 bg-white"
              >
                <option value="Draft">Draft</option>
                <option value="Relevan">Relevan</option>
                <option value="Pending">Pending</option>
                <option value="Revisi">Revisi</option>
                <option value="Tidak Relevan">Tidak Relevan</option>
              </select>
            </div>
          </div>

          {/* SECTION 3: Upload Dokumen PDF Drag & Drop Zone */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Upload Dokumen (PDF Max 100MB) <span className="text-red-500">*</span>
            </label>
            
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="border-2 border-dashed border-gray-300 hover:border-[#00838F] rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-[#00838F]/5 transition cursor-pointer relative"
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileDrop}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="w-12 h-12 rounded-full bg-[#00838F]/10 text-[#00838F] flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6" />
              </div>
              
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-800">
                  <FileText className="w-5 h-5 text-[#00838F]" />
                  <span>{uploadedFile}</span>
                  <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Siap Diunggah
                  </span>
                </div>
              ) : (
                <>
                  <p className="text-sm font-bold text-slate-800">
                    Tarik & Lepaskan berkas PDF di sini, atau <span className="text-[#00838F] underline">klik untuk mengunggah</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">
                    Hanya menerima format berkas PDF dengan batas ukuran maksimum 100MB.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Catatan (Opsional) */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Catatan (Opsional)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tambahkan catatan khusus terkait dokumen ini..."
              className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00838F] font-medium text-slate-800 bg-white resize-none"
            />
          </div>
        </div>

        {/* Action Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 text-xs font-bold border border-gray-300 text-slate-700 hover:bg-gray-50 rounded-xl transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-bold bg-[#00838F] hover:bg-[#007A87] text-white rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Simpan Dokumen</span>
          </button>
        </div>
      </form>
    </div>
  );
}
