import React, { useState } from 'react';
import logoPLN from '../assets/logo-pln-fix.png';
import {
  LayoutDashboard,
  Users,
  FileText,
  Award,
  Layers,
  FileCheck,
  HelpCircle,
  Settings,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export default function Sidebar({ activeItem = 'Overview', onSelectMenu }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuGroups = [
    {
      group: 'Dashboard',
      items: [
        { name: 'Overview', icon: LayoutDashboard, path: '#' },
        { name: 'Manajemen User', icon: Users, path: '#' },
      ],
    },
    {
      group: 'Manajemen Konten',
      items: [
        { name: 'Dokumen', icon: FileText, path: '#' },
        { name: 'Sertifikat', icon: Award, path: '#' },
        { name: 'Standar', icon: Layers, path: '#' },
        { name: 'Status Dokumen', icon: FileCheck, path: '#' },
        { name: 'FAQ', icon: HelpCircle, path: '#' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#2D3139] text-white p-2 rounded-lg shadow-lg hover:bg-slate-700 transition"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for Mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 z-40 h-screen bg-[#2D3139] text-slate-200 flex flex-col justify-between transition-all duration-300 shadow-xl ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div>
          {/* Header Logo Area */}
          <div className="p-4 flex items-center justify-between border-b border-slate-700/60">
            <div className="flex items-center gap-3">
              <img 
                src={logoPLN} 
                alt="Logo PLN" 
                className="h-10 w-auto object-contain flex-shrink-0" 
              />
              {!collapsed && (
                <div className="leading-tight">
                  <h1 className="font-bold text-white text-sm tracking-wide">
                    Portal Admin
                  </h1>
                  <span className="text-xs font-semibold text-[#00A2B9] block">
                    PLN Pusertif
                  </span>
                </div>
              )}
            </div>
            
            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-700/60 transition"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`} />
            </button>
          </div>

          {/* User Profile Section */}
          <div className="p-4 border-b border-slate-700/60 bg-slate-800/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="relative shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                    alt="John Doe Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#00A2B9]"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#2D3139] rounded-full"></span>
                </div>
                {!collapsed && (
                  <div className="truncate">
                    <p className="text-sm font-semibold text-white truncate">John Doe</p>
                    <p className="text-xs text-slate-400 font-medium">Admin</p>
                  </div>
                )}
              </div>
              {!collapsed && (
                <button
                  className="text-slate-400 hover:text-[#00A2B9] p-1.5 hover:bg-slate-700/50 rounded-lg transition"
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Menu List */}
          <nav className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-210px)]">
            {menuGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1.5">
                {!collapsed && (
                  <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {group.group}
                  </p>
                )}
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.name;
                  return (
                    <a
                      key={item.name}
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        if (onSelectMenu) onSelectMenu(item.name);
                      }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative ${
                        isActive
                          ? 'bg-[#00A2B9]/20 text-[#00A2B9] font-semibold'
                          : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                      title={collapsed ? item.name : undefined}
                    >
                      {/* Active Left Indicator Bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#00A2B9] rounded-r-full" />
                      )}
                      <Icon
                        className={`w-5 h-5 shrink-0 transition-colors ${
                          isActive ? 'text-[#00A2B9]' : 'text-slate-400 group-hover:text-white'
                        }`}
                      />
                      {!collapsed && <span>{item.name}</span>}
                    </a>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Footer / Version Badge */}
        {!collapsed && (
          <div className="p-4 border-t border-slate-700/60 text-center text-xs text-slate-400">
            <p>PLN Pusertif v1.0 &copy; 2025</p>
          </div>
        )}
      </aside>
    </>
  );
}
