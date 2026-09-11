import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  getUserEnquiries,
  updateEnquiryStatus,
  exportEnquiriesCSV
} from '../controllers/enquiryController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createEnquiry);
router.get('/export', requireAdmin, exportEnquiriesCSV);
router.get('/my', verifyToken, getUserEnquiries);
router.get('/', requireAdmin, getEnquiries);
router.patch('/:id/status', requireAdmin, updateEnquiryStatus);

export default router;

