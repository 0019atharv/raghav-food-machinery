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
  FileText, 
  Sparkles,
  ChevronRight,
  Download,
  Star,
  Factory,
  Cog
} from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { settings } = useSettings();

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [prodRes, catRes, testRes] = await Promise.all([
          api.getProducts({ featured: 'true' }),
          api.getCategories(),
          api.getTestimonials()
        ]);
        if (prodRes.success) {
          const publishedFeatured = (prodRes.products || []).filter(p => p && p.isPublished !== false);
          setFeaturedProducts(publishedFeatured);
        }
        if (catRes.success) setCategories(catRes.categories || []);
        if (testRes.success) setTestimonials(testRes.testimonials || []);
      } catch (err) {
        console.error('Failed to load home data', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  const iconMap = {
    ShieldCheck,
    Layers,
    Wheat,
    Flame,
    Cpu,
    PackageCheck
  };

  const heroData = {
    badge: settings.hero?.badge || "India's Leading Industrial Food Machinery Engineering",
    titleLine1: settings.hero?.titleLine1 || "Industrial Food",
    titleHighlight: settings.hero?.titleHighlight || "Processing, Canning",
    titleLine3: settings.hero?.titleLine3 || "& Snacks Machinery",
    description: settings.hero?.description || "Engineered with certified Food-Grade SS-304/SS-316. From high-pressure Canning Retorts and Snacks Extruders to turnkey automated plants — delivered with factory direct warranty and on-site commissioning across India.",
    stat1Number: settings.hero?.stat1Number || "500+",
    stat1Label: settings.hero?.stat1Label || "Installed Plants Across India",
    stat2Number: settings.hero?.stat2Number || "30+",
    stat2Label: settings.hero?.stat2Label || "Years Food Tech Expertise",
    stat3Number: settings.hero?.stat3Number || "100%",
    stat3Label: settings.hero?.stat3Label || "Food-Grade SS-304/SS-316",
    stat4Number: settings.hero?.stat4Number || "24/7",
    stat4Label: settings.hero?.stat4Label || "Engineer AMC Support",
    showcaseTag: settings.hero?.showcaseTag || "Flagship: Continuous Band Sealing Machine",
    showcaseImage: settings.hero?.showcaseImage || "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789208820/raghav-food-processing-machines/raghav-continuous-band-sealer-hero-branded.jpg",
    showcaseModel: settings.hero?.showcaseModel || "RFPM-CBS-900",
    showcaseStockStatus: settings.hero?.showcaseStockStatus || "In Stock / Ready Dispatch",
    showcaseSpec1Label: settings.hero?.showcaseSpec1Label || "Sealing Speed",
    showcaseSpec1Value: settings.hero?.showcaseSpec1Value || "0 - 12 Mtr/Min",
    showcaseSpec2Label: settings.hero?.showcaseSpec2Label || "Temperature",
    showcaseSpec2Value: settings.hero?.showcaseSpec2Value || "PID 0 - 300°C",
    showcaseSpec3Label: settings.hero?.showcaseSpec3Label || "Automation",
    showcaseSpec3Value: settings.hero?.showcaseSpec3Value || "Conveyor Driven",
    showcaseButtonText: settings.hero?.showcaseButtonText || "View Machine Specs",
    showcaseButtonLink: settings.hero?.showcaseButtonLink || "/product/raghav-horizontal-continuous-band-sealing-machine"
  };

  return (
    <div className="relative z-10 space-y-24 pb-20">
      
      {/* =====================================================================
          1. HERO BANNER WITH DYNAMIC INDUSTRIAL ACCENTS & TELEMETRY
          ===================================================================== */}
      <section className="relative pt-12 md:pt-20 pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle Background Watermark Emblem */}
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-[480px] h-[480px] md:w-[600px] md:h-[600px] opacity-[0.045] pointer-events-none select-none z-0">
          <img src="/raghav-emblem-transparent.png" alt="" className="w-full h-full object-contain filter drop-shadow" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-industrial-900/90 border border-amber-500/30 text-xs font-semibold text-amber-brand shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-brand animate-ping" />
              <span>{heroData.badge}</span>
            </div>

            {/* Main Punchy Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              {heroData.titleLine1} <br />
              <span className="text-gradient-amber">{heroData.titleHighlight}</span> <br />
              {heroData.titleLine3}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-industrial-300 max-w-2xl leading-relaxed">
              {heroData.description}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/machines"
                className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-industrial-950 font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all shadow-glow-amber flex items-center gap-2.5 group"
              >
                <span>Browse Machinery Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/catalog"
                className="bg-industrial-900/80 hover:bg-industrial-800 text-industrial-200 hover:text-white border border-industrial-700 font-semibold px-5 py-3.5 rounded-xl text-sm transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-brand" />
                <span>Download Spec Sheet</span>
              </Link>

              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery,%20I%20want%20to%20request%20an%20instant%20quote.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-xs font-semibold px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-800/60"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-emerald-500/20" />
                <span>Instant WhatsApp Quote</span>
              </a>
            </div>

            {/* Quick Micro Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-industrial-400 border-t border-industrial-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-brand" />
                <span>SS-304/316 Metallurgy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-brand" />
                <span>CE & ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-brand" />
                <span>Pan-India AMC & Spares</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Machine Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-industrial-900/90 border border-industrial-800/90 p-3 md:p-4 shadow-2xl overflow-hidden group">
              
              {/* Highlight Tag */}
              <div className="absolute top-6 left-6 z-20 bg-industrial-950/90 border border-amber-500/40 px-3 py-1 rounded-full text-[11px] font-bold text-amber-brand flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                {heroData.showcaseTag}
              </div>

              {/* Machine Image */}
              <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-industrial-950">
                <img
                  src={heroData.showcaseImage}
                  alt={heroData.showcaseTag}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-transparent to-transparent opacity-80" />
                
                {/* Official Raghav Watermark Stamp */}
                <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-industrial-950/85 backdrop-blur-md border border-amber-500/30 px-2.5 py-1 rounded-lg text-[10px] text-industrial-200 shadow">
                  <img src="/raghav-emblem-transparent.png" alt="Raghav" className="w-4 h-4 object-contain" />
                  <span className="font-semibold tracking-wider uppercase font-mono text-[9px] text-amber-brand">Raghav Certified</span>
                </div>
              </div>

              {/* Specs Badge Overlay */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-brand font-bold uppercase tracking-wider">
                    Model: {heroData.showcaseModel}
                  </span>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold">
                    {heroData.showcaseStockStatus}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-industrial-950 border border-industrial-800">
                    <span className="text-[10px] text-industrial-500 block">{heroData.showcaseSpec1Label}</span>
                    <strong className="text-white text-xs">{heroData.showcaseSpec1Value}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-industrial-950 border border-industrial-800">
                    <span className="text-[10px] text-industrial-500 block">{heroData.showcaseSpec2Label}</span>
                    <strong className="text-white text-xs">{heroData.showcaseSpec2Value}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-industrial-950 border border-industrial-800">
                    <span className="text-[10px] text-industrial-500 block">{heroData.showcaseSpec3Label}</span>
                    <strong className="text-white text-xs">{heroData.showcaseSpec3Value}</strong>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Link
                    to={heroData.showcaseButtonLink}
                    className="flex-1 text-center bg-industrial-800 hover:bg-industrial-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors border border-industrial-700"
                  >
                    {heroData.showcaseButtonText}
                  </Link>
                  <button
                    onClick={() => {
                      if (featuredProducts[0]) addToCart(featuredProducts[0]);
                    }}
                    className="flex-1 bg-amber-brand hover:bg-amber-400 text-industrial-950 font-bold py-2.5 rounded-xl text-xs transition-all shadow-glow-amber"
                  >
                    + Add to RFQ Basket
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Live Machinery Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-industrial-900/60 border border-industrial-800/80 backdrop-blur-xl">
          <div className="text-center p-2">
            <div className="font-display font-black text-3xl md:text-4xl text-gradient-amber">{heroData.stat1Number}</div>
            <div className="text-xs font-semibold text-industrial-300 mt-1">{heroData.stat1Label}</div>
          </div>
          <div className="text-center p-2 border-l border-industrial-800/80">
            <div className="font-display font-black text-3xl md:text-4xl text-white">{heroData.stat2Number}</div>
            <div className="text-xs font-semibold text-industrial-300 mt-1">{heroData.stat2Label}</div>
          </div>
          <div className="text-center p-2 border-l border-industrial-800/80">
            <div className="font-display font-black text-3xl md:text-4xl text-gradient-amber">{heroData.stat3Number}</div>
            <div className="text-xs font-semibold text-industrial-300 mt-1">{heroData.stat3Label}</div>
          </div>
          <div className="text-center p-2 border-l border-industrial-800/80">
            <div className="font-display font-black text-3xl md:text-4xl text-white">{heroData.stat4Number}</div>
            <div className="text-xs font-semibold text-industrial-300 mt-1">{heroData.stat4Label}</div>
          </div>
        </div>

      </section>

      {/* =====================================================================
          2. MACHINERY VERTICALS / CATEGORIES GRID
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold font-mono text-amber-brand uppercase tracking-wider mb-2">
              Machinery Verticals
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">
              Complete Food Processing Equipment
            </h2>
          </div>
          <Link
            to="/machines"
            className="text-xs font-bold text-amber-brand hover:text-amber-glow flex items-center gap-1 group"
          >
            <span>Explore All 20+ Models</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Cpu;
            return (
              <Link
                key={cat._id || cat.slug}
                to={`/machines?category=${cat.slug}`}
                className="group relative rounded-2xl bg-industrial-900/80 border border-industrial-800/80 hover:border-amber-500/40 p-6 transition-all duration-300 hover:-translate-y-1 shadow-card-dark overflow-hidden flex flex-col justify-between"
              >
                {/* Background Glow */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-industrial-950 border border-industrial-800 group-hover:border-amber-500/40 flex items-center justify-center text-amber-brand mb-4 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-brand transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-industrial-400 mt-2 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 flex items-center justify-between text-xs border-t border-industrial-800/60 mt-4">
                  <span className="text-industrial-500 font-mono">
                    {cat.machineCount || 3} Machines
                  </span>
                  <span className="text-amber-brand font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Range &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          3. FEATURED MACHINES SHOWCASE (With Instant Quote & Add to RFQ)
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold font-mono text-amber-brand uppercase tracking-wider mb-2">
              Featured Machinery
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">
              High-Demand Processing Systems
            </h2>
          </div>
          <Link
            to="/machines"
            className="text-xs font-bold text-amber-brand hover:text-amber-glow flex items-center gap-1 group"
          >
            <span>View All Machinery</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.slice(0, 6).map((machine) => (
            <div
              key={machine._id || machine.slug}
              className="rounded-3xl bg-industrial-900/90 border border-industrial-800/90 hover:border-amber-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-card-dark group"
            >
              <div>
                {/* Image & Category Pill */}
                <div className="relative h-52 rounded-2xl overflow-hidden bg-industrial-950 mb-4">
                  <img
                    src={machine.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
                    alt={machine.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-industrial-950/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-brand border border-industrial-800">
                    {machine.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-industrial-950/90 px-2 py-0.5 rounded text-[11px] font-mono text-industrial-300">
                    {machine.capacity}
                  </div>
                  {/* Subtle Raghav Certified Stamp */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-industrial-950/80 backdrop-blur-sm px-1.5 py-0.5 rounded border border-industrial-800/80 text-[9px] text-industrial-300 font-mono">
                    <img src="/raghav-emblem-transparent.png" alt="" className="w-3.5 h-3.5 object-contain" />
                    <span className="text-amber-brand font-semibold">RFPM</span>
                  </div>
                </div>

                {/* Title */}
                <Link to={`/product/${machine.slug}`}>
                  <h3 className="font-display font-bold text-base text-white hover:text-amber-brand transition-colors line-clamp-2">
                    {machine.name}
                  </h3>
                </Link>

                <p className="text-xs text-industrial-400 mt-2 line-clamp-2 leading-relaxed">
                  {machine.shortDescription}
                </p>

                {/* Quick specs grid */}
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

              {/* Action Buttons */}
              <div className="mt-6 pt-3 border-t border-industrial-800 flex items-center gap-2">
                <Link
                  to={`/product/${machine.slug}`}
                  className="flex-1 text-center bg-industrial-800 hover:bg-industrial-700 text-industrial-200 hover:text-white py-2.5 rounded-xl text-xs font-semibold transition-colors border border-industrial-700"
                >
                  View Details
                </Link>

                <button
                  onClick={() => addToCart(machine)}
                  className="flex-1 bg-amber-brand hover:bg-amber-400 text-industrial-950 font-bold py-2.5 rounded-xl text-xs transition-all shadow-glow-amber"
                >
                  + Add to RFQ
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          4. TURNKEY PLANT SOLUTIONS WORKFLOW (From Concept to Commissioning)
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-industrial-900 to-industrial-950 border border-industrial-800 p-8 md:p-12 relative overflow-hidden">
          
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold font-mono text-amber-brand uppercase tracking-wider mb-2">
              Turnkey Plant Engineering
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">
              End-to-End Food Processing Project Delivery
            </h2>
            <p className="text-sm text-industrial-400 mt-3 leading-relaxed">
              We don't just sell standalone machines — we architect complete production facilities from plant layout CAD blueprints, utility steam piping, and electrical automation to trial batch FSSAI compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            
            {[
              { step: '01', title: 'Plant Layout & CAD', desc: 'Custom facility planning, batch capacity sizing & utility routing.' },
              { step: '02', title: 'Precision SS Fabrication', desc: 'CNC fiber laser cutting, hygienic TIG welding & mirror polishing.' },
              { step: '03', title: 'Factory FAT Testing', desc: 'Hydrostatic pressure testing and dry run trials before dispatch.' },
              { step: '04', title: 'On-Site Commissioning', desc: 'Erection, steam boiler connection, and live production trials.' },
              { step: '05', title: 'Operator SOP Training', desc: 'Technician training, maintenance manuals & 24/7 AMC support.' },
            ].map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-industrial-950/80 border border-industrial-800 space-y-3 relative group hover:border-amber-500/40 transition-colors">
                <div className="font-mono text-2xl font-black text-amber-brand/40 group-hover:text-amber-brand transition-colors">
                  {step.step}
                </div>
                <h4 className="font-display font-bold text-sm text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-industrial-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}

          </div>

          <div className="mt-10 pt-8 border-t border-industrial-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-industrial-400">
              Need plant layout consultation? Contact our chief food engineering director.
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-amber-brand hover:bg-amber-400 text-industrial-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-glow-amber"
            >
              <span>Explore Turnkey Engineering Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* =====================================================================
          5. WHY CHOOSE RAGHAV FOOD MACHINERY
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {/* Official Badge Logo */}
          <div className="flex items-center justify-center mb-5">
            <img 
              src="/raghav-logo.png" 
              alt="Raghav Food Processing Machine Official Badge Logo" 
              className="h-14 sm:h-16 w-auto object-contain rounded-xl bg-white/95 p-2 shadow-lg border border-amber-500/30 hover:scale-105 transition-transform" 
            />
          </div>
          <div className="text-xs font-bold font-mono text-amber-brand uppercase tracking-wider mb-2">
            The Raghav Advantage
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">
            Built for 24/7 Industrial Heavy-Duty Reliability
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-industrial-900/80 border border-industrial-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-brand flex items-center justify-center border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Certified SS-304/SS-316 Alloys</h3>
            <p className="text-xs text-industrial-400 leading-relaxed">
              We never compromise on metallurgy. All food contact chambers, agitator blades, and baskets are fabricated strictly from prime certified stainless steel to withstand aggressive organic acids and CIP sanitizers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-industrial-900/80 border border-industrial-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-brand flex items-center justify-center border border-amber-500/20">
              <Cog className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Direct Factory Pricing & Spares</h3>
            <p className="text-xs text-industrial-400 leading-relaxed">
              No middleman commission. Deal directly with the manufacturer. We maintain an exhaustive ready inventory of silicone gaskets, VFD drives, pressure relief valves, and heating elements for same-day dispatch.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-industrial-900/80 border border-industrial-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-brand flex items-center justify-center border border-amber-500/20">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">On-Site Commissioning Pan-India</h3>
            <p className="text-xs text-industrial-400 leading-relaxed">
              Our factory technicians travel to your site to execute installation, pipeline connection, steam boiler balancing, and operator training until commercial output goals are met.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. CLIENT TESTIMONIALS SLIDER / PREVIEW
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold font-mono text-amber-brand uppercase tracking-wider mb-2">
              Verified Client Reviews
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">
              Trusted by 500+ Food Producers
            </h2>
          </div>
          <Link
            to="/testimonials"
            className="text-xs font-bold text-amber-brand hover:text-amber-glow flex items-center gap-1 group"
          >
            <span>Read All Client Case Studies</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="p-6 rounded-2xl bg-industrial-900/80 border border-industrial-800 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-brand mb-3">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-brand" />
                  ))}
                </div>

                <p className="text-xs text-industrial-300 italic leading-relaxed">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-industrial-800 flex items-center gap-3">
                <img
                  src={t.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                  alt={t.clientName}
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <h5 className="font-bold text-white text-xs">{t.clientName}</h5>
                  <span className="text-[11px] text-amber-brand block">{t.company}</span>
                  <span className="text-[10px] text-industrial-500">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          7. FACTORY VISIT & RAPID ENQUIRY CTA BLOCK
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 p-8 md:p-12 text-industrial-950 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <span className="bg-industrial-950 text-amber-brand font-mono text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Visit Our Manufacturing Facility
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-industrial-950 tracking-tight">
              Ready to Upgrade or Establish Your Food Processing Plant?
            </h3>
            <p className="text-xs sm:text-sm font-medium text-industrial-950/80 leading-relaxed">
              Schedule a factory visit in Kundli, Sonipat (Delhi NCR) to inspect live dry runs and review engineering drawings with our technical team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto text-center bg-industrial-950 hover:bg-industrial-900 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all shadow-xl"
            >
              Contact Us & Map
            </Link>

            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery,%20I%20want%20to%20schedule%20a%20factory%20visit.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center bg-white/90 hover:bg-white text-industrial-950 font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

