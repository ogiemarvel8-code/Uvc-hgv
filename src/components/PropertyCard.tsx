import React from 'react';
import { Property } from '../types/property';
import { useProperty } from '../context/PropertyContext';
import { formatNaira, formatEstimatedUSD, getWhatsAppUrl } from '../utils/formatters';
import { Bed, Bath, MapPin, Heart, Image as ImageIcon, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  featuredHighlight?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, featuredHighlight = false }) => {
  const { setSelectedProperty, openInspectionModal, isPropertySaved, toggleSaveProperty } = useProperty();

  const isSaved = isPropertySaved(property.id);
  const coverImage = property.exteriorImages[0]?.url || '/assets/aistudio/1794068151329_65be161e.jpg';
  const totalPhotos = property.exteriorImages.length + property.interiorImages.length;
  const hasInteriorPhotos = property.interiorImages.length > 0;

  return (
    <article
      className={`group bg-white rounded-xl overflow-hidden border transition-all duration-300 flex flex-col ${
        featuredHighlight
          ? 'border-[#C8A25D]/40 shadow-md hover:shadow-xl'
          : 'border-slate-200/90 hover:border-slate-300 hover:shadow-lg'
      }`}
    >
      {/* Property Exterior Photograph Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={coverImage}
          alt={property.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Overlay Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm text-white ${
                property.purpose === 'Buy' ? 'bg-[#0B192C]' : 'bg-[#1E40AF]'
              }`}
            >
              For {property.purpose}
            </span>

            {property.status === 'Available' ? (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-600/90 text-white backdrop-blur-xs">
                Available
              </span>
            ) : (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-600/90 text-white backdrop-blur-xs">
                {property.status}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveProperty(property.id);
            }}
            className="pointer-events-auto w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xs text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label={isSaved ? 'Remove from shortlist' : 'Save property to shortlist'}
            title={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
          </button>
        </div>

        {/* Bottom Overlay Info Strip */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none text-white text-xs">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs">
            <ImageIcon className="w-3.5 h-3.5 text-[#C8A25D]" />
            <span>{totalPhotos} Photos</span>
            {hasInteriorPhotos && (
              <span className="text-[#C8A25D] font-medium">· Interior & Exterior</span>
            )}
          </div>

          <div className="text-[11px] font-medium px-2 py-1 rounded bg-black/60 backdrop-blur-xs text-slate-200">
            {property.propertyType}
          </div>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Diaspora Estimate */}
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <div>
              <span className="text-xl sm:text-2xl font-bold font-display text-[#0B192C] tracking-tight">
                {formatNaira(property.askingPrice)}
              </span>
              {property.purpose === 'Rent' && property.rentFrequency && (
                <span className="text-xs text-slate-500 ml-1">/{property.rentFrequency}</span>
              )}
            </div>
            <span className="text-xs text-slate-500 font-mono" title="Estimated USD for diaspora investors">
              {formatEstimatedUSD(property.askingPrice)}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#C8A25D] shrink-0" />
            <span className="truncate">{property.neighborhood}, {property.city}</span>
          </div>

          {/* Property Title */}
          <h3
            onClick={() => setSelectedProperty(property)}
            className="text-base font-semibold text-slate-900 group-hover:text-[#0B192C] line-clamp-2 cursor-pointer transition-colors mb-2 leading-snug"
          >
            {property.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {property.shortDescription}
          </p>
        </div>

        <div>
          {/* Bedrooms & Bathrooms (Zero-Pill Clean Inline Metadata with separators) */}
          <div className="py-3 border-y border-slate-100 flex items-center justify-between text-xs text-slate-600 mb-4">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-slate-400" />
              <span>{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Commercial/Plot'}</span>
            </div>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              <span>{property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'N/A'}</span>
            </div>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-1 text-slate-500 truncate max-w-[120px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate" title={property.titleDocument}>{property.titleDocument.split('&')[0]}</span>
            </div>
          </div>

          {/* Action Buttons: View Property & Enquire Now */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedProperty(property)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-[#0B192C] hover:bg-[#152a42] rounded transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>View Property</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={getWhatsAppUrl(property.title, property.id, property.askingPrice)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-[#0B192C] bg-[#C8A25D]/20 hover:bg-[#C8A25D]/30 border border-[#C8A25D]/40 rounded transition-colors cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#0B192C]" />
              <span>Enquire Now</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
