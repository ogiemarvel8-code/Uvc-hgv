import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import { Property, PropertyType, NigerianCity, PropertyPurpose, PropertyStatus, InteriorSpaceType, PropertyImage } from '../types/property';
import { formatNaira } from '../utils/formatters';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Upload,
  CheckCircle2,
  KeyRound,
  DollarSign,
  Building,
  Image as ImageIcon,
  Save,
} from 'lucide-react';

export const AgentPortalModal: React.FC = () => {
  const {
    isAgentPortalOpen,
    closeAgentPortal,
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    resetInventoryToDefault,
  } = useProperty();

  const [activeTab, setActiveTab] = useState<'inventory' | 'create'>('inventory');
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStatus, setEditStatus] = useState<PropertyStatus>('Available');

  // New Property Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState<number>(95000000);
  const [newPurpose, setNewPurpose] = useState<PropertyPurpose>('Buy');
  const [newCity, setNewCity] = useState<NigerianCity>('Lagos');
  const [newNeighborhood, setNewNeighborhood] = useState('');
  const [newType, setNewType] = useState<PropertyType>('Detached Duplex');
  const [newBedrooms, setNewBedrooms] = useState<number>(4);
  const [newBathrooms, setNewBathrooms] = useState<number>(4);
  const [newParking, setNewParking] = useState<number>(3);
  const [newTitleDoc, setNewTitleDoc] = useState("Governor's Consent");
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newFullDesc, setNewFullDesc] = useState('');
  const [exteriorUrl, setExteriorUrl] = useState('/assets/aistudio/1794068151329_65be161e.jpg');
  
  // Custom Interior Images for New Property
  const [interiorList, setInteriorList] = useState<PropertyImage[]>([
    {
      id: 'custom-int-1',
      url: '/assets/aistudio/1794068191660_e777ef11.jpg',
      caption: 'Main grand living room lounge',
      spaceType: 'living',
      roomLabel: 'Main Living Room',
      isIllustrative: false,
    },
    {
      id: 'custom-int-2',
      url: '/assets/aistudio/1794068144393_a48e52a4.jpg',
      caption: 'Master bedroom suite with modern ceiling details',
      spaceType: 'bedroom',
      roomLabel: 'Master Bedroom Suite',
      isIllustrative: false,
    },
    {
      id: 'custom-int-3',
      url: '/assets/aistudio/1794068207087_3c883706.jpg',
      caption: 'Master bathroom with freestanding soaking tub',
      spaceType: 'bathroom',
      roomLabel: 'Master Ensuite Bathroom',
      isIllustrative: false,
    },
  ]);

  const [newInteriorUrl, setNewInteriorUrl] = useState('');
  const [newInteriorLabel, setNewInteriorLabel] = useState('Modern Fitted Kitchen');
  const [newInteriorSpace, setNewInteriorSpace] = useState<InteriorSpaceType>('kitchen');

  if (!isAgentPortalOpen) return null;

  const handleStartEdit = (prop: Property) => {
    setEditingPropertyId(prop.id);
    setEditPrice(prop.askingPrice);
    setEditStatus(prop.status);
  };

  const handleSaveEdit = (prop: Property) => {
    updateProperty({
      ...prop,
      askingPrice: editPrice,
      status: editStatus,
    });
    setEditingPropertyId(null);
  };

  const handleAddInteriorPhoto = () => {
    if (!newInteriorUrl.trim()) return;
    const newImg: PropertyImage = {
      id: 'int-' + Math.random().toString(36).substring(2, 9),
      url: newInteriorUrl.trim(),
      caption: newInteriorLabel,
      roomLabel: newInteriorLabel,
      spaceType: newInteriorSpace,
      isIllustrative: false,
    };
    setInteriorList((prev) => [...prev, newImg]);
    setNewInteriorUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'exterior' | 'interior') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (target === 'exterior') {
        setExteriorUrl(result);
      } else {
        const newImg: PropertyImage = {
          id: 'upload-' + Math.random().toString(36).substring(2, 9),
          url: result,
          caption: newInteriorLabel,
          roomLabel: newInteriorLabel,
          spaceType: newInteriorSpace,
          isIllustrative: false,
        };
        setInteriorList((prev) => [...prev, newImg]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newNeighborhood.trim()) return;

    const created: Property = {
      id: 'pk-' + Math.random().toString(36).substring(2, 9),
      title: newTitle.trim(),
      askingPrice: Number(newPrice),
      currency: 'NGN',
      purpose: newPurpose,
      city: newCity,
      neighborhood: newNeighborhood.trim(),
      propertyType: newType,
      bedrooms: Number(newBedrooms),
      bathrooms: Number(newBathrooms),
      parkingSpaces: Number(newParking),
      featured: true,
      status: 'Available',
      shortDescription: newShortDesc || `High-spec ${newType} located in prime ${newNeighborhood}, ${newCity}.`,
      fullDescription:
        newFullDesc ||
        `PrimeKey Realty is pleased to present this executive ${newBedrooms}-bedroom ${newType} situated in the prestigious corridor of ${newNeighborhood}, ${newCity}. Boasting verified land titles, modern architectural design, and high-quality finishes throughout. Contact our sales team today to inspect.`,
      features: [
        'All Ensuite Bedrooms with Water Heaters',
        'Fitted Contemporary Kitchen with Extractor',
        'Automated Security Gates & Perimeter Wall',
        'Treated Water System & Borehole',
        'Paved Compound with Generous Parking',
        '24/7 Security Patrol & Neighborhood Lighting',
      ],
      titleDocument: newTitleDoc,
      exteriorImages: [
        {
          id: 'ext-' + Math.random().toString(36).substring(2, 9),
          url: exteriorUrl,
          caption: `Front exterior facade in ${newNeighborhood}`,
          isExterior: true,
        },
      ],
      interiorImages: interiorList,
      createdAt: new Date().toISOString(),
      videoTourAvailable: true,
    };

    addProperty(created);
    setActiveTab('inventory');
    // Reset form
    setNewTitle('');
    setNewNeighborhood('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-5xl my-auto overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-[#0B192C] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#C8A25D]/20 text-[#C8A25D]">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display">
                Agent Property Management System
              </h2>
              <p className="text-xs text-slate-300">
                Update asking prices, manage inventory availability, and upload interior photos on the fly
              </p>
            </div>
          </div>

          <button
            onClick={closeAgentPortal}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'inventory'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Live Inventory ({properties.length})
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'create'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Property</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Reset inventory back to initial sample properties?')) {
                resetInventoryToDefault();
              }
            }}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            title="Restore original Nigerian property listings"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-6 flex-1">
          {activeTab === 'inventory' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Manage pricing, room photos, and marketing availability status</span>
                <span>All updates save automatically to browser storage</span>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                {properties.map((prop) => {
                  const isEditing = editingPropertyId === prop.id;
                  const cover = prop.exteriorImages[0]?.url || '/assets/aistudio/1794068151329_65be161e.jpg';
                  return (
                    <div key={prop.id} className="p-4 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      {/* Left: Thumbnail & Info */}
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={cover}
                          alt={prop.title}
                          className="w-16 h-14 rounded-lg object-cover shrink-0 bg-slate-900"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                              {prop.city}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              PK-{prop.id.toUpperCase()}
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                              prop.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {prop.status}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-sm sm:max-w-md">
                            {prop.title}
                          </h4>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{prop.neighborhood}</span>
                            <span>·</span>
                            <span>{prop.interiorImages.length} Interior Photos</span>
                            <span>·</span>
                            <span>{prop.exteriorImages.length} Exterior</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Price & Actions */}
                      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end shrink-0">
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <div>
                              <label className="block text-[10px] text-slate-500">Asking Price (₦)</label>
                              <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(Number(e.target.value))}
                                className="w-32 text-xs px-2 py-1.5 border border-slate-300 rounded font-mono font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-500">Status</label>
                              <select
                                value={editStatus}
                                onChange={(e) => setEditStatus(e.target.value as PropertyStatus)}
                                className="text-xs px-2 py-1.5 border border-slate-300 rounded bg-white"
                              >
                                <option value="Available">Available</option>
                                <option value="Under Offer">Under Offer</option>
                                <option value="Sold">Sold</option>
                                <option value="Rented">Rented</option>
                              </select>
                            </div>
                            <button
                              onClick={() => handleSaveEdit(prop)}
                              className="mt-3.5 p-2 bg-[#0B192C] text-white rounded hover:bg-[#152a42] cursor-pointer"
                              title="Save updates"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingPropertyId(null)}
                              className="mt-3.5 p-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 cursor-pointer"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="text-right">
                              <div className="text-sm font-bold font-display text-[#0B192C]">
                                {formatNaira(prop.askingPrice)}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {prop.purpose === 'Buy' ? 'Outright Purchase' : 'Annual Rent'}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleStartEdit(prop)}
                                className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Update price or status"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete listing "${prop.title}"?`)) {
                                    deleteProperty(prop.id);
                                  }
                                }}
                                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Delete listing"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* CREATE PROPERTY FORM */
            <form onSubmit={handleCreateProperty} className="space-y-6 max-w-3xl mx-auto">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#0B192C] uppercase tracking-wider pb-2 border-b border-slate-200">
                  1. Basic Property Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Listing Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5-Bedroom Detached Duplex with Swimming Pool"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Purpose
                    </label>
                    <select
                      value={newPurpose}
                      onChange={(e) => setNewPurpose(e.target.value as PropertyPurpose)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="Buy">For Sale (Buy)</option>
                      <option value="Rent">For Rent</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Asking Price (₦ Naira) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      step="500000"
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 font-mono font-bold"
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      Preview: {formatNaira(newPrice)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City in Nigeria <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value as NigerianCity)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                      <option value="Port Harcourt">Port Harcourt</option>
                      <option value="Ibadan">Ibadan</option>
                      <option value="Enugu">Enugu</option>
                      <option value="Uyo">Uyo</option>
                      <option value="Owerri">Owerri</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Neighborhood / Area <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lekki Phase 1, Guzape, Bodija"
                      value={newNeighborhood}
                      onChange={(e) => setNewNeighborhood(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Property Type
                    </label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as PropertyType)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 bg-white"
                    >
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

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={newBedrooms}
                      onChange={(e) => setNewBedrooms(Number(e.target.value))}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={newBathrooms}
                      onChange={(e) => setNewBathrooms(Number(e.target.value))}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Parking Spots
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={newParking}
                      onChange={(e) => setNewParking(Number(e.target.value))}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Land Title Document
                  </label>
                  <input
                    type="text"
                    value={newTitleDoc}
                    onChange={(e) => setNewTitleDoc(e.target.value)}
                    placeholder="e.g. Governor's Consent, C of O, Deed of Assignment"
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              {/* Exterior Photo */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <h3 className="text-sm font-bold text-[#0B192C] uppercase tracking-wider">
                  2. Exterior Cover Photograph
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="sm:col-span-2 space-y-2">
                    <label className="block text-xs text-slate-600">
                      Image URL or select one of our curated Nigerian architecture assets:
                    </label>
                    <input
                      type="text"
                      value={exteriorUrl}
                      onChange={(e) => setExteriorUrl(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 font-mono"
                    />
                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer inline-flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload from Computer</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'exterior')}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="aspect-[16/10] rounded-lg overflow-hidden border border-slate-300 bg-slate-900">
                    <img
                      src={exteriorUrl}
                      alt="Exterior preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Interior Photos Gallery */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <h3 className="text-sm font-bold text-[#0B192C] uppercase tracking-wider">
                  3. Dedicated Interior Photography Showcase ({interiorList.length} photos)
                </h3>
                <p className="text-xs text-slate-500">
                  Every property detail page must showcase both exterior and interior photography (Living spaces, Bedrooms, Kitchen, Bathrooms).
                </p>

                {/* Add an interior photo */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs font-semibold text-slate-700">Add an Interior Room Photo:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Photo Image URL"
                      value={newInteriorUrl}
                      onChange={(e) => setNewInteriorUrl(e.target.value)}
                      className="text-xs px-3 py-2 rounded-lg border border-slate-300 font-mono bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Room Label (e.g. Master Bedroom Suite)"
                      value={newInteriorLabel}
                      onChange={(e) => setNewInteriorLabel(e.target.value)}
                      className="text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                    />
                    <select
                      value={newInteriorSpace}
                      onChange={(e) => setNewInteriorSpace(e.target.value as InteriorSpaceType)}
                      className="text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="living">Living Space</option>
                      <option value="bedroom">Bedroom</option>
                      <option value="kitchen">Kitchen</option>
                      <option value="bathroom">Bathroom</option>
                      <option value="additional">Additional / Balcony</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAddInteriorPhoto}
                      className="px-4 py-2 bg-[#0B192C] text-white text-xs font-semibold rounded-lg hover:bg-[#152a42] cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Room Photo to Gallery</span>
                    </button>

                    <label className="px-3 py-2 rounded bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium cursor-pointer inline-flex items-center gap-1.5 border border-slate-200">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Local Room Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'interior')}
                      />
                    </label>
                  </div>
                </div>

                {/* Previews of configured interior photos */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {interiorList.map((img, idx) => (
                    <div
                      key={img.id || idx}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 group bg-slate-900"
                    >
                      <img
                        src={img.url}
                        alt={img.roomLabel}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 p-2 flex flex-col justify-between text-white">
                        <button
                          type="button"
                          onClick={() => setInteriorList((prev) => prev.filter((_, i) => i !== idx))}
                          className="self-end p-1 rounded bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                          title="Remove photo"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                        <span className="text-[10px] font-semibold bg-black/70 px-1.5 py-0.5 rounded truncate">
                          {img.roomLabel}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('inventory')}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#0B192C] text-[#C8A25D] hover:bg-[#152a42] text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm"
                >
                  Publish Property to Live Website
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
