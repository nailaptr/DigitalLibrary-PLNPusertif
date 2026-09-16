import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import { BarChart2, FileText, Award, Layers, Folder, PieChart, Users } from 'lucide-react';

export default function Reports({ onNavigate, docData, certData, docPerStandard, docPerBidang, docPerJenis, activityPerUser }) {
  const [activeMenu, setActiveMenu] = useState('Laporan');

  const handleSidebarMenuSelect = (menuName) => {
    setActiveMenu(menuName);
    if (onNavigate) {
      onNavigate(menuName);
    }
  };

  return (
    <AuthenticatedLayout user={{ name: 'Admin User' }}>
      <div className="flex h-screen bg-[#F4F6F8] overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
        <Sidebar activeItem={activeMenu} onSelectMenu={handleSidebarMenuSelect} />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto min-h-screen">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Laporan & Statistik</h1>
              <p className="text-sm text-slate-500 mt-1">Laporan rekapitulasi data sistem</p>
            </div>
            <div className="p-3 bg-[#00A2B9]/10 rounded-xl">
              <BarChart2 className="w-6 h-6 text-[#00A2B9]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Laporan Data Dokumen */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-blue-500" />
                <h2 className="font-bold text-slate-800">Laporan Data Dokumen</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total Dokumen</span>
                  <span className="font-bold text-slate-800">{docData.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Status: Relevan</span>
                  <span className="font-bold text-emerald-600">{docData.relevan}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Status: Tidak Relevan</span>
                  <span className="font-bold text-red-600">{docData.tidak_relevan}</span>
                </div>
              </div>
            </div>

            {/* Laporan Data Sertifikat */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-5 h-5 text-yellow-500" />
                <h2 className="font-bold text-slate-800">Laporan Data Sertifikat</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total Sertifikat</span>
                  <span className="font-bold text-slate-800">{certData.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Status: Aktif</span>
                  <span className="font-bold text-emerald-600">{certData.aktif}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Status: Kedaluwarsa</span>
                  <span className="font-bold text-red-600">{certData.kedaluwarsa}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Laporan Dokumen per Standar */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-5 h-5 text-purple-500" />
                <h2 className="font-bold text-slate-800">Dokumen per Standar</h2>
              </div>
              <ul className="space-y-3 text-sm">
                {docPerStandard.map((std, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span className="text-slate-600">{std.name}</span>
                    <span className="font-bold text-slate-800">{std.count}</span>
                  </li>
                ))}
                {docPerStandard.length === 0 && <li className="text-slate-400">Tidak ada data</li>}
              </ul>
            </div>

            {/* Laporan Dokumen per Bidang */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Folder className="w-5 h-5 text-orange-500" />
                <h2 className="font-bold text-slate-800">Dokumen per Bidang</h2>
              </div>
              <ul className="space-y-3 text-sm">
                {docPerBidang.map((b, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span className="text-slate-600">{b.bidang || 'Tanpa Bidang'}</span>
                    <span className="font-bold text-slate-800">{b.count}</span>
                  </li>
                ))}
                {docPerBidang.length === 0 && <li className="text-slate-400">Tidak ada data</li>}
              </ul>
            </div>

            {/* Laporan Dokumen berdasarkan Jenis */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <PieChart className="w-5 h-5 text-cyan-500" />
                <h2 className="font-bold text-slate-800">Dokumen per Jenis</h2>
              </div>
              <ul className="space-y-3 text-sm">
                {docPerJenis.map((j, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span className="text-slate-600">{j.jenis || 'Tanpa Jenis'}</span>
                    <span className="font-bold text-slate-800">{j.count}</span>
                  </li>
                ))}
                {docPerJenis.length === 0 && <li className="text-slate-400">Tidak ada data</li>}
              </ul>
            </div>
          </div>

          {/* Laporan Aktivitas Pengguna */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-pink-500" />
              <h2 className="font-bold text-slate-800">Aktivitas Pengguna</h2>
            </div>
            <ul className="space-y-3 text-sm max-w-md">
              {activityPerUser.map((u, idx) => (
                <li key={idx} className="flex justify-between items-center border-b border-slate-50 pb-2">
                  <span className="text-slate-600">{u.user_name}</span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold text-xs">{u.count} aktivitas</span>
                </li>
              ))}
              {activityPerUser.length === 0 && <li className="text-slate-400">Tidak ada data</li>}
            </ul>
          </div>

        </main>
      </div>
    </AuthenticatedLayout>
  );
}
