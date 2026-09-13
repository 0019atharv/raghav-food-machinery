import express from 'express';
import { uploadImage, uploadVideo } from '../controllers/uploadController.js';
import { getUploadMiddleware, getVideoUploadMiddleware } from '../config/cloudinary.js';
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

router.post('/video', requireAdmin, (req, res, next) => {
  const upload = getVideoUploadMiddleware();
  upload.single('video')(req, res, (err) => {
    if (err) {
      console.error('Video upload error:', err);
      return res.status(400).json({ success: false, message: err.message || 'Video upload error' });
    }
    next();
  });
}, uploadVideo);

export default router;


