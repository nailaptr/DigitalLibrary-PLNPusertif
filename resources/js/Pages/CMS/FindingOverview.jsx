import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import FindingMetricGrid from '@/Components/FindingMetricGrid';
import FindingChartSection from '@/Components/FindingChartSection';
import { Calendar } from 'lucide-react';

export default function FindingOverview({ auth, stats }) {
  const [activeMenu, setActiveMenu] = useState('Overview Temuan');

  const handleSelectMenu = (name) => {
    setActiveMenu(name);
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="flex h-screen bg-[#F4F6F8] overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
        <Sidebar activeItem={activeMenu} onSelectMenu={handleSelectMenu} />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto min-h-screen">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                Overview Temuan
              </h1>
              <p className="text-sm text-gray-500 font-medium mt-1">
                Ringkasan statistik data Monitoring Temuan
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button type="button" title={new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })} aria-label={`Tanggal hari ini: ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}`} className="flex items-center gap-2 bg-white border border-gray-200 text-xs font-semibold text-slate-700 px-3.5 py-2 rounded-lg hover:bg-slate-50 transition shadow-2xs whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A2B9] cursor-default">
                <Calendar className="w-4 h-4 text-[#00A2B9]" aria-hidden="true" />
                <span>{new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </button>
            </div>
          </div>

          <FindingMetricGrid stats={stats} />
          <FindingChartSection stats={stats} />
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
