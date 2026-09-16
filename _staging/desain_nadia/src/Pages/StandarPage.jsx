import React from 'react';
import { BookOpen, Shield, Sparkles, CheckCircle } from 'lucide-react';

export default function StandarPage() {
  const standardsList = [
    {
      code: 'ISO 9001:2015',
      title: 'Sistem Manajemen Mutu (Quality Management System)',
      desc: 'Panduan utama pengelolaan standar kualitas operasional, pengujian komponen, dan kepuasan pelanggan di seluruh instalasi PLN.',
      tag: 'ISO MUTU',
      tagColor: 'bg-[#1E40AF]',
      docsCount: '1.242 Dokumen'
    },
    {
      code: 'ISO 14001:2015',
      title: 'Sistem Manajemen Lingkungan (Environmental Management)',
      desc: 'Tolok ukur pengelolaan keberlanjutan ekosistem, emisi rendah karbon, dan penanganan limbah operasional ketenagalistrikan.',
      tag: 'ISO LINGKUNGAN',
      tagColor: 'bg-[#10B981]',
      docsCount: '830 Dokumen'
    },
    {
      code: 'ISO 45001:2018',
      title: 'Sistem Manajemen K3 (Safety & Occupational Health)',
      desc: 'Kerangka kerja perlindungan keselamatan teknisi dan pekerja dalam pemeliharaan jaringan transmisi tegangan tinggi & pembangkitan.',
      tag: 'ISO K3 SAFETY',
      tagColor: 'bg-[#D9252A]',
      docsCount: '759 Dokumen'
    },
    {
      code: 'SPLN S5.001:2023',
      title: 'Standar PLN Spesifikasi Meter Transaksi Listrik Digital',
      desc: 'Spesifikasi teknis resmi untuk perangkat pengukuran dan kalibrasi transmisi energi listrik terintegrasi.',
      tag: 'SPLN LOKAL',
      tagColor: 'bg-[#00A3E0]',
      docsCount: '145 Dokumen'
    }
  ];

  return (
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
  );
}
