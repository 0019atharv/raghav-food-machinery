import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import videoRoutes from './routes/videoRoutes.js';

import { Product, Category, Enquiry, Blog } from './models/index.js';
import { isUsingMongoDB, getFallbackDb } from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parsers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded media
const uploadsDir = path.resolve('uploads');
app.use('/uploads', express.static(uploadsDir));

// Connect Database
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/videos', videoRoutes);

// Admin Quick Stats Route
app.get('/api/stats', async (req, res) => {
  try {
    if (isUsingMongoDB()) {
      const [totalProducts, totalCategories, totalEnquiries, pendingEnquiries, totalBlogs] = await Promise.all([
        Product.countDocuments(),
        Category.countDocuments(),
        Enquiry.countDocuments(),
        Enquiry.countDocuments({ status: 'Pending' }),
        Blog.countDocuments()
      ]);
      return res.json({
        success: true,
        stats: {
          totalProducts,
          totalCategories,
          totalEnquiries,
          pendingEnquiries,
          totalBlogs,
          database: 'MongoDB'
        }
      });
    } else {
      const store = getFallbackDb();
      return res.json({
        success: true,
        stats: {
          totalProducts: store.products.length,
          totalCategories: store.categories.length,
          totalEnquiries: store.enquiries.length,
          pendingEnquiries: store.enquiries.filter(e => e.status === 'Pending').length,
          totalBlogs: store.blogs.length,
          database: 'Local Store (MongoDB Ready)'
        }
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch statistics.' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date(),
    service: 'Raghav Food Machinery API',
    mongoConnected: isUsingMongoDB()
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Raghav Food Machinery API Server running on port ${PORT}`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🛠️  Health check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});

