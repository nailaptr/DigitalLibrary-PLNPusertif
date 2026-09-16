import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import { History } from 'lucide-react';

export default function ActivityLog({ onNavigate, logs = [] }) {
  const [activeMenu, setActiveMenu] = useState('Log Aktivitas');

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
              <h1 className="text-2xl font-bold text-slate-800">Log Aktivitas</h1>
              <p className="text-sm text-slate-500 mt-1">Riwayat aktivitas pengguna dalam sistem</p>
            </div>
            <div className="p-3 bg-[#00A2B9]/10 rounded-xl">
              <History className="w-6 h-6 text-[#00A2B9]" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Waktu</th>
                    <th className="px-6 py-4">Pengguna</th>
                    <th className="px-6 py-4">Aksi</th>
                    <th className="px-6 py-4">Entitas</th>
                    <th className="px-6 py-4">Detail</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  {logs.length > 0 ? logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">{log.created_at}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-800">{log.user_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          log.action === 'create' ? 'bg-emerald-100 text-emerald-700' :
                          log.action === 'update' ? 'bg-blue-100 text-blue-700' :
                          log.action === 'delete' ? 'bg-red-100 text-red-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {log.action.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">{log.entity}</td>
                      <td className="px-6 py-4 text-slate-500 min-w-[200px]">{log.details ? JSON.stringify(log.details) : '-'}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                        Belum ada catatan aktivitas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
