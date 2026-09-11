import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { api } from '../services/api';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBlogs().then(res => {
      if (res.success) setBlogs(res.blogs || []);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold text-amber-brand uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          Technical Knowledge Base
        </span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Food Processing Insights & Guides
        </h1>
        <p className="text-sm text-industrial-300 leading-relaxed">
          Deep-dives into retort pouch sterilization kinetics, SS304 vs SS316 food metallurgy, commercial snacks formulation, and preventive maintenance SOPs.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-amber-brand border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <article
              key={b._id || b.slug}
              className="rounded-3xl bg-industrial-900/80 border border-industrial-800 hover:border-amber-500/40 overflow-hidden shadow-card-dark flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-industrial-950">
                  <img
                    src={b.coverImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-industrial-950/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold text-amber-brand border border-industrial-800">
                    {b.category || 'Engineering'}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-industrial-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-industrial-500" />
                      {b.readingTime || '5 min'}
                    </span>
                    <span>&bull;</span>
                    <span>{new Date(b.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <Link to={`/blog/${b.slug}`}>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-brand transition-colors line-clamp-2">
                      {b.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-industrial-400 line-clamp-3 leading-relaxed">
                    {b.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/blog/${b.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-brand hover:text-amber-glow group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Full Technical Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </article>
          ))}
        </div>
      )}

    </div>
  );
}

