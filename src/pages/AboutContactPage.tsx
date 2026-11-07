import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import {
  OFFICIAL_DISPLAY_PHONE,
  OFFICIAL_PHONE,
  OFFICIAL_EMAIL,
  OFFICIAL_OFFICE_LAGOS,
  OFFICIAL_OFFICE_ABUJA,
  getWhatsAppUrl,
} from '../utils/formatters';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Building,
  Key,
  Compass,
  Briefcase,
  Users,
  Search,
  MessageSquare,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const AboutContactPage: React.FC = () => {
  const { properties, submitEnquiry } = useProperty();

  // Contact form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredCity, setPreferredCity] = useState('Lagos');
  const [propertyOfInterest, setPropertyOfInterest] = useState('General Enquiry');
  const [budget, setBudget] = useState('₦50M - ₦150M');
  const [purpose, setPurpose] = useState<'Buy' | 'Rent'>('Buy');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Active Map Office Toggle (Lagos vs Abuja)
  const [activeOffice, setActiveOffice] = useState<'lagos' | 'abuja'>('lagos');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    submitEnquiry({
      fullName,
      phone,
      email,
      preferredCity,
      propertyOfInterest,
      budget,
      purpose,
      message,
    });

    setIsSubmitted(true);
  };

  const services = [
    {
      title: 'Residential Property Sales',
      desc: 'Sourcing, vetting, and negotiating purchases for luxury detached duplexes, semi-detached homes, penthouses, and terraces across high-demand Nigerian cities.',
      icon: Building,
    },
    {
      title: 'Property Rentals & Leases',
      desc: 'Connecting expatriates, corporate executives, and verified tenants to pristine serviced apartments and townhomes with guaranteed power and security.',
      icon: Key,
    },
    {
      title: 'Land Acquisition & Title Perfection',
      desc: 'Guiding investors through 100% dry, surveyed land plots with verified Governors Consent, C of O, and Gazette records, free from indigenous community disputes.',
      icon: Compass,
    },
    {
      title: 'Real Estate Investment Advisory',
      desc: 'Assisting diaspora Nigerians and institutional buyers in constructing high-yield buy-to-let portfolios with robust capital appreciation exceeding 25% p.a.',
      icon: Briefcase,
    },
    {
      title: 'Property Inspection Arrangements',
      desc: 'Coordinating seamless on-ground vehicle escorted inspections or live interactive HD video tours tailored specifically for overseas buyers.',
      icon: Search,
    },
    {
      title: 'Buyer & Seller Representation',
      desc: 'Independent legal auditing, deeds drafting, land registry search at state ministries, and escrow advisory protecting both parties from transaction fraud.',
      icon: Users,
    },
  ];

  const whyChooseUsPoints = [
    {
      title: 'Transparent Information',
      desc: 'Every asking price, title classification, and property condition is clearly disclosed. Zero surprise development levies or phantom broker fees.',
    },
    {
      title: 'Professional Assistance',
      desc: 'Our registered estate surveyors and real estate legal counsels handle your transactions with rigorous institutional standards.',
    },
    {
      title: 'Market Knowledge',
      desc: 'Unmatched ground intelligence in Lagos, Abuja, Port Harcourt, Ibadan, Enugu, Uyo, and Owerri to ensure you never overpay for square meterage.',
    },
    {
      title: 'Responsive Communication',
      desc: 'Dedicated property consultants available 24/7 across WhatsApp, phone, and video calls to answer questions across all time zones.',
    },
    {
      title: 'Reliable Inspection Support',
      desc: 'Chauffeured site visits for local buyers, and crystal-clear walkthroughs for diaspora clients who cannot fly in immediately.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* 1. HERO / ABOUT INTRO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B192C] text-white rounded-3xl p-8 sm:p-14 overflow-hidden relative border border-white/10 shadow-xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8A25D] bg-white/5 border border-[#C8A25D]/30 px-3 py-1 rounded">
              <ShieldCheck className="w-4 h-4 text-[#C8A25D]" />
              <span>Professional Nigerian Property Agency</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
              YOUR PROPERTY JOURNEY <br />
              <span className="text-[#C8A25D]">STARTS HERE.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              PrimeKey Realty is an established Nigerian property agency specializing in residential sales, quality rentals, verified land acquisition, and diaspora investment advisory.
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
              Whether you are acquiring a family sanctuary in Lekki, a diplomatic residence in Maitama, or growing a commercial portfolio in Port Harcourt, we provide complete transparency, authentic photographs, and verified title documentation every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* 2. OUR PROFESSIONAL SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C8A25D]">
            Comprehensive Advisory
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B192C]">
            Our Real Estate Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            End-to-end guidance from initial search to deed execution and tenant management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all space-y-3"
              >
                <div className="w-11 h-11 rounded-xl bg-[#0B192C] text-[#C8A25D] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B192C] font-display">
                  {svc.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="bg-slate-100/80 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-xl space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C8A25D]">
              Trust & Integrity
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B192C]">
              Why Choose PrimeKey Realty
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              The standard of trust Nigerian homeowners and global investors rely on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsPoints.map((point, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white border border-slate-200 space-y-2.5 shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h4 className="text-sm font-bold text-[#0B192C] font-display">
                    {point.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CONTACT SECTION WITH DETAILED FORM & LIVE GOOGLE MAPS */}
      <section id="contact-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info & Office Addresses */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#C8A25D]">
                Get in Touch
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B192C]">
                Speak Directly with an Agent
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our property consultants are available to assist you with inquiries, physical inspections, title searches, and property sales across all major Nigerian cities.
              </p>
            </div>

            {/* Direct WhatsApp Action Box */}
            <div className="p-5 rounded-2xl bg-[#0B192C] text-white space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8A25D]">
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Instant WhatsApp Enquiry Desk</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prefer immediate messaging? Chat directly with our senior consultant right now on WhatsApp.
              </p>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp Now</span>
              </a>
            </div>

            {/* Quick Contact Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-2xs text-xs">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#0B192C] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Phone Hotline</div>
                    <a href={`tel:${OFFICIAL_PHONE}`} className="text-slate-600 hover:text-[#0B192C]">
                      {OFFICIAL_DISPLAY_PHONE}
                    </a>
                    <div className="text-[11px] text-slate-400">Monday - Saturday (8:30 AM - 6:00 PM WAT)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#0B192C] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Official Email</div>
                    <a href={`mailto:${OFFICIAL_EMAIL}`} className="text-slate-600 hover:text-[#0B192C]">
                      {OFFICIAL_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#0B192C] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Lagos Head Office</div>
                    <div className="text-slate-600">{OFFICIAL_OFFICE_LAGOS}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#0B192C] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Abuja Executive Office</div>
                    <div className="text-slate-600">{OFFICIAL_OFFICE_ABUJA}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
            {isSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-display text-[#0B192C]">
                  Enquiry Received!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{fullName}</strong>. A dedicated PrimeKey Realty consultant for{' '}
                  <strong className="text-slate-900">{preferredCity}</strong> has received your inquiry regarding{' '}
                  <strong className="text-slate-900">{propertyOfInterest}</strong> and will follow up within 30 minutes.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={getWhatsAppUrl(propertyOfInterest, undefined, undefined)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Follow Up on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold font-display text-[#0B192C]">
                    Send a Property Request
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill in your details below and an agent will prepare verified options matching your requirements.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Emeka Okafor"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number (WhatsApp) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 803 000 0000 / +44..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="client@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred City in Nigeria
                    </label>
                    <select
                      value={preferredCity}
                      onChange={(e) => setPreferredCity(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="Lagos">Lagos (Lekki, Ikoyi, Ikeja)</option>
                      <option value="Abuja">Abuja (Maitama, Guzape, Jabi)</option>
                      <option value="Port Harcourt">Port Harcourt (Old GRA, Peter Odili)</option>
                      <option value="Ibadan">Ibadan (Bodija, Alalubosa)</option>
                      <option value="Enugu">Enugu (Independence Layout)</option>
                      <option value="Uyo">Uyo (Shelter Afrique)</option>
                      <option value="Owerri">Owerri (New Owerri)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Property of Interest
                    </label>
                    <select
                      value={propertyOfInterest}
                      onChange={(e) => setPropertyOfInterest(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="General Consultation">General Property Consultation</option>
                      {properties.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title} ({p.city})
                        </option>
                      ))}
                      <option value="Land Acquisition">Dry Titled Land Acquisition</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Purpose
                    </label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value as any)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="Buy">Outright Purchase</option>
                      <option value="Rent">Rental / Lease</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Estimated Budget Range (₦ Naira)
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white font-mono"
                  >
                    <option value="₦20M - ₦50M">₦20 Million – ₦50 Million</option>
                    <option value="₦50M - ₦100M">₦50 Million – ₦100 Million</option>
                    <option value="₦100M - ₦200M">₦100 Million – ₦200 Million</option>
                    <option value="₦200M - ₦350M">₦200 Million – ₦350 Million</option>
                    <option value="₦350M+">₦350 Million and above</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message or Specific Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you are looking for (e.g. 4-bedroom duplex with swimming pool, installment payment terms, specific timeline)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#0B192C] hover:bg-[#152a42] text-[#C8A25D] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Submit Property Enquiry
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 5. INTERACTIVE GOOGLE MAPS & OFFICE LOCATION VIEWER */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold font-display text-[#0B192C] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C8A25D]" />
                <span>PrimeKey Realty Office Locations & Interactive Map</span>
              </h3>
              <p className="text-xs text-slate-500">
                Visit our physical client centers in Lagos or Abuja for private title document review
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveOffice('lagos')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeOffice === 'lagos'
                    ? 'bg-[#0B192C] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Lekki Phase 1, Lagos
              </button>
              <button
                onClick={() => setActiveOffice('abuja')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeOffice === 'abuja'
                    ? 'bg-[#0B192C] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Maitama, Abuja
              </button>
            </div>
          </div>

          {/* Interactive Styled Map Component */}
          <div className="relative aspect-[21/9] min-h-[300px] w-full bg-slate-900 overflow-hidden">
            <iframe
              title={activeOffice === 'lagos' ? 'PrimeKey Lekki Office Map' : 'PrimeKey Abuja Office Map'}
              src={
                activeOffice === 'lagos'
                  ? 'https://maps.google.com/maps?q=Admiralty%20Way,%20Lekki%20Phase%201,%20Lagos&t=&z=15&ie=UTF8&iwloc=&output=embed'
                  : 'https://maps.google.com/maps?q=Maitama,%20Abuja,%20Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed'
              }
              className="w-full h-full border-0 filter contrast-105"
              loading="lazy"
              allowFullScreen
            />

            {/* Floating Location Card */}
            <div className="absolute bottom-4 left-4 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-200 max-w-sm text-xs">
              <div className="font-bold text-slate-900 text-sm">
                {activeOffice === 'lagos' ? 'Lagos Corporate Hub' : 'Abuja Executive Desk'}
              </div>
              <div className="text-slate-600 mt-1">
                {activeOffice === 'lagos' ? OFFICIAL_OFFICE_LAGOS : OFFICIAL_OFFICE_ABUJA}
              </div>
              <div className="mt-2 text-[11px] text-[#C8A25D] font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Mon – Sat: 8:30 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA: LET'S FIND YOUR NEXT PROPERTY */}
      <section className="bg-[#0B192C] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8A25D]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Ready to Inspect?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            LET'S FIND YOUR NEXT PROPERTY.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Speak with an authorized PrimeKey Realty consultant today. Zero inspection pressure, complete legal diligence, and verified properties across Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="#contact-form"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#C8A25D] hover:bg-[#d8b572] text-[#0B192C] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-sm"
            >
              Request Free Consultation
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Instant WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
