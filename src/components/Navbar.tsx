import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import { PhoneCall, Menu, X, Heart, ShieldCheck, KeyRound } from 'lucide-react';
import { OFFICIAL_PHONE, getWhatsAppUrl } from '../utils/formatters';

export const Navbar: React.FC = () => {
  const { activePage, setActivePage, savedPropertyIds, openAgentPortal } = useProperty();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'about-contact', label: 'About & Services' },
  ] as const;

  const handleNavClick = (pageId: 'home' | 'properties' | 'about-contact') => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B192C] text-white border-b border-white/10 shadow-sm backdrop-blur-md">
      {/* Top micro bar for diaspora & trust reassurance */}
      <div className="bg-[#07111D] border-b border-white/5 px-4 sm:px-8 py-1.5 text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center gap-1 text-[#C8A25D] font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Nigerian Land Titles
          </span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-slate-400">
            Physical Inspections & Dedicated Diaspora Advisory Desk
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium shrink-0">
          <button
            onClick={openAgentPortal}
            className="text-slate-400 hover:text-[#C8A25D] transition-colors flex items-center gap-1 cursor-pointer"
            title="Agent Inventory Management Portal"
          >
            <KeyRound className="w-3 h-3" />
            <span>Agent Portal</span>
          </button>
          <span className="text-white/20">|</span>
          <a
            href={`tel:${OFFICIAL_PHONE}`}
            className="text-slate-300 hover:text-white transition-colors"
          >
            +234 (0) 803 900 4567
          </a>
        </div>
      </div>

      {/* Main Top Bar strictly obeying 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single clean text element) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus:outline-none shrink-0"
        >
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded bg-[#C8A25D] flex items-center justify-center text-[#0B192C] font-bold text-lg shadow-sm">
              PK
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white group-hover:text-[#C8A25D] transition-colors whitespace-nowrap">
                PRIMEKEY <span className="text-[#C8A25D] font-medium">REALTY</span>
              </span>
            </div>
          </div>
        </button>

        {/* Zone 2: 4 Clean Single-line Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#C8A25D] font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8A25D] rounded-full" />
                )}
              </button>
            );
          })}

          {savedPropertyIds.length > 0 && (
            <button
              onClick={() => handleNavClick('properties')}
              className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/15 text-white px-2.5 py-1 rounded transition-colors cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-[#C8A25D] text-[#C8A25D]" />
              <span>Shortlist</span>
              <span className="bg-[#C8A25D] text-[#0B192C] font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                {savedPropertyIds.length}
              </span>
            </button>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0B192C] bg-[#C8A25D] hover:bg-[#d8b572] transition-colors rounded shadow-sm whitespace-nowrap shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Speak to an Agent</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#0B192C] bg-[#C8A25D] rounded"
            aria-label="Speak to an Agent on WhatsApp"
          >
            <PhoneCall className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07111D] border-b border-white/10 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left py-2.5 px-3 text-base font-medium rounded ${
                activePage === link.id
                  ? 'bg-white/10 text-[#C8A25D]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAgentPortal();
              }}
              className="w-full text-left py-2 px-3 text-xs text-slate-400 hover:text-white flex items-center gap-2"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#C8A25D]" />
              <span>Agent Management Portal</span>
            </button>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 text-xs font-semibold uppercase tracking-wider text-[#0B192C] bg-[#C8A25D] hover:bg-[#d8b572] rounded"
            >
              Speak to an Agent on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
