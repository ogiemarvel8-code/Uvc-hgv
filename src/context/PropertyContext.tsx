import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Property, FilterState, InspectionRequest, ContactEnquiry, PropertyImage } from '../types/property';
import { initialProperties } from '../data/initialProperties';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description: string;
}

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilterField: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  activePage: 'home' | 'properties' | 'about-contact';
  setActivePage: (page: 'home' | 'properties' | 'about-contact') => void;
  selectedProperty: Property | null;
  setSelectedProperty: (property: Property | null) => void;
  lightboxState: { isOpen: boolean; images: PropertyImage[]; activeIndex: number } | null;
  openLightbox: (images: PropertyImage[], index: number) => void;
  closeLightbox: () => void;
  inspectionProperty: Property | null;
  openInspectionModal: (property: Property) => void;
  closeInspectionModal: () => void;
  isAgentPortalOpen: boolean;
  openAgentPortal: () => void;
  closeAgentPortal: () => void;
  savedPropertyIds: string[];
  toggleSaveProperty: (id: string) => void;
  isPropertySaved: (id: string) => boolean;
  addProperty: (property: Property) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  resetInventoryToDefault: () => void;
  submitInspection: (request: Omit<InspectionRequest, 'id' | 'createdAt' | 'status'>) => InspectionRequest;
  submitEnquiry: (enquiry: Omit<ContactEnquiry, 'id' | 'createdAt'>) => ContactEnquiry;
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
  showToast: (title: string, description: string, type?: 'success' | 'info' | 'error') => void;
}

const defaultFilters: FilterState = {
  purpose: 'All',
  city: 'All',
  neighborhood: '',
  propertyType: 'All',
  minPrice: 0,
  maxPrice: 1000000000,
  bedrooms: 'All',
  sortBy: 'featured',
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

const STORAGE_KEY = 'primekey_realty_inventory_v1';
const SAVED_KEY = 'primekey_realty_saved_v1';

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load properties from local storage', e);
    }
    return initialProperties;
  });

  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [];
  });

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [activePage, setActivePage] = useState<'home' | 'properties' | 'about-contact'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [inspectionProperty, setInspectionProperty] = useState<Property | null>(null);
  const [isAgentPortalOpen, setIsAgentPortalOpen] = useState(false);
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    images: PropertyImage[];
    activeIndex: number;
  } | null>(null);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist inventory
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    } catch (e) {
      console.error('Failed to persist inventory', e);
    }
  }, [properties]);

  // Persist saved
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(savedPropertyIds));
    } catch (e) {
      console.error('Failed to persist saved properties', e);
    }
  }, [savedPropertyIds]);

  const showToast = (title: string, description: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateFilterField = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const openLightbox = (images: PropertyImage[], index: number) => {
    setLightboxState({
      isOpen: true,
      images,
      activeIndex: Math.max(0, Math.min(index, images.length - 1)),
    });
  };

  const closeLightbox = () => {
    setLightboxState(null);
  };

  const openInspectionModal = (property: Property) => {
    setInspectionProperty(property);
  };

  const closeInspectionModal = () => {
    setInspectionProperty(null);
  };

  const openAgentPortal = () => setIsAgentPortalOpen(true);
  const closeAgentPortal = () => setIsAgentPortalOpen(false);

  const toggleSaveProperty = (id: string) => {
    setSavedPropertyIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Saved Properties', 'Property removed from your shortlist', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved Properties', 'Property added to your shortlist', 'success');
        return [...prev, id];
      }
    });
  };

  const isPropertySaved = (id: string) => savedPropertyIds.includes(id);

  const addProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
    showToast('Listing Created', `"${newProp.title}" added to live inventory.`);
  };

  const updateProperty = (updated: Property) => {
    setProperties((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProperty && selectedProperty.id === updated.id) {
      setSelectedProperty(updated);
    }
    showToast('Listing Updated', `Changes saved for "${updated.title}".`);
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    if (selectedProperty && selectedProperty.id === id) {
      setSelectedProperty(null);
    }
    showToast('Listing Removed', 'Property listing was deleted from inventory.', 'info');
  };

  const resetInventoryToDefault = () => {
    setProperties(initialProperties);
    showToast('Inventory Reset', 'Sample Nigerian property listings restored.', 'info');
  };

  const submitInspection = (requestData: Omit<InspectionRequest, 'id' | 'createdAt' | 'status'>) => {
    const request: InspectionRequest = {
      ...requestData,
      id: 'insp-' + Math.random().toString(36).substring(2, 9),
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };
    showToast('Inspection Booked', `Inspection request confirmed for ${request.propertyTitle}. Our agent will contact you shortly.`);
    return request;
  };

  const submitEnquiry = (enquiryData: Omit<ContactEnquiry, 'id' | 'createdAt'>) => {
    const enquiry: ContactEnquiry = {
      ...enquiryData,
      id: 'enq-' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
    };
    showToast('Enquiry Received', `Thank you ${enquiry.fullName}. An agent has received your request and will reply within 30 minutes.`);
    return enquiry;
  };

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Purpose
      if (filters.purpose !== 'All' && prop.purpose !== filters.purpose) {
        return false;
      }
      // City
      if (filters.city !== 'All' && prop.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }
      // Neighborhood search
      if (filters.neighborhood.trim()) {
        const query = filters.neighborhood.toLowerCase();
        const matchesNeighborhood = prop.neighborhood.toLowerCase().includes(query);
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesCity = prop.city.toLowerCase().includes(query);
        if (!matchesNeighborhood && !matchesTitle && !matchesCity) {
          return false;
        }
      }
      // Property type
      if (filters.propertyType !== 'All' && prop.propertyType !== filters.propertyType) {
        return false;
      }
      // Price range
      if (prop.askingPrice < filters.minPrice || prop.askingPrice > filters.maxPrice) {
        return false;
      }
      // Bedrooms
      if (filters.bedrooms !== 'All') {
        if (filters.bedrooms === '5+') {
          if (prop.bedrooms < 5) return false;
        } else {
          const required = parseInt(filters.bedrooms, 10);
          if (prop.bedrooms !== required) return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') {
        return a.askingPrice - b.askingPrice;
      }
      if (filters.sortBy === 'price-desc') {
        return b.askingPrice - a.askingPrice;
      }
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (filters.sortBy === 'bedrooms-desc') {
        return b.bedrooms - a.bedrooms;
      }
      // Default: featured first, then price desc
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.askingPrice - a.askingPrice;
    });
  }, [properties, filters]);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties,
        filters,
        setFilters,
        updateFilterField,
        resetFilters,
        activePage,
        setActivePage,
        selectedProperty,
        setSelectedProperty,
        lightboxState,
        openLightbox,
        closeLightbox,
        inspectionProperty,
        openInspectionModal,
        closeInspectionModal,
        isAgentPortalOpen,
        openAgentPortal,
        closeAgentPortal,
        savedPropertyIds,
        toggleSaveProperty,
        isPropertySaved,
        addProperty,
        updateProperty,
        deleteProperty,
        resetInventoryToDefault,
        submitInspection,
        submitEnquiry,
        toasts,
        dismissToast,
        showToast,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = (): PropertyContextType => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
