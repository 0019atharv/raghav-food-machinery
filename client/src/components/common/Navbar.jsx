import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  Clock, 
  ShoppingCart, 
  User, 
  Shield, 
  Menu, 
  X, 
  ChevronDown, 
  Wrench, 
  Sparkles,
  ExternalLink,
  Lock,
  Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';
import { api } from '../../services/api';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [cachedProducts, setCachedProducts] = useState([]);
  const searchRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout, setAuthModalOpen } = useAuth();
  const { totalItemCount, setIsDrawerOpen } = useCart();
  const { settings } = useSettings();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Machines', path: '/machines' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About Us', path: '/about' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  // Pre-load products once for fast live search preview
  useEffect(() => {
    async function loadProductsForSearch() {
      try {
        const res = await api.getProducts();
        if (res && res.success && Array.isArray(res.products)) {
          setCachedProducts(res.products.filter(p => p.isPublished !== false));
        }
      } catch (err) {
        // silent fallback
      }
    }
    loadProductsForSearch();
  }, []);

  // Close live search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchInputChange = (val) => {
    setSearchQuery(val);
    if (!val || val.trim().length < 1) {
      setSearchResults([]);
      return;
    }
    const q = val.toLowerCase().trim();
    const matches = cachedProducts.filter(p => 
      p.name?.toLowerCase().includes(q) ||
      p.shortDescription?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.categorySlug?.toLowerCase().includes(q) ||
      p.materialGrade?.toLowerCase().includes(q)
    );
    setSearchResults(matches.slice(0, 5));
  };

  const handleSearchSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      setMobileMenuOpen(false);
      navigate(`/machines?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      {/* Top Banner Notice (if active) */}
      {settings.bannerNotice?.active && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-industrial-950 font-medium text-xs md:text-sm py-1.5 px-3 md:px-4 text-center shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <div className="flex items-center gap-1.5 justify-center">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0 animate-pulse text-industrial-950" />
              <span className="leading-tight">{settings.bannerNotice.text}</span>
            </div>
            {settings.bannerNotice.link && (
              <Link to={settings.bannerNotice.link} className="inline-flex items-center font-bold underline hover:text-white transition-colors whitespace-nowrap text-industrial-950">
                Explore Now &rarr;
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Top Utility Contact Bar */}
      <div className="top-utility-bar hidden lg:block bg-slate-50 border-b border-slate-200 text-xs text-slate-600 py-2 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Left: Certifications & Tagline */}
          <div className="flex items-center gap-3 xl:gap-4 flex-shrink-0 text-xs">
            <span className="flex items-center gap-1.5 text-[#3D9B28] font-bold tracking-wide whitespace-nowrap flex-shrink-0">
              <Shield className="w-3.5 h-3.5 flex-shrink-0 text-[#3D9B28]" />
              Manufacturers of Industrial Food Machinery
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-700 font-semibold whitespace-nowrap flex-shrink-0">
              ISO 9001:2015 & CE
            </span>
            <span className="text-slate-300">|</span>
            <span className="whitespace-nowrap flex-shrink-0 text-slate-600">GSTIN: <strong className="text-slate-900 font-mono font-bold">{settings.gstin}</strong></span>
          </div>

          {/* Right: Quick Contacts & Admin CMS Link */}
          <div className="flex items-center gap-4 xl:gap-5 flex-shrink-0 text-xs">
            <a 
              href={`mailto:${settings.email}`} 
              className="flex items-center gap-1.5 hover:text-[#3D9B28] transition-colors text-slate-700 whitespace-nowrap flex-shrink-0 font-medium"
              title="Technical Email Desk"
            >
              <Mail className="w-3.5 h-3.5 text-[#3D9B28] flex-shrink-0" />
              <span className="whitespace-nowrap font-sans">{settings.email}</span>
            </a>
            <a 
              href={`tel:${settings.phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-1.5 hover:text-[#3D9B28] transition-colors text-slate-900 whitespace-nowrap flex-shrink-0 font-bold"
              title="Call Factory Desk"
            >
              <Phone className="w-3.5 h-3.5 text-[#3D9B28] flex-shrink-0" />
              <span className="whitespace-nowrap font-mono">{settings.phone}</span>
            </a>
            <a 
              href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery%20Team,%20I%20want%20to%20inquire%20about%20your%20machinery.`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 transition-colors whitespace-nowrap flex-shrink-0 font-bold"
              title="WhatsApp Sales"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366] flex-shrink-0" />
              <span className="whitespace-nowrap">WhatsApp</span>
            </a>

            {/* Admin Portal Link */}
            {user ? (
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link 
                  to="/admin" 
                  className="flex items-center gap-1 bg-emerald-50 hover:bg-[#3D9B28] hover:text-white text-[#2E7D1E] px-2.5 py-1 rounded text-[11px] font-semibold transition-all border border-emerald-200 whitespace-nowrap flex-shrink-0 shadow-sm"
                  title="Admin CMS Control Panel"
                >
                  <Lock className="w-3 h-3 flex-shrink-0" />
                  <span>Admin CMS</span>
                </Link>
                <button 
                  onClick={logout}
                  className="text-slate-500 hover:text-red-500 text-[11px] font-medium transition-colors whitespace-nowrap flex-shrink-0 px-1"
                  title="Logout Session"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/admin" 
                className="flex items-center gap-1 bg-white hover:bg-[#3D9B28] hover:text-white text-slate-700 px-2.5 py-1 rounded text-[11px] font-semibold transition-all border border-slate-200 shadow-sm whitespace-nowrap flex-shrink-0"
                title="Admin CMS Login"
              >
                <Lock className="w-3 h-3 flex-shrink-0" />
                <span>Admin CMS</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="main-navbar bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 lg:gap-4">
          
          {/* Logo - raghavfoodmachines.com style */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <img 
              src="/raghav-logo.png" 
              alt="Raghav Food Machinery Company" 
              className="w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12 object-contain bg-white rounded-xl p-0.5 border border-slate-200 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col flex-shrink-0 leading-tight">
              <span className="font-montserrat font-black text-base sm:text-lg xl:text-xl 2xl:text-2xl tracking-wider text-slate-900 group-hover:text-[#3D9B28] transition-colors uppercase whitespace-nowrap">
                RAGHAV <span className="text-[#3D9B28]">FOOD</span>
              </span>
              <span className="text-[8px] sm:text-[9px] xl:text-[10px] font-montserrat font-bold text-slate-500 tracking-widest uppercase -mt-0.5 whitespace-nowrap">
                MACHINERY COMPANY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links + Search Box (Search placed immediately AFTER Contact) */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 flex-shrink-0">
            {/* Nav Links: Home, Machines, Services, Gallery, About Us, Testimonials, Contact */}
            <div className="flex items-center gap-0.5 xl:gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-[13px] font-montserrat font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive(link.path)
                      ? 'text-white bg-[#3D9B28] shadow-sm font-bold'
                      : 'text-slate-700 hover:text-[#3D9B28] hover:bg-slate-100/80'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Search Box: Positioned immediately AFTER the Contact item with compact width */}
            <div ref={searchRef} className="relative ml-0.5 xl:ml-1.5">
              <form 
                onSubmit={handleSearchSubmit}
                className="flex items-center relative w-36 lg:w-40 xl:w-48 2xl:w-52 transition-all"
              >
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                  onFocus={() => {
                    setIsSearchFocused(true);
                    if (searchQuery.trim()) handleSearchInputChange(searchQuery);
                  }}
                  placeholder="Search machines..."
                  className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 text-xs rounded-xl pl-8 pr-7 py-1.5 xl:py-2 border border-slate-200 focus:border-[#3D9B28] focus:ring-2 focus:ring-[#3D9B28]/20 outline-none transition-all shadow-inner font-sans"
                />
                {searchQuery ? (
                  <button 
                    type="button" 
                    onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                    className="absolute right-2 text-slate-400 hover:text-slate-600 p-0.5"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="absolute right-2 text-slate-400 hover:text-[#3D9B28] p-0.5"
                    aria-label="Submit search"
                  >
                    <Search className="w-3 h-3" />
                  </button>
                )}
              </form>

              {/* Live Search Floating Results Dropdown */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in-50 duration-150 w-72 xl:w-80 max-h-80 overflow-y-auto">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Machines Matching "{searchQuery}"
                  </div>
                  <div className="space-y-1 mt-1">
                    {searchResults.map((item) => (
                      <Link
                        key={item._id || item.slug}
                        to={`/product/${item.slug}`}
                        onClick={() => {
                          setIsSearchFocused(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <img 
                          src={item.images?.[0] || '/raghav-logo.png'} 
                          alt={item.name} 
                          className="w-10 h-10 object-contain rounded-lg bg-slate-50 border border-slate-100 p-0.5 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#3D9B28] truncate">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-slate-500 flex items-center justify-between mt-0.5">
                            <span className="truncate max-w-[130px]">{item.category || 'Machinery'}</span>
                            <span className="font-bold text-slate-900 ml-1 flex-shrink-0">{item.price}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="pt-2 mt-1.5 border-t border-slate-100 px-2 flex justify-between items-center text-[11px] text-slate-500">
                    <span>Press Enter to view all</span>
                    <button 
                      type="button"
                      onClick={handleSearchSubmit}
                      className="text-[#3D9B28] font-bold hover:underline"
                    >
                      View All Results →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            {/* Call Icon Button */}
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-[#3D9B28] hover:text-white text-slate-700 flex items-center justify-center transition-all border border-slate-200 shadow-sm"
              title="Call Raghav Food"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* RFQ Quote Cart Drawer Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center gap-1.5 bg-[#3D9B28] hover:bg-[#2E7D1E] text-white px-3 sm:px-3.5 py-2 rounded-lg text-xs font-montserrat font-bold transition-all shadow-sm flex-shrink-0 whitespace-nowrap"
              title="View Request For Quote Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">RFQ Quote</span>
              {totalItemCount > 0 && (
                <span className="bg-white text-[#2E7D1E] text-[10px] font-black px-1.5 py-0.2 rounded-full shadow-sm">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 bg-white rounded-2xl p-4 shadow-xl flex flex-col gap-2 animate-in fade-in-50 duration-200">
            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                placeholder="Search food processing machines..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-[#3D9B28] focus:bg-white outline-none font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-white bg-[#3D9B28] font-bold'
                    : 'text-slate-700 hover:text-[#3D9B28] hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 mt-2 border-t border-slate-200 flex flex-col gap-2">
              <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-600 font-medium">Visual Theme</span>
                <ThemeSwitcher />
              </div>

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold text-[#2E7D1E] bg-emerald-50 border border-emerald-200"
              >
                <span>Admin CMS Panel</span>
                <Lock className="w-4 h-4" />
              </Link>

              {user ? (
                <div className="flex items-center justify-between px-4 py-2 text-sm text-slate-600">
                  <span>Logged in as <strong>{isAdmin || user.name?.toLowerCase().includes('admin') ? 'Admin' : user.name}</strong></span>
                  <button 
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="text-red-500 hover:text-red-600 text-xs font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }}
                  className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-lg text-sm font-medium border border-slate-200"
                >
                  Client Sign In / Register
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

