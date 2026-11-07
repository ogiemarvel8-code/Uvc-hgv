import React from 'react';
import { PropertyProvider, useProperty } from './context/PropertyContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { AboutContactPage } from './pages/AboutContactPage';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { GalleryLightbox } from './components/GalleryLightbox';
import { InspectionModal } from './components/InspectionModal';
import { AgentPortalModal } from './components/AgentPortalModal';
import { MessageSquare, X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { getWhatsAppUrl } from './utils/formatters';

const AppContent: React.FC = () => {
  const { activePage, toasts, dismissToast } = useProperty();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#0D1B2A] relative selection:bg-[#C8A25D]/30 selection:text-[#0B192C]">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'properties' && <PropertiesPage />}
        {activePage === 'about-contact' && <AboutContactPage />}
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Global Modals & Lightbox */}
      <PropertyDetailModal />
      <GalleryLightbox />
      <InspectionModal />
      <AgentPortalModal />

      {/* Floating WhatsApp Quick Action Button */}
      <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-30">
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
          title="Chat with PrimeKey Realty on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="text-xs font-bold tracking-wide uppercase hidden sm:inline">
            WhatsApp Agent
          </span>
        </a>
      </aside>

      {/* Toast Notifications Feedback */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#0B192C] text-white p-4 rounded-xl shadow-2xl border border-white/10 flex items-start justify-between gap-3 animate-slideUp text-xs"
          >
            <div className="flex items-start gap-2.5">
              {toast.type === 'success' && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              )}
              {toast.type === 'error' && (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              {toast.type === 'info' && (
                <Info className="w-4 h-4 text-[#C8A25D] shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold text-white">{toast.title}</div>
                <div className="text-slate-300 mt-0.5 leading-relaxed">{toast.description}</div>
              </div>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <PropertyProvider>
      <AppContent />
    </PropertyProvider>
  );
}
