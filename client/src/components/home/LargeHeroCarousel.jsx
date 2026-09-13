import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';

export default function LargeHeroCarousel({ featuredProducts = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { addToCart } = useCart();
  const { settings } = useSettings();

  const slides = [
    {
      id: 1,
      name: "Raghav Continuous Band Sealing Machine",
      tagline: "High-Speed Automated Industrial Packaging Line",
      badge: "⭐ Flagship Model 2026",
      model: "RFPM-CBS-900",
      image: "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789208820/raghav-food-processing-machines/raghav-continuous-band-sealer-hero-branded.jpg",
      slug: "raghav-horizontal-continuous-band-sealing-machine",
      price: "₹ 25,000",
      mrp: "₹ 35,000",
      stockStatus: "In Stock / Ready Dispatch",
      shortDesc: "Automated continuous conveyor heat sealing for pouches, laminated foil, and plastic barrier bags with precision digital PID temperature controller.",
      specs: [
        { label: "Sealing Speed", value: "0 - 12 Mtr/Min" },
        { label: "Temperature", value: "PID 0 - 300°C" },
        { label: "Conveyor Load", value: "Up to 5 Kg" },
        { label: "Metallurgy", value: "Food-Grade SS-304" }
      ]
    },
    {
      id: 2,
      name: "Raghav 500L Canning Retort Autoclave Sterilizer",
      tagline: "Commercial High-Pressure Thermal Processing",
      badge: "⚡ Heavy-Duty Certified",
      model: "RFPM-RET-500",
      image: "https://res.cloudinary.com/dmvkcqt1u/image/upload/v1788003361/raghavfood/ctrtkwecbs25xcz6kmin.webp",
      slug: "raghav-commercial-canning-retort-autoclave-sterilizer-machine",
      price: "₹ 195,000",
      mrp: "₹ 220,000",
      stockStatus: "Factory Built / Certified",
      shortDesc: "Commercial high-pressure sterilization autoclave for retort pouches, glass jars, and tin cans to achieve commercial sterility and FSSAI shelf life.",
      specs: [
        { label: "Batch Capacity", value: "500 Liters" },
        { label: "Working Temp", value: "121°C - 134°C" },
        { label: "Design Pressure", value: "30 PSI Hydro Tested" },
        { label: "Construction", value: "SS-304 / SS-316" }
      ]
    },
    {
      id: 3,
      name: "Raghav Tilting Steam Jacketed Mixing Kettle",
      tagline: "Uniform Cooking, Boiling & Agitation with Scraper",
      badge: "🍲 Commercial Food Vessel",
      model: "RFPM-SJK-200",
      image: "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789202430/raghav-food-processing-machines/raghav-mixing-steam-jacket-kettle.jpg",
      slug: "raghav-motorized-mixing-steam-jacketed-kettle",
      price: "₹ 135,000",
      mrp: "₹ 145,000",
      stockStatus: "Ready Commissioning",
      shortDesc: "Double-jacketed cooking pan with motorized Teflon scrapers preventing product sticking for jams, sauces, syrups, and confectionery.",
      specs: [
        { label: "Capacity", value: "200 Liters" },
        { label: "Agitator Blade", value: "Motorized Scraper" },
        { label: "Tilting Range", value: "90° Worm Gear" },
        { label: "Heating", value: "Steam Jacket" }
      ]
    },
    {
      id: 4,
      name: "Raghav Automatic Vertical FFS Pouch Packaging",
      tagline: "Form-Fill-Seal Packaging Automation System",
      badge: "📦 Packaging Automation",
      model: "RFPM-FFS-500",
      image: "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789202428/raghav-food-processing-machines/raghav-ffs-pouch-packing-machine.jpg",
      slug: "raghav-automatic-ffs-pouch-packing-machine",
      price: "₹ 165,000",
      mrp: "₹ 185,000",
      stockStatus: "In Stock / Ready Dispatch",
      shortDesc: "High-speed vertical form-fill-seal unit for powders, spices, granules, and snack food with digital PLC touchscreen automation.",
      specs: [
        { label: "Speed", value: "25 - 60 PPM" },
        { label: "Weight Range", value: "10g - 500g" },
        { label: "Automation", value: "Delta PLC + HMI" },
        { label: "Sealing", value: "Center / 3-Side Seal" }
      ]
    },
    {
      id: 5,
      name: "Raghav Blower Cyclone Spice & Grain Pulverizer",
      tagline: "Continuous Commercial Grinding & Fine Pulverizing",
      badge: "🌾 Heavy Grinding Unit",
      model: "RFPM-BCP-100",
      image: "https://res.cloudinary.com/dmvkcqt1u/image/upload/v1786879815/raghavfood/bzimaafoe0a49biue1s6.webp",
      slug: "raghav-blower-cyclone-pulverizer-machine",
      price: "₹ 145,000",
      mrp: "₹ 165,000",
      stockStatus: "In Stock / Ready Dispatch",
      shortDesc: "Heavy-duty hammer mill with integrated cyclone dust collector, air-cooling blower, and grading sieves for chilli, turmeric, spices, and grains.",
      specs: [
        { label: "Output Capacity", value: "150 - 250 Kg/Hr" },
        { label: "Main Motor", value: "10 HP 3-Phase" },
        { label: "Fineness", value: "60 - 120 Mesh" },
        { label: "Separation", value: "Cyclone Dust Collector" }
      ]
    },
    {
      id: 6,
      name: "Raghav Industrial Screw Type Juice Extractor",
      tagline: "High-Yield Cold-Press Spiral Juicing Machine",
      badge: "🍊 Cold-Press Juicing",
      model: "RFPM-STJ-50",
      image: "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789202425/raghav-food-processing-machines/raghav-screw-type-juicer.png",
      slug: "raghav-screw-type-spiral-juicer-machine",
      price: "₹ 32,000",
      mrp: "₹ 38,000",
      stockStatus: "In Stock / Ready Dispatch",
      shortDesc: "Continuous spiral auger juice press for ginger, amla, apples, tomatoes, citrus, and leafy vegetables with automatic pulp/juice separation.",
      specs: [
        { label: "Capacity", value: "300 - 500 Kg/Hr" },
        { label: "Juice Yield", value: "Up to 85% Recovery" },
        { label: "Auger Spiral", value: "Precision SS-304" },
        { label: "Discharge", value: "Continuous Dry Pomace" }
      ]
    }
  ];

  // Auto-play timer: reduced by 2 seconds (from 5000ms to 3000ms)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const currentSlide = slides[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Mobile Touch Swipe Handlers
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 45;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  const handleAddToCart = (slide) => {
    const matched = featuredProducts.find(p => p.slug === slide.slug) || {
      name: slide.name,
      slug: slide.slug,
      images: [slide.image],
      price: parseInt(slide.price.replace(/\D/g, '')) || 50000
    };
    addToCart(matched);
  };

  return (
    <div className="w-full">
      {/* Large Banner Card Covering the Screen Area */}
      <div 
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 border border-slate-200 shadow-xl min-h-[480px] md:min-h-[520px] lg:min-h-[540px] flex items-center transition-all group select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Subtle Ambient Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3D9B28]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3D9B28]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Carousel Content Container */}
        <div className="w-full p-4 sm:p-6 md:p-10 lg:p-12 relative z-10">
          
          {/* ==============================================================
              MOBILE VIEW (< lg):
              Order: Header -> 1. Image (at top) -> 2. Price -> 3. Details -> Buttons
              No border, no shadow on image for seamless natural blend
              ============================================================== */}
          <div className="block lg:hidden space-y-3.5 animate-fade-in">
            {/* Title & Badges */}
            <div className="space-y-1 text-center">
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <span className="inline-flex items-center gap-1 bg-[#3D9B28]/10 text-[#3D9B28] border border-[#3D9B28]/25 text-[11px] font-montserrat font-bold px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  <span>{currentSlide.badge}</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                  {currentSlide.model}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  {currentSlide.stockStatus}
                </span>
              </div>
              <h2 className="font-montserrat font-black text-lg sm:text-xl text-slate-900 leading-snug pt-0.5">
                {currentSlide.name}
              </h2>
            </div>

            {/* 1. PRODUCT IMAGE AT THE TOP: Completely seamless with NO border, NO shadow */}
            <div className="relative w-full h-52 sm:h-64 flex items-center justify-center bg-transparent">
              <img
                src={currentSlide.image}
                alt={currentSlide.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* 2. BELOW IMAGE: PRICE */}
            <div className="flex items-baseline justify-center gap-2 pt-0.5">
              <span className="text-2xl sm:text-3xl font-montserrat font-black text-slate-900">
                {currentSlide.price}
              </span>
              <span className="text-sm font-semibold text-slate-400 line-through">
                {currentSlide.mrp}
              </span>
              <span className="text-[10px] font-bold text-[#3D9B28] bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
                Factory Price
              </span>
            </div>

            {/* 3. BELOW THAT: SOME DETAILS (4 Key Specs & Short Description) */}
            <div className="grid grid-cols-2 gap-2">
              {currentSlide.specs.map((spec, sIdx) => (
                <div key={sIdx} className="p-2 rounded-xl bg-white/90 border border-slate-200/70 text-center shadow-xs">
                  <span className="text-[9px] text-slate-500 font-medium block uppercase tracking-wider">{spec.label}</span>
                  <strong className="text-xs font-bold text-slate-900 block mt-0.5">{spec.value}</strong>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-600 text-center leading-relaxed line-clamp-2 px-2">
              {currentSlide.shortDesc}
            </p>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <Link
                to={`/product/${currentSlide.slug}`}
                className="w-full btn btn-primary btn-sm flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold font-montserrat"
              >
                <span>View Machine Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAddToCart(currentSlide)}
                  className="btn btn-outline btn-sm flex items-center justify-center gap-1.5 py-2 text-xs font-bold"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>+ Add to RFQ</span>
                </button>

                <a
                  href={`https://wa.me/${(settings.whatsappNumber || '919220706381').replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery,%20I%20want%20to%20inquire%20about%20the%20${encodeURIComponent(currentSlide.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 py-2 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* ==============================================================
              DESKTOP VIEW (>= lg):
              Spacious 2-column layout with seamless image (NO border, NO shadow)
              ============================================================== */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            
            {/* Left Column: Machine Details, Specs & Buttons */}
            <div className="lg:col-span-7 space-y-5 animate-fade-in">
              
              {/* Badge & Model */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 bg-[#3D9B28]/10 text-[#3D9B28] border border-[#3D9B28]/25 text-xs font-montserrat font-bold px-3 py-1 rounded-full shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentSlide.badge}</span>
                </span>
                <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                  Model: {currentSlide.model}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  {currentSlide.stockStatus}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 className="font-montserrat font-black text-3xl lg:text-4xl text-slate-900 leading-tight tracking-tight">
                  {currentSlide.name}
                </h2>
                <p className="font-montserrat font-semibold text-sm text-[#3D9B28] mt-1">
                  {currentSlide.tagline}
                </p>
              </div>

              {/* Short Description */}
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl line-clamp-3">
                {currentSlide.shortDesc}
              </p>

              {/* 4 Highlight Specs Badges */}
              <div className="grid grid-cols-4 gap-2.5 pt-1">
                {currentSlide.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-sm text-center">
                    <span className="text-[10px] text-slate-500 font-medium block uppercase tracking-wider">{spec.label}</span>
                    <strong className="text-sm font-bold text-slate-900 block mt-0.5">{spec.value}</strong>
                  </div>
                ))}
              </div>

              {/* Price & Action Row */}
              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-montserrat font-black text-slate-900">
                    {currentSlide.price}
                  </span>
                  <span className="text-sm font-semibold text-slate-400 line-through">
                    {currentSlide.mrp}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <Link
                    to={`/product/${currentSlide.slug}`}
                    className="btn btn-primary btn-sm flex items-center gap-1.5 font-montserrat font-bold"
                  >
                    <span>View Machine Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleAddToCart(currentSlide)}
                    className="btn btn-outline btn-sm flex items-center gap-1.5 font-montserrat font-bold"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>+ Add to RFQ</span>
                  </button>

                  <a
                    href={`https://wa.me/${(settings.whatsappNumber || '919220706381').replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery,%20I%20want%20to%20inquire%20about%20the%20${encodeURIComponent(currentSlide.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Quote</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Seamless Machine Photography (NO border, NO shadow) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full h-80 md:h-[420px] bg-transparent flex items-center justify-center overflow-hidden group/img">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.name}
                  className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Floating Navigation Controls - neatly positioned */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-3 top-[28%] lg:top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/95 hover:bg-[#3D9B28] hover:text-white text-slate-800 shadow-md border border-slate-200 flex items-center justify-center transition-all z-20"
          aria-label="Previous Machine Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-3 top-[28%] lg:top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/95 hover:bg-[#3D9B28] hover:text-white text-slate-800 shadow-md border border-slate-200 flex items-center justify-center transition-all z-20"
          aria-label="Next Machine Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Slide Navigation Tabs (Clickable Machine Pills) */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentIndex(idx)}
            className={`px-3 py-1.5 rounded-full text-xs font-montserrat font-semibold transition-all flex items-center gap-1.5 ${
              currentIndex === idx
                ? 'bg-[#3D9B28] text-white shadow-md font-bold'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-[#3D9B28] hover:text-[#3D9B28]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${currentIndex === idx ? 'bg-white' : 'bg-slate-300'}`} />
            <span>0{idx + 1} {s.name.replace('Raghav ', '').split(' ').slice(0, 3).join(' ')}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

