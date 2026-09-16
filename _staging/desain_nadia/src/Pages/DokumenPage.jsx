import React, { useState } from 'react';
import { Download, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DokumenPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const documents = [
    {
      code: 'SOP-PST-9001-085',
      name: 'Prosedur Kalibrasi Alat Ukur Listrik Tegangan Tinggi',
      category: 'Prosedur (SOP)',
      bidang: 'Bidang Kalibrasi & Instrumentasi',
      rev: 'Rev. 04',
      date: '01 Oktober 2024',
      type: 'PDF',
      size: '2.4 MB'
    },
    {
      code: 'IK-PST-14001-140',
      name: 'Instruksi Kerja Pengujian Limbah B3 Operasional Pembangkit',
      category: 'Instruksi Kerja',
      bidang: 'Bidang Standarisasi & Pengujian',
      rev: 'Rev. 02',
      date: '15 Oktober 2024',
      type: 'PDF',
      size: '1.8 MB'
    },
    {
      code: 'FM-PST-45001-510',
      name: 'Formulir Inspeksi Kelayakan Alat Pelindung Diri (APD) K3',
      category: 'Formulir',
      bidang: 'Bidang Sertifikasi Produk',
      rev: 'Rev. 05',
      date: '25 September 2024',
      type: 'XLSX',
      size: '850 KB'
    },
    {
      code: 'MAN-PST-9001-012',
      name: 'Manual Mutu Terintegrasi PLN Pusertif Tahun 2024-2026',
      category: 'Manual Mutu',
      bidang: 'Bidang Umum & SDM',
      rev: 'Rev. 01',
      date: '10 September 2024',
      type: 'PDF',
      size: '5.6 MB'
    },
    {
      code: 'SOP-PST-FIN-122',
      name: 'Prosedur Pengadaan Barang & Jasa Laboratorium Pengujian',
      category: 'Prosedur (SOP)',
      bidang: 'Bidang Keuangan & Logistik',
      rev: 'Rev. 03',
      date: '02 September 2024',
      type: 'PDF',
      size: '3.1 MB'
    }
  ];

  const filteredDocs = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.bidang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-8 pb-12 font-sans max-w-7xl mx-auto px-4 sm:px-8 mt-4">
      <div className="bg-[#127297] text-white rounded-3xl p-8 lg:p-10 shadow-xl space-y-2">
        <span className="text-xs font-bold text-[#FFE600] uppercase tracking-widest">
          {t('documents.badge')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          {t('documents.title')}
        </h1>
        <p className="text-blue-100 text-sm max-w-2xl">
          {t('documents.subtitle')}
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t('documents.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00A3E0] focus:outline-none"
          />
        </div>
        <span className="text-xs font-bold text-slate-500">
          {t('documents.showingText', { count: filteredDocs.length })}
        </span>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-4 px-6">{t('documents.codeHeader')} & {t('documents.titleHeader')}</th>
                <th className="py-4 px-4">{t('documents.categoryHeader')}</th>
                <th className="py-4 px-4">{t('documents.divisionHeader')}</th>
                <th className="py-4 px-4 text-center">{t('documents.revisionHeader')}</th>
                <th className="py-4 px-4 text-center">{t('documents.dateHeader')}</th>
                <th className="py-4 px-6 text-right">{t('documents.actionHeader')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredDocs.map((doc, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="space-y-0.5">
                      <span className="font-mono text-[10px] font-bold text-[#00A3E0] block">
                        {doc.code}
                      </span>
                      <span className="font-bold text-slate-900 text-sm block leading-snug">
                        {doc.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 bg-blue-50 text-[#00A3E0] rounded-lg font-bold border border-blue-100">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    {doc.bidang}
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-slate-800">
                    {doc.rev}
                  </td>
                  <td className="py-4 px-4 text-center text-slate-500">
                    {doc.date}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => alert(`Downloading ${doc.code} (${doc.size})`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00A3E0] text-white rounded-lg font-bold hover:bg-[#127297] shadow-xs transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{t('documents.downloadBtn')}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
