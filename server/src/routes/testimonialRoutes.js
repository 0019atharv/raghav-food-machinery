import express from 'express';
import {
  getTestimonials,
  createTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', createTestimonial); // Can be submitted by client or added by admin
router.delete('/:id', requireAdmin, deleteTestimonial);

export default router;

