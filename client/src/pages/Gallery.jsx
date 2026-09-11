import React, { useState, useEffect } from 'react';
import { X, ZoomIn, Image as ImageIcon, Camera, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getGallery().then(res => {
      if (res.success) setGallery(res.items || []);
    }).finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'Retort Machines', 'Factory Floor', 'Snacks Line', 'Cooking Kettles', 'Client Plant', 'Machinery'];

  const filteredItems = gallery.filter(item =>
    selectedCategory === 'All' || (item.category || '').toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold text-amber-brand uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          Factory Floor & Project Installations
        </span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Industrial Machinery Showcase
        </h1>
        <p className="text-sm text-industrial-300 leading-relaxed">
          Explore actual photographs of our CNC manufacturing facility, assembly lines, hydrostatic test pits, and client plant installations across India.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-amber-brand text-industrial-950 shadow-glow-amber'
                : 'bg-industrial-900 border border-industrial-800 text-industrial-300 hover:text-white hover:bg-industrial-850'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-amber-brand border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              onClick={() => setLightboxImage(item)}
              className="group relative h-72 rounded-3xl overflow-hidden bg-industrial-900 border border-industrial-800 shadow-card-dark cursor-pointer"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-industrial-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Tag */}
              <div className="absolute top-4 left-4 bg-industrial-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-brand border border-industrial-800">
                {item.category}
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-industrial-950/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <h4 className="font-display font-bold text-sm text-white group-hover:text-amber-brand transition-colors">
                  {item.title}
                </h4>
                {item.caption && (
                  <p className="text-[11px] text-industrial-400 line-clamp-2">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-industrial-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-industrial-900 border border-industrial-800 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-industrial-950/80 text-white hover:text-amber-brand flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-industrial-950 flex items-center justify-center">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-industrial-900 border-t border-industrial-800">
              <span className="text-[10px] font-bold text-amber-brand uppercase tracking-wider block mb-1">
                {lightboxImage.category}
              </span>
              <h3 className="font-display font-bold text-lg text-white">
                {lightboxImage.title}
              </h3>
              {lightboxImage.caption && (
                <p className="text-xs text-industrial-400 mt-1">
                  {lightboxImage.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

