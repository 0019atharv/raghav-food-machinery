import React, { useState, useEffect } from 'react';
import { MessageSquareQuote, Plus, Trash2, X, Star } from 'lucide-react';
import { api } from '../../services/api';

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [clientName, setClientName] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('India');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [machinePurchased, setMachinePurchased] = useState('Automatic Retort Machine');
  const [error, setError] = useState('');

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const res = await api.getTestimonials();
      if (res.success) setTestimonials(res.testimonials || []);
    } catch (err) {
      console.error('Failed to load testimonials', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!clientName || !company || !review) {
      setError('Client name, company, and review are required.');
      return;
    }

    try {
      await api.createTestimonial({
        clientName,
        company,
        location,
        rating: Number(rating),
        review,
        machinePurchased
      });
      setIsModalOpen(false);
      loadTestimonials();
    } catch (err) {
      setError(err.message || 'Failed to save testimonial.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.deleteTestimonial(id);
      loadTestimonials();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#3D9B28] uppercase tracking-wider">
            Client Proof & Social Trust
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900">
            Manage Client Testimonials
          </h1>
        </div>

        <button
          onClick={() => {
            setClientName('');
            setCompany('');
            setLocation('Delhi NCR, India');
            setRating(5);
            setReview('');
            setMachinePurchased('Continuous Extruder Line');
            setError('');
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-[#3D9B28] hover:bg-[#2E7D1E] text-white font-bold px-5 py-3 rounded-xl text-xs shadow-sm whitespace-nowrap transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t._id}
            className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "{t.review}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 text-xs block">{t.clientName}</strong>
                <span className="text-[10px] text-[#3D9B28] font-semibold">{t.company} ({t.location})</span>
              </div>

              <button
                onClick={() => handleDelete(t._id)}
                className="text-red-600 hover:text-red-700 text-xs font-semibold"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-lg text-slate-900">Add Client Review</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
            </div>

            {error && <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">{error}</div>}

            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Client Name *</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company *</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Rating (1-5)</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                  >
                    <option value={5}>5 Stars (Excellent)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Machine Model Purchased</label>
                <input
                  type="text"
                  value={machinePurchased}
                  onChange={(e) => setMachinePurchased(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Client Review *</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold px-4 py-2 rounded-xl text-xs shadow-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#3D9B28] hover:bg-[#2E7D1E] text-white font-bold px-5 py-2 rounded-xl text-xs shadow-sm transition-all"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

