import React, { useState } from 'react';
import OverviewDashboard from './Pages/OverviewDashboard';
import UserManagement from './Pages/UserManagement';
import StandardManagement from './Pages/StandardManagement';
import DocumentManagement from './Pages/DocumentManagement';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Dokumen');

  if (currentPage === 'Overview') {
    return <OverviewDashboard onNavigate={(page) => setCurrentPage(page)} />;
  }

  if (currentPage === 'Manajemen User') {
    return <UserManagement onNavigate={(page) => setCurrentPage(page)} />;
  }

  if (currentPage === 'Standar') {
    return <StandardManagement onNavigate={(page) => setCurrentPage(page)} />;
  }

  return <DocumentManagement onNavigate={(page) => setCurrentPage(page)} />;
}
