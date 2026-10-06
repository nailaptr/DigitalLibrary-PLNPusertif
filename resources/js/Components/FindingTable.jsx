import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  CheckCircle,
  Search,
  SlidersHorizontal,
  Plus,
  Eye,
  Edit3,
  Trash2,
  ChevronUp,
  ChevronDown,
  X,
  Check,
  Globe,
  Lock
} from 'lucide-react';
import { router } from '@inertiajs/react';

function FindingFilterPopover({ isOpen, onClose, filterType, setFilterType, filterStatus, setFilterStatus, onApply, onReset }) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-50 p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm text-slate-800">Filter Temuan</h3>
        <button onClick={onClose} aria-label="Tutup Filter" className="text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">
            Jenis Temuan
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full text-sm border-gray-200 rounded-lg focus:ring-[#00838F] focus:border-[#00838F]"
          >
            <option value="Semua Jenis">Semua Jenis</option>
            <option value="major">Major</option>
            <option value="minor">Minor</option>
            <option value="pi">PI</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">
            Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full text-sm border-gray-200 rounded-lg focus:ring-[#00838F] focus:border-[#00838F]"
          >
            <option value="Semua Status">Semua Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 mt-5">
        <button
          onClick={onReset}
          className="flex-1 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          Reset
        </button>
        <button
          onClick={onApply}
          className="flex-1 py-2 text-xs font-semibold text-white bg-[#00838F] rounded-lg hover:bg-[#007A87] transition"
        >
          Terapkan
        </button>
      </div>
    </div>
  );
}

export default function FindingTable({
  findings,
  filters,
  onViewDetail,
  onEditFinding,
  onDeleteFinding,
  onAddFinding,
  onPublishToggle
}) {
  const [searchTerm, setSearchTerm] = useState(filters?.search || '');
  const [filterType, setFilterType] = useState(filters?.type || 'Semua Jenis');
  const [filterStatus, setFilterStatus] = useState(filters?.status || 'Semua Status');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Apply filters via router
  const applyFilters = (search = searchTerm, type = filterType, status = filterStatus) => {
    let params = {};
    if (search) params.search = search;
    if (type !== 'Semua Jenis') params.type = type;
    if (status !== 'Semua Status') params.status = status;
    
    router.get(route('findings.index'), params, { preserveState: true, replace: true });
  };

  // Keyboard debounce for search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== filters?.search) {
        applyFilters(searchTerm, filterType, filterStatus);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleApplyFilter = () => {
    setIsFilterOpen(false);
    applyFilters(searchTerm, filterType, filterStatus);
  };

  const handleResetFilter = () => {
    setFilterType('Semua Jenis');
    setFilterStatus('Semua Status');
    setSearchTerm('');
    router.get(route('findings.index'));
    setIsFilterOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Top Stat Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Data Temuan
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Kelola data temuan (Major, Minor, PI)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Temuan
            </p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              {findings.total}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#00838F]/10 text-[#00838F] flex items-center justify-center">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 relative">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari Temuan..."
                aria-label="Cari Temuan"
                className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent bg-white shadow-2xs font-medium text-slate-700"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border transition shadow-2xs ${
                  isFilterOpen || filterType !== 'Semua Jenis' || filterStatus !== 'Semua Status'
                    ? 'border-[#00838F] bg-[#00838F]/10 text-[#00838F]'
                    : 'border-gray-300 text-slate-700 hover:bg-gray-50'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filter</span>
                {isFilterOpen ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              <FindingFilterPopover
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filterType={filterType}
                setFilterType={setFilterType}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                onReset={handleResetFilter}
                onApply={handleApplyFilter}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onAddFinding}
            className="w-full sm:w-auto px-4 py-2.5 bg-[#00838F] hover:bg-[#007A87] text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Temuan</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#00838F] text-white text-xs uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 font-bold rounded-tl-lg">No/Klausul</th>
                <th className="py-3.5 px-4 font-bold">Ringkasan</th>
                <th className="py-3.5 px-4 font-bold">Jenis</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-center rounded-tr-lg">Aksi</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200 text-xs font-medium text-slate-700">
              {findings.data.length > 0 ? (
                findings.data.map((finding) => (
                  <tr key={finding.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">
                        {finding.finding_number || 'N/A'}
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5">
                        Klausul: {finding.clause || '-'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs truncate">
                      <div className="font-bold text-slate-900 truncate">
                        {finding.finding_statement || 'N/A'}
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5 truncate">
                        {finding.person_name || finding.existing_work_area}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {finding.finding_type ? (
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold shadow-2xs ${
                          finding.finding_type.toLowerCase() === 'major' ? 'bg-red-100 text-red-700' :
                          finding.finding_type.toLowerCase() === 'minor' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {finding.finding_type.toUpperCase()}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Unclassified</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {finding.is_published ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shadow-2xs">
                          <Globe className="w-3 h-3 stroke-[3]" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold shadow-2xs">
                          <Lock className="w-3 h-3 stroke-[3]" />
                          Draft
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => onPublishToggle(finding)}
                          className={`p-1.5 rounded-lg transition ${
                            finding.is_published ? 'text-gray-500 hover:bg-gray-100' : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={finding.is_published ? 'Unpublish' : 'Publish'}
                          aria-label={finding.is_published ? 'Unpublish' : 'Publish'}
                        >
                          {finding.is_published ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => onViewDetail(finding)}
                          className="p-1.5 text-[#00838F] hover:bg-[#00838F]/10 rounded-lg transition"
                          title="Lihat Detail"
                          aria-label="Lihat Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onEditFinding(finding)}
                          className="p-1.5 text-[#00838F] hover:bg-[#00838F]/10 rounded-lg transition"
                          title="Edit"
                          aria-label="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteFinding(finding)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Hapus"
                          aria-label="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-400 text-sm font-medium">
                    Tidak ada data temuan yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {findings.links && findings.links.length > 3 && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              Menampilkan {findings.from || 0} hingga {findings.to || 0} dari {findings.total} data
            </span>
            <div className="flex gap-1">
              {findings.links.map((link, idx) => {
                // Skip the Next/Prev text labels if you want to use icons, or just render them as-is.
                let label = link.label.replace('&laquo;', '«').replace('&raquo;', '»');
                return (
                  <button
                    key={idx}
                    onClick={() => {
                        if(link.url) router.get(link.url, {}, { preserveState: true });
                    }}
                    disabled={!link.url}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition ${
                      link.active
                        ? 'bg-[#00838F] text-white'
                        : 'text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
