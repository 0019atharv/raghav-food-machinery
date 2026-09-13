import React, { useState, useEffect, useMemo } from 'react';
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

// Default authentic fallback slides (used while products load or as fallback)
const defaultFallbackSlides = [
  {
    id: "raghav-can-seamer",
    name: "Raghav Can Seamer Machine (Semi-Automatic Double Seamer)",
    tagline: "Heavy-Duty Tabletop Electric Double Can Seamer",
    badge: "⭐ Flagship Seamer",
    model: "RFPM-SEAM-01",
    image: "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789296405/raghav-food-processing-machines/raghav-can-seamer.jpg",
    slug: "raghav-can-seamer",
    price: "₹ 60,000",
    mrp: "₹ 75,000",
    stockStatus: "In Stock / Ready Dispatch",
    shortDesc: "Commercial tabletop Semi-Automatic Electric Can Seamer Machine for tin, aluminum, and composite food/beverage cans with airtight hermetic double seaming.",
    specs: [
      { label: "Sealing Speed", value: "15 - 25 Cans/Min" },
      { label: "Motor", value: "0.5 HP Single Phase" },
      { label: "Can Diameter", value: "39 - 150 mm" },
      { label: "Rollers", value: "Hardened Alloy Steel" }
    ]
  },
  {
    id: "raghav-band-sealer-machine",
    name: "Raghav Horizontal Continuous Band Sealer Machine",
    tagline: "Automated Conveyor-Driven Continuous Pouch Sealer",
    badge: "⭐ Digital PID Controlled",
    model: "RFPM-SEAL-02",
    image: "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789296405/raghav-food-processing-machines/raghav-band-sealer-machine.jpg",
    slug: "raghav-band-sealer-machine",
    price: "₹ 25,000",
    mrp: "₹ 32,000",
    stockStatus: "In Stock / Ready Dispatch",
    shortDesc: "Continuous heat band sealer with digital PID temperature regulation, brass heating blocks, and embossing date coding wheel for snacks, spices, and pulses.",
    specs: [
      { label: "Conveyor Speed", value: "0 - 12 Mtr/Min" },
      { label: "Sealing Width", value: "8 - 12 mm Knurled" },
      { label: "Temp Range", value: "0 - 300°C PID" },
      { label: "Construction", value: "Food-Grade SS-304" }
    ]
  },
  {
    id: "raghav-mixing-steam-jacket-kettle",
    name: "Raghav Motorized Tilting Steam Jacketed Mixing Kettle",
    tagline: "Uniform Cooking & Blending with Wall Scraper Agitator",
    badge: "🍲 Commercial Cooking Vessel",
    model: "RFPM-KET-03",
    image: "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789296406/raghav-food-processing-machines/raghav-mixing-steam-jacket-kettle.jpg",
    slug: "raghav-mixing-steam-jacket-kettle",
    price: "₹ 1,35,000",
    mrp: "₹ 1,65,000",
    stockStatus: "In Stock / Ready Dispatch",
    shortDesc: "Industrial steam-jacketed cooking kettle with top motorized agitator, Teflon wall scrapers, and worm-gear tilting handwheel for scorch-free cooking.",
    specs: [
      { label: "Batch Capacity", value: "100 - 300 Liters" },
      { label: "Agitator Drive", value: "1.5 HP Geared Motor" },
      { label: "Scraper Blades", value: "Food-Grade PTFE" },
      { label: "Tilting", value: "90° Worm Gear Handwheel" }
    ]
  },
  {
    id: "raghav-double-burner-bhatti",
    name: "Raghav Heavy-Duty SS Double Burner Bhatti",
    tagline: "Commercial High-Calorie Gas Range for Food Factories & Banquets",
    badge: "🔥 High-BTU Gas Range",
    model: "RFPM-BHA-04",
    image: "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789296407/raghav-food-processing-machines/raghav-double-burner-bhatti.jpg",
    slug: "raghav-double-burner-bhatti",
    price: "₹ 22,500",
    mrp: "₹ 28,000",
    stockStatus: "In Stock / Ready Dispatch",
    shortDesc: "Commercial stainless steel double burner bhatti with heavy cast-iron pan trivets, pilot burners, and slide-out grease trays for heavy-duty cooking.",
    specs: [
      { label: "Burner Count", value: "2 x High-Calorie Cast Iron" },
      { label: "Gas Source", value: "Commercial LPG / PNG" },
      { label: "Top Sheet", value: "16-Gauge SS-304" },
      { label: "Pot Fit", value: "Up to 100L Degchis" }
    ]
  },
  {
    id: "raghav-hydraulic-juice-press",
    name: "Raghav Heavy-Duty Hydraulic Cold Juice Press",
    tagline: "High-Tonnage Cold Extraction with SS-304 Basin",
    badge: "🍊 Cold-Press Juicing",
    model: "RFPM-JUC-05",
    image: "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789295915/raghav-food-processing-machines/raghav-hydraulic-juice-press.jpg",
    slug: "raghav-hydraulic-juice-press",
    price: "₹ 1,75,000",
    mrp: "₹ 2,10,000",
    stockStatus: "In Stock / Ready Dispatch",
    shortDesc: "High-yield commercial hydraulic cold press delivering 20 to 30 tons of pressing force for juice extraction without thermal oxidation.",
    specs: [
      { label: "Pressure Force", value: "20 - 30 Tons Hydraulic" },
      { label: "Power Pack", value: "3 HP Heavy Gear Pump" },
      { label: "Capacity", value: "50 - 150 Kg/Batch" },
      { label: "Contact Parts", value: "Food-Grade SS-304" }
    ]
  },
  {
    id: "raghav-12-tray-stainless-steel-dryer",
    name: "Raghav 12-Tray Industrial Stainless Steel Dehydrator Dryer",
    tagline: "Precision Controlled Hot Air Dehydration System",
    badge: "🌿 Industrial Dehydrator",
    model: "RFPM-DRY-06",
    image: "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789295914/raghav-food-processing-machines/raghav-12-tray-stainless-steel-dryer.jpg",
    slug: "raghav-12-tray-stainless-steel-dryer",
    price: "₹ 1,45,000",
    mrp: "₹ 1,75,000",
    stockStatus: "In Stock / Ready Dispatch",
    shortDesc: "12-tray commercial food dehydrator with digital PID thermostat and forced-air convection for herbs, fruits, vegetables, spices, and pet treats.",
    specs: [
      { label: "Tray Capacity", value: "12 SS-304 Mesh Trays" },
      { label: "Batch Load", value: "30 - 60 Kg / Batch" },
      { label: "Heater Power", value: "4.5 kW Digital PID" },
      { label: "Air Circulation", value: "Forced Convection Blower" }
    ]
  }
];

export default function LargeHeroCarousel({ featuredProducts = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { addToCart } = useCart();
  const { settings } = useSettings();

  // Dynamically map real products to slides whenever products change
  const slides = useMemo(() => {
    if (!Array.isArray(featuredProducts) || featuredProducts.length === 0) {
      return defaultFallbackSlides;
    }

    const candidateProducts = featuredProducts.filter(p => p && p.isPublished !== false);
    if (candidateProducts.length === 0) return defaultFallbackSlides;

    const featuredOnly = candidateProducts.filter(p => p.isFeatured === true);
    // Prioritize featured products, or pick first 6-8 products
    const selectedList = featuredOnly.length >= 3 
      ? featuredOnly.slice(0, 8) 
      : candidateProducts.slice(0, 8);

    return selectedList.map((p, idx) => {
      const firstImage = (Array.isArray(p.images) && p.images.length > 0)
        ? p.images[0]
        : (p.image || `/images/products/${p.slug}.jpg`);

      // Extract up to 4 meaningful specifications
      const specs = [];
      if (Array.isArray(p.specifications) && p.specifications.length > 0) {
        for (const s of p.specifications) {
          if (specs.length >= 4) break;
          if (s && s.label && s.value) {
            specs.push({ label: s.label, value: s.value });
          }
        }
      }
      if (specs.length < 4 && p.capacity) specs.push({ label: 'Capacity', value: p.capacity });
      if (specs.length < 4 && p.power) specs.push({ label: 'Power / Motor', value: p.power });
      if (specs.length < 4 && p.materialGrade) specs.push({ label: 'Material', value: p.materialGrade });
      if (specs.length < 4 && p.automationGrade) specs.push({ label: 'Automation', value: p.automationGrade });
      if (specs.length < 4 && p.voltage) specs.push({ label: 'Voltage', value: p.voltage });

      const rawPriceStr = String(p.price || '');
      const numPrice = parseInt(rawPriceStr.replace(/\D/g, ''), 10);
      const formattedPrice = rawPriceStr ? (rawPriceStr.startsWith('₹') ? rawPriceStr : `₹ ${rawPriceStr}`) : 'Price on Request';
      const estimatedMrp = numPrice && !isNaN(numPrice)
        ? `₹ ${(Math.round((numPrice * 1.25) / 500) * 500).toLocaleString('en-IN')}`
        : '';

      const modelSpec = p.specifications?.find(s => s.label?.toLowerCase().includes('model'));
      const modelCode = modelSpec?.value || `RFPM-${(p.categorySlug || 'IND').replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase()}-${String(idx + 1).padStart(2, '0')}`;

      return {
        id: p._id || p.slug || idx,
        name: p.name,
        tagline: p.shortDescription || p.category || "High-Yield Food Processing Equipment",
        badge: p.isFeatured ? "⭐ Featured Machine" : (p.category || "Industrial Standard"),
        model: modelCode,
        image: firstImage,
        slug: p.slug,
        price: formattedPrice,
        mrp: estimatedMrp,
        stockStatus: "In Stock / Ready Dispatch",
        shortDesc: p.shortDescription || (p.fullDescription ? p.fullDescription.slice(0, 160) + '...' : ''),
        specs: specs.length > 0 ? specs : [
          { label: "Material", value: "Food-Grade SS-304" },
          { label: "Warranty", value: "1 Year Commercial" },
          { label: "Support", value: "PAN India Service" },
          { label: "Standard", value: "CE / ISO 9001" }
        ],
        rawProduct: p
      };
    });
  }, [featuredProducts]);

  // Keep index within range
  useEffect(() => {
    if (currentIndex >= slides.length) {
      setCurrentIndex(0);
    }
  }, [slides.length, currentIndex]);

  // Auto-play timer: 3.5 seconds
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const currentSlide = slides[currentIndex] || slides[0] || defaultFallbackSlides[0];

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
    const matched = slide.rawProduct || featuredProducts.find(p => p.slug === slide.slug) || {
      name: slide.name,
      slug: slide.slug,
      images: [slide.image],
      price: parseInt(String(slide.price).replace(/\D/g, ''), 10) || 50000
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

