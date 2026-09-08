import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import MetricGrid from '../Components/MetricGrid';
import ChartSection from '../Components/ChartSection';
import DocumentSection from '../Components/DocumentSection';
import { Bell, Search, Calendar, Filter } from 'lucide-react';

export default function OverviewDashboard({ onNavigate }) {
  const [activeMenu, setActiveMenu] = useState('Overview');

  const handleSelectMenu = (name) => {
    setActiveMenu(name);
    if (onNavigate) onNavigate(name);
  };

  return (
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
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari dokumen..."
                className="pl-9 pr-4 py-2 bg-white text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A2B9] focus:border-transparent w-48 shadow-2xs transition-all"
              />
            </div>

            <button className="flex items-center gap-2 bg-white border border-gray-200 text-xs font-semibold text-slate-700 px-3.5 py-2 rounded-lg hover:bg-slate-50 transition shadow-2xs">
              <Calendar className="w-4 h-4 text-[#00A2B9]" />
              <span>{new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </button>

            <button className="relative bg-white border border-gray-200 text-slate-600 p-2 rounded-lg hover:bg-slate-50 transition shadow-2xs">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </div>

        {/* Section C: Top Metric Cards Grid (6 Cards) */}
        <MetricGrid />

        {/* Section D: Middle Section: Charts Area */}
        <ChartSection />

        {/* Section E: Bottom Section: Recent Documents & Document Stats */}
        <DocumentSection />
      </main>
    </div>
  );
}
