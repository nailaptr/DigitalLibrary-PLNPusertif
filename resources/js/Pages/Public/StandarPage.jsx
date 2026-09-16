import PublicLayout from '@/Layouts/PublicLayout';
import React from 'react';
import { BookOpen, Shield, Sparkles, CheckCircle } from 'lucide-react';

export default function StandarPage({ standardsList = [] }) {
  return (
    <PublicLayout>

    <div className="w-full space-y-8 pb-12 font-sans max-w-7xl mx-auto px-4 sm:px-8 mt-4">
      <div className="bg-[#00A3E0] text-white rounded-3xl p-8 lg:p-10 shadow-xl space-y-2">
        <span className="text-xs font-bold text-[#FFE600] uppercase tracking-widest">
          STANDARISASI NASIONAL & INTERNASIONAL
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Katalog Standar Terintegrasi
        </h1>
        <p className="text-blue-50 text-sm max-w-2xl">
          Dokumentasi pedoman acuan ISO dan SPLN yang digunakan PLN Pusertif untuk menjamin mutu dan keselamatan energi nasional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {standardsList.map((std, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md shadow-slate-200/50 space-y-4 hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold text-white px-3 py-1 rounded-full ${std.tagColor}`}>
                {std.tag}
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {std.docsCount}
              </span>
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-[#00A3E0] block mb-1">
                {std.code}
              </span>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {std.title}
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {std.desc}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Standar Berlaku 2026
              </span>
              <button
                onClick={() => alert(`Membuka berkas rincian ${std.code}`)}
                className="font-bold text-[#00A3E0] hover:underline cursor-pointer"
              >
                Lihat Rincian Pedoman →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  
    </PublicLayout>);
}
