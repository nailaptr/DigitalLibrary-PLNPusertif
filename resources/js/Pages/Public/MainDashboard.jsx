import PublicLayout from '@/Layouts/PublicLayout';
import React, { useState } from 'react';
import {
  FileText,
  Award,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Building2
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';


export default function MainDashboard({ stats = { standardCount: 0, certificateCount: 0, documentCount: 0 }, isoIds = {}, recentCertificates = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();

  const heroSlides = [
    {
      title: t('home.slide1Title'),
      subtitle: t('home.slide1Subtitle'),
      image: '/images/hero_bg.png',
    },
    {
      title: t('home.slide2Title'),
      subtitle: t('home.slide2Subtitle'),
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
    <PublicLayout>

    <div className="w-full flex flex-col justify-between min-h-screen bg-[#F8FAFC]">
      <div className="w-full space-y-16 pb-12 font-sans flex-1">
        {/* ========================================================= */}
        {/* HERO SECTION: FULL-WIDTH CAROUSEL BANNER                  */}
        {/* ========================================================= */}
        <section className="relative w-full min-h-[560px] lg:min-h-[620px] rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 mt-4 max-w-7xl mx-auto">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 bg-slate-900">
            <img
              src={heroSlides[currentSlide].image}
              alt={t('home.heroImageAlt')}
              loading={currentSlide === 0 ? 'eager' : 'lazy'}
              onError={(e) => { e.currentTarget.src = '/images/hero_bg.png'; }}
              className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-slate-950/70" />
          </div>

          {/* Carousel Arrow Controls */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 active:scale-90 transition-all z-20 cursor-pointer"
            aria-label={t('home.sliderPrev')}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 active:scale-90 transition-all z-20 cursor-pointer"
            aria-label={t('home.sliderNext')}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Headlines & Floating Glassmorphism Metric Cards */}
          <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-center pt-16 lg:pt-20">
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-white text-center leading-tight drop-shadow-md">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-white/80 text-center max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
            </div>

            {/* 3 Floating Glassmorphism Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mt-12">
              <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-white/25 transition-all transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-[#00A3E0]/30 border border-white/20 flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-[#FFE600]" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {new Intl.NumberFormat('id-ID').format(stats.standardCount)}
                </span>
                <span className="text-xs font-medium text-blue-100 mt-1">
                  {t('home.statStandards')}
                </span>
              </div>

              <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-white/25 transition-all transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-[#00A3E0]/30 border border-white/20 flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-[#FFE600]" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {new Intl.NumberFormat('id-ID').format(stats.certificateCount)}
                </span>
                <span className="text-xs font-medium text-blue-100 mt-1">
                  {t('home.statCertificates')}
                </span>
              </div>

              <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-white/25 transition-all transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-[#00A3E0]/30 border border-white/20 flex items-center justify-center mb-3">
                  <BarChart3 className="w-6 h-6 text-[#FFE600]" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {new Intl.NumberFormat('id-ID').format(stats.documentCount)}
                </span>
                <span className="text-xs font-medium text-blue-100 mt-1">
                  {t('home.statAuditDocs')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 1: KATEGORI ISO (3 CIRCULAR DONUT CARDS)         */}
        {/* ========================================================= */}
        <section className="max-w-6xl mx-auto my-12 px-4 sm:px-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: ISO 9001: 2015 (Biru) */}
            <Link href={isoIds?.['9001'] ? `/standar/${isoIds['9001']}` : '#'} className="bg-white rounded-2xl shadow-md p-8 text-center border border-slate-100 flex flex-col items-center justify-between hover:shadow-xl transition-all group">
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
            </Link>

            {/* Card 2: ISO 14001: 2015 (Hijau) */}
            <Link href={isoIds?.['14001'] ? `/standar/${isoIds['14001']}` : '#'} className="bg-white rounded-2xl shadow-md p-8 text-center border border-slate-100 flex flex-col items-center justify-between hover:shadow-xl transition-all group">
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
            </Link>

            {/* Card 3: ISO 45001: 2018 (Merah) */}
            <Link href={isoIds?.['45001'] ? `/standar/${isoIds['45001']}` : '#'} className="bg-white rounded-2xl shadow-md p-8 text-center border border-slate-100 flex flex-col items-center justify-between hover:shadow-xl transition-all group">
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
            </Link>
          </div>

          <div className="flex justify-end pt-2">
            <Link href="/standar"
              className="text-cyan-600 font-semibold text-xs hover:underline cursor-pointer"
            >
              {t('home.viewAll')}
            </Link>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: SERTIFIKAT YANG TELAH DIPEROLEH                */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">
            {t('home.certTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentCertificates.map((cert) => (
                <a 
                  key={cert.id} 
                  href={cert.file_path ? `/storage/${cert.file_path}` : '#'} 
                  target={cert.file_path ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="relative h-48 bg-slate-50 p-4 border-b border-slate-100 overflow-hidden flex items-center justify-center">
                      <img
                        src={cert.image}
                        alt="Sertifikat"
                        className="max-h-full object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 right-3 bg-[#D9252A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                        Pusertif
                      </span>
                    </div>

                    <div className="p-6 space-y-2">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-600 transition-colors leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 pt-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{cert.issuer || cert.recipient}</span>
                      </p>
                    </div>
                  </div>
                </a>
              ))}
              {recentCertificates.length === 0 && (
                <div className="col-span-3 text-center py-12 text-slate-500 font-medium">
                  {t('home.emptyCerts')}
                </div>
              )}
          </div>

          <div className="flex justify-end pt-2">
            <Link href="/sertifikat"
              className="text-cyan-600 font-semibold text-xs hover:underline cursor-pointer"
            >
              {t('home.viewAll')}
            </Link>
          </div>
        </section>
      </div>

    </div>
  
    </PublicLayout>);
}
