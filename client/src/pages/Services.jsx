import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  Factory, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Settings, 
  Layers,
  Sparkles
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Services() {
  const { settings } = useSettings();

  const services = [
    {
      icon: Factory,
      title: 'Turnkey Food Plant Engineering & Setup',
      desc: 'Complete engineering from concept to commercial commissioning. We calculate mass balance, design 2D/3D plant layouts, size steam boiler piping, and integrate automation control panels for snacks, RTE retort lines, and fruit juice plants.',
      features: [
        'Detailed CAD floor plan & drain slope design',
        'Steam, compressed air, and electrical load balancing',
        'Sanitary food-grade pipeline routing',
        'Assistance with FSSAI & ISO structural audit compliance'
      ]
    },
    {
      icon: Wrench,
      title: 'Custom SS-304 / SS-316 Machinery Fabrication',
      desc: 'Non-standard custom vessels, agitator tanks, frying pans, and conveyor systems manufactured to your exact batch capacity. We work with heavy 3mm to 8mm plate thicknesses with seamless hygienic TIG welds.',
      features: [
        'CNC fiber laser cutting up to 12mm stainless plate',
        'Custom impeller, ribbon, and scraper agitator blades',
        'Sanitary tri-clamp and SMS food-grade fittings',
        'Mirror polish finish (Ra < 0.4 µm) on food contact surfaces'
      ]
    },
    {
      icon: Settings,
      title: 'On-Site Erection & Mechanical Commissioning',
      desc: 'Our experienced mechanical engineers travel across India to lead foundation mounting, laser alignment, steam connection, and electrical VFD programming until trial batches meet commercial specifications.',
      features: [
        'Precision dynamic balancing of high-speed shafts & motors',
        'Hydrostatic leak & pressure testing under actual operating heat',
        'Calibration of digital PID & PLC temperature sensors',
        'Live pilot batch processing with your raw ingredients'
      ]
    },
    {
      icon: Clock,
      title: 'Annual Maintenance Contracts (AMC) & Spare Parts',
      desc: 'Prevent unplanned plant downtime with scheduled preventive checkups. We maintain a ready warehouse stock of heating elements, mechanical seals, silicone gaskets, solenoid valves, and extruder friction screws.',
      features: [
        'Comprehensive or non-comprehensive annual service plans',
        'Emergency breakdown dispatch within 24–48 hours across North India',
        '100% genuine OEM food-grade replacement components',
        'Discounted rates on wear-and-tear consumables'
      ]
    },
    {
      icon: ShieldCheck,
      title: 'Operator Training & Food Safety SOPs',
      desc: 'A machine is only as good as its operators. We provide on-site hands-on training for your factory staff, teaching daily maintenance routines, Clean-in-Place (CIP) sanitization protocols, and safety interlock operations.',
      features: [
        'Bilingual (Hindi/English) visual SOP operating charts',
        'Emergency shutdown and pressure relief valve maintenance training',
        'Clean-in-Place (CIP) chemical washdown SOPs',
        'Operator certification upon training completion'
      ]
    }
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold text-amber-brand uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          Industrial Support & Solutions
        </span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Food Plant Engineering Services
        </h1>
        <p className="text-sm text-industrial-300 leading-relaxed">
          From greenfield factory layout CAD design to live on-site commissioning and 24/7 AMC coverage — Raghav Food Machinery provides complete lifecycle engineering for food processors.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-8">
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={idx}
              className="rounded-3xl bg-industrial-900/80 border border-industrial-800 p-8 md:p-10 shadow-card-dark grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group hover:border-amber-500/40 transition-colors"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-brand flex items-center justify-center border border-amber-500/20">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white group-hover:text-amber-brand transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-industrial-300 leading-relaxed">
                  {srv.desc}
                </p>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery,%20I%20want%20to%20consult%20regarding%20${encodeURIComponent(srv.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-brand hover:text-amber-glow"
                  >
                    <span>Consult with Chief Engineer on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 bg-industrial-950/80 border border-industrial-800 rounded-2xl p-6 space-y-3">
                <h4 className="text-xs font-bold text-industrial-300 uppercase tracking-wider">
                  Service Scope & Deliverables:
                </h4>
                <ul className="space-y-2.5 text-xs text-industrial-300">
                  {srv.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-brand mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Consultation Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-600 to-amber-700 p-8 md:p-12 text-industrial-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 max-w-xl">
          <h3 className="font-display font-bold text-2xl text-industrial-950">
            Need Expert Plant Layout Consultation?
          </h3>
          <p className="text-xs sm:text-sm text-industrial-950/80 font-medium leading-relaxed">
            Share your available factory square footage, required daily metric tonnage, and target food products for a free CAD layout and project feasibility estimate.
          </p>
        </div>

        <Link
          to="/contact"
          className="bg-industrial-950 hover:bg-industrial-900 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all shadow-xl whitespace-nowrap"
        >
          Book Technical Consultation
        </Link>
      </div>

    </div>
  );
}

