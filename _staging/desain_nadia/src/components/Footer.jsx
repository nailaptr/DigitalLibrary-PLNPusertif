import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#EEF2F6] text-slate-700 mt-20 border-t border-slate-200/80 font-sans">
      {/* Top Main Footer: 3 Columns */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Kolom 1: Branding & Kontak (4 cols) */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 bg-[#FFE600] rounded-xl flex items-center justify-center shadow-md shrink-0">
                <svg
                  className="w-7 h-7 text-[#D9252A]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13 2L3 14h7v8l10-12h-7L13 2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#00A3E0] tracking-tight">
                  PLN Pusertif
                </span>
                <span className="text-xs font-semibold text-slate-500 tracking-wider">
                  {t('footer.companySub')}
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-md">
              {t('footer.description')}
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://pusertif.pln.co.id"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-[#00A3E0] border border-slate-200 flex items-center justify-center hover:bg-[#00A3E0] hover:text-white shadow-xs transition-colors"
                title="Website Resmi"
              >
                <Globe className="w-5 h-5" />
              </a>

              <a
                href="mailto:support@pusertif.pln.co.id"
                className="w-10 h-10 rounded-full bg-white text-[#00A3E0] border border-slate-200 flex items-center justify-center hover:bg-[#00A3E0] hover:text-white shadow-xs transition-colors"
                title="Email Support"
              >
                <Mail className="w-5 h-5" />
              </a>

              <a
                href="tel:+62217982245"
                className="w-10 h-10 rounded-full bg-white text-[#00A3E0] border border-slate-200 flex items-center justify-center hover:bg-[#00A3E0] hover:text-white shadow-xs transition-colors"
                title="Telepon Layanan"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Kolom 2: Tautan Cepat (3 cols) */}
        <div className="md:col-span-3">
          <h3 className="text-base font-bold text-slate-900 mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-8 after:h-0.5 after:bg-[#00A3E0]">
            {t('footer.quickLinksTitle')}
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            {[
              { path: '/', label: t('footer.linkHome') },
              { path: '/overview', label: t('footer.linkOverview') },
              { path: '/sertifikat', label: t('footer.linkCertificates') },
              { path: '/standar', label: t('footer.linkStandards') },
              { path: '/dokumen', label: t('footer.linkDocuments') },
            ].map((linkItem) => (
              <li key={linkItem.path}>
                <Link
                  to={linkItem.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-slate-600 hover:text-[#00A3E0] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-[#00A3E0] text-xs">›</span>
                  <span>{linkItem.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Lokasi Kami (4 cols) */}
        <div className="md:col-span-4">
          <h3 className="text-base font-bold text-slate-900 mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-8 after:h-0.5 after:bg-[#00A3E0]">
            {t('footer.locationTitle')}
          </h3>
          <div className="flex items-start gap-3 mb-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <MapPin className="w-5 h-5 text-[#00A3E0] shrink-0 mt-0.5" />
            <span>
              Pusat Sertifikasi (Pusertif) PT PLN (Persero),<br />
              Jl. Laboratorium No. 1, Duren Tiga, Pancoran,<br />
              Jakarta Selatan 12760, Indonesia
            </span>
          </div>

          <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-300 shadow-sm relative group bg-slate-200">
            <iframe
              title="Peta Lokasi PLN Pusertif"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.115764020967!2d106.83789537499066!3d-6.248473793739775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3d9bfa2dbb5%3A0xb3fffa0018a1a3bf!2sPT%20PLN%20(Persero)%20Pusat%20Sertifikasi!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-300 pointer-events-auto"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://maps.google.com/?q=PT+PLN+(Persero)+Pusat+Sertifikasi+Jakarta"
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-[#00A3E0] px-2 py-1 rounded-md shadow-xs flex items-center gap-1 hover:bg-[#00A3E0] hover:text-white transition-colors"
            >
              <span>{t('footer.openMap')}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#00A3E0] py-4 text-center text-xs font-medium text-white tracking-wide">
        {t('footer.copyright')}
      </div>
    </footer>
  );
}
