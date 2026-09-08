import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Login Component for PLN Pusertif
 * Built with React, Inertia.js compatibility, and Tailwind CSS.
 */
export default function Login({ errors: propsErrors = {}, status, onClose }) {
  const { t } = useTranslation();

  // 1. React State Requirement for formData
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captcha: '',
  });

  // State for captcha code generation
  const [captchaCode, setCaptchaCode] = useState('G7kP');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    propsErrors.email || propsErrors.password || 'Email atau password salah. Silahkan coba kembali dengan informasi yang benar.'
  );
  const [showErrorAlert, setShowErrorAlert] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate random 4-character captcha code
  const handleRefreshCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  // Generic Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Captcha validation check
    if (formData.captcha.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setErrorMessage('Kode verifikasi keamanan (captcha) tidak sesuai.');
      setShowErrorAlert(true);
      setIsSubmitting(false);
      return;
    }

    console.log('Submitting login payload:', formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      if (!formData.email || !formData.password) {
        setErrorMessage('Email atau password salah. Silahkan coba kembali dengan informasi yang benar.');
        setShowErrorAlert(true);
      } else {
        alert(`Login Berhasil! Selamat Datang ${formData.email}`);
        if (onClose) onClose();
      }
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F6F8] flex flex-col justify-between font-sans relative">
      {/* Top Left Navigation Back Button */}
      {onClose && (
        <div className="absolute top-6 left-6 z-30">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white text-slate-800 rounded-full shadow-md backdrop-blur-md text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('login.backHome')}</span>
          </button>
        </div>
      )}

      {/* Main Content Split Area */}
      <div className="flex-1 flex flex-col lg:flex-row w-full">
        {/* ========================================================= */}
        {/* B. LEFT HERO PANEL (BRANDING & INFO)                      */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[58%] bg-[#127297] text-white p-8 lg:p-20 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Glow Effects */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 blur-3xl rounded-full pointer-events-none" />

          {/* Top Section: Brand Header & Content */}
          <div className="relative z-10 pt-10 lg:pt-0">
            {/* Brand Header */}
            <div className="flex items-center gap-4 mb-10">
              {/* Logo Box with Red PLN Lightning bolt */}
              <div className="w-14 h-14 bg-[#FFE600] rounded-lg flex items-center justify-center shadow-md shrink-0">
                <svg
                  className="w-8 h-8 text-[#D9252A]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13 2L3 14h7v8l10-12h-7L13 2z" />
                </svg>
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                PLN Pusertif
              </span>
            </div>

            {/* Application Title */}
            <h1 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
              Sistem Manajemen Audit
            </h1>

            {/* Description Text */}
            <p className="text-blue-100 text-base sm:text-lg max-w-xl mb-12 leading-relaxed">
              Platform terintegrasi untuk pengelolaan audit, sertifikasi, dan standarisasi ketenagalistrikan yang efisien dan transparan bagi ekosistem energi nasional.
            </p>
          </div>

          {/* Bottom Section: 3 Feature Cards Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {/* Card 1: Sertifikasi ISO */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/15 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2.5">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-white">Sertifikasi ISO</span>
            </div>

            {/* Card 2: Keamanan Data */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/15 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2.5">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-white">Keamanan Data</span>
            </div>

            {/* Card 3: Real-time Audit */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/15 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2.5">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-white">Real-time Audit</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* C. RIGHT FORM PANEL (AUTHENTICATION CARD)                 */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[42%] bg-[#F4F6F8] p-6 lg:p-16 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl shadow-slate-200/60 p-8 sm:p-10 border border-slate-100">
            {/* Header Section */}
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {t('login.title')}
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              {t('login.subtitle')}
            </p>

            {/* Error Alert Banner */}
            {showErrorAlert && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start gap-3 mb-6 relative">
                <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  !
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-red-600 leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowErrorAlert(false)}
                  className="text-red-400 hover:text-red-600 text-xs font-bold leading-none p-1 cursor-pointer"
                  aria-label="Tutup Peringatan"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Email Input */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  {t('login.email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#127297] focus:border-[#127297] focus:outline-none transition-colors text-slate-900 placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Field 2: Password Input */}
              <div>
                <label htmlFor="password" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  {t('login.password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#127297] focus:border-[#127297] focus:outline-none transition-colors text-slate-900 placeholder-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a9.97 9.97 0 013.682-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21f-9-9" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Field 3: Verifikasi Keamanan (Captcha) */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  {t('login.captcha')}
                </label>
                <div className="bg-[#E2EAF0] p-3 rounded-xl flex items-center gap-3">
                  {/* Sub-element 1: Kode Box */}
                  <div className="bg-white px-4 py-2 rounded-md border border-slate-200 font-mono text-lg font-bold text-slate-700 tracking-widest select-none shadow-xs">
                    {captchaCode}
                  </div>

                  {/* Sub-element 2: Refresh Button */}
                  <button
                    type="button"
                    onClick={handleRefreshCaptcha}
                    className="flex items-center gap-1 text-xs font-semibold text-[#127297] hover:text-cyan-800 focus:outline-none shrink-0 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t('login.refresh')}
                  </button>

                  {/* Sub-element 3: Code Input */}
                  <input
                    type="text"
                    name="captcha"
                    required
                    value={formData.captcha}
                    onChange={handleChange}
                    placeholder={t('login.captchaPlaceholder')}
                    className="bg-white px-3 py-2 text-xs border border-slate-300 rounded-md w-full focus:ring-2 focus:ring-[#127297] focus:border-[#127297] focus:outline-none text-slate-900 placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end pt-1">
                <a
                  href="#forgot-password"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Silakan hubungi IT Support untuk pemulihan password.');
                  }}
                  className="text-xs font-semibold text-[#127297] hover:underline"
                >
                  {t('login.forgotPassword')}
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#127297] hover:bg-[#0E5C7A] text-white font-semibold py-3 px-4 rounded-lg shadow-md transition text-sm active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t('login.submitting')}
                  </>
                ) : (
                  t('login.submit')
                )}
              </button>
            </form>

            {/* Help Footer Section */}
            <div className="border-t border-slate-100 mt-8 pt-6 text-center">
              <span className="text-xs text-[#64748B]">
                {t('login.help')}{' '}
              </span>
              <a
                href="#it-support"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Layanan IT Support PLN Pusertif: support@pusertif.pln.co.id');
                }}
                className="font-semibold text-[#127297] hover:underline text-xs"
              >
                {t('login.contactSupport')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* D. GLOBAL FOOTER                                          */}
      {/* ========================================================= */}
      <footer className="w-full py-4 text-center text-xs text-slate-400 bg-[#F4F6F8] border-t border-slate-200/60 shrink-0">
        © 2026 PLN Pusertif. All Rights Reserved.
      </footer>
    </div>
  );
}
