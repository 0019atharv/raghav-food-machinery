import { Product, Category } from '../models/index.js';
import { isUsingMongoDB, getFallbackDb, saveFallbackDb } from '../config/db.js';

export const getProducts = async (req, res) => {
  try {
    const { category, search, featured, all } = req.query;
    // Only return unpublished/hidden products if explicitly requested via all=true by an authenticated admin
    const isAdminView = all === 'true' && Boolean(req.user && req.user.role === 'admin');

    if (isUsingMongoDB()) {
      let query = {};
      if (!isAdminView) {
        query.isPublished = { $ne: false };
      }
      if (category) {
        query.categorySlug = category.toLowerCase();
      }
      if (featured === 'true') {
        query.isFeatured = true;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { shortDescription: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ];
      }

      const products = await Product.find(query).sort({ isFeatured: -1, createdAt: -1 });
      return res.json({ success: true, count: products.length, products });
    } else {
      const store = getFallbackDb();
      let products = [...store.products];

      if (!isAdminView) {
        products = products.filter(p => p.isPublished !== false);
      }
      if (category) {
        products = products.filter(p => (p.categorySlug || '').toLowerCase() === category.toLowerCase() || (p.category || '').toLowerCase() === category.toLowerCase());
      }
      if (featured === 'true') {
        products = products.filter(p => p.isFeatured === true);
      }
      if (search) {
        const s = search.toLowerCase();
        products = products.filter(p =>
          (p.name && p.name.toLowerCase().includes(s)) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(s)) ||
          (p.category && p.category.toLowerCase().includes(s))
        );
      }

      products.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      return res.json({ success: true, count: products.length, products });
    }
  } catch (error) {
    console.error('getProducts error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products.' });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const isAdmin = Boolean(req.user && req.user.role === 'admin');

    if (isUsingMongoDB()) {
      const query = { slug: slug.toLowerCase() };
      if (!isAdmin) {
        query.isPublished = { $ne: false };
      }
      const product = await Product.findOne(query);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Machine not found or is currently hidden from site.' });
      }

      // Fetch related machines (only published on public site)
      const related = await Product.find({
        category: product.category,
        _id: { $ne: product._id },
        isPublished: { $ne: false }
      }).limit(4);

      return res.json({ success: true, product, related });
    } else {
      const store = getFallbackDb();
      const product = store.products.find(p => p.slug.toLowerCase() === slug.toLowerCase());
      if (!product || (!isAdmin && product.isPublished === false)) {
        return res.status(404).json({ success: false, message: 'Machine not found or is currently hidden from site.' });
      }

      const related = store.products
        .filter(p => p.category === product.category && p._id !== product._id && p.isPublished !== false)
        .slice(0, 4);

      return res.json({ success: true, product, related });
    }
  } catch (error) {
    console.error('getProductBySlug error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch product details.' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
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
      weight,
      warranty,
      images,
      specifications,
      applications,
      features,
      brochureUrl,
      isFeatured,
      isPublished
    } = req.body;

    if (!name || !category) {
      return res.status(400).json({ success: false, message: 'Product name and category are required.' });
    }

    const generatedSlug = (slug || name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const productPayload = {
      name,
      slug: generatedSlug,
      category,
      categorySlug,
      shortDescription: shortDescription || '',
      fullDescription: fullDescription || '',
      price: price || 'Contact for Quote',
      priceUnit: priceUnit || 'Ex-Factory Price',
      capacity: capacity || 'Standard',
      power: power || 'Standard Electric',
      materialGrade: materialGrade || 'SS-304 Food Grade',
      automationGrade: automationGrade || 'Semi-Automatic',
      voltage: voltage || '415V, 3-Phase, 50Hz',
      dimensions: dimensions || 'Standard',
      weight: weight || 'Standard',
      warranty: warranty || '1 Year Comprehensive Warranty',
      images: Array.isArray(images) && images.length > 0 ? images : ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'],
      specifications: Array.isArray(specifications) ? specifications : [],
      applications: Array.isArray(applications) ? applications : [],
      features: Array.isArray(features) ? features : [],
      brochureUrl: brochureUrl || '',
      isFeatured: Boolean(isFeatured),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (isUsingMongoDB()) {
      const created = await Product.create(productPayload);
      return res.status(201).json({ success: true, message: 'Product created successfully and published!', product: created });
    } else {
      const store = getFallbackDb();
      const newProduct = {
        _id: 'prod_' + Date.now(),
        ...productPayload
      };
      store.products.unshift(newProduct);
      saveFallbackDb(store);
      return res.status(201).json({ success: true, message: 'Product created successfully and published!', product: newProduct });
    }
  } catch (error) {
    console.error('createProduct error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to create product.' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    updates.updatedAt = new Date();

    if (updates.name && !updates.slug) {
      updates.slug = updates.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }
    if (updates.category) {
      updates.categorySlug = updates.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    if (updates.isPublished !== undefined) {
      updates.isPublished = Boolean(updates.isPublished);
    }

    if (isUsingMongoDB()) {
      const updated = await Product.findByIdAndUpdate(id, updates, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Product not found.' });
      }
      return res.json({ success: true, message: 'Product updated successfully!', product: updated });
    } else {
      const store = getFallbackDb();
      const index = store.products.findIndex(p => p._id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Product not found.' });
      }
      store.products[index] = { ...store.products[index], ...updates };
      saveFallbackDb(store);
      return res.json({ success: true, message: 'Product updated successfully!', product: store.products[index] });
    }
  } catch (error) {
    console.error('updateProduct error:', error);
    res.status(500).json({ success: false, message: 'Failed to update product.' });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingMongoDB()) {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
      // If currently false, set to true; if true or undefined, set to false
      product.isPublished = product.isPublished === false ? true : false;
      await product.save();
      return res.json({
        success: true,
        message: `Machine is now ${product.isPublished ? 'Live on Site' : 'Hidden from Site (Draft)'}`,
        isPublished: product.isPublished
      });
    } else {
      const store = getFallbackDb();
      const product = store.products.find(p => p._id === id);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
      product.isPublished = product.isPublished === false ? true : false;
      saveFallbackDb(store);
      return res.json({
        success: true,
        message: `Machine is now ${product.isPublished ? 'Live on Site' : 'Hidden from Site (Draft)'}`,
        isPublished: product.isPublished
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to toggle publication status.' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingMongoDB()) {
      await Product.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Product deleted successfully.' });
    } else {
      const store = getFallbackDb();
      store.products = store.products.filter(p => p._id !== id);
      saveFallbackDb(store);
      return res.json({ success: true, message: 'Product deleted successfully.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete product.' });
  }
};

