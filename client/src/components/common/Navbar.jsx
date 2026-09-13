import React, { useState } from 'react';
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
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout, setAuthModalOpen } = useAuth();
  const { totalItemCount, setIsDrawerOpen } = useCart();
  const { settings } = useSettings();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Machines', path: '/machines' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'About Us', path: '/about' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

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
      <nav className="main-navbar bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 lg:gap-5">
          
          {/* Logo - raghavfoodmachines.com style */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <img 
              src="/raghav-logo.png" 
              alt="Raghav Food Machinery Company" 
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain bg-white rounded-xl p-0.5 border border-slate-200 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col flex-shrink-0 leading-tight">
              <span className="font-montserrat font-black text-lg sm:text-xl xl:text-2xl tracking-wider text-slate-900 group-hover:text-[#3D9B28] transition-colors uppercase whitespace-nowrap">
                RAGHAV <span className="text-[#3D9B28]">FOOD</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-montserrat font-bold text-slate-500 tracking-widest uppercase -mt-0.5 whitespace-nowrap">
                MACHINERY COMPANY
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const q = e.target.elements.searchQuery?.value?.trim();
              if (q) navigate(`/machines?search=${encodeURIComponent(q)}`);
            }}
            className="hidden lg:flex items-center relative flex-1 max-w-xs xl:max-w-sm mx-2"
          >
            <input 
              name="searchQuery"
              type="text" 
              placeholder="Search food processing machines..."
              className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 text-xs rounded-xl pl-9 pr-3 py-2 border border-slate-200 focus:border-[#3D9B28] outline-none transition-all shadow-inner"
            />
            <button type="submit" className="absolute left-2.5 text-slate-400 hover:text-[#3D9B28]" aria-label="Search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </form>

          {/* Center: Desktop Navigation Links (High contrast on light background) */}
          <div className="hidden xl:flex items-center justify-center gap-1 2xl:gap-1.5 flex-shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-2.5 2xl:px-3 py-1.5 rounded-lg text-xs 2xl:text-sm font-montserrat font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive(link.path)
                    ? 'text-white bg-[#3D9B28] shadow-sm font-bold'
                    : 'text-slate-700 hover:text-[#3D9B28] hover:bg-slate-100/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
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
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-slate-200 bg-white rounded-2xl p-4 shadow-xl flex flex-col gap-1.5">
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

