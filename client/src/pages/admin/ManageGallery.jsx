import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Plus, Trash2, X, Upload } from 'lucide-react';
import { api } from '../../services/api';

export default function ManageGallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Factory Floor');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const loadGallery = async () => {
    try {
      setLoading(true);
      const res = await api.getGallery();
      if (res.success) setGallery(res.items || []);
    } catch (err) {
      console.error('Failed to load gallery', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await api.uploadImage(file);
      if (res.success && res.imageUrl) {
        setImageUrl(res.imageUrl);
      }
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      setError('Title and Image are required.');
      return;
    }

    try {
      await api.createGalleryItem({ title, category, imageUrl, caption });
      setIsModalOpen(false);
      loadGallery();
    } catch (err) {
      setError(err.message || 'Failed to save item.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo from gallery?')) return;
    try {
      await api.deleteGalleryItem(id);
      loadGallery();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-brand uppercase tracking-wider">
            Media & Factory Showcase
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white">
            Manage Gallery & Visual Assets
          </h1>
        </div>

        <button
          onClick={() => {
            setTitle('');
            setCategory('Factory Floor');
            setImageUrl('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80');
            setCaption('');
            setError('');
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-amber-brand hover:bg-amber-400 text-industrial-950 font-bold px-5 py-3 rounded-xl text-xs shadow-glow-amber whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Add Gallery Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((g) => (
          <div
            key={g._id}
            className="rounded-2xl bg-industrial-900/90 border border-industrial-800 p-4 space-y-3 relative group"
          >
            <div className="h-48 rounded-xl overflow-hidden bg-industrial-950">
              <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[10px] text-amber-brand font-bold bg-industrial-950 px-2 py-0.5 rounded border border-industrial-800">
                {g.category}
              </span>
              <h4 className="font-bold text-sm text-white mt-1.5">{g.title}</h4>
              {g.caption && <p className="text-xs text-industrial-400 mt-0.5 line-clamp-1">{g.caption}</p>}
            </div>

            <div className="pt-2 border-t border-industrial-800 flex justify-end">
              <button
                onClick={() => handleDelete(g._id)}
                className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-industrial-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-industrial-900 border border-industrial-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-industrial-800 pb-3">
              <h3 className="font-bold text-lg text-white">Add Photo to Gallery</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-industrial-400" /></button>
            </div>

            {error && <div className="p-2.5 rounded-lg bg-red-950/50 text-red-300 text-xs">{error}</div>}

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-industrial-300 mb-1">Title / Machine *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-industrial-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Retort Machines">Retort Machines</option>
                  <option value="Snacks Line">Snacks Line</option>
                  <option value="Factory Floor">Factory Floor</option>
                  <option value="Cooking Kettles">Cooking Kettles</option>
                  <option value="Client Plant">Client Plant Installation</option>
                  <option value="Machinery">General Machinery</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-industrial-300">Photo URL or Upload</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... or upload below"
                  className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
                <label className="cursor-pointer inline-flex items-center gap-1.5 bg-industrial-800 text-white text-xs px-3 py-1.5 rounded-lg">
                  <Upload className="w-3.5 h-3.5 text-amber-brand" />
                  <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-industrial-300 mb-1">Caption</label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={2}
                  className="w-full bg-industrial-950 border border-industrial-800 rounded-xl p-2.5 text-xs text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-industrial-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-industrial-800 text-xs font-semibold text-industrial-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-brand hover:bg-amber-400 text-industrial-950 font-bold px-5 py-2 rounded-xl text-xs"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

