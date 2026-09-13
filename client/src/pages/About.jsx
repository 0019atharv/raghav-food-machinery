import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Factory, Award, CheckCircle2, ArrowRight, Wrench, Users, Globe2, Sparkles } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function About() {
  const { settings } = useSettings();

  useEffect(() => {
    document.title = 'About Our Food Machinery Engineering | Raghav Food Processing Machines';
  }, []);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16 overflow-hidden">
      {/* Background Watermark Emblem */}
      <div className="absolute -right-20 top-20 w-96 h-96 opacity-[0.035] pointer-events-none select-none z-0">
        <img src="/raghav-emblem-transparent.png" alt="" className="w-full h-full object-contain" />
      </div>
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
        {/* Official Badge Logo */}
        <div className="flex items-center justify-center mb-4">
          <img 
            src="/raghav-logo.png" 
            alt="Raghav Food Processing Machine Official Badge Logo" 
            className="h-16 sm:h-20 w-auto object-contain rounded-2xl bg-white/95 p-2.5 shadow-xl border border-amber-500/30 hover:scale-105 transition-transform" 
          />
        </div>
        <span className="text-xs font-mono font-bold text-amber-brand uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          About Raghav Food Machinery
        </span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Three Decades of Precision Food Engineering
        </h1>
        <p className="text-sm text-industrial-300 leading-relaxed">
          Pioneering Indian manufacturing for retort autoclaves, continuous snack extruders, commercial cooking vessels, and dehydration equipment.
        </p>
      </div>

      {/* Story & Facility Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <div className="lg:col-span-7 space-y-5">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Built by Engineers. Trusted by 500+ Food Processors.
          </h2>
          <p className="text-xs sm:text-sm text-industrial-300 leading-relaxed">
            Founded with a steadfast mission to replace expensive imported food processing machinery with rugged, high-precision, locally serviceable Indian equipment, <strong>Raghav Food Processing Machine</strong> (Proprietorship: Naresh) has grown to become a trusted manufacturer across Delhi NCR, Punjab, Gujarat, Rajasthan, and nationwide markets.
          </p>
          <p className="text-xs sm:text-sm text-industrial-300 leading-relaxed">
            Our manufacturing facility and workshop located at <strong>House No. 388, 1st Floor, JJ Colony Block-1, Near Gurudwara, Mangol Puri, North West Delhi - 110083</strong> is equipped with precision machinery, automated orbital TIG welding rigs, dish-forming equipment, and dedicated hydrostatic pressure testing pits.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800">
              <div className="font-display font-extrabold text-2xl text-amber-brand">SS-304 & 316</div>
              <div className="text-xs text-industrial-400 mt-1">Certified Food-Grade Alloys</div>
            </div>
            <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800">
              <div className="font-display font-extrabold text-2xl text-white">500+</div>
              <div className="text-xs text-industrial-400 mt-1">Commercial Plants Installed</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden bg-industrial-900 border border-industrial-800 shadow-2xl">
            <img
              src="/raghav-workshop.jpg"
              alt="Raghav Food Processing Machine Manufacturing Facility & Workshop"
              className="w-full h-80 sm:h-96 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789209783/raghav-food-processing-machines/raghav-manufacturing-workshop-facility.jpg";
              }}
            />
            <div className="p-4 bg-industrial-950/90 border-t border-industrial-800 text-xs text-industrial-400 flex items-center justify-between">
              <span>Mangol Puri, New Delhi</span>
              <span className="text-amber-brand font-semibold font-mono">GST: 07AREPN9294Q1ZQ</span>
            </div>
          </div>
        </div>

      </div>

      {/* Infrastructure & Quality Control Standards */}
      <section className="space-y-8">
        <h3 className="font-display text-2xl font-bold text-white border-l-4 border-amber-brand pl-3">
          Manufacturing Standards & Quality Inspection
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-industrial-900/80 border border-industrial-800 space-y-3">
            <ShieldCheck className="w-8 h-8 text-amber-brand" />
            <h4 className="font-bold text-white text-base">Metallurgical Spectrometry</h4>
            <p className="text-xs text-industrial-400 leading-relaxed">
              Every incoming stainless steel coil and plate is tested via X-ray fluorescence spectrometry to verify genuine 18/8 SS-304 and molybdenum-rich SS-316 content before cutting begins.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-industrial-900/80 border border-industrial-800 space-y-3">
            <Wrench className="w-8 h-8 text-amber-brand" />
            <h4 className="font-bold text-white text-base">Hydrostatic Pressure Testing</h4>
            <p className="text-xs text-industrial-400 leading-relaxed">
              Every Canning Retort and Steam Jacketed Kettle is hydrostatically pressure tested up to 1.5x design pressure for 60 minutes with certified calibrated digital recording gauges.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-industrial-900/80 border border-industrial-800 space-y-3">
            <Award className="w-8 h-8 text-amber-brand" />
            <h4 className="font-bold text-white text-base">Sanitary Polishing & Passivation</h4>
            <p className="text-xs text-industrial-400 leading-relaxed">
              Internal food contact zones undergo chemical passivation and mechanical mirror polishing to prevent bacterial adhesion and satisfy stringent FSSAI and US-FDA hygiene criteria.
            </p>
          </div>
        </div>
      </section>

      {/* Visit Factory CTA */}
      <div className="rounded-3xl bg-industrial-900 border border-amber-500/30 p-8 md:p-12 text-center space-y-4 max-w-4xl mx-auto shadow-2xl">
        <h3 className="font-display font-bold text-2xl text-white">
          Inspect Our Workshop in Person
        </h3>
        <p className="text-xs sm:text-sm text-industrial-300 max-w-xl mx-auto leading-relaxed">
          We invite plant managers, entrepreneurs, and food technologists to inspect our raw material stock, observe live CNC machine cutting, and test trial batches.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="bg-amber-brand hover:bg-amber-400 text-industrial-950 font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-glow-amber"
          >
            Schedule Factory Visit
          </Link>
          <Link
            to="/machines"
            className="bg-industrial-800 hover:bg-industrial-700 text-white font-semibold px-6 py-3 rounded-xl text-xs transition-colors border border-industrial-700"
          >
            Explore Machine Catalog &rarr;
          </Link>
        </div>
      </div>

    </div>
  );
}

