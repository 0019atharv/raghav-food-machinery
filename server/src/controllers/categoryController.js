import { Category, Product } from '../models/index.js';
import { isUsingMongoDB, getFallbackDb, saveFallbackDb } from '../config/db.js';

export const getCategories = async (req, res) => {
  try {
    if (isUsingMongoDB()) {
      const categories = await Category.find().sort({ name: 1 });
      // update dynamic machine counts
      const counts = await Product.aggregate([
        { $match: { isPublished: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]);
      const countMap = {};
      counts.forEach(c => { countMap[c._id] = c.count; });

      const enriched = categories.map(cat => ({
        ...cat.toObject(),
        machineCount: countMap[cat.name] || 0
      }));

      return res.json({ success: true, categories: enriched });
    } else {
      const store = getFallbackDb();
      const categories = store.categories.map(cat => {
        const count = store.products.filter(p => p.category === cat.name && p.isPublished !== false).length;
        return { ...cat, machineCount: count };
      });
      return res.json({ success: true, categories });
    }
  } catch (error) {
    console.error('getCategories error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories.' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description, image, icon } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Category name is required.' });

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    if (isUsingMongoDB()) {
      const created = await Category.create({ name, slug, description, image, icon, isPublished: true });
      return res.status(201).json({ success: true, category: created });
    } else {
      const store = getFallbackDb();
      const newCat = {
        _id: 'cat_' + Date.now(),
        name,
        slug,
        description: description || '',
        image: image || '',
        icon: icon || 'Cpu',
        machineCount: 0,
        isPublished: true,
        createdAt: new Date()
      };
      store.categories.push(newCat);
      saveFallbackDb(store);
      return res.status(201).json({ success: true, category: newCat });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create category.' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, icon } = req.body;

    if (isUsingMongoDB()) {
      const updated = await Category.findByIdAndUpdate(id, { name, description, image, icon }, { new: true });
      return res.json({ success: true, category: updated });
    } else {
      const store = getFallbackDb();
      const idx = store.categories.findIndex(c => c._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Category not found.' });
      store.categories[idx] = { ...store.categories[idx], name, description, image, icon };
      saveFallbackDb(store);
      return res.json({ success: true, category: store.categories[idx] });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update category.' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (isUsingMongoDB()) {
      await Category.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Category deleted successfully.' });
    } else {
      const store = getFallbackDb();
      store.categories = store.categories.filter(c => c._id !== id);
      saveFallbackDb(store);
      return res.json({ success: true, message: 'Category deleted successfully.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete category.' });
  }
};

