import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyType, NigerianCity, PropertyPurpose } from '../types/property';
import { formatNaira, formatCompactNaira } from '../utils/formatters';
import {
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  List,
  Search,
  Building2,
  Heart,
  ChevronDown,
  X,
  Filter,
} from 'lucide-react';

export const PropertiesPage: React.FC = () => {
  const {
    filteredProperties,
    filters,
    updateFilterField,
    resetFilters,
    savedPropertyIds,
  } = useProperty();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showOnlySaved, setShowOnlySaved] = useState(false);
  const [mobileFilterDrawerOpen, setMobileFilterDrawerOpen] = useState(false);

  // Property type categories from prompt:
  const propertyCategories: { label: string; value: 'All' | PropertyType }[] = [
    { label: 'All Categories', value: 'All' },
    { label: 'Detached Duplexes', value: 'Detached Duplex' },
    { label: 'Semi-Detached Duplexes', value: 'Semi-Detached Duplex' },
    { label: 'Terraced Houses', value: 'Terraced House' },
    { label: 'Bungalows', value: 'Bungalow' },
    { label: 'Apartments', value: 'Apartment' },
    { label: 'Flats', value: 'Flat' },
    { label: 'Land', value: 'Land' },
    { label: 'Commercial Properties', value: 'Commercial' },
  ];

  const nigerianCities: ('All' | NigerianCity)[] = [
    'All',
    'Lagos',
    'Abuja',
    'Port Harcourt',
    'Ibadan',
    'Enugu',
    'Uyo',
    'Owerri',
  ];

  const displayedListings = showOnlySaved
    ? filteredProperties.filter((p) => savedPropertyIds.includes(p.id))
    : filteredProperties;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title & Breadcrumb Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C8A25D] mb-1">
            PrimeKey Marketplace
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-[#0B192C]">
            Property Collection
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Browse verified residential duplexes, terraces, apartments, land, and investments across Nigeria.
          </p>
        </div>

        {/* View Mode & Shortlist Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowOnlySaved(!showOnlySaved)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border ${
              showOnlySaved
                ? 'bg-[#0B192C] text-[#C8A25D] border-[#0B192C]'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showOnlySaved ? 'fill-[#C8A25D] text-[#C8A25D]' : ''}`} />
            <span>Shortlisted ({savedPropertyIds.length})</span>
          </button>

          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-[#0B192C] shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-[#0B192C] shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setMobileFilterDrawerOpen(true)}
            className="lg:hidden px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-800 flex items-center gap-1.5 border border-slate-200"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* QUICK CITY SWITCHER TABS (Clean Segmented Control) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 shrink-0">
          City:
        </span>
        {nigerianCities.map((city) => {
          const isActive = filters.city === city;
          return (
            <button
              key={city}
              onClick={() => updateFilterField('city', city)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#0B192C] text-[#C8A25D] shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {city === 'All' ? 'All Nigerian Cities' : city}
            </button>
          );
        })}
      </div>

      {/* MAIN LAYOUT: SIDEBAR FILTERS + LISTINGS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-6 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B192C]">
              <SlidersHorizontal className="w-4 h-4 text-[#C8A25D]" />
              <span>Refine Search</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-[11px] text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* 1. Purpose: Buy vs Rent */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Transaction
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg">
              {(['All', 'Buy', 'Rent'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => updateFilterField('purpose', mode)}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    filters.purpose === mode
                      ? 'bg-white text-[#0B192C] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {mode === 'All' ? 'All' : mode === 'Buy' ? 'Buy' : 'Rent'}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Keyword / Neighborhood Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Keyword / Location
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Lekki, Guzape, Bodija..."
                value={filters.neighborhood}
                onChange={(e) => updateFilterField('neighborhood', e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C8A25D]"
              />
            </div>
          </div>

          {/* 3. Property Type Categories */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Property Category
            </label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {propertyCategories.map((cat) => {
                const isSelected = filters.propertyType === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => updateFilterField('propertyType', cat.value)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#0B192C] text-[#C8A25D]'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25D]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Price Range */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Price Range (₦)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-slate-500 block mb-0.5">Min Budget</span>
                <select
                  value={filters.minPrice}
                  onChange={(e) => updateFilterField('minPrice', Number(e.target.value))}
                  className="w-full text-xs px-2 py-2 rounded border border-slate-200 font-mono bg-white"
                >
                  <option value={0}>₦0</option>
                  <option value={20000000}>₦20M</option>
                  <option value={50000000}>₦50M</option>
                  <option value={100000000}>₦100M</option>
                  <option value={150000000}>₦150M</option>
                  <option value={200000000}>₦200M</option>
                </select>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block mb-0.5">Max Budget</span>
                <select
                  value={filters.maxPrice}
                  onChange={(e) => updateFilterField('maxPrice', Number(e.target.value))}
                  className="w-full text-xs px-2 py-2 rounded border border-slate-200 font-mono bg-white"
                >
                  <option value={1000000000}>Unlimited</option>
                  <option value={50000000}>₦50M</option>
                  <option value={90000000}>₦90M</option>
                  <option value={150000000}>₦150M</option>
                  <option value={250000000}>₦250M</option>
                  <option value={350000000}>₦350M</option>
                  <option value={500000000}>₦500M</option>
                </select>
              </div>
            </div>
          </div>

          {/* 5. Bedrooms */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Bedrooms
            </label>
            <div className="grid grid-cols-6 gap-1">
              {(['All', '1', '2', '3', '4', '5+'] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => updateFilterField('bedrooms', b)}
                  className={`py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    filters.bedrooms === b
                      ? 'bg-[#0B192C] text-[#C8A25D]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT: LISTINGS SECTION */}
        <main className="lg:col-span-3 space-y-5">
          {/* Active Summary & Sorting Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 text-xs">
            <div className="text-slate-600 font-medium">
              Showing <strong className="text-slate-900">{displayedListings.length}</strong> verified properties
              {filters.city !== 'All' && <span> in {filters.city}</span>}
              {filters.propertyType !== 'All' && <span> ({filters.propertyType})</span>}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 whitespace-nowrap">Sort by:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilterField('sortBy', e.target.value as any)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-[#C8A25D]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Recently Listed</option>
                <option value="bedrooms-desc">Most Bedrooms</option>
              </select>
            </div>
          </div>

          {/* Listings Container */}
          {displayedListings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">No properties match your filter</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try broadening your price range, selecting another Nigerian city, or clearing active filters.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-[#0B192C] text-[#C8A25D] text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#152a42] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayedListings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {displayedListings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-end">
          <div className="w-full max-w-xs bg-white h-full overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-bold text-sm text-[#0B192C]">Search Filters</span>
              <button
                onClick={() => setMobileFilterDrawerOpen(false)}
                className="p-1 rounded text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">City</label>
                <select
                  value={filters.city}
                  onChange={(e) => updateFilterField('city', e.target.value as any)}
                  className="w-full p-2 border rounded"
                >
                  {nigerianCities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Category</label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => updateFilterField('propertyType', e.target.value as any)}
                  className="w-full p-2 border rounded"
                >
                  {propertyCategories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Purpose</label>
                <select
                  value={filters.purpose}
                  onChange={(e) => updateFilterField('purpose', e.target.value as any)}
                  className="w-full p-2 border rounded"
                >
                  <option value="All">All</option>
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Bedrooms</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => updateFilterField('bedrooms', e.target.value as any)}
                  className="w-full p-2 border rounded"
                >
                  <option value="All">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 text-xs font-semibold rounded bg-slate-100 text-slate-700"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterDrawerOpen(false)}
                className="flex-1 py-2.5 text-xs font-semibold rounded bg-[#0B192C] text-[#C8A25D]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
