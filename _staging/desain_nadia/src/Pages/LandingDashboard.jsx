import React, { useState } from 'react';
import {
  FileText,
  Award,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Building2
} from 'lucide-react';

export default function LandingDashboard({ onNavigateToOverview, onNavigateToCertificates, onNavigateToStandards }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Sistem Manajemen Terintegrasi PLN Pusertif',
      subtitle: 'Solusi Terintegrasi untuk standarisasi dan kepatuhan manajemen terintegrasi yang efisien guna mendukung keunggulan operasional.',
      image: '/images/hero_bg.png',
    },
    {
      title: 'Keunggulan Audit & Sertifikasi Ketenagalistrikan',
      subtitle: 'Memastikan seluruh infrastruktur dan layanan energi nasional memenuhi tolok ukur kualitas mutakhir ISO & SNI.',
      image: '/images/hero_bg.png',
    },
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full space-y-16 pb-12 font-sans">
      {/* ========================================================= */}
      {/* PART 2-A: HERO SECTION (FULL-WIDTH CAROUSEL BANNER)       */}
      {/* ========================================================= */}
      <section className="relative w-full min-h-[560px] lg:min-h-[620px] rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 mt-4 max-w-7xl mx-auto">
        {/* Background Image with Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-slate-900">
          <img
            src={heroSlides[currentSlide].image}
            alt="PLN Field Worker"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-slate-950/70" />
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 active:scale-90 transition-all z-20 cursor-pointer"
          aria-label="Slide Sebelumnya"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNextSlide}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 active:scale-90 transition-all z-20 cursor-pointer"
          aria-label="Slide Selanjutnya"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-center pt-16 lg:pt-20">
          {/* Main Headlines */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white text-center leading-tight drop-shadow-md">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-white/80 text-center max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>
          </div>

          {/* Overlay Metric Cards (3 Floating Glassmorphism Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mt-12">
            {/* Card 1: Icon Document + 1,240 (Jumlah Standar) */}
            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-white/25 transition-all transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[#00A3E0]/30 border border-white/20 flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-[#FFE600]" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                1,240
              </span>
              <span className="text-xs font-medium text-blue-100 mt-1">
                Jumlah Standar
              </span>
            </div>

            {/* Card 2: Icon Building / Certificate + 45 (Jumlah Sertifikat) */}
            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-white/25 transition-all transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[#00A3E0]/30 border border-white/20 flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-[#FFE600]" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                45
              </span>
              <span className="text-xs font-medium text-blue-100 mt-1">
                Jumlah Sertifikat
              </span>
            </div>

            {/* Card 3: Icon Standard + Summary metric (2,431 Total Dokumen Audit) */}
            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-white/25 transition-all transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[#00A3E0]/30 border border-white/20 flex items-center justify-center mb-3">
                <BarChart3 className="w-6 h-6 text-[#FFE600]" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                2,431
              </span>
              <span className="text-xs font-medium text-blue-100 mt-1">
                Total Dokumen Audit
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PART 2-B: SECTION 1 - ISO CERTIFICATION CATEGORIES CARDS   */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto my-12 px-4 sm:px-8 space-y-4">
        {/* 3 Circular Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 (ISO 9001 - Blue Circle) */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-slate-100 flex flex-col items-center justify-between hover:shadow-xl transition-all group">
            <div className="relative w-36 h-36 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#00A3E0]"
                  strokeDasharray="85, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#00A3E0]">
                <span className="text-2xl font-black tracking-tighter">9001</span>
                <span className="text-[10px] font-bold text-slate-400">ISO</span>
              </div>
            </div>
            <h3 className="text-cyan-600 font-bold text-xl mb-1">
              ISO 9001 : 2015
            </h3>
            <p className="text-sm font-semibold text-slate-600 mb-4">
              Quality Management
            </p>
          </div>

          {/* Card 2 (ISO 14001 - Green Circle) */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-slate-100 flex flex-col items-center justify-between hover:shadow-xl transition-all group">
            <div className="relative w-36 h-36 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#10B981]"
                  strokeDasharray="75, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#10B981]">
                <span className="text-xl font-black tracking-tighter">14001</span>
                <span className="text-[10px] font-bold text-slate-400">ISO</span>
              </div>
            </div>
            <h3 className="text-emerald-600 font-bold text-xl mb-1">
              ISO 14001 : 2015
            </h3>
            <p className="text-sm font-semibold text-slate-600 mb-4">
              Environmental Management
            </p>
          </div>

          {/* Card 3 (ISO 45001 - Red Circle) */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-slate-100 flex flex-col items-center justify-between hover:shadow-xl transition-all group">
            <div className="relative w-36 h-36 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#D9252A]"
                  strokeDasharray="90, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#D9252A]">
                <span className="text-xl font-black tracking-tighter">45001</span>
                <span className="text-[10px] font-bold text-slate-400">ISO</span>
              </div>
            </div>
            <h3 className="text-rose-600 font-bold text-xl mb-1">
              ISO 45001 : 2018
            </h3>
            <p className="text-sm font-semibold text-slate-600 mb-4">
              Safety & Health Management
            </p>
          </div>
        </div>

        {/* Action Link (Bottom Right) */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onNavigateToStandards}
            className="text-cyan-600 font-semibold text-xs hover:underline cursor-pointer"
          >
            Lihat Semua →
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PART 2-C: SECTION 2 - SERTIFIKAT YANG TELAH DIPEROLEH     */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">
          Sertifikat Yang Telah Diperoleh
        </h2>

        {/* Grid 3 Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="relative h-48 bg-slate-50 p-4 border-b border-slate-100 overflow-hidden flex items-center justify-center">
                <img
                  src="/images/cert_thumb.png"
                  alt="Sertifikat PLN Pusertif"
                  className="max-h-full object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 bg-[#D9252A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  Pusertif
                </span>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-600 transition-colors leading-snug">
                  Sistem Manajemen (Standar)
                </h3>
                <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 pt-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>PT COGINDO DAYA BERSAMA</span>
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="relative h-48 bg-slate-50 p-4 border-b border-slate-100 overflow-hidden flex items-center justify-center">
                <img
                  src="/images/cert_thumb.png"
                  alt="Sertifikat PLN Pusertif"
                  className="max-h-full object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 bg-[#D9252A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  Pusertif
                </span>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-600 transition-colors leading-snug">
                  Sistem Manajemen (Standar)
                </h3>
                <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 pt-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>PT PLN INDONESIA POWER</span>
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="relative h-48 bg-slate-50 p-4 border-b border-slate-100 overflow-hidden flex items-center justify-center">
                <img
                  src="/images/cert_thumb.png"
                  alt="Sertifikat PLN Pusertif"
                  className="max-h-full object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 bg-[#D9252A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  Pusertif
                </span>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-600 transition-colors leading-snug">
                  Sistem Manajemen (Standar)
                </h3>
                <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 pt-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>PT PLN NUSANTARA POWER</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Link (Bottom Right) */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onNavigateToCertificates}
            className="text-cyan-600 font-semibold text-xs hover:underline cursor-pointer"
          >
            Lihat Semua →
          </button>
        </div>
      </section>
    </div>
  );
}
