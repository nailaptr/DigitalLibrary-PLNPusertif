import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Search, LogIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoPLN from '../assets/logo-pln-fix.png';

export default function FloatingNavbar() {
  const { url } = usePage();
  const { t, i18n } = useTranslation();

  const isActive = (path) => url === path || url.startsWith(path + '/');

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const currentLang = i18n.language ? i18n.language.substring(0, 2) : 'id';

  const navLinks = [
    { path: '/overview', label: t('navbar.overview') },
    { path: '/sertifikat', label: t('navbar.sertifikat') },
    { path: '/standar', label: t('navbar.standar') },
    { path: '/dokumen', label: t('navbar.dokumen') },
    { path: '/temuan', label: t('navbar.temuan', { defaultValue: 'Temuan' }) },
  ];

  return (
    <nav className="w-full bg-white shadow-sm py-3 px-6 flex items-center justify-between border-b border-slate-100">

      {/* Brand Logo */}
      <Link className="flex items-center gap-3" href="/">
        <img src={logoPLN} alt="Logo PLN Pusertif" className="h-10 w-auto object-contain" />
        <div className="flex flex-col">
          <span className="font-extrabold text-lg text-slate-800 leading-tight">PLN Pusertif</span>
          <span className="text-[10px] tracking-wider text-slate-400 font-medium uppercase">
            {t('navbar.subtitle')}
          </span>
        </div>
      </Link>

      {/* Menu Navigasi */}
      <div className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60">
        {navLinks.map(({ path, label }) => (
          <Link
            key={path}
            href={path}
            className={`px-5 py-2 text-xs font-semibold rounded-full transition-all ${
              isActive(path)
                ? 'bg-[#00A3E0] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition cursor-pointer">
          <Search className="w-4 h-4" />
        </button>

        {/* Switcher Bahasa */}
        <div className="flex items-center bg-slate-100 p-1 rounded-full text-[11px] font-bold">
          <button
            type="button"
            onClick={() => changeLanguage('en')}
            className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
              currentLang === 'en'
                ? 'bg-[#00A3E0] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => changeLanguage('id')}
            className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
              currentLang === 'id'
                ? 'bg-[#00A3E0] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            ID
          </button>
        </div>

        {/* Tombol Masuk */}
        <Link
          href="/login"
          className="bg-[#00A3E0] hover:bg-cyan-600 text-white font-semibold text-xs px-5 py-2 rounded-full shadow-xs transition flex items-center gap-1.5"
        >
          <LogIn className="w-3.5 h-3.5" />
          {t('navbar.masuk')}
        </Link>
      </div>
    </nav>
  );
}
