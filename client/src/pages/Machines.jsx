import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ArrowRight, 
  ShoppingCart, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';

export default function Machines() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { settings } = useSettings();

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          api.getProducts(),
          api.getCategories()
        ]);
        if (prodRes.success) setProducts(prodRes.products || []);
        if (catRes.success) setCategories(catRes.categories || []);
      } catch (err) {
        console.error('Error fetching machines:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setSelectedCategory(cat);
    const search = searchParams.get('search') || '';
    setSearchQuery(search);
  }, [searchParams]);

  const handleCategorySelect = (catSlug) => {
    setSelectedCategory(catSlug);
    const newParams = new URLSearchParams(searchParams);
    if (catSlug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catSlug);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('search', val.trim());
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams, { replace: true });
  };

  // Filter machines
  const filteredProducts = products.filter((p) => {
    if (!p || p.isPublished === false) return false;

    const matchesCategory =
      selectedCategory === 'all' ||
      (p.categorySlug || '').toLowerCase() === selectedCategory.toLowerCase() ||
      (p.category || '').toLowerCase() === selectedCategory.toLowerCase();

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name?.toLowerCase().includes(q) ||
      p.shortDescription?.toLowerCase().includes(q) ||
      p.fullDescription?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.categorySlug?.toLowerCase().includes(q) ||
      p.materialGrade?.toLowerCase().includes(q) ||
      (Array.isArray(p.specifications) && p.specifications.some(s => s.value && s.value.toLowerCase().includes(q)));

    return matchesCategory && matchesSearch;
  });

  const whatsappPhone = (settings.whatsappNumber || settings.phone || '918796463055').replace(/\D/g, '');

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-6 md:space-y-8">
      
      {/* Page Header Banner */}
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 relative overflow-hidden shadow-sm">
        <div className="max-w-2xl space-y-2.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3D9B28]/10 text-xs font-bold text-[#3D9B28] font-montserrat">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Certified Food-Grade SS-304 & SS-316</span>
          </div>
          <h1 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Industrial Food Machinery Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Browse our heavy-duty commercial machinery for canning retort sterilization, snacks extrusion, continuous frying, fruit pulping, vegetable drying, and spice grinding.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls Toolbar */}
      <div className="rounded-2xl bg-white border border-slate-200 p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 shadow-sm">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by model, machine type, or SS grade..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-9 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-[#3D9B28] focus:bg-white focus:outline-none transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode & Count */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> of {products.length} machines
          </span>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white text-[#3D9B28] shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white text-[#3D9B28] shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => handleCategorySelect('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all font-montserrat ${
            selectedCategory === 'all'
              ? 'bg-[#3D9B28] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:border-[#3D9B28] hover:text-[#3D9B28]'
          }`}
        >
          All Categories ({products.length})
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.slug.toLowerCase();
          return (
            <button
              key={cat._id || cat.slug}
              onClick={() => handleCategorySelect(cat.slug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all font-montserrat ${
                isSelected
                  ? 'bg-[#3D9B28] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-[#3D9B28] hover:text-[#3D9B28]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Active Search Notification Banner */}
      {searchQuery && (
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#3D9B28] flex-shrink-0" />
            <span>
              Showing results for: <strong className="font-bold text-slate-900">"{searchQuery}"</strong> ({filteredProducts.length} machines found)
            </span>
          </div>
          <button
            onClick={() => handleSearchChange('')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1 flex-shrink-0"
          >
            <span>Clear search</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Machinery Listing */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-[#3D9B28] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 mt-3 font-medium">Loading Raghav Food Machinery models...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 rounded-2xl bg-white border border-slate-200 p-8">
          <p className="text-sm font-semibold text-slate-800">No machines found matching your filter criteria.</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or search terms.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-[#3D9B28] hover:bg-slate-200 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW: 2 per row on mobile, 3 on lg */
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredProducts.map((machine) => (
            <div
              key={machine._id || machine.slug}
              className="rounded-2xl bg-white border border-slate-200 hover:border-[#3D9B28]/50 p-2.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-lg shadow-sm group"
            >
              <div>
                {/* Clean Zoomed-Out Image Container: Plenty of padding, zero text blocking the machine */}
                <div className="relative h-32 sm:h-44 md:h-48 rounded-xl bg-white p-2.5 sm:p-4 flex items-center justify-center mb-2.5 overflow-hidden border border-slate-100">
                  <img
                    src={machine.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
                    alt={machine.name}
                    className="max-h-full max-w-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Subtle top category tag */}
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-slate-50/95 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] font-bold text-slate-700 border border-slate-200 shadow-xs max-w-[100px] truncate">
                    {machine.category}
                  </div>

                  {machine.isFeatured && (
                    <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-[#3D9B28] text-white px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-wider shadow-xs">
                      Featured
                    </div>
                  )}
                </div>

                {/* Machine Name */}
                <Link to={`/product/${machine.slug}`}>
                  <h3 className="font-montserrat font-bold text-xs sm:text-sm text-slate-900 hover:text-[#3D9B28] transition-colors line-clamp-2 leading-snug">
                    {machine.name}
                  </h3>
                </Link>

                {/* Price Display */}
                <div className="mt-1 sm:mt-1.5 flex flex-wrap items-baseline gap-1 sm:gap-1.5">
                  <span className="font-montserrat font-extrabold text-xs sm:text-sm md:text-base text-slate-900">
                    {machine.price ? (typeof machine.price === 'number' ? `₹ ${machine.price.toLocaleString('en-IN')}` : machine.price) : 'Contact for Quote'}
                  </span>
                </div>

                {/* Minimal, Compact Key Details (Compact on mobile so card doesn't cover screen) */}
                <div className="mt-1.5 flex flex-wrap items-center gap-1 text-[9px] sm:text-[10px] text-slate-600">
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded font-medium text-slate-700 truncate max-w-[95px]">
                    {machine.materialGrade ? (machine.materialGrade.length > 10 ? machine.materialGrade.slice(0, 8) + '..' : machine.materialGrade) : 'SS-304'}
                  </span>
                  {machine.capacity && (
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 truncate max-w-[105px]">
                      {machine.capacity.length > 14 ? machine.capacity.slice(0, 12) + '..' : machine.capacity}
                    </span>
                  )}
                </div>

                {/* Extended Short Description - visible only on larger screens to keep mobile clean */}
                <p className="hidden sm:block text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {machine.shortDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 pt-2 sm:pt-3 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/product/${machine.slug}`}
                    className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold transition-colors border border-slate-200"
                  >
                    Specs
                  </Link>
                  <button
                    onClick={() => addToCart(machine)}
                    className="flex-1 bg-[#3D9B28] hover:bg-[#2E7D1E] text-white font-bold py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs transition-all shadow-xs flex items-center justify-center gap-1"
                    title="Add to RFQ"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    <span>+ RFQ</span>
                  </button>
                </div>

                {/* Quick WhatsApp Inquiry - Official vibrant WhatsApp Green styling */}
                <a
                  href={`https://wa.me/${whatsappPhone}?text=Hello%20Raghav%20Food%20Machinery,%20I%20am%20interested%20in%20${encodeURIComponent(machine.name)}.%20Please%20send%20brochure%20and%20quotation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-[10px] sm:text-xs font-bold shadow-xs hover:shadow transition-all"
                >
                  <svg className="w-3.5 h-3.5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="space-y-4">
          {filteredProducts.map((machine) => (
            <div
              key={machine._id || machine.slug}
              className="rounded-2xl bg-white border border-slate-200 hover:border-[#3D9B28]/50 p-4 sm:p-5 flex flex-col md:flex-row items-center gap-5 sm:gap-6 transition-all duration-300 hover:shadow-md shadow-sm"
            >
              {/* Image */}
              <div className="w-full md:w-52 h-40 rounded-xl bg-white p-3 flex-shrink-0 relative flex items-center justify-center overflow-hidden border border-slate-100">
                <img
                  src={machine.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
                  alt={machine.name}
                  className="max-h-full max-w-full object-contain p-1"
                />
                <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 border border-slate-200">
                  {machine.category}
                </span>
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-mono">
                    Capacity: <strong className="text-slate-800">{machine.capacity || 'Standard'}</strong>
                  </span>
                </div>

                <Link to={`/product/${machine.slug}`}>
                  <h3 className="font-montserrat font-bold text-base sm:text-lg text-slate-900 hover:text-[#3D9B28] transition-colors">
                    {machine.name}
                  </h3>
                </Link>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {machine.shortDescription}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                  <span className="bg-slate-50 px-2 py-1 rounded border border-slate-200">Material: <strong className="text-slate-800">{machine.materialGrade || 'SS-304'}</strong></span>
                  <span className="bg-slate-50 px-2 py-1 rounded border border-slate-200">Power: <strong className="text-slate-800">{machine.power || 'Standard'}</strong></span>
                  <span className="font-bold text-[#3D9B28] text-sm">{machine.price || 'Contact for Quote'}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-44 flex-shrink-0">
                <Link
                  to={`/product/${machine.slug}`}
                  className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 rounded-xl text-xs font-semibold border border-slate-200 transition-colors"
                >
                  View Machine Specs
                </Link>
                <button
                  onClick={() => addToCart(machine)}
                  className="w-full bg-[#3D9B28] hover:bg-[#2E7D1E] text-white font-bold py-2 rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>+ Add to RFQ</span>
                </button>
                <a
                  href={`https://wa.me/${whatsappPhone}?text=Hello%20Raghav%20Food%20Machinery,%20I%20am%20interested%20in%20${encodeURIComponent(machine.name)}.%20Please%20send%20brochure%20and%20quotation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-xs hover:shadow transition-all"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
