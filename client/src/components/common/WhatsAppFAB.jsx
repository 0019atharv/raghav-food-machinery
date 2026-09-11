import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function WhatsAppFAB() {
  const { settings } = useSettings();
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery%20Team,%20I%20am%20interested%20in%20your%20food%20processing%20machinery.`;

  return (
    <div className="fixed bottom-16 lg:bottom-6 right-5 z-40 flex items-end gap-3">
      {/* Tooltip prompt */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 bg-industrial-900/95 border border-emerald-500/40 text-emerald-300 text-xs px-3.5 py-2 rounded-2xl shadow-xl backdrop-blur-md animate-fade-in">
          <span>Need quick quote? <strong>Chat with Engineer</strong></span>
          <button 
            onClick={() => setTooltipDismissed(true)} 
            className="text-industrial-400 hover:text-white ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Circular Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-white flex items-center justify-center shadow-lg shadow-emerald-950/60 hover:scale-105 transition-all duration-300 group"
      >
        <MessageSquare className="w-7 h-7 fill-white/20 group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
}

