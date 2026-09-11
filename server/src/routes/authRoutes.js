import express from 'express';
import { login, register, requestOTP, verifyOTP, getMe } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/otp/request', requestOTP);
router.post('/otp/verify', verifyOTP);
router.get('/me', verifyToken, getMe);

export default router;

