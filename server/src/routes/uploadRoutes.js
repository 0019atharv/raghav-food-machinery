import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { getUploadMiddleware } from '../config/cloudinary.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const upload = getUploadMiddleware();

router.post('/', requireAdmin, upload.single('image'), uploadImage);

export default router;

