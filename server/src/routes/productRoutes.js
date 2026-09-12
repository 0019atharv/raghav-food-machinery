import express from 'express';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  togglePublish,
  deleteProduct
} from '../controllers/productController.js';
import { requireAdmin, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', optionalAuth, getProducts);
router.get('/:slug', optionalAuth, getProductBySlug);
router.post('/', requireAdmin, createProduct);
router.put('/:id', requireAdmin, updateProduct);
router.patch('/:id/toggle-publish', requireAdmin, togglePublish);
router.delete('/:id', requireAdmin, deleteProduct);

export default router;

