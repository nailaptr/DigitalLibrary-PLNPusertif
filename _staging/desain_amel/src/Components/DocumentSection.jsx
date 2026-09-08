import React from 'react';
import { ArrowRight, FileText, Clock, Tag } from 'lucide-react';

export default function DocumentSection() {
  const documents = [
    {
      id: 'doc-1',
      title: 'Dokumen A',
      timestamp: '21/11/2025, 09:41 AM',
      status: 'Belum Direview',
      statusType: 'warning', // Orange/Gray
      tags: ['ISO 9001', 'ISO 14001', 'Manual', 'Bidang A'],
      note: 'Catatan: -',
    },
    {
      id: 'doc-2',
      title: 'Dokumen B',
      timestamp: '20/11/2025, 14:15 PM',
      status: 'Relevan',
      statusType: 'success', // Teal/Green italic
      tags: ['ISO 9001', 'Prosedur', 'Bidang B'],
      note: 'Catatan: Relevan dengan standar industri manufaktur & sertifikasi PLN.',
    },
    {
      id: 'doc-3',
      title: 'Dokumen C',
      timestamp: '19/11/2025, 11:30 AM',
      status: 'Relevan',
      statusType: 'success', // Teal/Green italic
      tags: ['ISO 45001', 'Instruksi Kerja', 'Bidang C'],
      note: 'Catatan: -',
    },
  ];

  const documentStats = [
    { label: 'Jumlah Dokumen', count: 100 },
    { label: 'Jumlah Manual', count: 25 },
    { label: 'Jumlah Prosedur', count: 25 },
    { label: 'Jumlah Instruksi Kerja', count: 25 },
    { label: 'Jumlah Formulir', count: 25 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Kiri (2 Kolom): Dokumen Terbaru */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-slate-800 text-lg">Dokumen Terbaru</h2>
            <p className="text-xs text-gray-500 mt-0.5">Daftar dokumen mutu PLN yang baru diunggah / diperbarui</p>
          </div>
          <a
            href="#"
            className="text-xs font-semibold text-[#00A2B9] hover:text-[#006B7B] flex items-center gap-1.5 transition-colors"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* List 3 Cards Dokumen */}
        <div className="space-y-3.5">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-xl border border-gray-100 bg-slate-50/50 hover:bg-white hover:border-gray-300 hover:shadow-xs transition-all duration-200"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#00A2B9]/10 text-[#00A2B9] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">{doc.title}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {doc.timestamp}
                  </span>
                  
                  {/* Status Badge */}
                  {doc.statusType === 'warning' ? (
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      {doc.status}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 text-xs font-medium italic rounded-full bg-teal-50 text-[#006B7B] border border-teal-200">
                      {doc.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Tags List */}
              <div className="flex flex-wrap items-center gap-1.5 my-2">
                {doc.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-gray-200 text-[11px] font-medium text-slate-600 shadow-2xs"
                  >
                    <Tag className="w-3 h-3 text-slate-400" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Catatan */}
              <p className="text-xs text-gray-500 mt-2 font-normal">
                {doc.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Kanan (1 Kolom): Statistik Dokumen */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col">
        <div className="mb-4 pb-3 border-b border-gray-100">
          <h2 className="font-bold text-slate-800 text-lg">Statistik Dokumen</h2>
          <p className="text-xs text-gray-500 mt-0.5">Rincian jumlah dokumen berdasarkan jenis</p>
        </div>

        <div className="flex-1 flex flex-col justify-around">
          {documentStats.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center justify-between py-3 ${
                index !== documentStats.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="text-sm font-medium text-slate-600">{stat.label}:</span>
              <span className="text-base font-bold text-slate-900 bg-slate-100 px-3 py-0.5 rounded-lg border border-slate-200">
                {stat.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
