import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, CheckCircle2, ArrowRight, ShieldCheck, Phone, MessageSquare } from 'lucide-react';
import { api } from '../services/api';
import { useSettings } from '../context/SettingsContext';

export default function Catalog() {
  const [categories, setCategories] = useState([]);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const { settings } = useSettings();

  useEffect(() => {
    api.getCategories().then(res => {
      if (res.success) setCategories(res.categories || []);
    });
  }, []);

  const handleDownload = (catalogName) => {
    setDownloadSuccess(true);
    // Simulate realistic PDF brochure download trigger
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${catalogName.replace(/\s+/g, '_')}_Raghav_Food_Machinery.pdf`;
    setTimeout(() => {
      alert(`Brochure for "${catalogName}" downloaded successfully! Check your downloads.`);
      setDownloadSuccess(false);
    }, 600);
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold text-amber-brand uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          Comprehensive 2026 Edition
        </span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Machinery Catalog & Spec Sheets
        </h1>
        <p className="text-sm text-industrial-300 leading-relaxed">
          Download comprehensive engineering blueprints, CAD layout dimensions, utility power requirements, and product brochures for our complete industrial equipment lineup.
        </p>
      </div>

      {/* Main Download Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-industrial-900 via-industrial-850 to-industrial-900 border border-amber-500/30 p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-brand flex items-center justify-center border border-amber-500/30">
            <FileText className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-2xl text-white">
            Complete Industrial Food Machinery Master Catalog (PDF)
          </h2>
          <p className="text-xs text-industrial-300 leading-relaxed">
            Includes Retorts, Continuous Extruders, Automatic Fryers, Fruit Pulpers, Kettles, Dryers, Spices Pulverizers, and Nitrogen Band Sealers. Over 48 pages of engineering specifications.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-industrial-400">
            <span>Format: <strong>High-Res PDF</strong></span>
            <span>&bull;</span>
            <span>Size: <strong>14.8 MB</strong></span>
            <span>&bull;</span>
            <span>Language: <strong>English / Hindi</strong></span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <button
            onClick={() => handleDownload('Master_Food_Machinery_Catalog_2026')}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-industrial-950 font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-glow-amber flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Master PDF (Free)</span>
          </button>

          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery,%20please%20send%20the%20complete%20PDF%20catalog%20on%20WhatsApp.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-semibold py-3.5 px-6 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Receive via WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Category-Wise Brochure Downloads */}
      <div className="space-y-6">
        <h3 className="font-display font-bold text-xl text-white border-l-4 border-amber-brand pl-3">
          Category-Specific Technical Spec Sheets
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id || cat.slug}
              className="p-6 rounded-2xl bg-industrial-900/80 border border-industrial-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-brand font-semibold">Technical Brochure</span>
                  <span className="text-[10px] bg-industrial-950 px-2 py-0.5 rounded text-industrial-400">PDF</span>
                </div>
                <h4 className="font-display font-bold text-lg text-white group-hover:text-amber-brand transition-colors">
                  {cat.name}
                </h4>
                <p className="text-xs text-industrial-400 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-industrial-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleDownload(`${cat.name}_Spec_Sheet`)}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-brand hover:text-amber-glow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Spec Sheet</span>
                </button>

                <Link
                  to={`/machines?category=${cat.slug}`}
                  className="text-xs text-industrial-400 hover:text-white"
                >
                  View Models &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

