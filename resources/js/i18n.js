import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  id: {
    translation: {
      navbar: {
        subtitle: "Sistem Manajemen Terintegrasi",
        overview: "Overview",
        sertifikat: "Sertifikat",
        standar: "Standar",
        dokumen: "Dokumen",
        masuk: "Masuk"
      },
      footer: {
        companySub: "PT PLN (PERSERO) PUSAT SERTIFIKASI",
        description: "Pusat Sertifikasi PLN terdepan dalam standarisasi, pengujian, kalibrasi, dan sertifikasi sistem manajemen mutu serta produk ketenagalistrikan nasional.",
        quickLinksTitle: "Tautan Cepat",
        linkHome: "Utama (Landing Page)",
        linkOverview: "Overview Dashboard",
        linkCertificates: "Daftar Sertifikat",
        linkStandards: "Standar ISO",
        linkDocuments: "Dokumen Mutu",
        locationTitle: "Lokasi Kami",
        openMap: "Buka Peta",
        copyright: "© 2026 PLN Pusertif. All Rights Reserved."
      },
      home: {
        slide1Title: "Sistem Manajemen Terintegrasi PLN Pusertif",
        slide1Subtitle: "Solusi Terintegrasi untuk standarisasi dan kepatuhan manajemen terintegrasi yang efisien guna mendukung keunggulan operasional.",
        slide2Title: "Keunggulan Audit & Sertifikasi Ketenagalistrikan",
        slide2Subtitle: "Memastikan seluruh infrastruktur dan layanan energi nasional memenuhi tolok ukur kualitas mutakhir ISO & SNI.",
        statStandards: "Jumlah Standar",
        statCertificates: "Jumlah Sertifikat",
        statAuditDocs: "Total Dokumen Audit",
        viewIsoDetail: "Lihat Detail ISO",
        categoryQuality: "Sistem Manajemen Mutu",
        categoryEnvironment: "Sistem Manajemen Lingkungan",
        categorySafety: "Sistem Manajemen K3",
        exploreIso: "Telusuri Standar ISO",
        certifiedUnits: "Unit PLN Tersertifikasi",
        complianceRate: "Tingkat Kepatuhan Audit",
        viewAll: "Lihat Semua →",
        certTitle: "Sertifikat Yang Telah Diperoleh",
        managementSystem: "Sistem Manajemen (Standar)"
      },
      overview: {
        title: "Overview Dashboard",
        subtitle: "Rangkuman capaian pengelolaan dokumen mutu dan kepatuhan standar ISO di lingkungan PLN Pusertif untuk periode tahun berjalan.",
        sectionTitle: "Indikator Kepatuhan Standar",
        totalDocs: "Total Dokumen",
        manualCount: "Jumlah Manual",
        procedureCount: "Jumlah Prosedur",
        workInstructions: "Instruksi Kerja",
        formCount: "Jumlah Formulir",
        chartTitle: "Review dan Revisi Dokumen Mutu",
        chartSubtitle: "Tren revisi dokumen tahun berjalan",
        donutTitle: "Distribusi Dokumen per Bidang",
        donutSubtitle: "Proporsi dokumen aktif berdasarkan divisi operasional",
        fieldA: "Bidang A",
        fieldB: "Bidang B",
        fieldC: "Bidang C",
        others: "Lainnya",
        monthly: "Bulanan",
        annual: "Tahunan",
        qualityBadge: "MUTU",
        envBadge: "LINGKUNGAN",
        safetyBadge: "K3"
      },
      certificates: {
        title: "Daftar Sertifikat Terbitan",
        subtitle: "Verifikasi dan telusuri keabsahan dokumen sertifikat resmi PLN Pusertif secara transparan.",
        searchPlaceholder: "Cari nomor sertifikat / penerima / kategori...",
        filterTitle: "Filter Sertifikat",
        categoryLabel: "KATEGORI ISO",
        allCategories: "Semua Kategori",
        recipientLabel: "PENERIMA / NIP",
        allRecipients: "Semua Penerima",
        viewDetail: "Lihat Detail Sertifikat",
        verified: "TERVERIFIKASI PUSERTIF",
        recipientTitle: "Penerima Sertifikat",
        nipLabel: "NIP / ID",
        issuerTitle: "Lembaga Penerbit",
        issueDate: "Tanggal Terbit",
        closeModal: "Tutup Modal",
        downloadCert: "Unduh PDF Sertifikat",
        qrVerification: "Pindai QR untuk verifikasi keabsahan dokumen digital di database Pusertif PLN."
      },
      standards: {
        title: "Katalog Standarisasi ISO",
        subtitle: "Portal panduan dan repositori standar mutu internasional yang berlaku di lingkungan PT PLN (Persero).",
        searchPlaceholder: "Cari kode / judul standar ISO...",
        filterTitle: "Filter Standarisasi",
        totalStandardsText: "Menampilkan 9 Standar ISO Terakreditasi",
        viewDetailAnalytics: "Lihat Detail Analitik →",
        totalDocsLabel: "TOTAL DOKUMEN MUTU",
        docsCount: "1,242 Dokumen"
      },
      standardsDetail: {
        backToList: "Kembali ke Daftar Standarisasi",
        subtitle: "Standar Internasional yang mengatur Sistem Manajemen Mutu (Quality Management System) dan kepatuhan audit PLN Pusertif.",
        filterHeader: "Filter Parameter Analitik",
        timeRangeLabel: "Rentang Waktu",
        perMonth: "Per Bulan",
        perYear: "Per Tahun",
        docTypeLabel: "Jenis Dokumen",
        fieldLabel: "Bidang / Divisi",
        statusLabel: "Status Kepatuhan",
        compliant: "Sesuai",
        nonCompliant: "Tidak Sesuai",
        resetFilter: "Reset Filter",
        applyFilter: "Terapkan Filter",
        growthChartTitle: "Pertumbuhan & Revisi Dokumen Mutu",
        chartDesc: "Visualisasi tren akumulasi dokumen berdasarkan rentang waktu dan filter yang dipilih.",
        complianceRateTitle: "Rasio Kepatuhan Audit Mutu",
        targetAchieved: "Target Tercapai",
        validDocs: "Dokumen Valid"
      },
      documents: {
        title: "Repositori Dokumen Mutu",
        subtitle: "Kelola dan unduh dokumen manual, prosedur, instruksi kerja, serta formulir ISO terkini di seluruh bidang operasional PLN Pusertif.",
        badge: "PUSAT ARSIP MUTU",
        searchPlaceholder: "Cari kode / judul / bidang dokumen...",
        showingText: "Menampilkan {{count}} dari 2.431 Dokumen",
        codeHeader: "KODE DOKUMEN",
        titleHeader: "NAMA DOKUMEN MUTU",
        categoryHeader: "KATEGORI",
        divisionHeader: "BIDANG",
        revisionHeader: "REVISI",
        dateHeader: "TANGGAL TERBIT",
        actionHeader: "AKSI",
        previewBtn: "Pratinjau",
        downloadBtn: "Unduh"
      },
      login: {
        title: "Selamat Datang",
        subtitle: "Silakan masuk untuk mengelola tugas audit Anda.",
        email: "EMAIL",
        password: "PASSWORD",
        captcha: "VERIFIKASI KEAMANAN",
        refresh: "Segarkan",
        captchaPlaceholder: "Masukkan Kode",
        forgotPassword: "Lupa Password?",
        submit: "Masuk",
        submitting: "Memproses...",
        help: "Butuh bantuan akses?",
        contactSupport: "Hubungi IT Support",
        backHome: "Kembali ke Beranda"
      }
    }
  },
  en: {
    translation: {
      navbar: {
        subtitle: "Integrated Management System",
        overview: "Overview",
        sertifikat: "Certificates",
        standar: "Standards",
        dokumen: "Documents",
        masuk: "Login"
      },
      footer: {
        companySub: "PT PLN (PERSERO) CERTIFICATION CENTER",
        description: "PLN Certification Center leading in standardization, testing, calibration, and certification of quality management systems and national electrical products.",
        quickLinksTitle: "Quick Links",
        linkHome: "Home (Landing Page)",
        linkOverview: "Overview Dashboard",
        linkCertificates: "Certificate List",
        linkStandards: "ISO Standards",
        linkDocuments: "Quality Documents",
        locationTitle: "Our Location",
        openMap: "Open Map",
        copyright: "© 2026 PLN Pusertif. All Rights Reserved."
      },
      home: {
        slide1Title: "PLN Pusertif Integrated Management System",
        slide1Subtitle: "Integrated solution for standardization and efficient management compliance to support operational excellence.",
        slide2Title: "Electricity Audit & Certification Excellence",
        slide2Subtitle: "Ensuring all national energy infrastructure and services meet state-of-the-art ISO & SNI quality benchmarks.",
        statStandards: "Total Standards",
        statCertificates: "Total Certificates",
        statAuditDocs: "Total Audit Documents",
        viewIsoDetail: "View ISO Details",
        categoryQuality: "Quality Management System",
        categoryEnvironment: "Environmental Management System",
        categorySafety: "Occupational Health & Safety System",
        exploreIso: "Explore ISO Standards",
        certifiedUnits: "Certified PLN Units",
        complianceRate: "Audit Compliance Rate",
        viewAll: "View All →",
        certTitle: "Certificates Obtained",
        managementSystem: "Management System (Standard)"
      },
      overview: {
        title: "Overview Dashboard",
        subtitle: "Summary of quality document management achievements and ISO compliance standards at PLN Pusertif for the current year.",
        sectionTitle: "Standard Compliance Indicators",
        totalDocs: "Total Documents",
        manualCount: "Total Manuals",
        procedureCount: "Total Procedures",
        workInstructions: "Work Instructions",
        formCount: "Total Forms",
        chartTitle: "Review & Revision of Quality Documents",
        chartSubtitle: "Document revision trends for current year",
        donutTitle: "Document Distribution by Division",
        donutSubtitle: "Active document proportion by operational division",
        fieldA: "Division A",
        fieldB: "Division B",
        fieldC: "Division C",
        others: "Others",
        monthly: "Monthly",
        annual: "Annual",
        qualityBadge: "QUALITY",
        envBadge: "ENVIRONMENT",
        safetyBadge: "SAFETY"
      },
      certificates: {
        title: "Issued Certificate List",
        subtitle: "Verify and track the authenticity of official PLN Pusertif certificate documents transparently.",
        searchPlaceholder: "Search certificate number / recipient / category...",
        filterTitle: "Certificate Filter",
        categoryLabel: "ISO CATEGORY",
        allCategories: "All Categories",
        recipientLabel: "RECIPIENT / NIP",
        allRecipients: "All Recipients",
        viewDetail: "View Certificate Details",
        verified: "PUSERTIF VERIFIED",
        recipientTitle: "Certificate Recipient",
        nipLabel: "NIP / ID",
        issuerTitle: "Issuing Authority",
        issueDate: "Issue Date",
        closeModal: "Close Modal",
        downloadCert: "Download PDF Certificate",
        qrVerification: "Scan QR to verify digital document authenticity in PLN Pusertif database."
      },
      standards: {
        title: "ISO Standardization Catalog",
        subtitle: "Portal guide and repository of international quality standards applicable within PT PLN (Persero).",
        searchPlaceholder: "Search code / ISO standard title...",
        filterTitle: "Standardization Filter",
        totalStandardsText: "Showing 9 Accredited ISO Standards",
        viewDetailAnalytics: "View Analytics Details →",
        totalDocsLabel: "TOTAL QUALITY DOCUMENTS",
        docsCount: "1,242 Documents"
      },
      standardsDetail: {
        backToList: "Back to Standardization List",
        subtitle: "International standard governing Quality Management System and audit compliance at PLN Pusertif.",
        filterHeader: "Analytic Parameter Filter",
        timeRangeLabel: "Time Range",
        perMonth: "Per Month",
        perYear: "Per Year",
        docTypeLabel: "Document Type",
        fieldLabel: "Division / Department",
        statusLabel: "Compliance Status",
        compliant: "Compliant",
        nonCompliant: "Non-Compliant",
        resetFilter: "Reset Filter",
        applyFilter: "Apply Filter",
        growthChartTitle: "Quality Document Growth & Revision",
        chartDesc: "Visualization of document accumulation trends based on selected time range and filters.",
        complianceRateTitle: "Quality Audit Compliance Ratio",
        targetAchieved: "Target Achieved",
        validDocs: "Valid Documents"
      },
      documents: {
        title: "Quality Document Repository",
        subtitle: "Manage and download the latest ISO manuals, procedures, work instructions, and forms across PLN Pusertif operational divisions.",
        badge: "QUALITY ARCHIVE CENTER",
        searchPlaceholder: "Search code / title / document division...",
        showingText: "Showing {{count}} of 2,431 Documents",
        codeHeader: "DOCUMENT CODE",
        titleHeader: "QUALITY DOCUMENT NAME",
        categoryHeader: "CATEGORY",
        divisionHeader: "DIVISION",
        revisionHeader: "REVISION",
        dateHeader: "ISSUE DATE",
        actionHeader: "ACTION",
        previewBtn: "Preview",
        downloadBtn: "Download"
      },
      login: {
        title: "Welcome Back",
        subtitle: "Please log in to manage your audit tasks.",
        email: "EMAIL",
        password: "PASSWORD",
        captcha: "SECURITY VERIFICATION",
        refresh: "Refresh",
        captchaPlaceholder: "Enter Code",
        forgotPassword: "Forgot Password?",
        submit: "Sign In",
        submitting: "Processing...",
        help: "Need access help?",
        contactSupport: "Contact IT Support",
        backHome: "Back to Home"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
