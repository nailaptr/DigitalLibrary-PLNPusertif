import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Filter as FilterIcon } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

export default function StandarDetailView() {
  const { isoId } = useParams();
  const { t } = useTranslation();

  // Filter States
  const [rentangWaktu, setRentangWaktu] = useState('Per Bulan');
  const [jenisDokumen, setJenisDokumen] = useState('Manual');
  const [bidang, setBidang] = useState('Standarisasi & Pengujian');
  const [statusDoc, setStatusDoc] = useState('Sesuai');

  // Chart Data per Month
  const monthData = [
    { label: 'Jan', value: 2.1 },
    { label: 'Feb', value: 2.0 },
    { label: 'Mar', value: 2.5 },
    { label: 'Apr', value: 2.8 },
  ];

  // Chart Data per Year
  const yearData = [
    { label: '2022', value: 1.8 },
    { label: '2023', value: 2.2 },
    { label: '2024', value: 2.5 },
    { label: '2025', value: 3.1 },
  ];

  const currentChartData = rentangWaktu === 'Per Bulan' ? monthData : yearData;

  const handleReset = () => {
    setRentangWaktu('Per Bulan');
    setJenisDokumen('Manual');
    setBidang('Standarisasi & Pengujian');
    setStatusDoc('Sesuai');
  };

  const handleApply = (e) => {
    e.preventDefault();
  };

  const getIsoTitle = () => {
    if (isoId?.includes('14001')) return 'ISO 14001';
    if (isoId?.includes('45001')) return 'ISO 45001';
    if (isoId?.includes('17025')) return 'ISO/IEC 17025';
    if (isoId?.includes('50001')) return 'ISO 50001';
    if (isoId?.includes('27001')) return 'ISO 27001';
    if (isoId?.includes('spln')) return 'SPLN S5.001';
    if (isoId?.includes('31000')) return 'ISO 31000';
    return 'ISO 9001';
  };

  const isoTitle = getIsoTitle();

  return (
    <div className="w-full flex flex-col justify-between min-h-screen bg-[#F8FAFC]">
      <div className="w-full space-y-8 pb-12 font-sans max-w-7xl mx-auto px-4 sm:px-8 mt-4 flex-1">
        <div>
          <Link
            to="/standar"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#00A3E0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('standardsDetail.backToList')}</span>
          </Link>
        </div>

        {/* HEADER */}
        <div className="w-full bg-[#00A3E0] text-white rounded-3xl p-8 lg:p-12 shadow-xl shadow-[#00A3E0]/20 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-2">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isoTitle}
            </h1>
            <p className="text-white/90 text-sm leading-relaxed">
              {t('standardsDetail.subtitle')}
            </p>
          </div>
        </div>

        {/* WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-start">
          {/* Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FilterIcon className="w-4 h-4 text-[#00A3E0]" />
                <h3 className="text-sm font-bold text-slate-800">{t('standardsDetail.filterHeader')}</h3>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-cyan-500 hover:underline cursor-pointer flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t('standardsDetail.resetFilter')}</span>
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-4 text-xs">
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-2 block">
                  {t('standardsDetail.timeRangeLabel')}
                </label>
                <div className="flex items-center gap-4 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="radio"
                      name="rentangWaktu"
                      value="Per Bulan"
                      checked={rentangWaktu === 'Per Bulan'}
                      onChange={(e) => setRentangWaktu(e.target.value)}
                      className="text-[#00A3E0] focus:ring-[#00A3E0]"
                    />
                    <span>{t('standardsDetail.perMonth')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="radio"
                      name="rentangWaktu"
                      value="Per Tahun"
                      checked={rentangWaktu === 'Per Tahun'}
                      onChange={(e) => setRentangWaktu(e.target.value)}
                      className="text-[#00A3E0] focus:ring-[#00A3E0]"
                    />
                    <span>{t('standardsDetail.perYear')}</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                  {t('standardsDetail.docTypeLabel')}
                </label>
                <select
                  value={jenisDokumen}
                  onChange={(e) => setJenisDokumen(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#00A3E0] focus:outline-none"
                >
                  <option value="Manual">{t('overview.manualCount')}</option>
                  <option value="Prosedur">{t('overview.procedureCount')}</option>
                  <option value="Instruksi Kerja">{t('overview.workInstructions')}</option>
                  <option value="Formulir">{t('overview.formCount')}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                  {t('standardsDetail.fieldLabel')}
                </label>
                <select
                  value={bidang}
                  onChange={(e) => setBidang(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#00A3E0] focus:outline-none"
                >
                  <option value="Standarisasi & Pengujian">{t('overview.fieldA')}</option>
                  <option value="Kalibrasi & Instrumentasi">{t('overview.fieldB')}</option>
                  <option value="Sertifikasi Produk">{t('overview.fieldC')}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                  {t('standardsDetail.statusLabel')}
                </label>
                <select
                  value={statusDoc}
                  onChange={(e) => setStatusDoc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#00A3E0] focus:outline-none"
                >
                  <option value="Sesuai">{t('standardsDetail.compliant')}</option>
                  <option value="Tidak Sesuai">{t('standardsDetail.nonCompliant')}</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#00A3E0] hover:bg-cyan-600 text-white font-semibold py-2.5 rounded-xl transition mt-4 cursor-pointer text-xs shadow-md"
              >
                {t('standardsDetail.applyFilter')}
              </button>
            </form>
          </div>

          {/* Chart */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {t('standardsDetail.growthChartTitle')}
              </h3>
              <span className="text-xs text-slate-500 mb-4 block font-medium">
                {t('standardsDetail.chartDesc')}
              </span>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {currentChartData.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-cyan-50 border border-cyan-200 rounded-full px-3.5 py-1 text-xs font-extrabold text-[#00A3E0] flex items-center gap-1.5 shrink-0"
                >
                  <span className="text-slate-500 font-semibold">{item.label}:</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentChartData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradientCyanDetail" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00A3E0" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00A3E0" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: '#64748B', fontWeight: 'bold' }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: '#64748B' }}
                    domain={[0, 4]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                    labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    name={t('standardsDetail.growthChartTitle')}
                    stroke="#00A3E0"
                    strokeWidth={3.5}
                    fillOpacity={1}
                    fill="url(#gradientCyanDetail)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
