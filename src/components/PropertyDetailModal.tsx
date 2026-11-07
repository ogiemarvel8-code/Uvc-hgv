import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import { formatNaira, formatEstimatedUSD, getWhatsAppUrl } from '../utils/formatters';
import { PropertyImage, InteriorSpaceType } from '../types/property';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Car,
  Layers,
  Sparkles,
  PhoneCall,
  Share2,
  Heart,
  ChevronRight,
  Info,
} from 'lucide-react';

export const PropertyDetailModal: React.FC = () => {
  const {
    selectedProperty,
    setSelectedProperty,
    openLightbox,
    openInspectionModal,
    isPropertySaved,
    toggleSaveProperty,
    showToast,
  } = useProperty();

  const [activeGalleryTab, setActiveGalleryTab] = useState<'all' | 'exterior' | 'living' | 'bedroom' | 'kitchen' | 'bathroom'>('all');
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  if (!selectedProperty) return null;

  const isSaved = isPropertySaved(selectedProperty.id);

  // Combine images
  const allImages: PropertyImage[] = [
    ...selectedProperty.exteriorImages.map((img) => ({ ...img, isExterior: true })),
    ...selectedProperty.interiorImages.map((img) => ({ ...img, isExterior: false })),
  ];

  // Filter images according to active tab
  const displayedImages = allImages.filter((img) => {
    if (activeGalleryTab === 'all') return true;
    if (activeGalleryTab === 'exterior') return img.isExterior;
    return img.spaceType === activeGalleryTab;
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied', 'Property link copied to clipboard.');
  };

  const handleThumbnailClick = (imageIndex: number) => {
    setActiveHeroIndex(imageIndex);
  };

  const currentHeroImg = allImages[activeHeroIndex] || allImages[0];

  return (
    <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-5xl my-auto overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Sticky Header Bar */}
        <div className="px-5 py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded text-white ${
                selectedProperty.purpose === 'Buy' ? 'bg-[#0B192C]' : 'bg-[#1E40AF]'
              }`}
            >
              For {selectedProperty.purpose}
            </span>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              Ref: PK-{selectedProperty.id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Share listing link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleSaveProperty(selectedProperty.id)}
              className="p-2 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={() => setSelectedProperty(null)}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-8">
          {/* Top Title & Price Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-[#C8A25D]" />
                <span>
                  {selectedProperty.neighborhood}, {selectedProperty.city}, Nigeria
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-[#0B192C]">
                {selectedProperty.title}
              </h1>
            </div>

            <div className="md:text-right shrink-0">
              <div className="text-2xl sm:text-3xl font-bold font-display text-[#0B192C]">
                {formatNaira(selectedProperty.askingPrice)}
                {selectedProperty.purpose === 'Rent' && selectedProperty.rentFrequency && (
                  <span className="text-sm font-normal text-slate-500">
                    {' '}/{selectedProperty.rentFrequency}
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                Diaspora Est: {formatEstimatedUSD(selectedProperty.askingPrice)}
              </div>
            </div>
          </div>

          {/* DEDICATED PROPERTY INTERIOR & EXTERIOR GALLERY */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
              <div>
                <h2 className="text-lg font-bold text-[#0B192C] flex items-center gap-2">
                  <span>Dedicated Property Gallery</span>
                  <span className="text-xs font-normal text-slate-500">
                    ({allImages.length} Photographs · Exterior & Interior)
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  Click any photo for full-screen inspection view with room specifications
                </p>
              </div>

              {/* Gallery Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full text-xs">
                {[
                  { id: 'all', label: 'All Photos' },
                  { id: 'exterior', label: 'Exterior' },
                  { id: 'living', label: 'Living Spaces' },
                  { id: 'bedroom', label: 'Bedrooms' },
                  { id: 'kitchen', label: 'Kitchen' },
                  { id: 'bathroom', label: 'Bathrooms' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveGalleryTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      activeGalleryTab === tab.id
                        ? 'bg-[#0B192C] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Hero Showcase */}
            {currentHeroImg && (
              <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-slate-900 shadow-inner group">
                <img
                  src={currentHeroImg.url}
                  alt={currentHeroImg.caption || 'Property photo'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4 sm:p-6 pointer-events-none">
                  <div className="flex items-center justify-between">
                    {currentHeroImg.isIllustrative ? (
                      <span className="text-xs px-2.5 py-1 rounded bg-amber-500/90 text-white font-medium flex items-center gap-1 backdrop-blur-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Illustrative Architectural Inspiration</span>
                      </span>
                    ) : (
                      <span className="text-xs px-2.5 py-1 rounded bg-emerald-600/90 text-white font-medium flex items-center gap-1 backdrop-blur-xs">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified On-Site Photography</span>
                      </span>
                    )}

                    <button
                      onClick={() => openLightbox(allImages, activeHeroIndex)}
                      className="pointer-events-auto px-3 py-1.5 rounded bg-black/60 hover:bg-black/90 text-white text-xs font-medium flex items-center gap-1.5 backdrop-blur-xs cursor-pointer transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Expand Lightbox</span>
                    </button>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                      {currentHeroImg.roomLabel || (currentHeroImg.isExterior ? 'Exterior Facade & Grounds' : 'Interior Space')}
                    </h3>
                    {currentHeroImg.caption && (
                      <p className="text-xs sm:text-sm text-slate-300 max-w-2xl line-clamp-2">
                        {currentHeroImg.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Thumbnails Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {displayedImages.map((img) => {
                const actualIndex = allImages.findIndex((item) => item.id === img.id);
                const isSelected = actualIndex === activeHeroIndex;
                return (
                  <button
                    key={img.id}
                    onClick={() => handleThumbnailClick(actualIndex)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer border-2 transition-all ${
                      isSelected
                        ? 'border-[#C8A25D] scale-[1.02] shadow-sm'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.roomLabel || 'Room photo'}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                    <span className="absolute bottom-1 left-1 right-1 text-[10px] text-white font-medium truncate px-1 rounded bg-black/60">
                      {img.roomLabel || (img.isExterior ? 'Exterior' : 'Interior')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Key Facts Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0B192C]/10 text-[#0B192C] flex items-center justify-center shrink-0">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <div className="text-slate-500">Bedrooms</div>
                <div className="font-bold text-slate-900 text-sm">
                  {selectedProperty.bedrooms > 0 ? `${selectedProperty.bedrooms} Ensuite` : 'N/A'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0B192C]/10 text-[#0B192C] flex items-center justify-center shrink-0">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <div className="text-slate-500">Bathrooms</div>
                <div className="font-bold text-slate-900 text-sm">
                  {selectedProperty.bathrooms > 0 ? `${selectedProperty.bathrooms} Baths` : 'N/A'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0B192C]/10 text-[#0B192C] flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="text-slate-500">Parking Space</div>
                <div className="font-bold text-slate-900 text-sm">
                  {selectedProperty.parkingSpaces ? `${selectedProperty.parkingSpaces} SUVs` : 'Compound'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0B192C]/10 text-[#0B192C] flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-slate-500">Land Title</div>
                <div className="font-bold text-slate-900 text-sm truncate" title={selectedProperty.titleDocument}>
                  {selectedProperty.titleDocument.split(' ')[0]} Verified
                </div>
              </div>
            </div>
          </div>

          {/* Description & Features Split Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#0B192C] mb-2">Property Overview</h3>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedProperty.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#0B192C] mb-3">Key Features & Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProperty.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Title & Legal Verification Guarantee */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-1">
                <div className="font-semibold flex items-center gap-1.5 text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Title Document: {selectedProperty.titleDocument}</span>
                </div>
                <p className="text-amber-800 leading-relaxed">
                  PrimeKey Realty conducts independent search verification at the state Lands Registry and Survey Directorate before listing any property. Certified legal copies are made available during formal inspection.
                </p>
              </div>
            </div>

            {/* Side Action Column: Inspection Booking & Agent Contact */}
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-[#0B192C] uppercase tracking-wider">
                  Book an Inspection
                </h3>
                <p className="text-xs text-slate-600">
                  Schedule an in-person physical walkthrough or a live virtual guided tour for diaspora clients.
                </p>

                <button
                  onClick={() => openInspectionModal(selectedProperty)}
                  className="w-full py-3 px-4 bg-[#0B192C] hover:bg-[#152a42] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-[#C8A25D]" />
                  <span>Request Inspection Date</span>
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-slate-50 px-2 text-[11px] text-slate-400 uppercase">or</span>
                </div>

                <a
                  href={getWhatsAppUrl(selectedProperty.title, selectedProperty.id, selectedProperty.askingPrice)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>

                <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <span>Zero agent inspection fee for verified buyers</span>
                </div>
              </div>

              {/* Dedicated Agent Reassurance Box */}
              <div className="p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="font-semibold text-slate-900">PrimeKey Realty Client Desk</div>
                <div className="text-slate-600 space-y-1">
                  <div>Hotline: +234 (0) 803 900 4567</div>
                  <div>Email: enquiries@primekeyrealty.ng</div>
                  <div>Office: Lekki Phase 1, Lagos & Maitama, Abuja</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
