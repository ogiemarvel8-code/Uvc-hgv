export type PropertyType =
  | 'Detached Duplex'
  | 'Semi-Detached Duplex'
  | 'Terraced House'
  | 'Bungalow'
  | 'Apartment'
  | 'Flat'
  | 'Land'
  | 'Commercial';

export type PropertyPurpose = 'Buy' | 'Rent';

export type PropertyStatus = 'Available' | 'Under Offer' | 'Sold' | 'Rented';

export type NigerianCity =
  | 'Abuja'
  | 'Lagos'
  | 'Port Harcourt'
  | 'Ibadan'
  | 'Enugu'
  | 'Uyo'
  | 'Owerri';

export type InteriorSpaceType =
  | 'living'
  | 'bedroom'
  | 'kitchen'
  | 'bathroom'
  | 'additional';

export interface PropertyImage {
  id: string;
  url: string;
  caption: string;
  isExterior?: boolean;
  spaceType?: InteriorSpaceType;
  roomLabel?: string; // e.g. "Main Living Room", "Master Bedroom Suite", "Modern Fitted Kitchen", "Spa Master Ensuite", "Family Lounge"
  isIllustrative?: boolean;
}

export interface Property {
  id: string;
  title: string;
  askingPrice: number; // in NGN
  currency: 'NGN';
  purpose: PropertyPurpose;
  rentFrequency?: 'per annum' | 'per month';
  city: NigerianCity;
  neighborhood: string; // e.g. "Lekki Phase 1", "Maitama", "Guzape", "Bodija", "Independence Layout"
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  toilets?: number;
  parkingSpaces?: number;
  areaSqM?: number;
  featured: boolean;
  status: PropertyStatus;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  titleDocument: string; // e.g. "Governor's Consent", "Certificate of Occupancy (C of O)", "Deed of Assignment"
  exteriorImages: PropertyImage[];
  interiorImages: PropertyImage[];
  createdAt: string;
  videoTourAvailable?: boolean;
}

export interface FilterState {
  purpose: 'All' | PropertyPurpose;
  city: 'All' | NigerianCity;
  neighborhood: string;
  propertyType: 'All' | PropertyType;
  minPrice: number;
  maxPrice: number;
  bedrooms: 'All' | '1' | '2' | '3' | '4' | '5+';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'bedrooms-desc';
}

export interface InspectionRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  inspectionType: 'Physical Inspection' | 'Virtual Video Tour (Diaspora)';
  notes?: string;
  status: 'Pending' | 'Confirmed';
  createdAt: string;
}

export interface ContactEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredCity: string;
  propertyOfInterest: string;
  budget: string;
  purpose: PropertyPurpose;
  message: string;
  createdAt: string;
}
