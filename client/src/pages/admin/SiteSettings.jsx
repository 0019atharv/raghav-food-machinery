import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Phone, MessageSquare, Mail, Building, MapPin, Sparkles, Upload, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';
import { useSettings } from '../../context/SettingsContext';

export default function SiteSettings() {
  const { settings: globalSettings, refreshSettings } = useSettings();
  const [formData, setFormData] = useState(globalSettings);
  const [saving, setSaving] = useState(false);
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
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

  const handleHeroChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      hero: { ...(prev.hero || {}), [field]: val }
    }));
  };

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHeroImage(true);
    try {
      const res = await api.uploadImage(file);
      if (res.success && res.imageUrl) {
        handleHeroChange('showcaseImage', res.imageUrl);
        setSuccessMsg('Hero machine photo uploaded successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      alert('Upload failed: ' + (err.message || 'Error'));
    } finally {
      setUploadingHeroImage(false);
    }
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

  const hero = formData.hero || {};

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-4xl">
      
      <div>
        <span className="text-xs font-mono font-bold text-[#3D9B28] uppercase tracking-wider">
          Global Configuration
        </span>
        <h1 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900">
          Site Settings & Landing Page Management
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Update landing page hero imagery, machine specifications, company contacts, GSTIN, factory addresses, and top banner notices.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#3D9B28] text-xs flex items-center gap-2 font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Banner Notice Configuration */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#3D9B28]" />
                Top Announcement Banner
              </h3>
              <p className="text-[11px] text-slate-500">
                Displays at the very top of the website on mobile & desktop.
              </p>
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-[#3D9B28] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.bannerNotice?.active ?? true}
                onChange={(e) => handleBannerChange('active', e.target.checked)}
                className="w-4 h-4 rounded text-[#3D9B28] focus:ring-[#3D9B28]"
              />
              <span>Banner Active</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Banner Announcement Text</label>
            <input
              type="text"
              value={formData.bannerNotice?.text || ''}
              onChange={(e) => handleBannerChange('text', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
            />
          </div>
        </div>

        {/* Landing Page Hero & Flagship Machine Showcase Customization */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-[#3D9B28] text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Landing Page Customization</span>
            </div>
            <h3 className="font-display font-bold text-base text-slate-900 mt-1">
              Hero Section & Right-Side Flagship Machine Card
            </h3>
            <p className="text-[11px] text-slate-500">
              Customize the flagship machine photo, specs, badges, and headline shown on your homepage.
            </p>
          </div>

          {/* Right Side Showcase Machine Card Settings */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5 text-[#3D9B28]" />
                <span>Right-Side Flagship Machine Showcase</span>
              </h4>
              <span className="text-[10px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">
                Live on Homepage Right Column
              </span>
            </div>

            {/* Showcase Image Upload & Preview */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Machine Image (Upload new photo or paste image URL)
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  value={hero.showcaseImage || ''}
                  onChange={(e) => handleHeroChange('showcaseImage', e.target.value)}
                  placeholder="https://... or /uploads/..."
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none font-mono"
                />
                
                <label className="cursor-pointer bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 border border-slate-300 shadow-sm whitespace-nowrap">
                  <Upload className="w-3.5 h-3.5 text-[#3D9B28]" />
                  <span>{uploadingHeroImage ? 'Uploading...' : 'Upload Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHeroImageUpload}
                    className="hidden"
                    disabled={uploadingHeroImage}
                  />
                </label>
              </div>

              {hero.showcaseImage && (
                <div className="flex items-center gap-4 pt-2 p-3 bg-white rounded-xl border border-slate-200">
                  <img
                    src={hero.showcaseImage}
                    alt="Hero Showcase Preview"
                    className="w-20 h-20 rounded-lg object-cover border border-slate-200 shadow-xs"
                  />
                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-slate-900">Live Hero Showcase Image Preview</p>
                    <p className="text-[11px] text-slate-500">
                      Recommended: High-resolution PNG or JPG showing clean industrial machine.
                    </p>
                    <a
                      href={hero.showcaseImage}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#3D9B28] hover:underline font-semibold"
                    >
                      <span>Open Full Image</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Showcase Tag & Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Card Floating Tag / Badge
                </label>
                <input
                  type="text"
                  value={hero.showcaseTag || ''}
                  onChange={(e) => handleHeroChange('showcaseTag', e.target.value)}
                  placeholder="Flagship: Automatic Canning Retort 500L"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Machine Model Number
                </label>
                <input
                  type="text"
                  value={hero.showcaseModel || ''}
                  onChange={(e) => handleHeroChange('showcaseModel', e.target.value)}
                  placeholder="RFPM-RET-500"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Stock status & CTA button */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Stock / Availability Badge
                </label>
                <input
                  type="text"
                  value={hero.showcaseStockStatus || ''}
                  onChange={(e) => handleHeroChange('showcaseStockStatus', e.target.value)}
                  placeholder="In Stock / Ready Dispatch"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Card Button Text
                </label>
                <input
                  type="text"
                  value={hero.showcaseButtonText || ''}
                  onChange={(e) => handleHeroChange('showcaseButtonText', e.target.value)}
                  placeholder="View Machine Specs"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Card Button Target Link
                </label>
                <input
                  type="text"
                  value={hero.showcaseButtonLink || ''}
                  onChange={(e) => handleHeroChange('showcaseButtonLink', e.target.value)}
                  placeholder="/product/automatic-canning-retort-500l"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* 3 Key Specs displayed on the card */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="block text-xs font-semibold text-slate-700">
                Key Highlights / Specifications Badges (3 boxes)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-[#3D9B28] font-bold uppercase block">Spec 1</span>
                  <input
                    type="text"
                    value={hero.showcaseSpec1Label || ''}
                    onChange={(e) => handleHeroChange('showcaseSpec1Label', e.target.value)}
                    placeholder="Batch Capacity"
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 focus:border-[#3D9B28] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={hero.showcaseSpec1Value || ''}
                    onChange={(e) => handleHeroChange('showcaseSpec1Value', e.target.value)}
                    placeholder="500 Liters"
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 font-semibold focus:border-[#3D9B28] focus:outline-none"
                  />
                </div>

                <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-[#3D9B28] font-bold uppercase block">Spec 2</span>
                  <input
                    type="text"
                    value={hero.showcaseSpec2Label || ''}
                    onChange={(e) => handleHeroChange('showcaseSpec2Label', e.target.value)}
                    placeholder="Temperature"
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 focus:border-[#3D9B28] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={hero.showcaseSpec2Value || ''}
                    onChange={(e) => handleHeroChange('showcaseSpec2Value', e.target.value)}
                    placeholder="Up to 135°C"
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 font-semibold focus:border-[#3D9B28] focus:outline-none"
                  />
                </div>

                <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-[#3D9B28] font-bold uppercase block">Spec 3</span>
                  <input
                    type="text"
                    value={hero.showcaseSpec3Label || ''}
                    onChange={(e) => handleHeroChange('showcaseSpec3Label', e.target.value)}
                    placeholder="Automation"
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 focus:border-[#3D9B28] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={hero.showcaseSpec3Value || ''}
                    onChange={(e) => handleHeroChange('showcaseSpec3Value', e.target.value)}
                    placeholder="PLC + HMI"
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 font-semibold focus:border-[#3D9B28] focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Left Side Headline & Description Settings */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Hero Headline & Introduction Text
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Top Trust Badge Tag
              </label>
              <input
                type="text"
                value={hero.badge || ''}
                onChange={(e) => handleHeroChange('badge', e.target.value)}
                placeholder="India's Leading Industrial Food Machinery Engineering"
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Headline Line 1
                </label>
                <input
                  type="text"
                  value={hero.titleLine1 || ''}
                  onChange={(e) => handleHeroChange('titleLine1', e.target.value)}
                  placeholder="Industrial Food"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Headline Highlighted (Green)
                </label>
                <input
                  type="text"
                  value={hero.titleHighlight || ''}
                  onChange={(e) => handleHeroChange('titleHighlight', e.target.value)}
                  placeholder="Processing, Canning"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Headline Line 3
                </label>
                <input
                  type="text"
                  value={hero.titleLine3 || ''}
                  onChange={(e) => handleHeroChange('titleLine3', e.target.value)}
                  placeholder="& Snacks Machinery"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hero Description Paragraph
              </label>
              <textarea
                value={hero.description || ''}
                onChange={(e) => handleHeroChange('description', e.target.value)}
                rows={3}
                placeholder="Engineered with certified Food-Grade SS-304/SS-316..."
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Hero Stats Bar Settings */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Homepage Statistics Bar (4 Counters)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] text-[#3D9B28] font-bold uppercase block">Stat 1</span>
                <input
                  type="text"
                  value={hero.stat1Number || ''}
                  onChange={(e) => handleHeroChange('stat1Number', e.target.value)}
                  placeholder="500+"
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 font-bold focus:border-[#3D9B28] focus:outline-none"
                />
                <input
                  type="text"
                  value={hero.stat1Label || ''}
                  onChange={(e) => handleHeroChange('stat1Label', e.target.value)}
                  placeholder="Installed Plants Across India"
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] text-slate-600 focus:border-[#3D9B28] focus:outline-none"
                />
              </div>

              <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] text-[#3D9B28] font-bold uppercase block">Stat 2</span>
                <input
                  type="text"
                  value={hero.stat2Number || ''}
                  onChange={(e) => handleHeroChange('stat2Number', e.target.value)}
                  placeholder="30+"
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 font-bold focus:border-[#3D9B28] focus:outline-none"
                />
                <input
                  type="text"
                  value={hero.stat2Label || ''}
                  onChange={(e) => handleHeroChange('stat2Label', e.target.value)}
                  placeholder="Years Food Tech Expertise"
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] text-slate-600 focus:border-[#3D9B28] focus:outline-none"
                />
              </div>

              <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] text-[#3D9B28] font-bold uppercase block">Stat 3</span>
                <input
                  type="text"
                  value={hero.stat3Number || ''}
                  onChange={(e) => handleHeroChange('stat3Number', e.target.value)}
                  placeholder="100%"
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 font-bold focus:border-[#3D9B28] focus:outline-none"
                />
                <input
                  type="text"
                  value={hero.stat3Label || ''}
                  onChange={(e) => handleHeroChange('stat3Label', e.target.value)}
                  placeholder="Food-Grade SS-304/SS-316"
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] text-slate-600 focus:border-[#3D9B28] focus:outline-none"
                />
              </div>

              <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] text-[#3D9B28] font-bold uppercase block">Stat 4</span>
                <input
                  type="text"
                  value={hero.stat4Number || ''}
                  onChange={(e) => handleHeroChange('stat4Number', e.target.value)}
                  placeholder="24/7"
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 font-bold focus:border-[#3D9B28] focus:outline-none"
                />
                <input
                  type="text"
                  value={hero.stat4Label || ''}
                  onChange={(e) => handleHeroChange('stat4Label', e.target.value)}
                  placeholder="Engineer AMC Support"
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] text-slate-600 focus:border-[#3D9B28] focus:outline-none"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Company Identity */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-display font-bold text-sm text-slate-900">Company Identity</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Trade Name</label>
              <input
                type="text"
                value={formData.companyName || ''}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Proprietor / Legal Name</label>
              <input
                type="text"
                value={formData.proprietor || ''}
                onChange={(e) => handleChange('proprietor', e.target.value)}
                placeholder="Naresh"
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">GSTIN Number</label>
              <input
                type="text"
                value={formData.gstin || ''}
                onChange={(e) => handleChange('gstin', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Company Tagline</label>
            <input
              type="text"
              value={formData.tagline || ''}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
            />
          </div>
        </div>

        {/* Communication Numbers */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-display font-bold text-sm text-slate-900">Telephone & WhatsApp Channels</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Calling Phone</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Chat Number (with country code)</label>
              <input
                type="text"
                value={formData.whatsappNumber || ''}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                placeholder="+919220706381"
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sales Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Support Email</label>
              <input
                type="email"
                value={formData.supportEmail || ''}
                onChange={(e) => handleChange('supportEmail', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Physical Locations */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-display font-bold text-sm text-slate-900">Physical Locations</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Manufacturing Works & Factory Address</label>
            <textarea
              value={formData.factoryAddress || ''}
              onChange={(e) => handleChange('factoryAddress', e.target.value)}
              rows={2}
              className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Office Address</label>
            <textarea
              value={formData.corporateOffice || ''}
              onChange={(e) => handleChange('corporateOffice', e.target.value)}
              rows={2}
              className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#3D9B28] hover:bg-[#2E7D1E] text-white font-bold px-8 py-3.5 rounded-xl text-xs shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save & Apply Live Settings'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}

