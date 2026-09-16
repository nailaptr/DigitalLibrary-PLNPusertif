import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Calendar,
  CheckCircle2,
  X,
  Building2,
  Download
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SertifikatPage() {
  const { t } = useTranslation();
  const [selectedCert, setSelectedCert] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Certificate Items
  const certificateList = [
    {
      id: 1,
      title: 'Host Performed Customer Satisfaction Survey of PT PLN (Persero) Pusertif',
      recipient: 'EKO PRIYANTO',
      nip: '9514027B2V',
      issuer: 'PT PLN (Persero) Pusat Sertifikasi (Pusertif)',
      date: 'August 21, 2024',
      category: 'ISO 9001:2015',
      image: '/images/piagam_detail.png',
      remarks: 'Certificate awarded for outstanding performance and customer satisfaction audit compliance in 2024.',
    },
    {
      id: 2,
      title: 'Sertifikasi Audit Sistem Manajemen Lingkungan Pembangkitan Energi',
      recipient: 'EKO PRIYANTO',
      nip: '9514027B2V',
      issuer: 'PT PLN (Persero) Pusat Sertifikasi (Pusertif)',
      date: 'August 15, 2024',
      category: 'ISO 14001:2015',
      image: '/images/cert_thumb.png',
      remarks: 'Kepatuhan standar mutu pengelolaan dampak lingkungan operasional PLN.',
    },
    {
      id: 3,
      title: 'Sertifikasi Kepatuhan Keselamatan & Kesehatan Kerja K3 Transmisi',
      recipient: 'EKO PRIYANTO',
      nip: '9514027B2V',
      issuer: 'PT PLN (Persero) Pusat Sertifikasi (Pusertif)',
      date: 'July 28, 2024',
      category: 'ISO 45001:2018',
      image: '/images/piagam_detail.png',
      remarks: 'Verifikasi kepatuhan penerapan standar K3 pada gardu induk tegangan tinggi.',
    },
    {
      id: 4,
      title: 'Penjaminan Mutu Kalibrasi Alat Ukur Listrik & Instrumentasi Digital',
      recipient: 'EKO PRIYANTO',
      nip: '9514027B2V',
      issuer: 'PT PLN (Persero) Pusat Sertifikasi (Pusertif)',
      date: 'June 10, 2024',
      category: 'ISO 9001:2015',
      image: '/images/cert_thumb.png',
      remarks: 'Sertifikasi keandalan presisi pengukuran alat ukur laboratorium Pusertif.',
    },
    {
      id: 5,
      title: 'Piagam Penghargaan Standarisasi Produk Peralatan Ketenagalistrikan',
      recipient: 'EKO PRIYANTO',
      nip: '9514027B2V',
      issuer: 'PT PLN (Persero) Pusat Sertifikasi (Pusertif)',
      date: 'May 19, 2024',
      category: 'SPLN S5.001',
      image: '/images/piagam_detail.png',
      remarks: 'Penghargaan kontribusi pengujian standar mutu produk meter transaksi listrik.',
    },
    {
      id: 6,
      title: 'Host Performed Audit System Assessment for Substation Reliability',
      recipient: 'EKO PRIYANTO',
      nip: '9514027B2V',
      issuer: 'PT PLN (Persero) Pusat Sertifikasi (Pusertif)',
      date: 'April 04, 2024',
      category: 'ISO 9001:2015',
      image: '/images/cert_thumb.png',
      remarks: 'Sertifikasi sistem manajemen mutu evaluasi keandalan penyaluran energi.',
    },
    {
      id: 7,
      title: 'Verifikasi Akreditasi Laboratorium Pengujian Tegangan Tinggi Pusertif',
      recipient: 'EKO PRIYANTO',
      nip: '9514027B2V',
      issuer: 'PT PLN (Persero) Pusat Sertifikasi (Pusertif)',
      date: 'March 22, 2024',
      category: 'ISO/IEC 17025',
      image: '/images/piagam_detail.png',
      remarks: 'Sertifikat kompetensi laboratorium pengujian & kalibrasi independen nasional.',
    },
    {
      id: 8,
      title: 'Audit Sistem Manajemen Energi Berkelanjutan & Emisi Karbon Rendah',
      recipient: 'EKO PRIYANTO',
      nip: '9514027B2V',
      issuer: 'PT PLN (Persero) Pusat Sertifikasi (Pusertif)',
      date: 'February 14, 2024',
      category: 'ISO 5001:2018',
      image: '/images/cert_thumb.png',
      remarks: 'Penilaian efisiensi pemanfaatan energi dan konservasi daya di unit PLN.',
    },
    {
      id: 9,
      title: 'Sertifikat Keandalan Manajemen Risiko & Keamanan Informasi Audit',
      recipient: 'EKO PRIYANTO',
      nip: '9514027B2V',
      issuer: 'PT PLN (Persero) Pusat Sertifikasi (Pusertif)',
      date: 'January 09, 2024',
      category: 'ISO 27001:2022',
      image: '/images/piagam_detail.png',
      remarks: 'Sertifikasi perlindungan keamanan data audit dan dokumen sertifikasi resmi.',
    },
  ];

  // Filter implementation
  const filteredCerts = certificateList.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-10 pb-16 font-sans max-w-7xl mx-auto px-4 sm:px-8 mt-4">
      {/* ========================================================= */}
      {/* BANNER HEADER SECTION                                     */}
      {/* ========================================================= */}
      <div className="w-full bg-[#00A3E0] text-white rounded-3xl p-8 lg:p-12 shadow-xl shadow-[#00A3E0]/20 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {t('certificates.title')}
          </h1>
          <p className="text-blue-50 text-sm sm:text-base leading-relaxed opacity-95">
            {t('certificates.subtitle')}
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CONTROLS BAR (FILTER & SEARCH BAR)                       */}
      {/* ========================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#00A3E0]">
            <CheckCircle2 className="w-5 h-5 fill-[#00A3E0] text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            {t('certificates.title')}
          </h2>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto w-full md:w-auto">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="rounded-full border border-slate-300 bg-white px-5 py-2.5 flex items-center gap-2 text-xs font-semibold text-slate-600 hover:border-[#00A3E0] hover:text-[#00A3E0] transition-colors shadow-xs cursor-pointer shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <span>{t('certificates.filterTitle')}</span>
          </button>

          <div className="rounded-full border border-slate-300 bg-white px-5 py-2 flex items-center gap-2 text-slate-400 w-full sm:w-80 md:w-96 focus-within:border-[#00A3E0] focus-within:ring-2 focus-within:ring-[#00A3E0]/20 transition-all shadow-xs">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder={t('certificates.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs text-slate-800 bg-transparent focus:outline-none placeholder-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {isFilterOpen && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-3 text-xs">
          <span className="font-bold text-slate-700">{t('certificates.categoryLabel')}:</span>
          {['Semua', 'ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018', 'SPLN S5.001'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSearchTerm(cat === 'Semua' ? '' : cat);
                setIsFilterOpen(false);
              }}
              className="px-3 py-1 rounded-full bg-slate-100 hover:bg-[#00A3E0] hover:text-white font-semibold transition-colors cursor-pointer"
            >
              {cat === 'Semua' ? t('certificates.allCategories') : cat}
            </button>
          ))}
        </div>
      )}

      {/* CERTIFICATE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 relative aspect-[4/3] flex items-center justify-center p-2">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-contain object-center rounded-lg shadow-xs group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#00A3E0]/0 group-hover:bg-[#00A3E0]/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-[#00A3E0] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md transition-opacity">
                    {t('certificates.viewDetail')}
                  </span>
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{cert.date}</span>
                </div>

                <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 mt-1 group-hover:text-[#00A3E0] transition-colors leading-snug">
                  {cert.title}
                </h3>
              </div>
            </div>

            <div className="pt-3 mt-2 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>{cert.recipient}</span>
              <span className="text-[#00A3E0] font-bold">{t('certificates.viewDetail')} →</span>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-1.5 my-8">
        <button
          onClick={() => setActivePage((p) => Math.max(1, p - 1))}
          className="w-8 h-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer text-xs font-bold"
        >
          ‹
        </button>
        <button
          onClick={() => setActivePage(1)}
          className={`w-8 h-8 rounded-md text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
            activePage === 1
              ? 'bg-cyan-100 border border-cyan-400 text-[#00A3E0]'
              : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          1
        </button>
        <button
          onClick={() => setActivePage((p) => Math.min(99, p + 1))}
          className="w-8 h-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer text-xs font-bold"
        >
          ›
        </button>
      </div>

      {/* MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div
            className="absolute inset-0"
            onClick={() => setSelectedCert(null)}
          />

          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="text-2xl font-bold text-[#00A3E0] mb-4 pr-8 leading-snug">
              {t('home.managementSystem')}
            </h3>

            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 p-3 mb-6 shadow-inner flex items-center justify-center">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full max-h-[380px] object-contain rounded-xl shadow-xs"
              />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                {t('certificates.issuerTitle')}
              </h4>
              <p className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#00A3E0]" />
                <span>{selectedCert.issuer}</span>
              </p>
              <p className="text-xs text-slate-500 pt-1">
                {t('certificates.recipientTitle')}: <strong>{selectedCert.recipient}</strong> ({t('certificates.nipLabel')}: {selectedCert.nip}) — {selectedCert.date}
              </p>
            </div>

            <div className="bg-[#EFEFEF] rounded-2xl p-4 min-h-[100px] border border-slate-200/60 flex items-start">
              <p className="text-xs sm:text-sm text-slate-500 italic leading-relaxed">
                {selectedCert.remarks}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => alert(`Downloading PDF ${selectedCert.title}...`)}
                className="px-5 py-2.5 bg-[#00A3E0] hover:bg-[#127297] text-white text-xs font-bold rounded-full shadow-md flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{t('certificates.downloadCert')}</span>
              </button>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-full transition-colors cursor-pointer"
              >
                {t('certificates.closeModal')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
