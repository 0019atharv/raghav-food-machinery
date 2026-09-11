import { Testimonial } from '../models/index.js';
import { isUsingMongoDB, getFallbackDb, saveFallbackDb } from '../config/db.js';

export const getTestimonials = async (req, res) => {
  try {
    if (isUsingMongoDB()) {
      const testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
      return res.json({ success: true, count: testimonials.length, testimonials });
    } else {
      const store = getFallbackDb();
      const testimonials = (store.testimonials || []).filter(t => t.isApproved !== false);
      return res.json({ success: true, count: testimonials.length, testimonials });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch testimonials.' });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { clientName, company, location, rating, review, avatarUrl, machinePurchased } = req.body;
    if (!clientName || !company || !review) {
      return res.status(400).json({ success: false, message: 'Client name, company, and review are required.' });
    }

    const testData = {
      clientName,
      company,
      location: location || 'India',
      rating: rating ? Number(rating) : 5,
      review,
      avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      machinePurchased: machinePurchased || 'Industrial Food Machine',
      isApproved: true,
      createdAt: new Date()
    };

    if (isUsingMongoDB()) {
      const created = await Testimonial.create(testData);
      return res.status(201).json({ success: true, testimonial: created });
    } else {
      const store = getFallbackDb();
      const newItem = { _id: 'testi_' + Date.now(), ...testData };
      store.testimonials.unshift(newItem);
      saveFallbackDb(store);
      return res.status(201).json({ success: true, testimonial: newItem });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create testimonial.' });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    if (isUsingMongoDB()) {
      await Testimonial.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Testimonial removed.' });
    } else {
      const store = getFallbackDb();
      store.testimonials = store.testimonials.filter(t => t._id !== id);
      saveFallbackDb(store);
      return res.json({ success: true, message: 'Testimonial removed.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete testimonial.' });
  }
};

