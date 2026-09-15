import React, { useState } from 'react';
import {
  Layers,
  FileText,
  Search,
  SlidersHorizontal,
  Plus,
  ArrowRight,
  Edit3,
  Trash2,
  BookOpen
} from 'lucide-react';

export default function StandardCardGrid({
  standards,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteStandard,
  onSelectStandard, // Triggers navigation to Level 2
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('Semua');

  // Debounced/filtered standards
  const filteredStandards = standards.filter((std) => {
    const matchesSearch =
      std.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalDocuments = standards.reduce((acc, curr) => acc + (curr.docCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Page Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Kategori Standar
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Kelola kelompok standar mutu PLN Pusertif dan dokumen indikatornya
          </p>
        </div>
      </div>

      {/* Summary Metrics Card (2 Kolom) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Metric 1: Total Standar */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Standar
            </p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              {standards.length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#00838F]/10 text-[#00838F] flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2: Jumlah Dokumen */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Jumlah Dokumen
            </p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              {totalDocuments}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#00838F]/10 text-[#00838F] flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Action Bar Above Grid */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Standar..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent bg-white font-medium text-slate-700 shadow-2xs"
            />
          </div>

          {/* Filter Option */}
          <button
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-gray-300 text-slate-700 hover:bg-gray-50 transition shadow-2xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#00838F]" />
            <span>Filter</span>
          </button>
        </div>

        {/* Button + Tambah Standar */}
        <button
          type="button"
          onClick={onOpenAddModal}
          className="w-full sm:w-auto px-4 py-2.5 bg-[#00838F] hover:bg-[#007A87] text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Standar</span>
        </button>
      </div>

      {/* Grid Card Standar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStandards.map((std, index) => (
          <div
            key={std.id}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#00838F] group-hover:bg-[#007A87] transition-colors" />

            <div>
              {/* Header: Indikator Nomor & Action Icons */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold text-[#00838F] bg-[#00838F]/10 px-2.5 py-1 rounded-lg">
                  STANDAR #{String(index + 1).padStart(2, '0')}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onOpenEditModal(std)}
                    className="p-1.5 text-gray-400 hover:text-[#00838F] hover:bg-gray-100 rounded-lg transition"
                    title="Edit Standar"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteStandard(std)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Hapus Standar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-[#00838F] transition-colors">
                {std.name}
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-1.5 line-clamp-2 leading-relaxed">
                {std.description}
              </p>
            </div>

            {/* Metrics Info & Link Kelola -> */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs font-semibold text-gray-500">
                <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  <FileText className="w-3.5 h-3.5 text-[#00838F]" />
                  {std.docCount || 0} Dokumen
                </span>
                <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  {std.publishCount || 10} Publikasi
                </span>
              </div>

              {/* Link Kelola -> */}
              <button
                type="button"
                onClick={() => onSelectStandard(std)}
                className="text-xs font-bold text-[#00838F] hover:text-[#007A87] flex items-center gap-1 py-1 px-2 hover:bg-[#00838F]/10 rounded-lg transition"
              >
                <span>Kelola</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
