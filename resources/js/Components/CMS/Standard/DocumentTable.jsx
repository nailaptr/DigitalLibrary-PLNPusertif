import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  Eye,
  Edit3,
  CheckCircle,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';

export default function DocumentTable({
  standard,
  documents,
  onBack,
  onOpenAddDoc,
  onOpenEditDoc,
  onOpenReviewDoc,
  onDeleteDoc,
  onBulkDelete,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterJenis, setFilterJenis] = useState('Semua Jenis');
  const [filterBidang, setFilterBidang] = useState('Semua Bidang');
  const [filterStatus, setFilterStatus] = useState('Semua Status');

  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Debounce search input (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filter documents logic
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      doc.code?.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesJenis =
      filterJenis === 'Semua Jenis' || doc.jenis === filterJenis;
    const matchesBidang =
      filterBidang === 'Semua Bidang' || doc.bidang === filterBidang;
    const matchesStatus =
      filterStatus === 'Semua Status' || doc.status === filterStatus;

    return matchesSearch && matchesJenis && matchesBidang && matchesStatus;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocs = filteredDocs.slice(startIndex, startIndex + itemsPerPage);

  // Checkbox Selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentDocs.map((d) => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const isAllSelected =
    currentDocs.length > 0 && currentDocs.every((d) => selectedIds.includes(d.id));

  // Helper for Status Badge styling
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Draft':
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-sky-100 text-sky-800 border border-sky-200">
            Draft
          </span>
        );
      case 'Relevan':
        return (
          <span className="px-3 py-1 text-xs font-semibold italic rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            Relevan
          </span>
        );
      case 'Revisi':
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            Revisi
          </span>
        );
      case 'Tidak Relevan':
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-rose-100 text-rose-800 border border-rose-200">
            Tidak Relevan
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Metric & Breadcrumb */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00838F] hover:underline mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Kategori Standar</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[#00838F]/10 text-[#00838F] rounded-lg text-xs font-extrabold">
                {standard.name}
              </span>
              <span className="text-xs text-gray-400 font-medium">Halaman Indikator Dokumen</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Indikator Dokumen {standard.name}
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-1">
              {standard.description}
            </p>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-6">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Jumlah Dokumen
              </p>
              <p className="text-2xl font-extrabold text-[#00838F] mt-0.5">
                {filteredDocs.length} Dokumen
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar + Action Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Input (Debounced 300ms) */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Judul Berita / Dokumen..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent bg-white font-medium text-slate-700 shadow-2xs"
            />
          </div>

          {/* 3 Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Filter Jenis Dokumen */}
            <select
              value={filterJenis}
              onChange={(e) => setFilterJenis(e.target.value)}
              className="px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent bg-white font-semibold text-slate-700 shadow-2xs"
            >
              <option value="Semua Jenis">Jenis Dokumen (Semua)</option>
              <option value="Manual">Manual</option>
              <option value="Prosedur">Prosedur</option>
              <option value="Instruksi Kerja">Instruksi Kerja</option>
              <option value="Formulir">Formulir</option>
            </select>

            {/* Filter Bidang */}
            <select
              value={filterBidang}
              onChange={(e) => setFilterBidang(e.target.value)}
              className="px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent bg-white font-semibold text-slate-700 shadow-2xs"
            >
              <option value="Semua Bidang">Bidang (Semua)</option>
              <option value="Bidang A">Bidang A</option>
              <option value="Bidang B">Bidang B</option>
              <option value="Bidang C">Bidang C</option>
              <option value="Bidang D">Bidang D</option>
            </select>

            {/* Filter Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent bg-white font-semibold text-slate-700 shadow-2xs"
            >
              <option value="Semua Status">Status (Semua)</option>
              <option value="Draft">Draft</option>
              <option value="Relevan">Relevan</option>
              <option value="Revisi">Revisi</option>
              <option value="Tidak Relevan">Tidak Relevan</option>
            </select>
          </div>

          {/* Button + Tambah Dokumen */}
          <button
            type="button"
            onClick={onOpenAddDoc}
            className="w-full lg:w-auto px-4 py-2 bg-[#00838F] hover:bg-[#007A87] text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Dokumen</span>
          </button>
        </div>

        {/* Bulk Action Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs font-medium">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded text-[#00838F] focus:ring-[#00838F] border-gray-300"
              />
              <span>Pilih Semua</span>
            </label>

            {selectedIds.length > 0 && (
              <span className="text-xs text-gray-500 font-medium">
                ({selectedIds.length} dipilih)
              </span>
            )}
          </div>

          {/* Button Hapus Pilihan */}
          <button
            type="button"
            disabled={selectedIds.length === 0}
            onClick={() => {
              onBulkDelete(selectedIds);
              setSelectedIds([]);
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
              selectedIds.length > 0
                ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus Pilihan</span>
          </button>
        </div>

        {/* Document Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#00838F] text-white text-xs uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 w-10">
                  <span className="sr-only">Select Row</span>
                </th>
                <th className="py-3.5 px-4 font-bold">Jenis</th>
                <th className="py-3.5 px-4 font-bold">Bidang</th>
                <th className="py-3.5 px-4 font-bold">Nama Dokumen</th>
                <th className="py-3.5 px-4 font-bold">Update Terakhir</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-center">Aksi Khusus</th>
                <th className="py-3.5 px-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-xs font-medium text-slate-700">
              {currentDocs.length > 0 ? (
                currentDocs.map((doc) => {
                  const isChecked = selectedIds.includes(doc.id);
                  return (
                    <tr
                      key={doc.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isChecked ? 'bg-[#00838F]/5' : ''
                      }`}
                    >
                      {/* Checkbox Row */}
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectRow(doc.id)}
                          className="w-4 h-4 rounded text-[#00838F] focus:ring-[#00838F] border-gray-300"
                        />
                      </td>

                      {/* Jenis */}
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {doc.jenis}
                      </td>

                      {/* Bidang */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {doc.bidang}
                      </td>

                      {/* Nama Dokumen */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-sm">
                          {doc.title}
                        </div>
                        <div className="text-gray-400 text-xs mt-0.5">
                          {doc.code || 'DOC-ISO-2025'}
                        </div>
                      </td>

                      {/* Update Terakhir */}
                      <td className="py-3.5 px-4 text-gray-500 font-medium whitespace-nowrap">
                        {doc.updatedAt}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {renderStatusBadge(doc.status)}
                      </td>

                      {/* Aksi Khusus (Review Button) */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onOpenReviewDoc(doc)}
                          className="px-3 py-1.5 bg-[#00838F]/10 hover:bg-[#00838F] text-[#00838F] hover:text-white font-bold rounded-lg transition border border-[#00838F]/30 text-xs inline-flex items-center gap-1.5"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>{doc.status === 'Draft' ? 'Review' : 'Edit Review'}</span>
                        </button>
                      </td>

                      {/* Aksi (View, Edit, Delete) */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => onOpenEditDoc(doc)}
                            className="p-1.5 text-[#00838F] hover:bg-[#00838F]/10 rounded-lg transition"
                            title="Lihat / Edit Dokumen"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onOpenEditDoc(doc)}
                            className="p-1.5 text-[#00838F] hover:bg-[#00838F]/10 rounded-lg transition"
                            title="Edit Dokumen"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onDeleteDoc(doc.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Hapus Dokumen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-400 text-sm font-medium">
                    Tidak ada dokumen yang sesuai dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs font-semibold text-gray-500">
          <div>
            Menampilkan <span className="text-slate-800 font-bold">{filteredDocs.length > 0 ? startIndex + 1 : 0}</span> - <span className="text-slate-800 font-bold">{Math.min(startIndex + itemsPerPage, filteredDocs.length)}</span> dari <span className="text-slate-800 font-bold">{filteredDocs.length}</span> data
          </div>

          <div className="flex items-center gap-1.5">
            {/* Prev Button */}
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg font-bold transition text-xs ${
                  currentPage === page
                    ? 'bg-[#00838F] text-white shadow-2xs'
                    : 'border border-gray-300 text-slate-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
