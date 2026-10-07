import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useMemo } from 'react';
import Sidebar from '@/Components/Sidebar';
import { History, Search, X } from 'lucide-react';

export default function ActivityLog({ onNavigate, logs = [] }) {
  const [activeMenu, setActiveMenu] = useState('Log Aktivitas');
  const [query, setQuery] = useState('');

  const filteredLogs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return logs;
    return logs.filter((log) =>
      log.user_name?.toLowerCase().includes(q) ||
      log.action?.toLowerCase().includes(q) ||
      log.entity?.toLowerCase().includes(q) ||
      (typeof log.details === 'string' ? log.details : JSON.stringify(log.details ?? '')).toLowerCase().includes(q)
    );
  }, [logs, query]);

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-gray-100">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                <label htmlFor="activitylog-search" className="sr-only">Cari log aktivitas</label>
                <input
                  id="activitylog-search"
                  type="search"
                  placeholder="Cari Log..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00838F] focus:border-transparent bg-white font-medium text-slate-700 shadow-2xs placeholder-gray-400"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Bersihkan pencarian"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00838F]"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium" aria-live="polite">
                Menampilkan {filteredLogs.length} dari {logs.length} log
              </p>
            </div>

            <div className="overflow-x-auto p-5">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Waktu</th>
                    <th className="px-6 py-4">Pengguna</th>
                    <th className="px-6 py-4">Aksi</th>
                    <th className="px-6 py-4">Entitas</th>
                    <th className="px-6 py-4">Detail</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {filteredLogs.length > 0 ? filteredLogs.map((log) => (
                    <tr key={log.id} className="bg-white hover:bg-slate-50/50 shadow-sm border border-gray-100 rounded-xl transition-all">
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
                        {query ? 'Tidak ada log yang cocok dengan pencarian.' : 'Belum ada catatan aktivitas.'}
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
