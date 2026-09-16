import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainDashboard from './Pages/MainDashboard';
import OverviewDashboard from './Pages/OverviewDashboard';
import StandarView from './Pages/StandarView';
import StandarDetailView from './Pages/StandarDetailView';
import SertifikatPage from './Pages/SertifikatPage';
import DokumenPage from './Pages/DokumenPage';
import Login from './Pages/Auth/Login';

// Main Layout Wrapper with global Navbar
function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between font-sans text-slate-800 antialiased selection:bg-[#00A3E0] selection:text-white">
      <Navbar />
      <main className="flex-1 w-full pt-4">{children}</main>
    </div>
  );
}

// Login Page Wrapper
function LoginWrapper() {
  const navigate = useNavigate();
  return <Login onClose={() => navigate('/')} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page Default (/) */}
        <Route
          path="/"
          element={
            <MainLayout>
              <MainDashboard />
            </MainLayout>
          }
        />

        {/* Overview Dashboard (/overview) */}
        <Route
          path="/overview"
          element={
            <MainLayout>
              <OverviewDashboard />
            </MainLayout>
          }
        />

        {/* Standarisasi List Grid Page (/standar) */}
        <Route
          path="/standar"
          element={
            <MainLayout>
              <StandarView />
            </MainLayout>
          }
        />

        {/* Standarisasi Detail Analytics ISO Page (/standar/:isoId) */}
        <Route
          path="/standar/:isoId"
          element={
            <MainLayout>
              <StandarDetailView />
            </MainLayout>
          }
        />

        {/* Sertifikat Page */}
        <Route
          path="/sertifikat"
          element={
            <MainLayout>
              <SertifikatPage />
            </MainLayout>
          }
        />

        {/* Dokumen Page */}
        <Route
          path="/dokumen"
          element={
            <MainLayout>
              <DokumenPage />
            </MainLayout>
          }
        />

        {/* Login Page */}
        <Route path="/login" element={<LoginWrapper />} />

        {/* Fallback ke landing page jika URL tidak valid */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
