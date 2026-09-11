import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, MessageSquare, CheckCircle2, Building, Phone, MapPin, User, FileText, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export default function RfqDrawer() {
  const { items, isDrawerOpen, setIsDrawerOpen, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [businessName, setBusinessName] = useState(user?.businessName || '');
  const [state, setState] = useState(user?.state || '');
  const [requirements, setRequirements] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState('');

  if (!isDrawerOpen) return null;

  const handleSubmitRfq = async (e) => {
    e.preventDefault();
    if (!customerName || !phone) {
      setError('Please provide your name and phone number.');
      return;
    }
    if (items.length === 0) {
      setError('Your quote basket is empty. Please add at least one machine.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        customerName,
        phone,
        email,
        businessName,
        state,
        requirements,
        machines: items.map(i => ({
          productId: i.productId,
          name: i.name,
          slug: i.slug,
          capacity: i.capacity,
          quantity: i.quantity
        }))
      };

      const res = await api.submitEnquiry(payload);
      if (res.success) {
        setSubmittedData({
          enquiryNumber: res.enquiry.enquiryNumber,
          whatsappUrl: res.whatsappUrl
        });
        clearCart();
        // Fire celebration confetti!
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      } else {
        setError(res.message || 'Submission failed.');
      }
    } catch (err) {
      setError(err.message || 'Error submitting quote request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-industrial-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Slide-out Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-industrial-900 border-l border-industrial-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-industrial-800 flex items-center justify-between bg-industrial-950/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-brand flex items-center justify-center border border-amber-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">Request for Quote (RFQ)</h3>
                <p className="text-xs text-industrial-400">
                  {items.length} {items.length === 1 ? 'Machine' : 'Machines'} in your specification basket
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 text-industrial-400 hover:text-white rounded-lg hover:bg-industrial-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Success State */}
            {submittedData ? (
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-4 animate-fade-in my-auto">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-xl text-white">Quote Request Received!</h4>
                <p className="text-xs text-industrial-300">
                  Your reference ID is <strong className="text-amber-brand font-mono text-sm">{submittedData.enquiryNumber}</strong>. Our senior technical consultant will prepare your machine layout and pro-forma invoice shortly.
                </p>

                {/* WhatsApp One-Click Action */}
                <div className="pt-2">
                  <a
                    href={submittedData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-lg shadow-emerald-950/50 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-white/20" />
                    <span>Open Quote on WhatsApp</span>
                  </a>
                  <p className="text-[11px] text-industrial-400 mt-2">
                    Connects directly with Raghav Machinery sales engineer on WhatsApp with pre-filled specs!
                  </p>
                </div>

                <button
                  onClick={() => { setSubmittedData(null); setIsDrawerOpen(false); }}
                  className="text-xs text-industrial-400 hover:text-white underline pt-2"
                >
                  Close Drawer & Continue Browsing
                </button>
              </div>
            ) : (
              <>
                {/* Machinery List */}
                {items.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-industrial-800 rounded-2xl">
                    <p className="text-sm text-industrial-400">Your specification basket is empty.</p>
                    <p className="text-xs text-industrial-500 mt-1">Browse our machines and click "Add to RFQ".</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-industrial-400">
                      <span>Selected Machines</span>
                      <button 
                        onClick={clearCart}
                        className="text-red-400 hover:text-red-300 flex items-center gap-1 text-[11px]"
                      >
                        <Trash2 className="w-3 h-3" /> Clear All
                      </button>
                    </div>

                    {items.map((item) => (
                      <div 
                        key={item.productId || item.slug}
                        className="flex items-center gap-3 p-3 rounded-xl bg-industrial-950 border border-industrial-800/80"
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-14 h-14 rounded-lg object-cover bg-industrial-900 border border-industrial-800 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                          <span className="text-[11px] text-amber-brand block">{item.capacity}</span>
                          <span className="text-[10px] text-industrial-500">{item.price}</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 bg-industrial-900 border border-industrial-800 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.productId || item.slug, item.quantity - 1)}
                            className="text-industrial-400 hover:text-white p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId || item.slug, item.quantity + 1)}
                            className="text-industrial-400 hover:text-white p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId || item.slug)}
                          className="text-industrial-500 hover:text-red-400 p-1"
                          title="Remove from RFQ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* RFQ Form */}
                {items.length > 0 && (
                  <form onSubmit={handleSubmitRfq} className="space-y-3 pt-3 border-t border-industrial-800">
                    <h4 className="text-xs font-bold text-industrial-200 uppercase tracking-wider">
                      Commercial Contact Information
                    </h4>

                    {error && (
                      <div className="p-2.5 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs text-center">
                        {error}
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-medium text-industrial-300 mb-1">Your Name *</label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-industrial-500 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Ramesh Gupta"
                          className="w-full bg-industrial-950 border border-industrial-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:border-amber-brand focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-medium text-industrial-300 mb-1">Mobile / WhatsApp *</label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-industrial-500 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full bg-industrial-950 border border-industrial-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:border-amber-brand focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-industrial-300 mb-1">Company / Plant</label>
                        <div className="relative">
                          <Building className="w-3.5 h-3.5 text-industrial-500 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="Shree Agro Foods"
                            className="w-full bg-industrial-950 border border-industrial-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:border-amber-brand focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-medium text-industrial-300 mb-1">State / Province</label>
                        <div className="relative">
                          <MapPin className="w-3.5 h-3.5 text-industrial-500 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="Gujarat, Haryana, etc."
                            className="w-full bg-industrial-950 border border-industrial-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:border-amber-brand focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-industrial-300 mb-1">Email ID</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="client@gmail.com"
                          className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-brand focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-industrial-300 mb-1">
                        Specific Capacity, Raw Material, or Custom Requests
                      </label>
                      <textarea
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        rows={2}
                        placeholder="e.g. Planning a 200 kg/hr Kurkure line with nitrogen packaging..."
                        className="w-full bg-industrial-950 border border-industrial-800 rounded-lg p-2 text-xs text-white focus:border-amber-brand focus:outline-none resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-industrial-950 font-bold py-3 rounded-xl text-sm transition-all shadow-glow-amber flex items-center justify-center gap-2 mt-2"
                    >
                      {loading ? 'Submitting RFQ...' : 'Submit Request for Quote'}
                      <Send className="w-4 h-4" />
                    </button>

                    <p className="text-[10px] text-industrial-400 text-center">
                      🔒 No spam. Raghav Food Machinery engineers respect your privacy and NDA.
                    </p>
                  </form>
                )}
              </>
            )}

          </div>

          {/* Footer Note */}
          <div className="p-4 border-t border-industrial-800/80 bg-industrial-950/70 text-center text-xs text-industrial-500">
            Factory Direct Pricing &bull; Turnkey Commissioning Support
          </div>

        </div>
      </div>
    </div>
  );
}
