import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { getUploadMiddleware } from '../config/cloudinary.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', requireAdmin, (req, res, next) => {
  const upload = getUploadMiddleware();
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Upload middleware error:', err);
      return res.status(400).json({ success: false, message: err.message || 'File upload error' });
    }
    next();
  });
}, uploadImage);

export default router;

