import { Gallery } from '../models/index.js';
import { isUsingMongoDB, getFallbackDb, saveFallbackDb } from '../config/db.js';

export const getGallery = async (req, res) => {
  try {
    const { category } = req.query;

    if (isUsingMongoDB()) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      const items = await Gallery.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: items.length, items });
    } else {
      const store = getFallbackDb();
      let items = [...(store.gallery || [])];
      if (category && category !== 'All') {
        items = items.filter(g => g.category.toLowerCase() === category.toLowerCase());
      }
      return res.json({ success: true, count: items.length, items });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch gallery.' });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const { title, category, imageUrl, caption, isFeatured } = req.body;
    if (!title || !imageUrl) {
      return res.status(400).json({ success: false, message: 'Title and image URL are required.' });
    }

    const itemData = {
      title,
      category: category || 'Machinery',
      imageUrl,
      caption: caption || '',
      isFeatured: Boolean(isFeatured),
      createdAt: new Date()
    };

    if (isUsingMongoDB()) {
      const created = await Gallery.create(itemData);
      return res.status(201).json({ success: true, item: created });
    } else {
      const store = getFallbackDb();
      const newItem = { _id: 'gal_' + Date.now(), ...itemData };
      store.gallery.unshift(newItem);
      saveFallbackDb(store);
      return res.status(201).json({ success: true, item: newItem });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add gallery item.' });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (isUsingMongoDB()) {
      await Gallery.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Gallery item deleted.' });
    } else {
      const store = getFallbackDb();
      store.gallery = store.gallery.filter(g => g._id !== id);
      saveFallbackDb(store);
      return res.json({ success: true, message: 'Gallery item deleted.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete gallery item.' });
  }
};

