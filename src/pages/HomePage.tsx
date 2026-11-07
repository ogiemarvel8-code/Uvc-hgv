import React from 'react';
import { useProperty } from '../context/PropertyContext';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyType, NigerianCity, PropertyPurpose } from '../types/property';
import { formatNaira, formatCompactNaira, getWhatsAppUrl } from '../utils/formatters';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Globe,
  Camera,
  Compass,
  FileCheck2,
  Users,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { properties, filters, updateFilterField, setActivePage } = useProperty();

  // Featured properties prioritizing Abuja, Lagos, Port Harcourt, Ibadan, Enugu, Uyo, Owerri
  // and prioritizing between ₦20M and ₦300M
  const featuredListings = properties.filter((p) => p.featured).slice(0, 7);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActivePage('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0B192C] text-white overflow-hidden py-16 sm:py-24 border-b border-white/10">
        {/* Background glow and subtle architectural backdrop */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="/assets/aistudio/1794068238103_d8758a42.jpg"
            alt="Modern architectural home"
            className="w-full h-full object-cover filter blur-xs"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/90 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8A25D] bg-white/5 border border-[#C8A25D]/30 px-3 py-1 rounded">
                <ShieldCheck className="w-4 h-4 text-[#C8A25D]" />
                <span>Premier Nigerian Property Sales, Rentals & Diaspora Advisory</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1] text-balance">
                FIND THE RIGHT PROPERTY. <br className="hidden sm:inline" />
                <span className="text-[#C8A25D]">MAKE YOUR NEXT MOVE.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Explore quality homes, apartments and investment opportunities across Nigeria. We make finding your next property easier.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setActivePage('properties');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 bg-[#C8A25D] hover:bg-[#d8b572] text-[#0B192C] font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md whitespace-nowrap"
                >
                  <span>Browse Properties</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 border border-white/20 cursor-pointer whitespace-nowrap"
                >
                  <PhoneCall className="w-4 h-4 text-[#C8A25D]" />
                  <span>Speak to an Agent</span>
                </a>
              </div>

              {/* Key Assurance Signals (Anti-Slop Clean Editorial Text) */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs text-slate-300">
                <div>
                  <div className="font-bold text-white text-base font-display">100%</div>
                  <div className="text-slate-400">Verified Land Titles</div>
                </div>
                <div>
                  <div className="font-bold text-white text-base font-display">7 Hubs</div>
                  <div className="text-slate-400">Key Nigerian Cities</div>
                </div>
                <div>
                  <div className="font-bold text-white text-base font-display">Zero</div>
                  <div className="text-slate-400">Hidden Agency Fees</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl group bg-slate-900">
                <img
                  src="/assets/aistudio/1794068151329_65be161e.jpg"
                  alt="Contemporary Nigerian luxury duplex"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#C8A25D] text-[#0B192C]">
                      Lekki Phase 1, Lagos
                    </span>
                    <span className="text-xs text-white/90">5-Bed Detached Duplex</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-white">
                    {formatNaira(285000000)}
                  </div>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                    Contemporary cantilever architecture with private swimming pool & chef kitchen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FUNCTIONAL PROPERTY SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-14 relative z-20">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 p-5 sm:p-7 space-y-5"
        >
          {/* Top Row: Buy / Rent Switch */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateFilterField('purpose', 'Buy')}
                className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  filters.purpose === 'Buy'
                    ? 'bg-[#0B192C] text-[#C8A25D]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Buy a Property
              </button>
              <button
                type="button"
                onClick={() => updateFilterField('purpose', 'Rent')}
                className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  filters.purpose === 'Rent'
                    ? 'bg-[#0B192C] text-[#C8A25D]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Rent a Property
              </button>
            </div>

            <div className="text-xs text-slate-500 hidden sm:block">
              Filter by verified market price in Nigerian Naira (₦)
            </div>
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
            {/* City */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                City
              </label>
              <select
                value={filters.city}
                onChange={(e) => updateFilterField('city', e.target.value as any)}
                className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D] bg-white font-medium"
              >
                <option value="All">All Cities (Nigeria)</option>
                <option value="Abuja">Abuja</option>
                <option value="Lagos">Lagos</option>
                <option value="Port Harcourt">Port Harcourt</option>
                <option value="Ibadan">Ibadan</option>
                <option value="Enugu">Enugu</option>
                <option value="Uyo">Uyo</option>
                <option value="Owerri">Owerri</option>
              </select>
            </div>

            {/* Location / Neighborhood */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Location / Area
              </label>
              <input
                type="text"
                placeholder="e.g. Lekki, Guzape, Bodija"
                value={filters.neighborhood}
                onChange={(e) => updateFilterField('neighborhood', e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D]"
              />
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Property Type
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => updateFilterField('propertyType', e.target.value as any)}
                className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D] bg-white font-medium"
              >
                <option value="All">All Property Types</option>
                <option value="Detached Duplex">Detached Duplex</option>
                <option value="Semi-Detached Duplex">Semi-Detached Duplex</option>
                <option value="Terraced House">Terraced House</option>
                <option value="Bungalow">Bungalow</option>
                <option value="Apartment">Apartment</option>
                <option value="Flat">Flat</option>
                <option value="Land">Land</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            {/* Min Budget */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Min Budget
              </label>
              <select
                value={filters.minPrice}
                onChange={(e) => updateFilterField('minPrice', Number(e.target.value))}
                className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D] bg-white font-mono"
              >
                <option value={0}>No Minimum</option>
                <option value={20000000}>₦20 Million</option>
                <option value={40000000}>₦40 Million</option>
                <option value={70000000}>₦70 Million</option>
                <option value={100000000}>₦100 Million</option>
                <option value={150000000}>₦150 Million</option>
                <option value={200000000}>₦200 Million</option>
              </select>
            </div>

            {/* Max Budget */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Max Budget
              </label>
              <select
                value={filters.maxPrice}
                onChange={(e) => updateFilterField('maxPrice', Number(e.target.value))}
                className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D] bg-white font-mono"
              >
                <option value={1000000000}>Any Maximum</option>
                <option value={50000000}>₦50 Million</option>
                <option value={90000000}>₦90 Million</option>
                <option value={150000000}>₦150 Million</option>
                <option value={250000000}>₦250 Million</option>
                <option value={350000000}>₦350 Million</option>
                <option value={500000000}>₦500 Million</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Bedrooms
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => updateFilterField('bedrooms', e.target.value as any)}
                className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D] bg-white font-medium"
              >
                <option value="All">Any Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5+">5+ Bedrooms</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-[#0B192C] hover:bg-[#152a42] text-[#C8A25D] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Search Properties</span>
            </button>
          </div>
        </form>
      </section>

      {/* 3. FEATURED PROPERTY LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C8A25D] mb-1">
              Curated Nigerian Portfolio
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B192C]">
              Featured Property Listings
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Real advertised properties across Abuja, Lagos, Port Harcourt, Ibadan, Enugu, Uyo, and Owerri.
            </p>
          </div>

          <button
            onClick={() => {
              setActivePage('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B192C] hover:text-[#C8A25D] transition-colors cursor-pointer"
          >
            <span>View All Marketplace Properties</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((property) => (
            <PropertyCard key={property.id} property={property} featuredHighlight />
          ))}
        </div>
      </section>

      {/* 4. DEDICATED INTERIOR PHOTOGRAPHY FOCUS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#0B192C] text-white p-8 sm:p-12 overflow-hidden relative border border-white/10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C8A25D] uppercase tracking-wider">
                <Camera className="w-4 h-4" />
                <span>Standard of Excellence</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-white">
                We Make Interiors Just as Important as the Exterior.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Too many property websites show only gate entrances and vague angles. At PrimeKey Realty, every listing detail showcases verified high-resolution photography of main living halls, family lounges, modern fitted kitchens with islands, master bedroom suites, walk-in closets, and spa bathrooms with standalone tubs.
              </p>
              <div className="pt-2 flex flex-wrap gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A25D]" /> Living & Lounges
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A25D]" /> Fitted Kitchens
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A25D]" /> Master Ensuites
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A25D]" /> Compounds & Grounds
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <img
                src="/assets/aistudio/1794068191660_e777ef11.jpg"
                alt="Luxury living lounge"
                className="rounded-lg object-cover aspect-[4/3] shadow-md"
              />
              <img
                src="/assets/aistudio/1794068144393_a48e52a4.jpg"
                alt="Master suite"
                className="rounded-lg object-cover aspect-[4/3] shadow-md"
              />
              <img
                src="/assets/aistudio/1794068207087_3c883706.jpg"
                alt="Luxury master bathroom"
                className="rounded-lg object-cover aspect-[4/3] shadow-md"
              />
              <img
                src="/assets/aistudio/1794068236477_32fd1c97.jpg"
                alt="Terrace architecture"
                className="rounded-lg object-cover aspect-[4/3] shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. NIGERIAN DIASPORA INVESTOR ADVANTAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C8A25D]">
            Global Reach · Local Ground Presence
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B192C]">
            Tailored for Nigerians in the Diaspora
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Investing back home shouldn't be stressful or fraught with family disputes. PrimeKey Realty provides a dedicated corporate bridge with legal certainty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#0B192C]/10 text-[#0B192C] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#0B192C]">Live Virtual Video Inspections</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Walk through the exact property via interactive WhatsApp/Zoom video stream with our senior surveyors while residing in the UK, USA, Canada, or Europe.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#0B192C]/10 text-[#0B192C] flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#0B192C]">Direct Ministry Title Search</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every property title undergoes rigorous verification at the state Lands Bureau (Lagos Alausa, Abuja AGIS, Rivers Ministry of Lands) before you remit funds.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#0B192C]/10 text-[#0B192C] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#0B192C]">Turnkey Rental & Tenant Management</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              For buy-to-let investors, we vet executive tenants, collect rent in your designated accounts, and oversee maintenance with detailed quarterly reports.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#0B192C]">
            LET'S FIND YOUR NEXT PROPERTY.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Whether you are purchasing your family home, expanding your rental portfolio, or looking for premium land across Nigeria, PrimeKey Realty makes it safe, transparent, and seamless.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setActivePage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#0B192C] hover:bg-[#152a42] text-[#C8A25D] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-sm"
            >
              Explore Property Collection
            </button>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Speak to an Agent on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
