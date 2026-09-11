import express from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', requireAdmin, createBlog);
router.put('/:id', requireAdmin, updateBlog);
router.delete('/:id', requireAdmin, deleteBlog);

export default router;

