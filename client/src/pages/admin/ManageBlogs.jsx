import React, { useState, useEffect } from 'react';
import { FileText, Plus, Edit, Trash2, X, Upload } from 'lucide-react';
import { api } from '../../services/api';

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technical Guide');
  const [coverImage, setCoverImage] = useState('');
  const [author, setAuthor] = useState('Raghav Food Machinery Technical Team');
  const [readingTime, setReadingTime] = useState('5 min read');
  const [tags, setTags] = useState('Retort, Food Safety, Machinery');

  const [error, setError] = useState('');

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.getBlogs();
      if (res.success) setBlogs(res.blogs || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setCoverImage('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80');
    setCategory('Engineering Guide');
    setAuthor('Raghav Technical Advisory');
    setReadingTime('5 min read');
    setTags('Food Processing, Machinery, Automation');
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (b) => {
    setEditingId(b._id);
    setTitle(b.title);
    setSlug(b.slug);
    setExcerpt(b.excerpt || '');
    setContent(b.content || '');
    setCoverImage(b.coverImage || '');
    setCategory(b.category || '');
    setAuthor(b.author || '');
    setReadingTime(b.readingTime || '5 min read');
    setTags((b.tags || []).join(', '));
    setError('');
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt,
      content,
      coverImage,
      category,
      author,
      readingTime,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingId) {
        await api.updateBlog(editingId, payload);
      } else {
        await api.createBlog(payload);
      }
      setIsModalOpen(false);
      loadBlogs();
    } catch (err) {
      setError(err.message || 'Failed to save blog post.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await api.deleteBlog(id);
      loadBlogs();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-brand uppercase tracking-wider">
            Content Marketing & SEO
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white">
            Manage Blog & Technical Articles
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-amber-brand hover:bg-amber-400 text-industrial-950 font-bold px-5 py-3 rounded-xl text-xs shadow-glow-amber whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((b) => (
          <div
            key={b._id}
            className="rounded-2xl bg-industrial-900/90 border border-industrial-800 p-5 space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="h-40 rounded-xl overflow-hidden bg-industrial-950 mb-3">
                <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] text-amber-brand font-bold bg-industrial-950 px-2 py-0.5 rounded border border-industrial-800">
                {b.category}
              </span>
              <h3 className="font-display font-bold text-sm text-white mt-2 line-clamp-2">{b.title}</h3>
              <p className="text-xs text-industrial-400 mt-1 line-clamp-2">{b.excerpt}</p>
            </div>

            <div className="pt-3 border-t border-industrial-800 flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(b)}
                className="px-3 py-1.5 rounded-lg bg-industrial-950 text-amber-brand text-xs flex items-center gap-1"
              >
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => handleDelete(b._id)}
                className="px-3 py-1.5 rounded-lg bg-industrial-950 text-red-400 text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-industrial-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-industrial-900 border border-industrial-800 rounded-3xl p-6 md:p-8 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-industrial-800 pb-3">
              <h3 className="font-bold text-lg text-white">{editingId ? 'Edit Article' : 'New Article'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-industrial-400" /></button>
            </div>

            {error && <div className="p-2.5 rounded-lg bg-red-950/50 text-red-300 text-xs">{error}</div>}

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-industrial-300 mb-1">Article Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-industrial-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-industrial-300 mb-1">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-industrial-300 mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-industrial-300 mb-1">Short Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  className="w-full bg-industrial-950 border border-industrial-800 rounded-xl p-2.5 text-xs text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-industrial-300 mb-1">Content (Markdown / Text)</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  className="w-full bg-industrial-950 border border-industrial-800 rounded-xl p-2.5 text-xs text-white font-mono"
                  required
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
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

