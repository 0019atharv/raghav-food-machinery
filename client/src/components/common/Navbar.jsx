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
      <div className="hidden lg:block bg-industrial-950/90 backdrop-blur-md border-b border-industrial-800/80 text-xs text-industrial-400 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Left: Certifications & GSTIN */}
          <div className="flex items-center gap-3 xl:gap-4 flex-shrink-0 text-xs">
            <span className="flex items-center gap-1.5 text-amber-brand font-semibold whitespace-nowrap flex-shrink-0">
              <Shield className="w-3.5 h-3.5 flex-shrink-0" />
              ISO 9001:2015 & CE Certified
            </span>
            <span className="text-industrial-700">|</span>
            <span className="whitespace-nowrap flex-shrink-0">GSTIN: <strong className="text-industrial-200 font-mono">{settings.gstin}</strong></span>
          </div>

          {/* Right: Quick Contacts & Admin CMS Link */}
          <div className="flex items-center gap-4 xl:gap-5 flex-shrink-0 text-xs">
            <a 
              href={`tel:${settings.phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-1.5 hover:text-amber-brand transition-colors text-industrial-300 whitespace-nowrap flex-shrink-0"
              title="Call Factory Desk"
            >
              <Phone className="w-3.5 h-3.5 text-amber-brand flex-shrink-0" />
              <span className="whitespace-nowrap font-mono font-medium">{settings.phone}</span>
            </a>
            <a 
              href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery%20Team,%20I%20want%20to%20inquire%20about%20your%20machinery.`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap flex-shrink-0"
              title="WhatsApp Sales"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-emerald-500/20 flex-shrink-0" />
              <span className="whitespace-nowrap font-medium">WhatsApp Sales</span>
            </a>
            <a 
              href={`mailto:${settings.email}`} 
              className="hidden xl:flex items-center gap-1.5 hover:text-industrial-200 transition-colors whitespace-nowrap flex-shrink-0"
              title="Technical Email Desk"
            >
              <Mail className="w-3.5 h-3.5 text-industrial-500 flex-shrink-0" />
              <span className="whitespace-nowrap font-mono">{settings.email}</span>
            </a>

            {/* Admin Portal Quick Switch & Auth */}
            {user ? (
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link 
                  to="/admin" 
                  className="flex items-center gap-1 bg-amber-500/10 hover:bg-amber-brand hover:text-industrial-950 text-amber-brand px-2.5 py-1 rounded text-[11px] font-semibold transition-all border border-amber-500/30 whitespace-nowrap flex-shrink-0"
                  title="Admin CMS Control Panel"
                >
                  <Lock className="w-3 h-3 flex-shrink-0" />
                  <span>Admin CMS</span>
                </Link>
                <button 
                  onClick={logout}
                  className="text-industrial-400 hover:text-red-400 text-[11px] font-medium transition-colors whitespace-nowrap flex-shrink-0 px-1"
                  title="Logout Session"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/admin" 
                className="flex items-center gap-1 bg-industrial-800 hover:bg-amber-brand hover:text-industrial-950 text-amber-brand px-2.5 py-1 rounded text-[11px] font-semibold transition-all border border-amber-500/20 whitespace-nowrap flex-shrink-0"
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
      <nav className="bg-industrial-900/90 backdrop-blur-xl border-b border-industrial-800/80 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 lg:gap-6">
          
          {/* Logo - Protected with flex-shrink-0 */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-industrial-900 to-industrial-950 border border-amber-500/30 p-1 shadow-glow-amber group-hover:border-amber-400 group-hover:scale-105 transition-all duration-300">
              <img 
                src="/raghav-emblem-transparent.png" 
                alt="Raghav Food Processing Machine" 
                className="w-full h-full object-contain filter drop-shadow group-hover:rotate-6 transition-transform duration-500" 
              />
            </div>
            <div className="flex flex-col flex-shrink-0">
              <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                <span className="font-display font-extrabold text-base sm:text-lg xl:text-xl tracking-tight text-white">
                  RAGHAV
                </span>
                <span className="font-display font-bold text-base sm:text-lg xl:text-xl text-amber-brand">
                  MACHINES
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-industrial-400 tracking-wider uppercase -mt-0.5 whitespace-nowrap">
                Food Processing & Canning Tech
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links (Centered via flex-1 justify-center) */}
          <div className="hidden xl:flex items-center justify-center gap-1 2xl:gap-2 flex-1 mx-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-2.5 2xl:px-3.5 py-1.5 rounded-lg text-xs 2xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive(link.path)
                    ? 'text-amber-brand bg-industrial-800/80 font-semibold shadow-sm'
                    : 'text-industrial-300 hover:text-white hover:bg-industrial-800/40'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Theme Selector Dropdown */}
            <ThemeSwitcher />

            {/* RFQ Quote Cart Drawer Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="hidden sm:flex relative items-center gap-1.5 md:gap-2 bg-gradient-to-r from-amber-500/10 to-amber-600/20 hover:from-amber-500/20 hover:to-amber-600/30 text-amber-glow border border-amber-500/30 px-3 md:px-3.5 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-semibold transition-all shadow-sm flex-shrink-0 whitespace-nowrap"
              title="View Request For Quote Cart"
            >
              <ShoppingCart className="w-4 h-4 text-amber-brand flex-shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">RFQ Quote</span>
              {totalItemCount > 0 && (
                <span className="bg-amber-brand text-industrial-950 text-xs font-extrabold px-1.5 py-0.5 rounded-full animate-bounce">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-industrial-300 hover:text-white hover:bg-industrial-800 transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-industrial-800/80 bg-industrial-900/95 rounded-2xl p-4 shadow-2xl flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-amber-brand bg-industrial-800 font-semibold'
                    : 'text-industrial-300 hover:text-white hover:bg-industrial-800/40'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 mt-2 border-t border-industrial-800 flex flex-col gap-2">
              <div className="flex items-center justify-between px-3 py-2 bg-industrial-950/60 rounded-xl border border-industrial-800">
                <span className="text-xs text-industrial-300 font-medium">Visual Theme</span>
                <ThemeSwitcher />
              </div>

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-amber-brand bg-amber-500/10 border border-amber-500/20"
              >
                <span>Admin CMS Panel</span>
                <Lock className="w-4 h-4" />
              </Link>

              {user ? (
                <div className="flex items-center justify-between px-4 py-2 text-sm text-industrial-400">
                  <span>Logged in as <strong>{isAdmin || user.name?.toLowerCase().includes('admin') ? 'Admin' : user.name}</strong></span>
                  <button 
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="text-red-400 hover:text-red-300 text-xs font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }}
                  className="w-full text-center bg-industrial-800 text-industrial-200 py-2.5 rounded-lg text-sm font-medium"
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

