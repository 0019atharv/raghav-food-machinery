import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart, 
  MessageSquare, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Sparkles,
  Layers
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';

export default function MachineryCarousel({ machines = [], loading = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const { addToCart } = useCart();
  const { settings } = useSettings();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Filter machines based on selected category tab
  const filteredMachines = selectedCategory === 'all' 
    ? machines 
    : machines.filter(m => m.categorySlug === selectedCategory || (m.category && m.category.toLowerCase().includes(selectedCategory.toLowerCase())));

  // Responsive cards per view: 3 on desktop, 2 on tablet, 1 on mobile
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(filteredMachines.length / cardsPerView));

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Auto-play timer (4.5s) with pause on hover
  useEffect(() => {
    if (isPaused || totalPages <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, totalPages]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev();
    }
  };

  const categories = [
    { id: 'all', label: 'All Machinery Fleet' },
    { id: 'packaging-sealing', label: 'Packaging & Sealing' },
    { id: 'commercial-kettles-cooking', label: 'Kettles & Cooking' },
    { id: 'spices-grain-pulverizers', label: 'Spices & Pulverizers' },
    { id: 'vegetable-fruit-processing', label: 'Juicing & Processing' }
  ];

  const currentSlice = filteredMachines.slice(
    currentIndex * cardsPerView,
    currentIndex * cardsPerView + cardsPerView
  );

  return (
    <section 
      className="relative max-w-7xl mx-auto px-4 md:px-8 py-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold font-mono text-amber-600 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Interactive Dealer Machinery Fleet</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Complete Industrial Food Equipment
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
            Engineered with certified Food-Grade SS-304/316 metallurgy. Click or swipe through our machinery models with real technical telemetry, live stock availability, and commercial RFQ pricing.
          </p>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center gap-3 self-start md:self-end">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-xl bg-white border border-slate-200 hover:border-amber-500 hover:bg-amber-50 text-slate-700 hover:text-amber-600 transition-all shadow-sm flex items-center justify-center active:scale-95"
            aria-label="Previous machines"
            title="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono font-bold text-slate-500">
            {currentIndex + 1} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-xl bg-white border border-slate-200 hover:border-amber-500 hover:bg-amber-50 text-slate-700 hover:text-amber-600 transition-all shadow-sm flex items-center justify-center active:scale-95"
            aria-label="Next machines"
            title="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm font-bold'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Carousel Cards Grid */}
      <div 
        className="relative overflow-hidden min-h-[480px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {filteredMachines.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-200 text-center">
            <Cpu className="w-12 h-12 text-slate-400 mb-3" />
            <p className="text-slate-600 text-sm">No machines found under this category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
            {currentSlice.map((machine) => (
              <div
                key={machine._id || machine.slug}
                className="rounded-3xl bg-white border border-slate-200 hover:border-amber-500/50 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl group"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-2 mb-4 flex items-center justify-center">
                    <img
                      src={machine.images?.[0] || '/raghav-emblem-transparent.png'}
                      alt={machine.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      <span className="bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-bold text-slate-800 border border-slate-200 shadow-sm">
                        {machine.category || 'Food Processing'}
                      </span>
                    </div>

                    {machine.price && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-lg shadow-sm">
                        {machine.price}
                      </div>
                    )}

                    {/* Bottom Raghav Certified Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-200 text-[10px] text-slate-700 font-mono shadow-sm">
                      <img src="/raghav-emblem-transparent.png" alt="" className="w-3.5 h-3.5 object-contain" />
                      <span className="font-bold text-amber-600">RFPM Certified</span>
                    </div>

                    {machine.capacity && (
                      <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                        {machine.capacity}
                      </div>
                    )}
                  </div>

                  {/* Title & Short Description */}
                  <Link to={`/product/${machine.slug}`}>
                    <h3 className="font-display font-bold text-base text-slate-900 hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                      {machine.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {machine.shortDescription || machine.fullDescription}
                  </p>

                  {/* Quick Specs Strip */}
                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="text-slate-500 text-[10px] block">Metallurgy</span>
                      <strong className="text-slate-800 font-medium">{machine.materialGrade || 'SS-304'}</strong>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="text-slate-500 text-[10px] block">Motor / Power</span>
                      <strong className="text-slate-800 font-medium">{machine.power || 'Custom Motor'}</strong>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-5 pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/product/${machine.slug}`}
                      className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 rounded-xl text-xs transition-colors border border-slate-200"
                    >
                      View Specs
                    </Link>

                    <button
                      onClick={() => addToCart(machine)}
                      className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
                      title="Add machine to RFQ quotation basket"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>+ RFQ Quote</span>
                    </button>
                  </div>

                  <a
                    href={`https://wa.me/${(settings.whatsappNumber || settings.phone || '919220706381').replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery,%20I%20want%20quotation%20and%20dealer%20pricing%20for%20${encodeURIComponent(machine.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 py-1.5 rounded-lg border border-emerald-200/80 transition-colors"
                  >
                    <MessageSquare className="w-3 h-3 text-emerald-600" />
                    <span>WhatsApp Technical Desk</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slide Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx
                  ? 'w-8 bg-amber-500'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

