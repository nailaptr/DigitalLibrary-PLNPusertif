import React, { useState } from 'react';
import {
  CheckCircle,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

export default function OverviewDashboard() {
  const { t } = useTranslation();
  const [lineFilter, setLineFilter] = useState('Bulanan');
  const [distroFilter, setDistroFilter] = useState('Q3 2024');

  // Data for Middle Area/Line Chart
  const lineData = [
    { month: 'Jan', revisi: 45 },
    { month: 'Mar', revisi: 80 },
    { month: 'May', revisi: 65 },
    { month: 'Jul', revisi: 110 },
    { month: 'Sep', revisi: 90 },
    { month: 'Nov', revisi: 135 },
  ];

  // Data for Donut Chart
  const donutData = [
    { name: `${t('overview.fieldA')} (40%)`, value: 40, color: '#00A3E0' },
    { name: `${t('overview.fieldB')} (25%)`, value: 25, color: '#1E40AF' },
    { name: `${t('overview.fieldC')} (20%)`, value: 20, color: '#10B981' },
    { name: `${t('overview.others')} (15%)`, value: 15, color: '#D9252A' },
  ];

  return (
    <div className="w-full flex flex-col justify-between min-h-screen bg-[#F8FAFC]">
      <div className="w-full space-y-10 pb-12 font-sans max-w-7xl mx-auto px-4 sm:px-8 mt-4 flex-1">
        {/* ========================================================= */}
        {/* HEADER BANNER                                             */}
        {/* ========================================================= */}
        <div className="w-full bg-[#00A3E0] text-white rounded-3xl p-8 lg:p-12 shadow-xl shadow-[#00A3E0]/20 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-2">
            <h1 className="text-3xl font-bold text-white mb-2">
              {t('overview.title')}
            </h1>
            <p className="text-white/90 text-sm leading-relaxed">
              {t('overview.subtitle')}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 1: INDIKATOR KEPATUHAN STANDAR (3 SUMMARY CARDS) */}
        {/* ========================================================= */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-[#00A3E0]" />
            <span>{t('overview.sectionTitle')}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: ISO 9001:2015 */}
            <div className="bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
              <div className="h-2 w-full bg-[#00A3E0]" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      QUALITY MANAGEMENT
                    </span>
                    <h3 className="text-lg font-bold text-[#1E40AF] uppercase">
                      ISO 9001:2015
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 bg-blue-50 text-[#1E40AF] text-[11px] font-bold rounded-lg border border-blue-100 uppercase">
                    {t('overview.qualityBadge')}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.totalDocs')}</span>
                    <span className="font-bold text-slate-900">1,242</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.manualCount')}</span>
                    <span className="font-bold text-slate-800">12</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.procedureCount')}</span>
                    <span className="font-bold text-slate-800">85</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.workInstructions')}</span>
                    <span className="font-bold text-slate-800">210</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.formCount')}</span>
                    <span className="font-bold text-slate-800">935</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: ISO 14001:2015 */}
            <div className="bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
              <div className="h-2 w-full bg-[#10B981]" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      ENVIRONMENTAL MANAGEMENT
                    </span>
                    <h3 className="text-lg font-bold text-[#10B981] uppercase">
                      ISO 14001:2015
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-[#10B981] text-[11px] font-bold rounded-lg border border-emerald-100 uppercase">
                    {t('overview.envBadge')}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.totalDocs')}</span>
                    <span className="font-bold text-slate-900">1,242</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.manualCount')}</span>
                    <span className="font-bold text-slate-800">12</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.procedureCount')}</span>
                    <span className="font-bold text-slate-800">85</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.workInstructions')}</span>
                    <span className="font-bold text-slate-800">210</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.formCount')}</span>
                    <span className="font-bold text-slate-800">935</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: ISO 45001:2018 */}
            <div className="bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
              <div className="h-2 w-full bg-[#D9252A]" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      SAFETY & HEALTH MANAGEMENT
                    </span>
                    <h3 className="text-lg font-bold text-[#D9252A] uppercase">
                      ISO 45001:2018
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 bg-red-50 text-[#D9252A] text-[11px] font-bold rounded-lg border border-red-100 uppercase">
                    {t('overview.safetyBadge')}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.totalDocs')}</span>
                    <span className="font-bold text-slate-900">1,242</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.manualCount')}</span>
                    <span className="font-bold text-slate-800">12</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.procedureCount')}</span>
                    <span className="font-bold text-slate-800">85</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.workInstructions')}</span>
                    <span className="font-bold text-slate-800">210</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{t('overview.formCount')}</span>
                    <span className="font-bold text-slate-800">935</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: ANALYTICS GRID (2 CHARTS ROW)                 */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Kiri: Dokumen yang direview (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 lg:p-8 shadow-md shadow-slate-200/50 border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">
                  {t('overview.chartTitle')}
                </h3>
                <button className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Bar 1: ISO 9001 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#1E40AF]">ISO 9001</span>
                    <span className="text-slate-800">425 {t('overview.totalDocs')}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                    <div className="bg-[#1E40AF] h-full rounded-full transition-all duration-1000 w-[80%]" />
                  </div>
                </div>

                {/* Bar 2: ISO 14001 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#10B981]">ISO 14001</span>
                    <span className="text-slate-800">295 {t('overview.totalDocs')}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                    <div className="bg-[#10B981] h-full rounded-full transition-all duration-1000 w-[60%]" />
                  </div>
                </div>

                {/* Bar 3: ISO 45001 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#D9252A]">ISO 45001</span>
                    <span className="text-slate-800">350 {t('overview.totalDocs')}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                    <div className="bg-[#D9252A] h-full rounded-full transition-all duration-1000 w-[70%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-400 italic">
              {t('overview.chartSubtitle')}
            </div>
          </div>

          {/* Kanan: Review dan Revisi Dokumen Mutu (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 lg:p-8 shadow-md shadow-slate-200/50 border border-slate-100 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900">
                {t('overview.chartTitle')}
              </h3>
              <div className="bg-slate-100 p-1 rounded-full flex items-center border border-slate-200 text-xs font-bold self-start sm:self-auto">
                <button
                  onClick={() => setLineFilter('Bulanan')}
                  className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                    lineFilter === 'Bulanan'
                      ? 'bg-[#00A3E0] text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t('overview.monthly')}
                </button>
                <button
                  onClick={() => setLineFilter('Tahunan')}
                  className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                    lineFilter === 'Tahunan'
                      ? 'bg-[#00A3E0] text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t('overview.annual')}
                </button>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCyan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00A3E0" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00A3E0" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                  />
                  <Area type="monotone" dataKey="revisi" name={t('overview.chartTitle')} stroke="#00A3E0" strokeWidth={3} fillOpacity={1} fill="url(#colorCyan)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 3: DISTRIBUSI DOKUMEN PER BIDANG                  */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-md shadow-slate-200/50 border border-slate-100 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <h3 className="text-xl font-bold text-slate-900">
              {t('overview.donutTitle')}
            </h3>

            <div className="relative">
              <select
                value={distroFilter}
                onChange={(e) => setDistroFilter(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 pr-9 text-xs font-bold text-slate-700 cursor-pointer focus:ring-2 focus:ring-[#00A3E0] focus:outline-none"
              >
                <option>Q3 2024 (Current)</option>
                <option>Q2 2024</option>
                <option>Q1 2024</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Donut Chart (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-black text-slate-900 tracking-tight">
                    2.431
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    TOTAL
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full mt-4 pt-4 border-t border-slate-200/60 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: '#00A3E0' }} />
                  <span className="text-slate-700">{t('overview.fieldA')} (40%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: '#1E40AF' }} />
                  <span className="text-slate-700">{t('overview.fieldB')} (25%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: '#10B981' }} />
                  <span className="text-slate-700">{t('overview.fieldC')} (20%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: '#D9252A' }} />
                  <span className="text-slate-700">{t('overview.others')} (15%)</span>
                </div>
              </div>
            </div>

            {/* Data Table (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4">{t('documents.divisionHeader')}</th>
                      <th className="py-3 px-4 text-center">{t('overview.totalDocs')}</th>
                      <th className="py-3 px-4 text-right">{t('documents.dateHeader')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {t('overview.fieldA')}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-cyan-600">
                        572
                      </td>
                      <td className="py-3 px-4 text-right text-slate-500">
                        15 Oct 2024
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {t('overview.fieldB')}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-cyan-600">
                        308
                      </td>
                      <td className="py-3 px-4 text-right text-slate-500">
                        01 Oct 2024
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {t('overview.fieldC')}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-cyan-600">
                        405
                      </td>
                      <td className="py-3 px-4 text-right text-slate-500">
                        25 Sep 2024
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Footer Component */}
      <Footer />
    </div>
  );
}
