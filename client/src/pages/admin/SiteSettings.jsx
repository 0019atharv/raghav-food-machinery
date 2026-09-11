import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Phone, MessageSquare, Mail, Building, MapPin, Sparkles } from 'lucide-react';
import { api } from '../../services/api';
import { useSettings } from '../../context/SettingsContext';

export default function SiteSettings() {
  const { settings: globalSettings, refreshSettings } = useSettings();
  const [formData, setFormData] = useState(globalSettings);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData(globalSettings);
  }, [globalSettings]);

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleBannerChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      bannerNotice: { ...(prev.bannerNotice || {}), [field]: val }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await api.updateSettings(formData);
      if (res.success) {
        setSuccessMsg('Site settings updated successfully and active on public website!');
        refreshSettings();
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      setError(err.message || 'Failed to update settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-4xl">
      
      <div>
        <span className="text-xs font-mono font-bold text-amber-brand uppercase tracking-wider">
          Global Configuration
        </span>
        <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white">
          Site Settings & Business Profile
        </h1>
        <p className="text-xs text-industrial-400 mt-1">
          Update company contacts, WhatsApp click-to-chat numbers, GSTIN, factory addresses, and top banner notices.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Banner Notice Configuration */}
        <div className="p-6 rounded-2xl bg-industrial-900/90 border border-industrial-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-brand" />
                Top Announcement Banner
              </h3>
              <p className="text-[11px] text-industrial-400">
                Displays at the very top of the website on mobile & desktop.
              </p>
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-amber-brand cursor-pointer">
              <input
                type="checkbox"
                checked={formData.bannerNotice?.active ?? true}
                onChange={(e) => handleBannerChange('active', e.target.checked)}
                className="w-4 h-4 rounded text-amber-brand focus:ring-amber-500 bg-industrial-950 border-industrial-800"
              />
              <span>Banner Active</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-medium text-industrial-300 mb-1">Banner Announcement Text</label>
            <input
              type="text"
              value={formData.bannerNotice?.text || ''}
              onChange={(e) => handleBannerChange('text', e.target.value)}
              className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2 text-xs text-white focus:border-amber-brand focus:outline-none"
            />
          </div>
        </div>

        {/* Company Identity */}
        <div className="p-6 rounded-2xl bg-industrial-900/90 border border-industrial-800 space-y-4">
          <h3 className="font-display font-bold text-sm text-white">Company Identity</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-industrial-300 mb-1">Company Name</label>
              <input
                type="text"
                value={formData.companyName || ''}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-industrial-300 mb-1">GSTIN Number</label>
              <input
                type="text"
                value={formData.gstin || ''}
                onChange={(e) => handleChange('gstin', e.target.value)}
                className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-industrial-300 mb-1">Company Tagline</label>
            <input
              type="text"
              value={formData.tagline || ''}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>
        </div>

        {/* Communication Numbers */}
        <div className="p-6 rounded-2xl bg-industrial-900/90 border border-industrial-800 space-y-4">
          <h3 className="font-display font-bold text-sm text-white">Telephone & WhatsApp Channels</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-industrial-300 mb-1">Primary Calling Phone</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-industrial-300 mb-1">WhatsApp Chat Number (with country code)</label>
              <input
                type="text"
                value={formData.whatsappNumber || ''}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                placeholder="+919873456789"
                className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-industrial-300 mb-1">Sales Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-industrial-300 mb-1">Support Email</label>
              <input
                type="email"
                value={formData.supportEmail || ''}
                onChange={(e) => handleChange('supportEmail', e.target.value)}
                className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Physical Locations */}
        <div className="p-6 rounded-2xl bg-industrial-900/90 border border-industrial-800 space-y-4">
          <h3 className="font-display font-bold text-sm text-white">Physical Locations</h3>

          <div>
            <label className="block text-xs font-medium text-industrial-300 mb-1">Manufacturing Works & Factory Address</label>
            <textarea
              value={formData.factoryAddress || ''}
              onChange={(e) => handleChange('factoryAddress', e.target.value)}
              rows={2}
              className="w-full bg-industrial-950 border border-industrial-800 rounded-xl p-2.5 text-xs text-white resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-industrial-300 mb-1">Corporate Office Address</label>
            <textarea
              value={formData.corporateOffice || ''}
              onChange={(e) => handleChange('corporateOffice', e.target.value)}
              rows={2}
              className="w-full bg-industrial-950 border border-industrial-800 rounded-xl p-2.5 text-xs text-white resize-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-industrial-950 font-bold px-8 py-3.5 rounded-xl text-xs shadow-glow-amber transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save & Apply Live Settings'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}

