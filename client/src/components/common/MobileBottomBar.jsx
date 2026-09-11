import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, BookOpen, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';

export default function MobileBottomBar() {
  const { totalItemCount, setIsDrawerOpen } = useCart();
  const { settings } = useSettings();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-industrial-950/95 backdrop-blur-xl border-t border-industrial-800 px-3 py-2">
      <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
        {/* Call Now */}
        <a
          href={`tel:${settings.phone.replace(/\s+/g, '')}`}
          className="flex flex-col items-center justify-center gap-1 py-1.5 rounded-lg text-industrial-300 hover:text-white active:bg-industrial-850"
        >
          <Phone className="w-4 h-4 text-amber-brand" />
          <span>Call Desk</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery%20Team,%20I%20need%20details%20and%20quotation.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-1.5 rounded-lg text-emerald-400 hover:text-emerald-300 active:bg-industrial-850"
        >
          <MessageSquare className="w-4 h-4 fill-emerald-500/20" />
          <span>WhatsApp</span>
        </a>

        {/* Catalog */}
        <Link
          to="/catalog"
          className="flex flex-col items-center justify-center gap-1 py-1.5 rounded-lg text-industrial-300 hover:text-white active:bg-industrial-850"
        >
          <BookOpen className="w-4 h-4 text-sky-400" />
          <span>Catalog</span>
        </Link>

        {/* RFQ Quote Basket */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="relative flex flex-col items-center justify-center gap-1 py-1.5 rounded-lg text-amber-brand font-semibold active:bg-industrial-850"
        >
          <div className="relative">
            <ShoppingCart className="w-4 h-4" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-500 text-industrial-950 text-[10px] font-black px-1 rounded-full">
                {totalItemCount}
              </span>
            )}
          </div>
          <span>RFQ Cart</span>
        </button>
      </div>
    </div>
  );
}

