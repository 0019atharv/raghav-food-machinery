import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ArrowRight, 
  MessageSquare, 
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
  }, [searchParams]);

  const handleCategorySelect = (catSlug) => {
    setSelectedCategory(catSlug);
    if (catSlug === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catSlug });
    }
  };

  // Filter machines
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (p.categorySlug || '').toLowerCase() === selectedCategory.toLowerCase() ||
      (p.category || '').toLowerCase() === selectedCategory.toLowerCase();

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(q) ||
      (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.materialGrade && p.materialGrade.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-8">
      
      {/* Page Header Banner */}
      <div className="rounded-3xl bg-industrial-900/80 border border-industrial-800 p-8 md:p-12 relative overflow-hidden">
        {/* Background Watermark Emblem */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 opacity-[0.04] pointer-events-none select-none">
          <img src="/raghav-emblem-transparent.png" alt="" className="w-full h-full object-contain" />
        </div>

        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-brand">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Certified Food-Grade SS-304 & SS-316</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Industrial Food Machinery Catalog
          </h1>
          <p className="text-xs sm:text-sm text-industrial-300 leading-relaxed">
            Browse our heavy-duty commercial machinery for canning retort sterilization, snacks extrusion, continuous frying, fruit pulping, vegetable drying, and spice grinding.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls Toolbar */}
      <div className="rounded-2xl bg-industrial-900/90 border border-industrial-800 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-industrial-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by model, machine type, or SS grade..."
            className="w-full bg-industrial-950 border border-industrial-800 rounded-xl pl-10 pr-9 py-2 text-xs text-white placeholder-industrial-500 focus:border-amber-brand focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-industrial-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode & Count */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <span className="text-xs text-industrial-400">
            Showing <strong className="text-white">{filteredProducts.length}</strong> of {products.length} machines
          </span>

          <div className="flex items-center gap-1 bg-industrial-950 p-1 rounded-xl border border-industrial-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-industrial-800 text-amber-brand' : 'text-industrial-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-industrial-800 text-amber-brand' : 'text-industrial-400 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => handleCategorySelect('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-amber-brand text-industrial-950 shadow-glow-amber'
              : 'bg-industrial-900 border border-industrial-800 text-industrial-300 hover:text-white hover:bg-industrial-850'
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
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-amber-brand text-industrial-950 shadow-glow-amber'
                  : 'bg-industrial-900 border border-industrial-800 text-industrial-300 hover:text-white hover:bg-industrial-850'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Machinery Listing */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-amber-brand border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-industrial-400 mt-3">Loading Raghav Food Machinery models...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 rounded-3xl bg-industrial-900/50 border border-industrial-800">
          <p className="text-sm font-semibold text-white">No machines found matching your filter criteria.</p>
          <p className="text-xs text-industrial-400 mt-1">Try resetting the category filter or search terms.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 rounded-xl bg-industrial-800 text-xs font-semibold text-amber-brand hover:bg-industrial-700"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((machine) => (
            <div
              key={machine._id || machine.slug}
              className="rounded-3xl bg-industrial-900/90 border border-industrial-800 hover:border-amber-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-card-dark group"
            >
              <div>
                <div className="relative h-56 rounded-2xl overflow-hidden bg-industrial-950 mb-4">
                  <img
                    src={machine.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
                    alt={machine.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-industrial-950/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-brand border border-industrial-800">
                    {machine.category}
                  </div>
                  {machine.isFeatured && (
                    <div className="absolute top-3 right-3 bg-amber-500/90 text-industrial-950 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-industrial-950/90 px-2 py-0.5 rounded text-[11px] font-mono text-industrial-300">
                    {machine.capacity}
                  </div>
                  {/* Subtle Raghav watermark stamp */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-industrial-950/80 backdrop-blur-sm px-1.5 py-0.5 rounded border border-industrial-800/80 text-[9px] text-industrial-300 font-mono">
                    <img src="/raghav-emblem-transparent.png" alt="" className="w-3.5 h-3.5 object-contain" />
                    <span className="text-amber-brand font-semibold">RFPM</span>
                  </div>
                </div>

                <Link to={`/product/${machine.slug}`}>
                  <h3 className="font-display font-bold text-base text-white hover:text-amber-brand transition-colors line-clamp-2">
                    {machine.name}
                  </h3>
                </Link>

                <p className="text-xs text-industrial-400 mt-2 line-clamp-2 leading-relaxed">
                  {machine.shortDescription}
                </p>

                {/* Specs preview */}
                <div className="mt-4 pt-3 border-t border-industrial-800/80 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-industrial-500 block">Material</span>
                    <strong className="text-industrial-200">{machine.materialGrade || 'SS-304'}</strong>
                  </div>
                  <div>
                    <span className="text-industrial-500 block">Motor Power</span>
                    <strong className="text-industrial-200">{machine.power || 'Standard'}</strong>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-3 border-t border-industrial-800 space-y-2">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/product/${machine.slug}`}
                    className="flex-1 text-center bg-industrial-800 hover:bg-industrial-700 text-white py-2.5 rounded-xl text-xs font-semibold transition-colors border border-industrial-700"
                  >
                    View Specs
                  </Link>
                  <button
                    onClick={() => addToCart(machine)}
                    className="flex-1 bg-amber-brand hover:bg-amber-400 text-industrial-950 font-bold py-2.5 rounded-xl text-xs transition-all shadow-glow-amber"
                  >
                    + Add to RFQ
                  </button>
                </div>

                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery,%20I%20am%20interested%20in%20${encodeURIComponent(machine.name)}.%20Please%20send%20brochure%20and%20quotation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-800/40 text-emerald-400 text-xs font-medium transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-emerald-500/20" />
                  <span>Quick WhatsApp Inquire</span>
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
              className="rounded-3xl bg-industrial-900/90 border border-industrial-800 hover:border-amber-500/40 p-5 flex flex-col md:flex-row items-center gap-6 transition-all duration-300 hover:-translate-y-0.5 shadow-card-dark"
            >
              <div className="w-full md:w-56 h-44 rounded-2xl overflow-hidden bg-industrial-950 flex-shrink-0 relative">
                <img
                  src={machine.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
                  alt={machine.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-industrial-950/80 backdrop-blur-sm px-1.5 py-0.5 rounded border border-industrial-800/80 text-[9px] text-industrial-300 font-mono">
                  <img src="/raghav-emblem-transparent.png" alt="" className="w-3 h-3 object-contain" />
                  <span className="text-amber-brand font-semibold">RFPM</span>
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-industrial-950 px-2 py-0.5 rounded text-[10px] font-bold text-amber-brand border border-industrial-800">
                    {machine.category}
                  </span>
                  <span className="text-[11px] text-industrial-400 font-mono">
                    Capacity: <strong>{machine.capacity}</strong>
                  </span>
                </div>

                <Link to={`/product/${machine.slug}`}>
                  <h3 className="font-display font-bold text-lg text-white hover:text-amber-brand transition-colors">
                    {machine.name}
                  </h3>
                </Link>

                <p className="text-xs text-industrial-400 line-clamp-2 leading-relaxed">
                  {machine.shortDescription}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-industrial-300 pt-1">
                  <span>Material: <strong className="text-white">{machine.materialGrade || 'SS-304'}</strong></span>
                  <span>Power: <strong className="text-white">{machine.power || 'Standard'}</strong></span>
                  <span>Price: <strong className="text-amber-brand">{machine.price}</strong></span>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-44 flex-shrink-0">
                <Link
                  to={`/product/${machine.slug}`}
                  className="w-full text-center bg-industrial-800 hover:bg-industrial-700 text-white py-2 rounded-xl text-xs font-semibold border border-industrial-700"
                >
                  View Machine Specs
                </Link>
                <button
                  onClick={() => addToCart(machine)}
                  className="w-full bg-amber-brand hover:bg-amber-400 text-industrial-950 font-bold py-2 rounded-xl text-xs transition-all shadow-glow-amber"
                >
                  + Add to RFQ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

