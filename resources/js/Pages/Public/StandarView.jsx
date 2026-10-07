import PublicLayout from '@/Layouts/PublicLayout';
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { CheckCircle2, Search, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';


export default function StandarView({ standardsList = [] }) {
  const navigate = (url) => router.visit(url);
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredIso = standardsList.filter((iso) =>
    iso.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    iso.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PublicLayout>

    <div className="w-full flex flex-col justify-between min-h-screen bg-[#F8FAFC]">
      <div className="w-full space-y-8 pb-12 font-sans max-w-7xl mx-auto px-4 sm:px-8 mt-4 flex-1">
        {/* BANNER HEADER */}
        <div className="w-full bg-[#00A3E0] text-white rounded-3xl p-8 lg:p-12 shadow-xl shadow-[#00A3E0]/20 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              {t('standards.title')}
            </h1>
            <p className="text-white/90 text-sm leading-relaxed max-w-2xl">
              {t('standards.subtitle')}
            </p>
          </div>
        </div>

        {/* CONTROLS BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#00A3E0]">
              <CheckCircle2 className="w-5 h-5 fill-[#00A3E0] text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              {t('overview.sectionTitle')}
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto w-full md:w-auto">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="rounded-full border border-slate-200 bg-white px-6 py-2 flex items-center gap-2 text-xs font-semibold text-slate-600 hover:border-[#00A3E0] hover:text-[#00A3E0] shadow-sm cursor-pointer shrink-0 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-500" />
              <span>{t('standards.filterTitle')}</span>
            </button>

            <div className="rounded-full border border-slate-200 bg-white px-6 py-2 flex items-center gap-2 text-slate-400 w-72 sm:w-80 focus-within:border-[#00A3E0] focus-within:ring-2 focus-within:ring-[#00A3E0]/20 shadow-sm transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder={t('standards.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs text-slate-800 bg-transparent focus:outline-none placeholder-slate-400"
              />
            </div>
          </div>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {filteredIso.map((iso) => (
            <div
              key={iso.id}
              onClick={() => navigate(`/standar/${iso.id}`)}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-cyan-400 transition cursor-pointer relative overflow-hidden flex flex-col justify-between border-t-4 border-cyan-400 group"
            >
              <div>
                <div className="mb-3">
                  <span className="text-base font-bold text-slate-800 block">
                    ISO
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#00A3E0] transition-colors">
                    {iso.code}
                  </h3>
                  <span className="text-[11px] font-medium text-slate-400">
                    {iso.category}
                  </span>
                </div>

                <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.totalDocs')}</span>
                    <span className="font-bold text-slate-900">{iso.totalDoc}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.manualCount')}</span>
                    <span className="font-bold text-slate-800">{iso.manual}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.procedureCount')}</span>
                    <span className="font-bold text-slate-800">{iso.prosedur}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.workInstructions')}</span>
                    <span className="font-bold text-slate-800">{iso.instruksiKerja}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500 font-medium">{t('overview.formCount')}</span>
                    <span className="font-bold text-slate-800">{iso.formulir}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-50 flex items-center justify-end text-[11px] text-[#00A3E0] font-bold group-hover:translate-x-1 transition-transform">
                <span>{t('standards.viewDetailAnalytics')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  
    </PublicLayout>);
}
