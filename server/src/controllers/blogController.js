import { Blog } from '../models/index.js';
import { isUsingMongoDB, getFallbackDb, saveFallbackDb } from '../config/db.js';

export const getBlogs = async (req, res) => {
  try {
    if (isUsingMongoDB()) {
      const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
      return res.json({ success: true, count: blogs.length, blogs });
    } else {
      const store = getFallbackDb();
      const blogs = (store.blogs || []).filter(b => b.isPublished !== false);
      return res.json({ success: true, count: blogs.length, blogs });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blogs.' });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (isUsingMongoDB()) {
      const blog = await Blog.findOne({ slug });
      if (!blog) return res.status(404).json({ success: false, message: 'Article not found.' });
      return res.json({ success: true, blog });
    } else {
      const store = getFallbackDb();
      const blog = (store.blogs || []).find(b => b.slug === slug);
      if (!blog) return res.status(404).json({ success: false, message: 'Article not found.' });
      return res.json({ success: true, blog });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blog.' });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, slug, excerpt, content, coverImage, author, category, tags, readingTime } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required.' });
    }

    const generatedSlug = (slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    const blogData = {
      title,
      slug: generatedSlug,
      excerpt: excerpt || '',
      content,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      author: author || 'Raghav Technical Team',
      category: category || 'Food Machinery Guide',
      tags: Array.isArray(tags) ? tags : [],
      readingTime: readingTime || '5 min read',
      isPublished: true,
      createdAt: new Date()
    };

    if (isUsingMongoDB()) {
      const created = await Blog.create(blogData);
      return res.status(201).json({ success: true, blog: created });
    } else {
      const store = getFallbackDb();
      const newBlog = { _id: 'blog_' + Date.now(), ...blogData };
      store.blogs.unshift(newBlog);
      saveFallbackDb(store);
      return res.status(201).json({ success: true, blog: newBlog });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create blog.' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (isUsingMongoDB()) {
      const updated = await Blog.findByIdAndUpdate(id, updates, { new: true });
      return res.json({ success: true, blog: updated });
    } else {
      const store = getFallbackDb();
      const idx = store.blogs.findIndex(b => b._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Blog not found.' });
      store.blogs[idx] = { ...store.blogs[idx], ...updates };
      saveFallbackDb(store);
      return res.json({ success: true, blog: store.blogs[idx] });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update blog.' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (isUsingMongoDB()) {
      await Blog.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Article deleted successfully.' });
    } else {
      const store = getFallbackDb();
      store.blogs = store.blogs.filter(b => b._id !== id);
      saveFallbackDb(store);
      return res.json({ success: true, message: 'Article deleted successfully.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete blog.' });
  }
};

