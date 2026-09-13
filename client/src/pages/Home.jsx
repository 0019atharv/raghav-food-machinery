import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Wrench, 
  Cpu, 
  Layers, 
  Flame, 
  Wheat, 
  PackageCheck, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  Sparkles, 
  ChevronRight, 
  Star, 
  Factory, 
  Cog, 
  ShoppingCart, 
  Award,
  Play,
  Film,
  X
} from 'lucide-react';
import { api, defaultMachineryVideos } from '../services/api';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import LargeHeroCarousel from '../components/home/LargeHeroCarousel';

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [videos, setVideos] = useState(defaultMachineryVideos);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { settings } = useSettings();

  useEffect(() => {
    document.title = 'Raghav Food Processing Machines | Food Processing & Packaging Machinery Manufacturer';
    async function loadHomeData() {
      try {
        setLoading(true);
        const [prodRes, catRes, testRes, vidRes] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
          api.getTestimonials(),
          api.getVideos()
        ]);
        if (prodRes.success) {
          const published = (prodRes.products || []).filter(p => p && p.isPublished !== false);
          setAllProducts(published);
        }
        if (catRes.success) setCategories(catRes.categories || []);
        if (testRes.success) setTestimonials(testRes.testimonials || []);
        if (vidRes && vidRes.success && Array.isArray(vidRes.videos) && vidRes.videos.length > 0) {
          setVideos(vidRes.videos.filter(v => v.isPublished !== false));
        }
      } catch (err) {
        console.error('Failed to load home data', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  // Filter products by selected category
  const filteredProducts = allProducts.filter((p) => {
    if (selectedCategory === 'all') return true;
    const cat = (p.category || '').toLowerCase();
    const catSlug = (p.categorySlug || '').toLowerCase();
    const target = selectedCategory.toLowerCase();
    return cat.includes(target) || catSlug.includes(target);
  });

  // Reference category filter tabs
  const filterTabs = [
    { id: 'all', label: 'All Machines' },
    { id: 'pack', label: 'Packaging & Sealing' },
    { id: 'kettle', label: 'Commercial Kettles & Cooking' },
    { id: 'pulver', label: 'Spices & Pulverizers' },
    { id: 'juice', label: 'Juicers & Processing' },
    { id: 'retort', label: 'Canning & Retorts' }
  ];

  return (
    <div className="bg-white text-slate-800 space-y-16 pb-20">
      
      {/* =====================================================================
          1. LARGE MACHINERY SHOWCASE CAROUSEL (Covers the large hero area)
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-6 sm:pt-8">
        <LargeHeroCarousel featuredProducts={allProducts} />
      </section>

      {/* =====================================================================
          2. CORE INTRO TEXT SECTION ("THEN TEXT" - Matching raghavfoodmachines.com)
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Intro */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D9B28]/10 text-[#3D9B28] text-xs font-montserrat font-bold">
              ⚙️ Industrial Food Machinery Manufacturer
            </div>
            
            <h1 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight">
              RAGHAV <span className="text-[#3D9B28]">FOOD PROCESSING</span> MACHINES
            </h1>
            
            <h2 className="font-montserrat font-bold text-lg sm:text-xl text-slate-700 -mt-1">
              Food Processing &amp; Packaging Machinery Manufacturer | Delhi, India
            </h2>
            
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              Manufacturers of <strong>industrial fruit pulpers, tomato juicers, canning retort autoclaves, can seamers, continuous band sealers, motorized steam jacketed kettles, commercial pulverizers</strong>, and complete food processing machinery plants across <strong>PAN India &amp; Global Exports</strong>. Built with food-grade SS-304/SS-316 stainless steel with ISO 9001:2015 and CE certification.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/machines" className="btn btn-primary">
                ⚙️ Explore Machines
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Get a Quote →
              </Link>
              <a
                href={`https://wa.me/${(settings.whatsappNumber || '919220706381').replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery,%20I%20want%20to%20request%20an%20instant%20quote.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#1EBE5B] text-white text-sm font-montserrat font-bold shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>

          {/* Right Floating Quick Contact Card */}
          <div className="lg:col-span-4">
            <div className="p-6 sm:p-7 rounded-2xl bg-white text-slate-800 space-y-4 shadow-lg border-2 border-[#3D9B28]/25 relative overflow-hidden">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#3D9B28] flex items-center justify-center text-white flex-shrink-0 shadow-md">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-montserrat font-bold uppercase tracking-wider">Call Us Now</div>
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-lg font-mono font-bold text-slate-900 hover:text-[#3D9B28] transition-colors">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-2.5 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3D9B28] flex-shrink-0" />
                  <span>Food-Grade SS-304 & SS-316 Alloys</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3D9B28] flex-shrink-0" />
                  <span>ISO 9001:2015 & CE Quality Tested</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3D9B28] flex-shrink-0" />
                  <span>PAN India Delivery & On-Site Installation</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          3. STATS BAR (Identical Green Color & Size)
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-[#e2e8f0] shadow-sm">
          <div className="text-center p-2">
            <div className="font-montserrat font-black text-3xl sm:text-4xl text-[#3D9B28]">50+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Machine Types</div>
          </div>
          <div className="text-center p-2 border-l border-slate-200">
            <div className="font-montserrat font-black text-3xl sm:text-4xl text-[#3D9B28]">SS-304</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Food-Grade Build</div>
          </div>
          <div className="text-center p-2 border-l border-slate-200">
            <div className="font-montserrat font-black text-3xl sm:text-4xl text-[#3D9B28]">PAN India</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Delivery & Install</div>
          </div>
          <div className="text-center p-2 border-l border-slate-200">
            <div className="font-montserrat font-black text-3xl sm:text-4xl text-[#3D9B28]">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Quality Tested</div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. LIFTED UP: OUR MACHINES (2-by-2 on mobile, zoomed-out uncropped photos)
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-slate-900">
            Our <span className="text-[#3D9B28]">Machines</span>
          </h2>
          <div className="title-line"></div>
          <p className="text-sm text-slate-500 mt-2">
            Premium food processing machinery — fruit pulpers, juicers, pulverizers, kettles and more for every production need.
          </p>
        </div>

        {/* Filter Tabs matching reference site */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-montserrat font-bold transition-all ${
                selectedCategory === tab.id
                  ? 'bg-[#3D9B28] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-[#e2e8f0] hover:border-[#3D9B28] hover:text-[#3D9B28]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Machinery Cards Grid: Exactly 2 products per row on mobile (grid-cols-2) */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.slice(0, 12).map((machine) => (
            <div
              key={machine._id || machine.slug}
              className="bg-white border border-slate-200 hover:border-[#3D9B28]/60 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                {/* Image Container with seamless integration - Zoomed out uncropped photos */}
                <div className="relative h-32 sm:h-48 md:h-52 rounded-xl bg-slate-50/50 p-2.5 sm:p-4 mb-2 sm:mb-2.5 flex items-center justify-center overflow-hidden border border-slate-100/60">
                  <img
                    src={machine.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
                    alt={machine.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 text-[8px] sm:text-[10px] font-bold text-slate-700 bg-white/95 border border-slate-200 px-1.5 sm:px-2 py-0.5 rounded shadow-xs max-w-[90px] truncate">
                    {machine.category || 'Machine'}
                  </span>
                </div>

                {/* Machine Name */}
                <Link to={`/product/${machine.slug}`}>
                  <h3 className="font-montserrat font-bold text-xs sm:text-sm md:text-base text-slate-900 group-hover:text-[#3D9B28] transition-colors line-clamp-2 leading-snug">
                    {machine.name}
                  </h3>
                </Link>

                {/* Price Display */}
                <div className="mt-1 sm:mt-1.5 flex flex-wrap items-baseline gap-1 sm:gap-1.5">
                  <span className="font-montserrat font-extrabold text-xs sm:text-base md:text-lg text-slate-900">
                    {machine.price ? (typeof machine.price === 'number' ? `₹ ${machine.price.toLocaleString('en-IN')}` : machine.price) : '₹ 25,000'}
                  </span>
                </div>

                {/* Minimal mobile chips (material/capacity) */}
                <div className="mt-1 flex items-center gap-1 text-[9px] text-slate-600 sm:hidden">
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded truncate max-w-[90px]">
                    {machine.materialGrade ? (machine.materialGrade.length > 10 ? machine.materialGrade.slice(0, 8) + '..' : machine.materialGrade) : 'SS-304'}
                  </span>
                  {machine.capacity && (
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded truncate max-w-[90px]">
                      {machine.capacity.length > 12 ? machine.capacity.slice(0, 10) + '..' : machine.capacity}
                    </span>
                  )}
                </div>

                {/* Short Excerpt - hidden on mobile to avoid covering screen */}
                <p className="hidden sm:block text-[11px] sm:text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {machine.shortDescription || 'Commercial food processing machinery engineered with food-grade stainless steel.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/product/${machine.slug}`}
                    className="flex-1 text-center py-1.5 sm:py-2 px-2 rounded-lg bg-[#3D9B28] hover:bg-[#2E7D1E] text-white text-[10px] sm:text-xs font-bold font-montserrat shadow-xs transition-all flex items-center justify-center gap-1"
                  >
                    <span>View Details</span>
                    <span>&rarr;</span>
                  </Link>
                  <button
                    onClick={() => addToCart(machine)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 hover:bg-[#3D9B28] hover:text-white text-slate-700 flex items-center justify-center transition-colors border border-slate-200 flex-shrink-0"
                    title="Add to RFQ"
                    aria-label="Add to RFQ"
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>

                {/* WhatsApp button with official WhatsApp brand color */}
                <a
                  href={`https://wa.me/${(settings.whatsappNumber || '918796463055').replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery,%20I%20am%20interested%20in%20${encodeURIComponent(machine.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-[10px] sm:text-xs font-bold shadow-xs hover:shadow transition-all"
                >
                  <svg className="w-3.5 h-3.5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* View All Machines Button */}
        <div className="text-center mt-8 sm:mt-10">
          <Link to="/machines" className="btn btn-outline">
            View All Machines →
          </Link>
        </div>
      </section>

      {/* =====================================================================
          5. MANUFACTURING STANDARDS & QUALITY INSPECTION
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-montserrat font-bold text-[#3D9B28] uppercase tracking-wider mb-2">
            Engineering Precision
          </div>
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900">
            Built for 24/7 Heavy-Duty Industrial Reliability
          </h2>
          <div className="title-line"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#3D9B28] space-y-4 shadow-sm transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-[#3D9B28]/10 text-[#3D9B28] flex items-center justify-center border border-[#3D9B28]/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-montserrat font-bold text-lg text-slate-900">Certified SS-304/SS-316 Metallurgy</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We never compromise on alloy quality. Food contact chambers, agitator blades, and perforated baskets are fabricated strictly from certified stainless steel to withstand aggressive organic acids and CIP sanitizers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#3D9B28] space-y-4 shadow-sm transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-[#3D9B28]/10 text-[#3D9B28] flex items-center justify-center border border-[#3D9B28]/20">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-montserrat font-bold text-lg text-slate-900">Hydrostatic Pressure Testing</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every Canning Retort and Steam Jacketed Kettle is hydrostatically pressure tested up to 1.5x design pressure with certified digital gauges before factory dispatch.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#3D9B28] space-y-4 shadow-sm transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-[#3D9B28]/10 text-[#3D9B28] flex items-center justify-center border border-[#3D9B28]/20">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="font-montserrat font-bold text-lg text-slate-900">On-Site Commissioning Pan-India</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our factory technicians travel to your production plant to execute installation, pipeline connection, steam boiler balancing, and operator training until commercial output goals are met.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. SHIFTED DOWN: ABOUT RAGHAV FOOD SNIPPET
          ===================================================================== */}
      <section className="py-14 bg-[#F8FAFC] border-y border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Story & Features */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900">
                About <span className="text-[#3D9B28]">RAGHAV FOOD</span>
              </h2>
              <div className="title-line left"></div>
              
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Raghav Food Processing Machines is a trusted manufacturer of industrial food processing machinery. We design and build fruit pulpers, tomato juicers, spice pulverizers, steam jacketed kettles, hydraulic juice presses, commercial planetary mixers, and complete processing lines — engineered with food-grade SS-304 stainless steel for reliability and high output across India.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2 font-semibold">
                  <span className="text-[#3D9B28] font-bold text-base">✓</span> In-house manufacturing of machinery
                </li>
                <li className="flex items-center gap-2 font-semibold">
                  <span className="text-[#3D9B28] font-bold text-base">✓</span> Food-grade SS-304 stainless steel
                </li>
                <li className="flex items-center gap-2 font-semibold">
                  <span className="text-[#3D9B28] font-bold text-base">✓</span> High-yield, low-maintenance designs
                </li>
                <li className="flex items-center gap-2 font-semibold">
                  <span className="text-[#3D9B28] font-bold text-base">✓</span> Team of experienced engineers
                </li>
                <li className="flex items-center gap-2 font-semibold">
                  <span className="text-[#3D9B28] font-bold text-base">✓</span> Installation, training & AMC support
                </li>
                <li className="flex items-center gap-2 font-semibold">
                  <span className="text-[#3D9B28] font-bold text-base">✓</span> PAN India delivery and service
                </li>
              </ul>

              <div className="pt-4">
                <Link to="/about" className="btn btn-primary">
                  Learn More About Us →
                </Link>
              </div>
            </div>

            {/* Right Branded Visual Box with New Official Logo */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white p-8 text-center text-slate-800 space-y-4 shadow-lg border border-slate-200 relative overflow-hidden">
                <img 
                  src="/raghav-logo.png" 
                  alt="Raghav Food Logo" 
                  className="w-24 h-24 object-contain bg-white rounded-2xl p-2 mx-auto shadow-md border-2 border-slate-200" 
                />
                
                <div className="font-montserrat font-black text-2xl tracking-wider text-slate-900">
                  RAGHAV <span className="text-[#3D9B28]">FOOD</span>
                </div>
                
                <div className="text-xs font-montserrat font-bold text-slate-500 tracking-wider uppercase -mt-2">
                  PROCESSING MACHINES
                </div>
                
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Registered GST manufacturer of industrial food processing machinery, supplying food, fruit, and spice industries across India.
                </p>

                <div className="pt-2 grid grid-cols-2 gap-3 text-left">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">GSTIN</div>
                    <div className="text-xs font-mono font-bold text-[#3D9B28] mt-0.5">{settings.gstin}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Facility</div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5 truncate">Mangol Puri, Delhi</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          7. NEW: MACHINERY IN ACTION / FACTORY DEMONSTRATION VIDEOS
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D9B28]/10 text-[#3D9B28] text-xs font-montserrat font-bold mb-2">
            <Film className="w-3.5 h-3.5" />
            <span>Live Demonstrations</span>
          </div>
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900">
            Machinery In <span className="text-[#3D9B28]">Action</span>
          </h2>
          <div className="title-line"></div>
          <p className="text-sm text-slate-500 mt-2">
            Watch our food processing, continuous packaging, and thermal sterilization equipment operating live in production facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video._id || video.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Live Looping Video - NO PLAY BUTTON - Auto-plays and continuously auto-replays */}
                <div className="relative h-48 sm:h-52 bg-slate-950 overflow-hidden flex items-center justify-center group/vid">
                  <video
                    src={video.videoUrl}
                    poster={video.thumbnailUrl || video.thumbnail}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    onEnded={(e) => {
                      e.target.currentTime = 0;
                      e.target.play();
                    }}
                  />
                  <span className="absolute top-2 left-2 text-[9px] font-bold text-white bg-black/65 backdrop-blur-sm px-2 py-0.5 rounded">
                    {video.category}
                  </span>
                  <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold text-white bg-[#3D9B28] px-2 py-0.5 rounded shadow-sm">
                    {video.machineName || video.model}
                  </span>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h4 className="font-montserrat font-bold text-sm text-slate-900 group-hover:text-[#3D9B28] transition-colors line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {video.specsSummary || video.description || 'Watch live industrial demonstration and continuous packaging cycles.'}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 pt-0">
                <a
                  href={`https://wa.me/${(settings.whatsappNumber || '919220706381').replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery,%20please%20send%20me%20the%20live%20working%20video%20for%20${encodeURIComponent(video.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#2E7D1E] border border-emerald-200 text-xs font-bold font-montserrat transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Request Video on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Machine Video Enquiry Banner */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3D9B28]/10 text-[#3D9B28] flex items-center justify-center flex-shrink-0">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-montserrat font-bold text-sm text-slate-900">Looking for a specific machinery trial video?</h5>
              <p className="text-xs text-slate-500">We record custom product trial runs at our Delhi manufacturing workshop for prospective buyers.</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${(settings.whatsappNumber || '919220706381').replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery,%20I%20want%20to%20request%20a%20video%20demonstration%20of%20a%20machine.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm whitespace-nowrap"
          >
            Request Live Demo on WhatsApp →
          </a>
        </div>
      </section>

      {/* =====================================================================
          8. CLIENT TESTIMONIALS
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-montserrat font-bold text-[#3D9B28] uppercase tracking-wider mb-2">
            Verified Reviews
          </div>
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900">
            Trusted by 500+ Food Producers
          </h2>
          <div className="title-line"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <div
              key={t._id}
              className="p-6 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#3D9B28] flex flex-col justify-between shadow-sm transition-all hover:shadow-md"
            >
              <div>
                <div className="flex items-center gap-1 text-[#3D9B28] mb-3">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#3D9B28] text-[#3D9B28]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                  alt={t.clientName}
                  className="w-10 h-10 rounded-full object-cover border border-[#3D9B28]"
                />
                <div>
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{t.clientName}</h5>
                  <span className="text-[11px] text-[#3D9B28] block font-semibold">{t.company}</span>
                  <span className="text-[10px] text-slate-500">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          9. FACTORY VISIT & RAPID ENQUIRY CTA BLOCK
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#2E7D1E] via-[#3D9B28] to-[#2E7D1E] p-8 md:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl border border-emerald-500/30">
          <div className="space-y-3 max-w-2xl">
            <span className="bg-white/20 text-white font-montserrat text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
              Visit Our Manufacturing Facility
            </span>
            <h3 className="font-montserrat font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Ready to Upgrade or Establish Your Food Processing Plant?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
              Schedule a visit to our manufacturing workshop in Mangol Puri, New Delhi to inspect live machinery runs and review equipment specifications with our technical engineering team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-lg bg-white text-[#2E7D1E] hover:bg-slate-100 text-sm font-montserrat font-bold shadow-md transition-all"
            >
              Contact Us & Map
            </Link>

            <a
              href={`https://wa.me/${(settings.whatsappNumber || '919220706381').replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Processing%20Machine,%20I%20want%20to%20schedule%20a%20visit.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#1EBE5B] text-white text-sm font-montserrat font-bold shadow-md transition-all border border-white/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
