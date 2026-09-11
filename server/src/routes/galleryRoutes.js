import express from 'express';
import {
  getGallery,
  createGalleryItem,
  deleteGalleryItem
} from '../controllers/galleryController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getGallery);
router.post('/', requireAdmin, createGalleryItem);
router.delete('/:id', requireAdmin, deleteGalleryItem);

export default router;

