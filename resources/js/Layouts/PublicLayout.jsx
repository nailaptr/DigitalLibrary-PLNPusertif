import React from 'react';
import FloatingNavbar from '@/Components/FloatingNavbar';
import Footer from '@/Components/Footer';

export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 antialiased selection:bg-[#00A3E0] selection:text-white">
            <FloatingNavbar />
            <main className="flex-1 w-full pt-4">
                {children}
            </main>
            <Footer />
        </div>
    );
}
