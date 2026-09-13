import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit, Trash2, X, Cpu } from 'lucide-react';
import { api } from '../../services/api';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Cpu');
  const [error, setError] = useState('');

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await api.getCategories();
      if (res.success) setCategories(res.categories || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setIcon('Layers');
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingId(cat._id);
    setName(cat.name);
    setDescription(cat.description || '');
    setIcon(cat.icon || 'Layers');
    setError('');
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name) {
      setError('Category name is required.');
      return;
    }

    try {
      if (editingId) {
        await api.updateCategory(editingId, { name, description, icon });
      } else {
        await api.createCategory({ name, description, icon });
      }
      setIsModalOpen(false);
      loadCategories();
    } catch (err) {
      setError(err.message || 'Failed to save category.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await api.deleteCategory(id);
      loadCategories();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#3D9B28] uppercase tracking-wider">
            Machinery Taxonomies
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900">
            Manage Categories
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Organize food machinery into industry verticals (Retort, Snacks Extruder, Dryers, etc.).
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-[#3D9B28] hover:bg-[#2E7D1E] text-white font-bold px-5 py-3 rounded-xl text-xs transition-all shadow-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#3D9B28] font-bold uppercase tracking-wider">/{cat.slug}</span>
                <span className="text-xs text-slate-500 font-bold">{cat.machineCount || 0} Machines</span>
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mt-2">{cat.name}</h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {cat.description || 'No description provided.'}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(cat)}
                className="p-1.5 rounded-lg bg-slate-100 text-[#3D9B28] hover:bg-emerald-50 hover:text-[#2E7D1E] text-xs flex items-center gap-1 px-3 font-semibold transition-colors"
              >
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => handleDelete(cat._id)}
                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs flex items-center gap-1 px-3 font-semibold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-lg text-slate-900">
                {editingId ? 'Edit Category' : 'Create Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
            </div>

            {error && <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">{error}</div>}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dairy & Ice Cream Equipment"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Summary of machinery in this vertical..."
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none resize-none"
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

