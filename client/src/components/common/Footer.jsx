import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Wrench, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();

  const machineLinks = [
    { name: 'Canning Retort Sterilizers (120L - 1500L)', path: '/machines?category=retort-sterilization' },
    { name: 'Kurkure & Snacks Extruder Machines', path: '/machines?category=snacks-extrusion-lines' },
    { name: 'Continuous Namkeen & Chips Fryers', path: '/machines?category=snacks-extrusion-lines' },
    { name: 'Industrial Vegetable & Fruit Dryers', path: '/machines?category=vegetable-fruit-processing' },
    { name: 'Heavy-Duty Commercial Fruit Pulpers', path: '/machines?category=vegetable-fruit-processing' },
    { name: 'Steam Jacketed Tilting Kettles', path: '/machines?category=commercial-kettles-cooking' },
    { name: 'Micro Spice & Grain Pulverizers', path: '/machines?category=spices-grain-pulverizers' },
    { name: 'Continuous Nitrogen Band Sealers', path: '/machines?category=packaging-sealing' },
  ];

  const services = [
    { name: 'Turnkey Food Plant Engineering', path: '/services' },
    { name: 'Custom SS304/SS316 Fabrication', path: '/services' },
    { name: 'On-Site Erection & Commissioning', path: '/services' },
    { name: 'Annual Maintenance Contracts (AMC)', path: '/services' },
    { name: 'Operator SOP & Food Safety Training', path: '/services' },
  ];

  return (
    <footer className="site-footer relative bg-slate-100 border-t border-slate-200 pt-16 pb-24 md:pb-12 text-slate-600 text-sm overflow-hidden">
      {/* Background Watermark Emblem */}
      <div className="absolute -right-16 -bottom-16 w-96 h-96 opacity-[0.035] pointer-events-none select-none">
        <img src="/raghav-emblem-transparent.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Top Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-200">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#3D9B28]/10 text-[#3D9B28] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm font-montserrat">ISO 9001:2015</h4>
              <p className="text-xs text-slate-500">Certified Quality Control</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#3D9B28]/10 text-[#3D9B28] flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm font-montserrat">SS-304 & SS-316</h4>
              <p className="text-xs text-slate-500">100% Food-Grade Alloys</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#3D9B28]/10 text-[#3D9B28] flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm font-montserrat">500+ Installations</h4>
              <p className="text-xs text-slate-500">Pan-India & Export</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#3D9B28]/10 text-[#3D9B28] flex items-center justify-center flex-shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm font-montserrat">24/7 Tech AMC</h4>
              <p className="text-xs text-slate-500">Genuine Spare Parts Support</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 py-12">
          
          {/* Col 1: Company Bio & Details (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3.5 group">
              <img 
                src="/raghav-logo.png" 
                alt="Raghav Food Machinery Company" 
                className="w-12 h-12 rounded-xl border border-slate-200 bg-white p-1 object-contain flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform" 
              />
              <div className="flex flex-col leading-tight">
                <span className="font-montserrat font-black text-xl text-slate-900 tracking-wider group-hover:text-[#3D9B28] transition-colors">
                  RAGHAV <span className="text-[#3D9B28]">FOOD</span>
                </span>
                <span className="text-[10px] font-montserrat font-bold text-slate-500 tracking-widest uppercase">
                  MACHINERY COMPANY
                </span>
              </div>
            </Link>

            <p className="text-slate-600 text-sm leading-relaxed mt-1">
              Raghav Food Processing Machine is an Indian manufacturer specializing in canning retort autoclaves, continuous band sealers, snacks extrusion lines, commercial kettles, and food-grade stainless steel machinery.
            </p>

            <div className="flex flex-col gap-2 mt-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#3D9B28] mt-0.5 flex-shrink-0" />
                <span><strong className="text-slate-900">Principal Place & Works:</strong> {settings.factoryAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#3D9B28] flex-shrink-0" />
                <span>{settings.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Machinery Verticals (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-montserrat font-bold text-slate-900 text-base mb-4 border-l-2 border-[#3D9B28] pl-2.5">
              Key Machinery
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              {machineLinks.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} className="text-slate-600 hover:text-[#3D9B28] transition-colors flex items-center gap-1.5 font-medium">
                    <span className="text-[#3D9B28]">&rsaquo;</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Engineering Services (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-montserrat font-bold text-slate-900 text-base mb-4 border-l-2 border-[#3D9B28] pl-2.5">
              Services & Setup
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              {services.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} className="text-slate-600 hover:text-[#3D9B28] transition-colors flex items-center gap-1.5 font-medium">
                    <span className="text-[#3D9B28]">&rsaquo;</span>
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/catalog" className="text-[#3D9B28] font-bold hover:underline flex items-center gap-1">
                  Download Catalog &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Direct Support & Inquiry */}
          <div className="lg:col-span-4">
            <h4 className="font-montserrat font-bold text-slate-900 text-base mb-4 border-l-2 border-[#3D9B28] pl-2.5">
              Sales & Support
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-[#3D9B28] transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#3D9B28] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="min-w-0">
                  <div className="text-[11px] text-slate-500">Call Factory Desk</div>
                  <div className="text-sm font-bold text-slate-900 whitespace-nowrap font-mono">{settings.phone}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery%20Team,%20I%20need%20commercial%20quotation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:border-emerald-400 text-emerald-800 transition-colors group"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="min-w-0">
                  <div className="text-[11px] text-emerald-700 font-medium">WhatsApp Live Chat</div>
                  <div className="text-sm font-bold text-emerald-950 whitespace-nowrap font-mono">{settings.whatsappNumber || settings.phone}</div>
                </div>
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-[#3D9B28] transition-colors text-xs text-slate-700 group min-w-0"
                title={settings.email}
              >
                <Mail className="w-4 h-4 text-[#3D9B28] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate select-all text-slate-800 group-hover:text-[#3D9B28] font-mono text-[11px] sm:text-xs font-medium">
                  {settings.email}
                </span>
              </a>

              <div className="mt-1 text-xs text-slate-500">
                GSTIN: <span className="text-slate-900 font-mono font-bold">{settings.gstin}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 mt-4 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {settings.companyName || 'Raghav Food Processing Machine'}. All Rights Reserved. Turnkey Industrial Machinery.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-slate-600 hover:text-[#3D9B28]">About Us</Link>
            <span>&bull;</span>
            <Link to="/contact" className="text-slate-600 hover:text-[#3D9B28]">Contact & Factory Map</Link>
            <span>&bull;</span>
            <Link to="/admin" className="text-[#3D9B28] hover:text-[#2E7D1E] font-semibold">Admin Panel</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
