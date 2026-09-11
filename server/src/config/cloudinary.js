import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Ensure local uploads directory exists for out-of-the-box local storage
const uploadsDir = path.resolve('uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ==============================================================================
// 1. CLOUDINARY CONFIGURATION & STORAGE ENGINE
// ==============================================================================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true
});

let cloudinaryStorage = null;
try {
  cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'raghav-food-processing-machines',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
      transformation: [{ width: 1600, height: 1200, crop: 'limit', quality: 'auto' }]
    }
  });
} catch (err) {
  console.warn('[Storage] CloudinaryStorage initialization deferred:', err.message);
}

export const uploadCloudinary = multer({ 
  storage: cloudinaryStorage || multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

// ==============================================================================
// 2. LOCAL STORAGE ENGINE (Active by default for zero-setup local testing)
// ==============================================================================
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, 'rfpm-' + uniqueSuffix + ext);
  }
});

export const uploadLocal = multer({
  storage: localStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|avif|svg/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WEBP, AVIF, SVG) are allowed!'));
    }
  }
});

/**
 * Upload middleware selector:
 * When you are ready to switch to Cloudinary:
 * 1. Fill your Cloudinary keys in server/.env
 * 2. Uncomment the cloudinaryStorage block above
 * 3. Change `return uploadLocal;` below to `return uploadCloudinary;`
 */
export const getUploadMiddleware = () => {
  if (process.env.USE_CLOUDINARY === 'true' && process.env.CLOUDINARY_CLOUD_NAME && cloudinaryStorage) {
    console.log('☁️ [Storage] Active Engine: Cloudinary CDN Storage');
    return uploadCloudinary;
  }
  return uploadLocal;
};

export { cloudinary };

