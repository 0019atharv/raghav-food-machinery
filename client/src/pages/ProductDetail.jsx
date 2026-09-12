import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingCart, 
  MessageSquare, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Wrench, 
  Cpu, 
  Flame, 
  Wheat, 
  Layers, 
  Share2,
  Clock,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { addToCart } = useCart();
  const { settings } = useSettings();

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError('');
        const res = await api.getProductBySlug(slug);
        if (res.success && res.product) {
          setProduct(res.product);
          setRelated(res.related || []);
          setActiveImage(0);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError(err.message || 'Error fetching product.');
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-2 border-amber-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 text-center rounded-3xl bg-industrial-900 border border-industrial-800 space-y-4">
        <h2 className="text-xl font-bold text-white">Machine Not Found</h2>
        <p className="text-xs text-industrial-400">
          The requested machinery specification sheet could not be found or has been moved.
        </p>
        <Link
          to="/machines"
          className="inline-block px-5 py-2.5 rounded-xl bg-amber-brand text-industrial-950 font-bold text-xs shadow-glow-amber"
        >
          &larr; Return to Machinery Catalog
        </Link>
      </div>
    );
  }

  const whatsappMessage = `Hello Raghav Food Machinery Team,%0A%0AI am requesting quotation and technical specs for:%0A*Machine:* ${encodeURIComponent(product.name)}%0A*Capacity:* ${encodeURIComponent(product.capacity)}%0A*Material:* ${encodeURIComponent(product.materialGrade || 'SS-304')}%0A%0APlease share pricing, delivery timeline, and plant layout suggestions.`;
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-industrial-400">
        <Link to="/" className="hover:text-white">Home</Link>
        <span>&rsaquo;</span>
        <Link to="/machines" className="hover:text-white">Machines</Link>
        <span>&rsaquo;</span>
        <Link to={`/machines?category=${product.categorySlug || ''}`} className="text-amber-brand hover:underline">
          {product.category}
        </Link>
        <span>&rsaquo;</span>
        <span className="text-industrial-300 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative h-80 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden bg-industrial-900 border border-industrial-800 shadow-2xl">
            <img
              src={product.images?.[activeImage] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute top-4 left-4 bg-industrial-950/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-brand border border-industrial-800">
              {product.category}
            </div>
            {product.isFeatured && (
              <div className="absolute top-4 right-4 bg-amber-brand text-industrial-950 px-2.5 py-1 rounded-full text-[10px] font-black uppercase shadow-md">
                Featured System
              </div>
            )}

            {/* Official Manufacturer Watermark Overlay */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-industrial-950/85 backdrop-blur-md border border-amber-500/30 px-3 py-1.5 rounded-xl shadow-lg pointer-events-none select-none">
              <img 
                src="/raghav-emblem-transparent.png" 
                alt="Raghav Certified" 
                className="w-5 h-5 object-contain" 
              />
              <div className="flex flex-col text-left">
                <span className="font-display font-extrabold text-[10px] tracking-wider text-white leading-none">RAGHAV</span>
                <span className="text-[8px] font-mono uppercase tracking-widest text-amber-brand leading-none mt-0.5">Certified Equipment</span>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden bg-industrial-950 border-2 transition-all flex-shrink-0 ${
                    activeImage === idx ? 'border-amber-brand shadow-glow-amber scale-105' : 'border-industrial-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-industrial-900/60 border border-industrial-800 text-center text-xs">
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 text-amber-brand mx-auto" />
              <div className="font-semibold text-white">Food-Grade SS</div>
              <div className="text-[10px] text-industrial-400">SS-304/SS-316</div>
            </div>
            <div className="space-y-1 border-x border-industrial-800">
              <Wrench className="w-5 h-5 text-amber-brand mx-auto" />
              <div className="font-semibold text-white">1 Year Warranty</div>
              <div className="text-[10px] text-industrial-400">Pan-India Support</div>
            </div>
            <div className="space-y-1">
              <Clock className="w-5 h-5 text-amber-brand mx-auto" />
              <div className="font-semibold text-white">Ready Spares</div>
              <div className="text-[10px] text-industrial-400">Same-Day Dispatch</div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Specs & Action */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="text-xs font-mono text-amber-brand uppercase tracking-wider mb-2 font-bold">
              Model Ref: {product.slug?.toUpperCase()}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-industrial-300 mt-3 leading-relaxed">
              {product.shortDescription || product.fullDescription}
            </p>
          </div>

          {/* Pricing / Commercial Estimate */}
          <div className="p-4 rounded-2xl bg-industrial-900/90 border border-industrial-800 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-industrial-400">Commercial Pricing Estimate</div>
              <div className="text-xl font-bold text-amber-brand">{product.price || 'Contact for Quote'}</div>
            </div>
            <div className="text-right text-[11px] text-industrial-400 font-mono">
              <span>{product.priceUnit || 'Ex-Factory / Turnkey'}</span>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-industrial-900/80 border border-industrial-800">
              <span className="text-[11px] text-industrial-500 block">Batch / Output Capacity</span>
              <strong className="text-white text-xs">{product.capacity || 'Custom'}</strong>
            </div>
            <div className="p-3 rounded-xl bg-industrial-900/80 border border-industrial-800">
              <span className="text-[11px] text-industrial-500 block">Electric / Steam Power</span>
              <strong className="text-white text-xs">{product.power || 'Custom'}</strong>
            </div>
            <div className="p-3 rounded-xl bg-industrial-900/80 border border-industrial-800">
              <span className="text-[11px] text-industrial-500 block">Material Construction</span>
              <strong className="text-white text-xs">{product.materialGrade || 'SS-304'}</strong>
            </div>
            <div className="p-3 rounded-xl bg-industrial-900/80 border border-industrial-800">
              <span className="text-[11px] text-industrial-500 block">Automation Level</span>
              <strong className="text-white text-xs">{product.automationGrade || 'Semi-Automatic'}</strong>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => addToCart(product)}
                className="w-full sm:flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-industrial-950 font-extrabold py-3.5 px-6 rounded-xl text-sm transition-all shadow-glow-amber flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to RFQ Quote Basket</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white/20" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>

            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-industrial-900 hover:bg-industrial-800 border border-industrial-700 text-xs font-semibold text-industrial-300 hover:text-white transition-colors"
            >
              <span>Speak with Senior Sales Engineer: <strong>{settings.phone}</strong></span>
            </a>
          </div>

        </div>

      </div>

      {/* Detailed Technical Specifications Matrix Table */}
      <section className="space-y-6 pt-6">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white border-l-4 border-amber-brand pl-3">
          Technical Specifications Matrix
        </h3>

        <div className="rounded-2xl bg-industrial-900/80 border border-industrial-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-industrial-950 text-industrial-400 uppercase font-mono text-[10px] tracking-wider border-b border-industrial-800">
                <tr>
                  <th className="px-6 py-3.5 w-1/3">Engineering Parameter</th>
                  <th className="px-6 py-3.5">Standard Factory Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-industrial-800">
                <tr className="hover:bg-industrial-850/50">
                  <td className="px-6 py-3 text-industrial-400 font-medium">Model Designation</td>
                  <td className="px-6 py-3 text-white font-mono font-bold">{product.name}</td>
                </tr>
                <tr className="hover:bg-industrial-850/50">
                  <td className="px-6 py-3 text-industrial-400 font-medium">Capacity Range</td>
                  <td className="px-6 py-3 text-white">{product.capacity}</td>
                </tr>
                <tr className="hover:bg-industrial-850/50">
                  <td className="px-6 py-3 text-industrial-400 font-medium">Electric Motor / Heat Source</td>
                  <td className="px-6 py-3 text-white">{product.power}</td>
                </tr>
                <tr className="hover:bg-industrial-850/50">
                  <td className="px-6 py-3 text-industrial-400 font-medium">Food Contact Material</td>
                  <td className="px-6 py-3 text-white">{product.materialGrade}</td>
                </tr>
                <tr className="hover:bg-industrial-850/50">
                  <td className="px-6 py-3 text-industrial-400 font-medium">Automation & Control</td>
                  <td className="px-6 py-3 text-white">{product.automationGrade}</td>
                </tr>
                <tr className="hover:bg-industrial-850/50">
                  <td className="px-6 py-3 text-industrial-400 font-medium">Operating Voltage</td>
                  <td className="px-6 py-3 text-white">{product.voltage || '415V, 3-Phase, 50Hz'}</td>
                </tr>
                <tr className="hover:bg-industrial-850/50">
                  <td className="px-6 py-3 text-industrial-400 font-medium">Dimensions (L x W x H)</td>
                  <td className="px-6 py-3 text-white">{product.dimensions || 'Custom as per plant layout'}</td>
                </tr>
                <tr className="hover:bg-industrial-850/50">
                  <td className="px-6 py-3 text-industrial-400 font-medium">Total Machine Weight</td>
                  <td className="px-6 py-3 text-white">{product.weight || 'Standard'}</td>
                </tr>

                {/* Dynamic custom specs */}
                {product.specifications?.map((spec, idx) => (
                  <tr key={idx} className="hover:bg-industrial-850/50">
                    <td className="px-6 py-3 text-industrial-400 font-medium">{spec.label}</td>
                    <td className="px-6 py-3 text-white">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Applications & Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Applications */}
        <div className="p-6 rounded-2xl bg-industrial-900/80 border border-industrial-800 space-y-4">
          <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
            <Wheat className="w-4 h-4 text-amber-brand" />
            Suitable Food Applications
          </h4>
          <ul className="space-y-2 text-xs text-industrial-300">
            {(product.applications && product.applications.length > 0 ? product.applications : [
              'Ready-to-Eat (RTE) Food Canning',
              'Commercial Snack & Namkeen Plants',
              'Commercial Kitchens & Sauce Units'
            ]).map((app, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-brand flex-shrink-0" />
                <span>{app}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Engineering Highlights */}
        <div className="p-6 rounded-2xl bg-industrial-900/80 border border-industrial-800 space-y-4">
          <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
            <Wrench className="w-4 h-4 text-amber-brand" />
            Engineering Design Highlights
          </h4>
          <ul className="space-y-2 text-xs text-industrial-300">
            {(product.features && product.features.length > 0 ? product.features : [
              'Heavy gauge food-grade stainless steel construction',
              'Integrated emergency shutoff and overload protection',
              'Hygienic sanitary design for rapid washdown and clean-in-place (CIP)'
            ]).map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Related Machinery */}
      {related.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-industrial-800">
          <h3 className="font-display text-xl font-bold text-white">
            Related Machinery in {product.category}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((rel) => (
              <Link
                key={rel._id || rel.slug}
                to={`/product/${rel.slug}`}
                className="group p-4 rounded-2xl bg-industrial-900 border border-industrial-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-36 rounded-xl overflow-hidden bg-industrial-950 mb-3">
                    <img
                      src={rel.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-display font-bold text-xs text-white group-hover:text-amber-brand transition-colors line-clamp-2">
                    {rel.name}
                  </h4>
                </div>
                <div className="mt-3 pt-2 border-t border-industrial-800/80 text-[11px] text-amber-brand font-semibold">
                  {rel.capacity}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

