import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import {
  Product,
  Category,
  Enquiry,
  Blog,
  Gallery,
  Testimonial,
  SiteSetting,
  User,
  MachineryVideo
} from '../models/index.js';
import {
  initialCategories,
  initialProducts,
  initialBlogs,
  initialGallery,
  initialTestimonials,
  initialSettings,
  initialVideos
} from '../utils/seedData.js';

let isMongoConnected = false;

// Local JSON fallback store in case MongoDB is temporarily unreachable
const dataDir = path.resolve('data');
const fallbackDbFile = path.join(dataDir, 'db_fallback.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const getFallbackDb = () => {
  if (fs.existsSync(fallbackDbFile)) {
    try {
      const store = JSON.parse(fs.readFileSync(fallbackDbFile, 'utf8'));
      if (!store.videos) {
        store.videos = initialVideos.map((v, i) => ({ ...v, _id: 'vid_' + (i + 1), createdAt: new Date() }));
        fs.writeFileSync(fallbackDbFile, JSON.stringify(store, null, 2));
      }
      return store;
    } catch (e) {
      console.error('[DB] Error parsing fallback json, re-initializing...', e);
    }
  }
  const defaultStore = {
    products: initialProducts.map((p, i) => ({ ...p, _id: 'prod_' + (i + 1), createdAt: new Date() })),
    categories: initialCategories.map((c, i) => ({ ...c, _id: 'cat_' + (i + 1), createdAt: new Date() })),
    blogs: initialBlogs.map((b, i) => ({ ...b, _id: 'blog_' + (i + 1), createdAt: new Date() })),
    gallery: initialGallery.map((g, i) => ({ ...g, _id: 'gal_' + (i + 1), createdAt: new Date() })),
    testimonials: initialTestimonials.map((t, i) => ({ ...t, _id: 'testi_' + (i + 1), createdAt: new Date() })),
    settings: { ...initialSettings, _id: 'settings_1' },
    videos: initialVideos.map((v, i) => ({ ...v, _id: 'vid_' + (i + 1), createdAt: new Date() })),
    enquiries: [],
    users: [
      {
        _id: 'user_admin_1',
        name: 'Administrator',
        email: 'admin@raghavfoodprocessingmachines.com',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
        phone: '+919873456789'
      }
    ]
  };
  fs.writeFileSync(fallbackDbFile, JSON.stringify(defaultStore, null, 2));
  return defaultStore;
};

export const saveFallbackDb = (store) => {
  try {
    fs.writeFileSync(fallbackDbFile, JSON.stringify(store, null, 2));
  } catch (err) {
    console.error('[DB] Failed to save fallback db:', err);
  }
};

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/raghav_food_machinery';
  
  try {
    console.log(`[Database] Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3500 // Fail quickly to fallback if local mongod is not started
    });
    isMongoConnected = true;
    console.log('✅ [Database] MongoDB Connected Successfully via Mongoose!');
    
    // Seed database if empty
    await seedDatabaseIfEmpty();
  } catch (err) {
    isMongoConnected = false;
    console.warn('⚠️ [Database] MongoDB connection failed or server not running:', err.message);
    console.log('ℹ️ [Database] Running with automated Local DB Store so server remains 100% operational.');
    console.log('ℹ️ [Database] To connect your MongoDB, start mongod or update MONGODB_URI in server/.env.');
    getFallbackDb(); // Ensure fallback store initialized
  }
};

export const isUsingMongoDB = () => isMongoConnected;

// Auto-seed MongoDB with Raghav Food Machinery data if collections are empty
async function seedDatabaseIfEmpty() {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('🌱 [Database] Seeding initial Raghav Food Machinery data into MongoDB...');
      await Category.insertMany(initialCategories);
      await Product.insertMany(initialProducts);
      await Blog.insertMany(initialBlogs);
      await Gallery.insertMany(initialGallery);
      await Testimonial.insertMany(initialTestimonials);
      await SiteSetting.create(initialSettings);
      
      const adminPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Administrator',
        email: 'admin@raghavfoodprocessingmachines.com',
        password: adminPassword,
        role: 'admin',
        phone: '+919873456789',
        businessName: 'Raghav Food Machinery Company'
      });
      console.log('✅ [Database] Seeded Products, Categories, Blogs, Testimonials & Admin User into MongoDB!');
    } else {
      console.log(`ℹ️ [Database] MongoDB already populated (${productCount} products found).`);
    }
  } catch (seedErr) {
    console.error('[Database] Seeding error:', seedErr);
  }
}

