import express from 'express';
import {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo
} from '../controllers/videoController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getVideos);
router.post('/', requireAdmin, createVideo);
router.put('/:id', requireAdmin, updateVideo);
router.delete('/:id', requireAdmin, deleteVideo);

export default router;

