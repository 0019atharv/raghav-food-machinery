import React, { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, CheckCircle2, ShieldCheck, Building } from 'lucide-react';
import { api } from '../services/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTestimonials().then(res => {
      if (res.success) setTestimonials(res.testimonials || []);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold text-amber-brand uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          Client Feedback & Reviews
        </span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Client Testimonials & Field Results
        </h1>
        <p className="text-sm text-industrial-300 leading-relaxed">
          Discover why food manufacturing plants, snacks entrepreneurs, and spice exporters trust Raghav Food Machinery for high uptime and rapid after-sales service.
        </p>
      </div>

      {/* Testimonials Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-amber-brand border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item._id}
              className="p-8 rounded-3xl bg-industrial-900/80 border border-industrial-800 shadow-card-dark flex flex-col justify-between space-y-6 hover:border-amber-500/40 transition-colors"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-brand">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-brand" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-industrial-200 italic leading-relaxed">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-industrial-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                    alt={item.clientName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-brand"
                  />
                  <div>
                    <h4 className="font-bold text-white text-xs">{item.clientName}</h4>
                    <span className="text-[11px] text-amber-brand font-semibold block">{item.company}</span>
                    <span className="text-[10px] text-industrial-500">{item.location}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] bg-industrial-950 px-2 py-1 rounded text-industrial-400 font-mono block">
                    {item.machinePurchased}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

