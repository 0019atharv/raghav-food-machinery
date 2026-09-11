import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { api } from '../services/api';

export default function Contact() {
  const { settings } = useSettings();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [requirements, setRequirements] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !phone) {
      setError('Please provide your name and phone number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.submitEnquiry({
        customerName,
        phone,
        email,
        businessName,
        state,
        city,
        requirements,
        machines: []
      });

      if (res.success) {
        setSubmitted(true);
        setWhatsappUrl(res.whatsappUrl);
      } else {
        setError(res.message || 'Submission failed.');
      }
    } catch (err) {
      setError(err.message || 'Error submitting contact form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold text-amber-brand uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Contact Raghav Food Machinery
        </h1>
        <p className="text-sm text-industrial-300 leading-relaxed">
          Request commercial machinery quotation, schedule a live factory trial run in Kundli, or consult our engineering team regarding your plant requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Contact Cards & Location */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Contact Card */}
          <div className="rounded-3xl bg-industrial-900/80 border border-industrial-800 p-6 md:p-8 space-y-6">
            <h3 className="font-display font-bold text-xl text-white">
              Sales & Factory Inquiries
            </h3>

            <div className="space-y-4 text-xs">
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-industrial-950 border border-industrial-800 hover:border-amber-500/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-brand flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-industrial-400 text-[11px]">Primary Factory Desk</div>
                  <strong className="text-white text-sm">{settings.phone}</strong>
                  <div className="text-industrial-500 text-[10px] mt-0.5">Direct line to Sales Engineering</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hello%20Raghav%20Food%20Machinery%20Team,%20I%20need%20commercial%20quotation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-800/50 hover:border-emerald-500 text-emerald-400 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 fill-emerald-500/20" />
                </div>
                <div>
                  <div className="text-emerald-300 text-[11px]">WhatsApp Live Chat</div>
                  <strong className="text-white text-sm">{settings.whatsappNumber}</strong>
                  <div className="text-emerald-500/80 text-[10px] mt-0.5">Send RFQs, Drawings & Audio Notes</div>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-industrial-950 border border-industrial-800">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-industrial-400 text-[11px]">Email Addresses</div>
                  <a href={`mailto:${settings.email}`} className="text-white font-medium block hover:text-amber-brand">
                    {settings.email}
                  </a>
                  <a href={`mailto:${settings.supportEmail}`} className="text-industrial-400 block hover:text-white mt-0.5">
                    {settings.supportEmail}
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-industrial-950 border border-industrial-800 space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-brand flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Manufacturing Facility & Works</strong>
                    <span className="text-industrial-400 leading-relaxed block mt-0.5">
                      {settings.factoryAddress}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-industrial-850 flex items-center justify-between text-[11px] text-industrial-400">
                  <span>GSTIN: <strong className="text-industrial-200 font-mono">{settings.gstin}</strong></span>
                  <span>{settings.workingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed / Preview */}
          <div className="rounded-3xl overflow-hidden bg-industrial-900 border border-industrial-800 h-64 relative shadow-xl">
            <iframe
              title="Raghav Food Machinery Location"
              src="https://maps.google.com/maps?q=Kundli%20Industrial%20Area,%20Sonipat,%20Haryana&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-70 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            <div className="absolute bottom-3 left-3 bg-industrial-950/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-white border border-industrial-800">
              📍 Kundli Industrial Area, Sonipat, Delhi NCR
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Enquiry Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-industrial-900/80 border border-industrial-800 p-8 md:p-10 shadow-2xl">
            
            {submitted ? (
              <div className="text-center py-12 space-y-5 animate-fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">Thank You for Contacting Us!</h3>
                <p className="text-xs text-industrial-300 max-w-md mx-auto leading-relaxed">
                  Your enquiry has been registered in our engineering CRM. Our technical sales team will review your requirements and respond promptly.
                </p>

                {whatsappUrl && (
                  <div className="pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-xl transition-all"
                    >
                      <MessageSquare className="w-4 h-4 fill-white/20" />
                      <span>Continue Conversation on WhatsApp &rarr;</span>
                    </a>
                  </div>
                )}

                <button
                  onClick={() => setSubmitted(false)}
                  className="block mx-auto text-xs text-industrial-400 hover:text-white underline pt-4"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    Request Commercial Quotation & Layout
                  </h3>
                  <p className="text-xs text-industrial-400 mt-1">
                    Fill out the form below to receive detailed technical specifications, pricing, and factory dispatch timelines.
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs text-center">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-industrial-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ramesh Sharma"
                      className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-brand focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-industrial-300 mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-brand focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-industrial-300 mb-1">Company / Business Name</label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Radhe Agro Food Industries"
                      className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-brand focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-industrial-300 mb-1">Email ID</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ramesh@radheagro.com"
                      className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-brand focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-industrial-300 mb-1">State / Province</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Haryana, Punjab, Gujarat, etc."
                      className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-brand focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-industrial-300 mb-1">City / District</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Sonipat, Ahmedabad, Ludhiana..."
                      className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-brand focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-industrial-300 mb-1">
                    Machinery Requirements & Production Target
                  </label>
                  <textarea
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    rows={4}
                    placeholder="Describe your desired machines, raw material (corn meal, potatoes, tomato, spices), required output kg/hr, or turnkey plant setup scope..."
                    className="w-full bg-industrial-950 border border-industrial-800 rounded-xl p-3 text-xs text-white focus:border-amber-brand focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-industrial-950 font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-glow-amber flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting Enquiry...' : 'Submit Commercial Enquiry'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}

