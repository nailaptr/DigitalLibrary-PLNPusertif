import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import MetricGrid from '@/Components/CMS/MetricGrid';
import ChartSection from '@/Components/CMS/ChartSection';
import DocumentSection from '@/Components/CMS/DocumentSection';
import { Bell, Search, Calendar, Filter } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function OverviewDashboard({ auth, stats }) {
  const [activeMenu, setActiveMenu] = useState('Overview');
  const [query, setQuery] = useState('');
  const todayLabel = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });

  const handleSelectMenu = (name) => {
    setActiveMenu(name);
    // Add logic if it needs to redirect
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="flex h-screen bg-[#F4F6F8] overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Sidebar Component */}
        <Sidebar activeItem={activeMenu} onSelectMenu={handleSelectMenu} />

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto min-h-screen">
          {/* Top Bar / Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                Overview
              </h1>
              <p className="text-sm text-gray-500 font-medium mt-1">
                Ringkasan semua data terkait dokumen standar mutu PLN
              </p>
            </div>

            {/* Quick Actions / Date & Search */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-full sm:w-auto order-last sm:order-first">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <label htmlFor="dashboard-search" className="sr-only">Cari dokumen</label>
                <input
                  id="dashboard-search"
                  type="search"
                  placeholder="Cari dokumen..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full sm:w-48 pl-9 pr-4 py-2 bg-white text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A2B9] focus:border-transparent shadow-2xs transition-all text-slate-800 placeholder-gray-400"
                />
              </div>

              <button type="button" title={todayLabel} aria-label={`Tanggal hari ini: ${todayLabel}`} className="flex items-center gap-2 bg-white border border-gray-200 text-xs font-semibold text-slate-700 px-3.5 py-2 rounded-lg hover:bg-slate-50 transition shadow-2xs whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A2B9] cursor-default">
                <Calendar className="w-4 h-4 text-[#00A2B9]" aria-hidden="true" />
                <span>{todayLabel}</span>
              </button>

              <button type="button" title="Notifikasi" aria-label="Notifikasi" className="relative bg-white border border-gray-200 text-slate-600 p-2 rounded-lg hover:bg-slate-50 transition shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A2B9]">
                <Bell className="w-4 h-4" aria-hidden="true" />
                <span aria-hidden="true" className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>

          {/* Section C: Top Metric Cards Grid (6 Cards) */}
          <MetricGrid stats={stats} />

          {/* Section D: Middle Section: Charts Area */}
          <ChartSection stats={stats} />

          {/* Section E: Bottom Section: Recent Documents & Document Stats */}
          <DocumentSection stats={stats} filter={query} />
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
