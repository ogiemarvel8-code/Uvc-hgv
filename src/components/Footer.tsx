import React from 'react';
import { useProperty } from '../context/PropertyContext';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  MessageSquare,
  KeyRound,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import {
  OFFICIAL_DISPLAY_PHONE,
  OFFICIAL_PHONE,
  OFFICIAL_EMAIL,
  OFFICIAL_OFFICE_LAGOS,
  OFFICIAL_OFFICE_ABUJA,
  getWhatsAppUrl,
} from '../utils/formatters';

export const Footer: React.FC = () => {
  const { setActivePage, updateFilterField, openAgentPortal } = useProperty();

  const handleCityClick = (city: any) => {
    updateFilterField('city', city);
    setActivePage('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (page: 'home' | 'properties' | 'about-contact') => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07111D] text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#C8A25D] flex items-center justify-center text-[#0B192C] font-bold text-base shadow-sm">
                PK
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-white">
                PRIMEKEY <span className="text-[#C8A25D] font-medium">REALTY</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              PrimeKey Realty is a premier Nigerian real estate agency dedicated to bridging families, high-net-worth investors, and the diaspora with verified residential homes, luxury duplexes, and high-yield properties across Nigeria.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] rounded transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={openAgentPortal}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#C8A25D]" />
                <span>Agent Portal</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8A25D]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Homepage
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('properties')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Property Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about-contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About PrimeKey
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about-contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Consultancy Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about-contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Inspection Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Nigerian Cities Coverage */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8A25D]">
              Market Coverage
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu', 'Uyo', 'Owerri'].map((city) => (
                <li key={city}>
                  <button
                    onClick={() => handleCityClick(city)}
                    className="hover:text-[#C8A25D] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                    <span>{city} Properties</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Offices */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8A25D]">
              Head Offices
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C8A25D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Lagos Corporate Office:</strong>
                  <span>{OFFICIAL_OFFICE_LAGOS}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C8A25D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Abuja Executive Office:</strong>
                  <span>{OFFICIAL_OFFICE_ABUJA}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-[#C8A25D] shrink-0" />
                <a href={`tel:${OFFICIAL_PHONE}`} className="hover:text-white">
                  {OFFICIAL_DISPLAY_PHONE}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8A25D] shrink-0" />
                <a href={`mailto:${OFFICIAL_EMAIL}`} className="hover:text-white">
                  {OFFICIAL_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-[#C8A25D]" />
            <span>
              All listings vetted for valid Governor's Consent, C of O, Gazette, or registered government title documents.
            </span>
          </div>

          <div>
            © {new Date().getFullYear()} PrimeKey Realty Limited. RC No. 1829402. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
