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
  Sparkles,
  Phone
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
      <div className="max-w-xl mx-auto my-20 p-8 text-center rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-montserrat">Machine Not Found</h2>
        <p className="text-xs text-slate-600">
          The requested machinery specification sheet could not be found or has been moved.
        </p>
        <Link
          to="/machines"
          className="inline-block px-5 py-2.5 rounded-xl bg-[#3D9B28] text-white font-bold text-xs shadow-sm hover:bg-[#2E7D1E] transition-colors"
        >
          &larr; Return to Machinery Catalog
        </Link>
      </div>
    );
  }

  const whatsappMessage = `Hello Raghav Food Machinery Team,%0A%0AI am requesting quotation and technical specs for:%0A*Machine:* ${encodeURIComponent(product.name)}%0A*Capacity:* ${encodeURIComponent(product.capacity || 'Standard')}%0A*Material:* ${encodeURIComponent(product.materialGrade || 'SS-304')}%0A%0APlease share pricing, delivery timeline, and plant layout suggestions.`;
  const whatsappUrl = `https://wa.me/${(settings.whatsappNumber || '919220706381').replace(/\D/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link to="/" className="hover:text-[#3D9B28] transition-colors">Home</Link>
        <span>&rsaquo;</span>
        <Link to="/machines" className="hover:text-[#3D9B28] transition-colors">Machines</Link>
        <span>&rsaquo;</span>
        <Link to={`/machines?category=${product.categorySlug || ''}`} className="text-[#3D9B28] font-semibold hover:underline">
          {product.category}
        </Link>
        <span>&rsaquo;</span>
        <span className="text-slate-800 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative h-80 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center p-4 sm:p-6 shadow-sm">
            <img
              src={product.images?.[activeImage] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'}
              alt={product.name}
              className="w-full h-full object-contain p-2 transition-all duration-500"
            />
            <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-slate-700 shadow-sm">
              {product.category}
            </div>
            {product.isFeatured && (
              <div className="absolute top-4 right-4 bg-[#3D9B28] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-md tracking-wider">
                Featured System
              </div>
            )}

            {/* Manufacturer Certified Badge */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-slate-900/85 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl shadow-lg pointer-events-none select-none">
              <img 
                src="/raghav-emblem-transparent.png" 
                alt="Raghav Certified" 
                className="w-5 h-5 object-contain" 
              />
              <div className="flex flex-col text-left">
                <span className="font-montserrat font-black text-[10px] tracking-wider text-white leading-none">RAGHAV</span>
                <span className="text-[8px] font-mono uppercase tracking-widest text-[#3D9B28] leading-none mt-0.5 font-bold">Certified Equipment</span>
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
                  className={`w-20 h-20 rounded-xl overflow-hidden bg-white border-2 p-1 transition-all flex-shrink-0 flex items-center justify-center ${
                    activeImage === idx ? 'border-[#3D9B28] shadow-md scale-105' : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs shadow-xs">
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 text-[#3D9B28] mx-auto" />
              <div className="font-bold text-slate-800">Food-Grade SS</div>
              <div className="text-[10px] text-slate-500">{product.materialGrade || 'SS-304'}</div>
            </div>
            <div className="space-y-1 border-x border-slate-200">
              <Wrench className="w-5 h-5 text-[#3D9B28] mx-auto" />
              <div className="font-bold text-slate-800">1 Year Warranty</div>
              <div className="text-[10px] text-slate-500">Pan-India Support</div>
            </div>
            <div className="space-y-1">
              <Clock className="w-5 h-5 text-[#3D9B28] mx-auto" />
              <div className="font-bold text-slate-800">Ready Spares</div>
              <div className="text-[10px] text-slate-500">Same-Day Dispatch</div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Specs & Action */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="text-xs font-mono text-[#3D9B28] uppercase tracking-wider mb-1.5 font-bold">
              Model Ref: {product.slug?.toUpperCase()}
            </div>
            <h1 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
              {product.shortDescription || (product.fullDescription ? product.fullDescription.slice(0, 180) + '...' : '')}
            </p>
          </div>

          {/* Pricing / Commercial Estimate */}
          <div className="p-4 sm:p-4.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Commercial Pricing Estimate</div>
              <div className="text-2xl sm:text-3xl font-montserrat font-black text-slate-900 mt-0.5">{product.price || 'Contact for Quote'}</div>
            </div>
            <div className="text-right font-mono">
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap">
                {product.priceUnit || 'Ex-Factory Price'}
              </span>
            </div>
          </div>

          {/* Key Specifications Grid - High Contrast Black Text on White Cards */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Batch / Output Capacity</span>
              <strong className="text-slate-900 font-montserrat font-black text-xs sm:text-sm block mt-1 leading-snug">
                {product.capacity || 'Standard Industrial Output'}
              </strong>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Electric / Steam Power</span>
              <strong className="text-slate-900 font-montserrat font-black text-xs sm:text-sm block mt-1 leading-snug">
                {product.power || 'Standard Factory Spec'}
              </strong>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Material Construction</span>
              <strong className="text-slate-900 font-montserrat font-black text-xs sm:text-sm block mt-1 leading-snug">
                {product.materialGrade || 'Food-Grade SS-304'}
              </strong>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Automation Level</span>
              <strong className="text-slate-900 font-montserrat font-black text-xs sm:text-sm block mt-1 leading-snug">
                {product.automationGrade || 'Semi-Automatic'}
              </strong>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-1">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => addToCart(product)}
                className="w-full sm:flex-1 bg-[#3D9B28] hover:bg-[#2E7D1E] text-white font-extrabold py-3.5 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 font-montserrat"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to RFQ Quote Basket</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 bg-[#25D366] hover:bg-[#1EBE5B] text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white/20" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>

            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#3D9B28]" />
              <span>Speak with Senior Sales Engineer: <strong className="font-mono text-slate-900 font-bold">{settings.phone}</strong></span>
            </a>
          </div>

        </div>

      </div>

      {/* Comprehensive Product Description & Engineering Overview */}
      {product.fullDescription && (
        <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-montserrat font-bold text-lg sm:text-xl border-b border-slate-200 pb-3">
            <Sparkles className="w-5 h-5 text-[#3D9B28]" />
            <span>Comprehensive Machine Overview & Engineering Details</span>
          </div>
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-normal">
            {product.fullDescription.split('\n\n').map((para, pIdx) => (
              <p key={pIdx} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Detailed Technical Specifications Matrix Table */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-montserrat text-xl sm:text-2xl font-black text-slate-900 border-l-4 border-[#3D9B28] pl-3">
            Technical Specifications Matrix
          </h3>
          <span className="text-xs text-slate-500 font-medium">Standard Factory Specifications</span>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] sm:text-xs tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 sm:px-6 py-3.5 w-1/3 font-bold">Engineering Parameter</th>
                  <th className="px-5 sm:px-6 py-3.5 font-bold">Standard Factory Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 sm:px-6 py-3.5 text-slate-600 font-semibold">Model Designation</td>
                  <td className="px-5 sm:px-6 py-3.5 text-slate-900 font-bold">{product.name}</td>
                </tr>
                {product.capacity && (
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 sm:px-6 py-3.5 text-slate-600 font-semibold">Capacity Range</td>
                    <td className="px-5 sm:px-6 py-3.5 text-slate-900 font-medium">{product.capacity}</td>
                  </tr>
                )}
                {product.power && (
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 sm:px-6 py-3.5 text-slate-600 font-semibold">Motor / Power Drive</td>
                    <td className="px-5 sm:px-6 py-3.5 text-slate-900 font-medium">{product.power}</td>
                  </tr>
                )}
                {product.materialGrade && (
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 sm:px-6 py-3.5 text-slate-600 font-semibold">Material Construction</td>
                    <td className="px-5 sm:px-6 py-3.5 text-slate-900 font-medium">{product.materialGrade}</td>
                  </tr>
                )}
                {product.automationGrade && (
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 sm:px-6 py-3.5 text-slate-600 font-semibold">Automation Level</td>
                    <td className="px-5 sm:px-6 py-3.5 text-slate-900 font-medium">{product.automationGrade}</td>
                  </tr>
                )}
                {product.voltage && (
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 sm:px-6 py-3.5 text-slate-600 font-semibold">Operating Voltage</td>
                    <td className="px-5 sm:px-6 py-3.5 text-slate-900 font-medium">{product.voltage}</td>
                  </tr>
                )}
                {product.dimensions && (
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 sm:px-6 py-3.5 text-slate-600 font-semibold">Dimensions (L x W x H)</td>
                    <td className="px-5 sm:px-6 py-3.5 text-slate-900 font-medium">{product.dimensions}</td>
                  </tr>
                )}
                {product.weight && (
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 sm:px-6 py-3.5 text-slate-600 font-semibold">Total Machine Weight</td>
                    <td className="px-5 sm:px-6 py-3.5 text-slate-900 font-medium">{product.weight}</td>
                  </tr>
                )}
                {product.warranty && (
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 sm:px-6 py-3.5 text-slate-600 font-semibold">Warranty Terms</td>
                    <td className="px-5 sm:px-6 py-3.5 text-slate-900 font-medium">{product.warranty}</td>
                  </tr>
                )}
                {/* Dynamic custom specs */}
                {Array.isArray(product.specifications) && product.specifications.map((spec, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 sm:px-6 py-3.5 text-slate-600 font-semibold">{spec.label}</td>
                    <td className="px-5 sm:px-6 py-3.5 text-slate-900 font-medium">{spec.value}</td>
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
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h4 className="font-montserrat font-bold text-base text-slate-900 flex items-center gap-2">
            <Wheat className="w-4 h-4 text-[#3D9B28]" />
            <span>Suitable Food Applications</span>
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {(product.applications && product.applications.length > 0 ? product.applications : [
              'Ready-to-Eat (RTE) Food Canning & Processing',
              'Commercial Kitchens, Sauces & Condiments',
              'Food Packaging, Bakeries & Confectioneries'
            ]).map((app, idx) => (
              <li key={idx} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3D9B28] flex-shrink-0" />
                <span>{app}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Engineering Highlights */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h4 className="font-montserrat font-bold text-base text-slate-900 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#3D9B28]" />
            <span>Engineering Design Highlights</span>
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {(product.features && product.features.length > 0 ? product.features : [
              'Heavy gauge food-grade stainless steel construction',
              'Integrated safety overload protection and emergency stop',
              'Hygienic sanitary design for rapid washdown and clean-in-place (CIP)'
            ]).map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Related Machinery */}
      {related.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-slate-200">
          <h3 className="font-montserrat text-xl sm:text-2xl font-black text-slate-900">
            Related Machinery in {product.category}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((rel) => (
              <Link
                key={rel._id || rel.slug}
                to={`/product/${rel.slug}`}
                className="group p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#3D9B28] transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="h-32 sm:h-36 rounded-xl overflow-hidden bg-slate-50/50 border border-slate-100 p-2 mb-3 flex items-center justify-center">
                    <img
                      src={rel.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'}
                      alt={rel.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-montserrat font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#3D9B28] transition-colors line-clamp-2">
                    {rel.name}
                  </h4>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium truncate max-w-[100px]">{rel.capacity || 'Industrial'}</span>
                  <span className="font-montserrat font-bold text-slate-900">{rel.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

