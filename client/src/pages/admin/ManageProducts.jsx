import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Upload, 
  Sparkles, 
  Check, 
  X, 
  ExternalLink,
  PlusCircle,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { api } from '../../services/api';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [price, setPrice] = useState('Contact for Quote');
  const [priceUnit, setPriceUnit] = useState('Ex-Factory Price');
  const [capacity, setCapacity] = useState('');
  const [power, setPower] = useState('');
  const [materialGrade, setMaterialGrade] = useState('SS-304 Food Grade');
  const [automationGrade, setAutomationGrade] = useState('Semi-Automatic');
  const [voltage, setVoltage] = useState('415V, 3-Phase, 50Hz');
  const [dimensions, setDimensions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true); // Default published to site!
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'live' | 'hidden'
  const [specList, setSpecList] = useState([{ label: 'Working Pressure', value: 'Standard' }]);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const loadProducts = async () => {
    try {
      setLoading(true);
      const [pRes, cRes] = await Promise.all([
        api.getProducts({ all: 'true' }).catch(err => {
          console.warn('Could not fetch products:', err);
          return { success: false, products: [] };
        }),
        api.getCategories().catch(err => {
          console.warn('Could not fetch categories:', err);
          return { success: false, categories: [] };
        })
      ]);
      if (pRes && pRes.success && Array.isArray(pRes.products)) {
        setProducts(pRes.products);
      }
      if (cRes && cRes.success && Array.isArray(cRes.categories)) {
        setCategories(cRes.categories);
      }
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setName('');
    setSlug('');
    setCategory(categories[0]?.name || 'Retort & Sterilization');
    setShortDescription('');
    setFullDescription('');
    setPrice('₹2,50,000 - ₹4,00,000');
    setPriceUnit('Ex-Factory / Turnkey');
    setCapacity('500 Liters / Batch');
    setPower('7.5 HP / Electric');
    setMaterialGrade('Food Grade SS-304');
    setAutomationGrade('Semi-Automatic');
    setVoltage('415V, 3-Phase, 50Hz');
    setDimensions('1800 x 950 x 1650 mm');
    setImageUrl('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80');
    setIsFeatured(false);
    setIsPublished(true);
    setSpecList([{ label: 'Design Heat', value: '135°C' }, { label: 'Door Lock', value: 'Radial Safety Interlock' }]);
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingId(p._id);
    setName(p.name || '');
    setSlug(p.slug || '');
    setCategory(p.category || '');
    setShortDescription(p.shortDescription || '');
    setFullDescription(p.fullDescription || '');
    setPrice(p.price || 'Contact for Quote');
    setPriceUnit(p.priceUnit || 'Ex-Factory');
    setCapacity(p.capacity || '');
    setPower(p.power || '');
    setMaterialGrade(p.materialGrade || 'SS-304');
    setAutomationGrade(p.automationGrade || 'Semi-Automatic');
    setVoltage(p.voltage || '');
    setDimensions(p.dimensions || '');
    setImageUrl(p.images?.[0] || '');
    setIsFeatured(Boolean(p.isFeatured));
    setIsPublished(p.isPublished !== false);
    setSpecList(p.specifications && p.specifications.length > 0 ? p.specifications : [{ label: 'Capacity', value: p.capacity || '' }]);
    setError('');
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await api.uploadImage(file);
      if (res.success && res.imageUrl) {
        setImageUrl(res.imageUrl);
        setSuccessMsg('Image uploaded successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      alert('Upload failed: ' + (err.message || 'Error'));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await api.togglePublishProduct(id);
      if (res.success) {
        setProducts(prev => prev.map(p => p._id === id ? { ...p, isPublished: res.isPublished } : p));
        setSuccessMsg(res.message);
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      alert('Failed to toggle publish: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this machine from the catalog?')) return;
    try {
      const res = await api.deleteProduct(id);
      if (res.success) {
        setProducts(prev => prev.filter(p => p._id !== id));
      }
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!name || !category) {
      setError('Product Name and Category are required.');
      return;
    }

    setSubmitting(true);
    setError('');

    const payload = {
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      shortDescription,
      fullDescription,
      price,
      priceUnit,
      capacity,
      power,
      materialGrade,
      automationGrade,
      voltage,
      dimensions,
      images: [imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'],
      isFeatured,
      isPublished,
      specifications: specList.filter(s => s.label && s.value)
    };

    try {
      if (editingId) {
        const res = await api.updateProduct(editingId, payload);
        if (res.success) {
          setIsModalOpen(false);
          loadProducts();
          setSuccessMsg(isPublished ? 'Machine updated and LIVE on site!' : 'Machine updated and saved as HIDDEN draft!');
          setTimeout(() => setSuccessMsg(''), 4000);
        }
      } else {
        const res = await api.createProduct(payload);
        if (res.success) {
          setIsModalOpen(false);
          loadProducts();
          setSuccessMsg(isPublished ? 'New machine created and LIVE on site!' : 'New machine created as HIDDEN draft!');
          setTimeout(() => setSuccessMsg(''), 4000);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to save product.');
    } finally {
      setSubmitting(false);
    }
  };

  const liveCount = (products || []).filter(p => p.isPublished !== false).length;
  const hiddenCount = (products || []).filter(p => p.isPublished === false).length;

  const filtered = (products || []).filter(p => {
    if (!p) return false;
    if (statusFilter === 'live' && p.isPublished === false) return false;
    if (statusFilter === 'hidden' && p.isPublished !== false) return false;
    const q = (search || '').trim().toLowerCase();
    if (!q) return true;
    const nameMatch = p.name ? String(p.name).toLowerCase().includes(q) : false;
    const catMatch = p.category ? String(p.category).toLowerCase().includes(q) : false;
    const slugMatch = p.slug ? String(p.slug).toLowerCase().includes(q) : false;
    return nameMatch || catMatch || slugMatch;
  });

  return (
    <div className="p-6 md:p-10 space-y-8">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#3D9B28] uppercase tracking-wider">
            Machinery Inventory & Catalog
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900">
            Manage Products & Publishing
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Add new machinery models, configure technical specifications, and publish directly to the customer-facing website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-[#3D9B28] hover:bg-[#2E7D1E] text-white font-bold px-5 py-3 rounded-xl text-xs transition-all shadow-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Add & Publish Machine</span>
        </button>
      </div>

      {/* Feedback Toast */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#3D9B28] text-xs flex items-center justify-between font-semibold animate-fade-in">
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Search & Status Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search machines..."
              className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                statusFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({products.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('live')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                statusFilter === 'live'
                  ? 'bg-white text-[#3D9B28] border border-emerald-300 shadow-sm'
                  : 'text-emerald-700 hover:text-emerald-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#3D9B28]" />
              Live on Site ({liveCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('hidden')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                statusFilter === 'hidden'
                  ? 'bg-white text-amber-700 border border-amber-300 shadow-sm'
                  : 'text-slate-600 hover:text-amber-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Hidden / Drafts ({hiddenCount})
            </button>
          </div>
        </div>

        <span className="text-xs text-slate-500">
          Showing: <strong className="text-slate-900">{filtered.length}</strong> of {products.length}
        </span>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Machine Details</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Capacity / Specs</th>
                <th className="px-6 py-3.5">Pricing</th>
                <th className="px-6 py-3.5">Published on Site</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="inline-block w-6 h-6 border-2 border-[#3D9B28] border-t-transparent rounded-full animate-spin" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No machinery found matching your query.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p._id || Math.random()} className="hover:bg-slate-50/75 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80'}
                          alt={p.name || 'Machine'}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80';
                          }}
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs hover:text-[#3D9B28]">{p.name || 'Unnamed Machine'}</h4>
                          <span className="text-[10px] text-slate-500 font-mono block">/{p.slug || p._id}</span>
                          {p.isFeatured && (
                            <span className="inline-block mt-0.5 bg-emerald-50 text-[#3D9B28] text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      <span className="bg-slate-100 px-2 py-1 rounded text-[10px] text-slate-700 border border-slate-200 font-medium">
                        {p.category || 'General Machinery'}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      <strong className="text-slate-900 block">{p.capacity || 'Standard'}</strong>
                      <span className="text-[10px] text-slate-500">{p.materialGrade || 'SS-304'}</span>
                    </td>

                    <td className="px-6 py-4 text-[#3D9B28] font-semibold">
                      {p.price || 'Contact for Quote'}
                    </td>

                    {/* Published on Site Toggle Switch */}
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(p._id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all shadow-sm ${
                          p.isPublished !== false
                            ? 'bg-emerald-50 text-[#3D9B28] border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                        }`}
                        title={p.isPublished !== false ? "Currently LIVE on website. Click to HIDE." : "Currently HIDDEN from website. Click to make LIVE."}
                      >
                        {p.isPublished !== false ? (
                          <>
                            <span className="w-2 h-2 rounded-full bg-[#3D9B28] animate-pulse" />
                            <Eye className="w-3.5 h-3.5 text-[#3D9B28]" />
                            <span>Live on Site</span>
                          </>
                        ) : (
                          <>
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <EyeOff className="w-3.5 h-3.5 text-amber-600" />
                            <span>Hidden on Site</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Action buttons */}
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        to={`/product/${p.slug}`}
                        target="_blank"
                        className="inline-block p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                        title="Preview Live Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg bg-slate-100 text-[#3D9B28] hover:bg-emerald-50 hover:text-[#2E7D1E] transition-colors"
                        title="Edit Machine Details"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================================
          ADD / EDIT MACHINE MODAL
          ===================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm p-4 sm:p-6 flex justify-center items-start">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl my-4 sm:my-8 space-y-6 relative">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-display font-bold text-xl text-slate-900">
                  {editingId ? 'Edit Machinery Model' : 'Add New Machine & Publish'}
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in specifications, upload machine photos, and toggle publish state.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Machine Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!editingId) {
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
                      }
                    }}
                    placeholder="e.g. Automatic Canning Retort (750 Ltr)"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                    required
                  >
                    {categories.map((c) => (
                      <option key={c._id || c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="automatic-canning-retort-750l"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Capacity</label>
                  <input
                    type="text"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="750 Liters / Batch (~400 Cans)"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Commercial Price Range</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="₹4,50,000 - ₹6,00,000"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Material Grade</label>
                  <select
                    value={materialGrade}
                    onChange={(e) => setMaterialGrade(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                  >
                    <option value="Food Grade SS-304">Food Grade SS-304</option>
                    <option value="Food Grade SS-316">Food Grade SS-316 (Acid/Saline Resistant)</option>
                    <option value="MS Base + SS-304 Contact Parts">MS Base + SS-304 Contact Parts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description</label>
                <textarea
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  rows={2}
                  placeholder="Summary of machine capabilities..."
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none resize-none"
                />
              </div>

              {/* Image Upload / URL Input */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-900">Machine Photo (URL or File Upload)</label>
                
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or /uploads/..."
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                  />
                  
                  <label className="cursor-pointer bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 border border-slate-300 shadow-sm whitespace-nowrap">
                    <Upload className="w-3.5 h-3.5 text-[#3D9B28]" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>

                {imageUrl && (
                  <div className="flex items-center gap-3 pt-1">
                    <img src={imageUrl} alt="preview" className="w-14 h-14 rounded-lg object-cover border border-slate-200 bg-white" />
                    <span className="text-[11px] text-slate-500">Preview image loaded</span>
                  </div>
                )}
              </div>

              {/* Technical Specifications Matrix Builder */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900">Technical Specs (Key-Value Matrix)</label>
                  <button
                    type="button"
                    onClick={() => setSpecList([...specList, { label: '', value: '' }])}
                    className="text-[11px] text-[#3D9B28] font-bold flex items-center gap-1 hover:underline"
                  >
                    <PlusCircle className="w-3.5 h-3.5" /> Add Spec Row
                  </button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {specList.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Parameter (e.g. Design Pressure)"
                        value={spec.label}
                        onChange={(e) => {
                          const updated = [...specList];
                          updated[idx].label = e.target.value;
                          setSpecList(updated);
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:border-[#3D9B28] focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. 0.25 MPa)"
                        value={spec.value}
                        onChange={(e) => {
                          const updated = [...specList];
                          updated[idx].value = e.target.value;
                          setSpecList(updated);
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:border-[#3D9B28] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setSpecList(specList.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-red-600 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured & Published Switches */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-[#3D9B28] focus:ring-[#3D9B28]"
                  />
                  <span>Feature on Home Page Carousel</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-[#3D9B28] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-[#3D9B28] focus:ring-[#3D9B28]"
                  />
                  <span>✓ Publish to Live Website Immediately</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold px-4 py-2.5 rounded-xl text-xs shadow-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#3D9B28] hover:bg-[#2E7D1E] text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-sm transition-all"
                >
                  {submitting ? 'Saving & Publishing...' : editingId ? 'Update & Publish' : 'Add & Publish to Site'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

