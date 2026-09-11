import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Tag, Share2 } from 'lucide-react';
import { api } from '../services/api';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBlogBySlug(slug).then(res => {
      if (res.success && res.blog) {
        setBlog(res.blog);
      }
    }).finally(() => setLoading(false));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-2 border-amber-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center rounded-3xl bg-industrial-900 border border-industrial-800 space-y-4">
        <h2 className="text-xl font-bold text-white">Article Not Found</h2>
        <Link to="/blog" className="text-xs text-amber-brand underline">&larr; Back to all articles</Link>
      </div>
    );
  }

  return (
    <article className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 py-10 space-y-8">
      
      {/* Breadcrumb / Back */}
      <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-industrial-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Food Tech Knowledge Base</span>
      </Link>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-industrial-400">
          <span className="bg-amber-500/10 text-amber-brand font-bold px-2.5 py-1 rounded-full border border-amber-500/20">
            {blog.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {blog.readingTime}
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(blog.createdAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center gap-3 text-xs text-industrial-300 pt-2 border-t border-industrial-800">
          <User className="w-4 h-4 text-amber-brand" />
          <span>By <strong>{blog.author}</strong></span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="rounded-3xl overflow-hidden bg-industrial-950 border border-industrial-800 h-72 sm:h-96 shadow-2xl">
        <img
          src={blog.coverImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="rounded-3xl bg-industrial-900/80 border border-industrial-800 p-6 md:p-10 space-y-6 text-sm text-industrial-200 leading-relaxed font-sans">
        {blog.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="font-display font-bold text-xl text-white pt-4 border-l-4 border-amber-brand pl-3">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
            return (
              <div key={idx} className="bg-industrial-950/60 p-4 rounded-xl border border-industrial-800/80 space-y-2">
                {paragraph.split('\n').map((line, lIdx) => (
                  <div key={lIdx} className="text-xs text-industrial-300 flex items-start gap-2">
                    <span className="text-amber-brand font-bold">&bull;</span>
                    <span>{line.replace(/^[0-9]+\.\s*|-\s*/, '')}</span>
                  </div>
                ))}
              </div>
            );
          }
          return (
            <p key={idx} className="text-industrial-300 leading-relaxed text-xs sm:text-sm">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-xs text-industrial-500 font-semibold mr-2">Tags:</span>
          {blog.tags.map((tag, idx) => (
            <span key={idx} className="text-xs bg-industrial-900 text-industrial-300 border border-industrial-800 px-3 py-1 rounded-lg">
              #{tag}
            </span>
          ))}
        </div>
      )}

    </article>
  );
}

