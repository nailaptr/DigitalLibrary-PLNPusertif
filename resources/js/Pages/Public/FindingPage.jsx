import PublicLayout from '@/Layouts/PublicLayout';
import React, { useState, useEffect } from 'react';
import { Search, Filter, AlertTriangle, AlertCircle, ArrowUpCircle, X, FileText, ChevronUp, ChevronDown } from 'lucide-react';
import { router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { useTranslation } from 'react-i18next';

export default function FindingPage({ findings = {}, kpi = {}, filters = {}, options = {} }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState(filters?.search || '');
  const [filterBidang, setFilterBidang] = useState(filters?.bidang || 'Semua Bidang');
  const [filterKlausul, setFilterKlausul] = useState(filters?.klausul || 'Semua Klausul');
  const [filterJenis, setFilterJenis] = useState(filters?.jenis || 'Semua Jenis');
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFinding, setSelectedFinding] = useState(null);

  // Apply filters via router
  const applyFilters = (search = searchTerm, bidang = filterBidang, klausul = filterKlausul, jenis = filterJenis) => {
    let params = {};
    if (search) params.search = search;
    if (bidang !== 'Semua Bidang') params.bidang = bidang;
    if (klausul !== 'Semua Klausul') params.klausul = klausul;
    if (jenis !== 'Semua Jenis') params.jenis = jenis;
    
    router.get(route('public.findings'), params, { preserveState: true, replace: true });
  };

  // Keyboard debounce for search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== filters?.search) {
        applyFilters(searchTerm, filterBidang, filterKlausul, filterJenis);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleApplyFilter = () => {
    setIsFilterOpen(false);
    applyFilters(searchTerm, filterBidang, filterKlausul, filterJenis);
  };

  const handleResetFilter = () => {
    setFilterBidang('Semua Bidang');
    setFilterKlausul('Semua Klausul');
    setFilterJenis('Semua Jenis');
    setSearchTerm('');
    router.get(route('public.findings'));
    setIsFilterOpen(false);
  };

  return (
    <PublicLayout>
      <div className="w-full space-y-8 pb-12 font-sans max-w-7xl mx-auto px-4 sm:px-8 mt-4">
        
        {/* Header Section */}
        <div className="bg-[#127297] text-white rounded-3xl p-8 lg:p-10 shadow-xl space-y-4">
          <span className="text-xs font-bold text-[#FFE600] uppercase tracking-widest">
            {t('findings.badge')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {t('findings.title')}
          </h1>
          <p className="text-blue-100 text-sm max-w-2xl">
            {t('findings.subtitle')}
          </p>
          
          {/* KPI Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-blue-400/30">
            <div>
               <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">{t('findings.totalLabel')}</p>
               <p className="text-2xl font-extrabold">{kpi.total || 0}</p>
            </div>
            <div>
               <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                 <AlertTriangle className="w-3 h-3"/> Major
               </p>
               <p className="text-2xl font-extrabold">{kpi.major || 0}</p>
            </div>
            <div>
               <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                 <AlertCircle className="w-3 h-3"/> Minor
               </p>
               <p className="text-2xl font-extrabold">{kpi.minor || 0}</p>
            </div>
            <div>
               <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                 <ArrowUpCircle className="w-3 h-3"/> PI
               </p>
               <p className="text-2xl font-extrabold">{kpi.pi || 0}</p>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96 flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                aria-label={t('findings.searchAria')}
                placeholder={t('findings.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:outline-none"
              />
            </div>
            
            <div className="flex w-full sm:w-auto items-center gap-3">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
                {t('findings.showingText', { count: findings.data?.length || 0 })}
              </span>
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                aria-expanded={isFilterOpen}
                aria-controls="filter-panel"
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl border transition-colors ${
                  isFilterOpen || filterBidang !== 'Semua Bidang' || filterKlausul !== 'Semua Klausul' || filterJenis !== 'Semua Jenis'
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                {t('findings.filterData')}
                {isFilterOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div id="filter-panel" className="mt-2 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
               <div>
                  <label htmlFor="filter_bidang" className="block text-xs font-bold text-slate-500 mb-2 uppercase">{t('findings.bidangLabel')}</label>
                  <select 
                    id="filter_bidang"
                    value={filterBidang}
                    onChange={(e) => setFilterBidang(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:ring-[#00A3E0]"
                  >
                    <option value="Semua Bidang">{t('findings.allBidang')}</option>
                    {options.bidang?.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
               </div>
               <div>
                  <label htmlFor="filter_klausul" className="block text-xs font-bold text-slate-500 mb-2 uppercase">{t('findings.klausulLabel')}</label>
                  <select 
                    id="filter_klausul"
                    value={filterKlausul}
                    onChange={(e) => setFilterKlausul(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:ring-[#00A3E0]"
                  >
                    <option value="Semua Klausul">{t('findings.allKlausul')}</option>
                    {options.klausul?.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
               </div>
               <div>
                  <label htmlFor="filter_jenis" className="block text-xs font-bold text-slate-500 mb-2 uppercase">{t('findings.jenisLabel')}</label>
                  <select 
                    id="filter_jenis"
                    value={filterJenis}
                    onChange={(e) => setFilterJenis(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:ring-[#00A3E0]"
                  >
                    <option value="Semua Jenis">{t('findings.allJenis')}</option>
                    <option value="major">Major</option>
                    <option value="minor">Minor</option>
                    <option value="pi">PI</option>
                  </select>
               </div>
               <div className="sm:col-span-3 flex justify-end gap-3 mt-2">
                 <button onClick={handleResetFilter} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition">{t('findings.reset')}</button>
                 <button onClick={handleApplyFilter} className="px-4 py-2 bg-[#00A3E0] text-white rounded-lg text-xs font-bold hover:bg-[#127297] transition">{t('findings.applyFilter')}</button>
               </div>
            </div>
          )}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-4 px-6 w-1/4">{t('findings.colNumber')}</th>
                  <th className="py-4 px-4 w-32">{t('findings.colType')}</th>
                  <th className="py-4 px-4">{t('findings.colClause')}</th>
                  <th className="py-4 px-4">{t('findings.colLocation')}</th>
                  <th className="py-4 px-6 text-right">{t('findings.colAction')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {findings.data?.map((finding, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <span className="font-mono text-[11px] font-bold text-[#00A3E0] block">
                          {finding.finding_number || 'N/A'}
                        </span>
                        <span className="font-bold text-slate-900 text-sm block leading-snug line-clamp-2" title={finding.finding_statement}>
                          {finding.finding_statement || '-'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {finding.finding_type ? (
                        <span className={`inline-block px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                          finding.finding_type.toLowerCase() === 'major' ? 'bg-red-50 text-red-700 border border-red-100' :
                          finding.finding_type.toLowerCase() === 'minor' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                          'bg-blue-50 text-blue-700 border border-blue-100'
                        }`}>
                          {finding.finding_type}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Unclassified</span>
                      )}
                    </td>
                    <td className="py-4 px-4 space-y-1">
                       <span className="block font-bold text-slate-800">{t('findings.clauseLabel')}: {finding.clause || '-'}</span>
                       <span className="block text-slate-500">{finding.existing_work_area || '-'}</span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-700">
                      {finding.location_auditee || '-'}
                    </td>
                    <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setSelectedFinding(finding)}
                          aria-label={`${t('findings.detailTitle')} ${finding.finding_number}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{t('findings.detail')}</span>
                        </button>
                    </td>
                  </tr>
                ))}
                {findings.data?.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-500 font-medium">
                      <div className="flex flex-col items-center justify-center gap-3">
                         <div className="p-4 rounded-full bg-slate-100">
                           <FileText className="w-6 h-6 text-slate-400" />
                         </div>
                         <p>{t('findings.emptyText')}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {findings.links && findings.links.length > 3 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-t border-slate-100 bg-slate-50/50">
              <span className="text-xs font-medium text-slate-500">
                {t('findings.paginationInfo', { from: findings.from || 0, to: findings.to || 0, total: findings.total })}
              </span>
              <div className="flex flex-wrap gap-1">
                {findings.links.map((link, idx) => {
                  let label = link.label.replace('&laquo;', '«').replace('&raquo;', '»');
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                          if(link.url) router.get(link.url, {}, { preserveState: true });
                      }}
                      disabled={!link.url}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                        link.active
                          ? 'bg-[#00A3E0] text-white shadow-sm'
                          : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed'
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

      {/* Detail Modal */}
      <Modal show={!!selectedFinding} onClose={() => setSelectedFinding(null)} maxWidth="2xl">
        {selectedFinding && (
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl font-sans">
            <div className="bg-[#127297] px-6 py-5 flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <FileText className="w-32 h-32" />
              </div>
              <div className="relative z-10 flex flex-col gap-1">
                <h2 className="text-xl font-bold text-white tracking-wide leading-tight">{t('findings.detailTitle')}</h2>
                <p className="text-blue-200 font-mono text-xs">{selectedFinding.finding_number}</p>
              </div>
              <button
                onClick={() => setSelectedFinding(null)}
                aria-label={t('findings.closeDetail')}
                className="relative z-10 text-blue-200 hover:text-white transition p-2 rounded-full hover:bg-black/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('findings.auditeeLabel')}</p>
                    <p className="text-sm font-bold text-slate-800">{selectedFinding.person_name || '-'}</p>
                 </div>
                 <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('findings.areaLabel')}</p>
                    <p className="text-sm font-bold text-slate-800">{selectedFinding.existing_work_area || '-'} • {selectedFinding.location_auditee || '-'}</p>
                 </div>
              </div>

              <div>
                 <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">{t('findings.findingStatement')}</p>
                 <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
                   {selectedFinding.finding_statement || '-'}
                 </div>
              </div>

              <div>
                 <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">{t('findings.requirementRef')}</p>
                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 leading-relaxed space-y-1">
                   <p className="font-bold text-slate-900 break-words">{t('findings.clauseLabel')}: {selectedFinding.clause || '-'}</p>
                   <p className="whitespace-pre-wrap break-words">{selectedFinding.requirement || '-'}</p>
                 </div>
              </div>

              <div>
                 <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider mb-2 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> {t('findings.causeTitle')}</p>
                 <div className="p-4 bg-red-50/50 rounded-xl border border-red-100 text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
                   {selectedFinding.cause || '-'}
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                    <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider mb-2">{t('findings.correctiveTitle')}</p>
                    <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs font-medium text-slate-700 leading-relaxed h-full min-h-[4rem] whitespace-pre-wrap break-words">
                      {selectedFinding.objective_evidence || '-'}
                    </div>
                 </div>
                 <div>
                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-2">{t('findings.preventiveTitle')}</p>
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs font-medium text-slate-700 leading-relaxed h-full min-h-[4rem] whitespace-pre-wrap break-words">
                      {selectedFinding.preventive_action || '-'}
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="bg-slate-50 px-6 py-4 flex items-center justify-end border-t border-slate-200">
               <button
                  onClick={() => setSelectedFinding(null)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors"
               >
                  {t('findings.close')}
               </button>
            </div>
          </div>
        )}
      </Modal>

    </PublicLayout>
  );
}
