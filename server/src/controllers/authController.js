import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { isUsingMongoDB, getFallbackDb, saveFallbackDb } from '../config/db.js';

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    process.env.JWT_SECRET || 'rfpm_secure_jwt_token_secret_key_884920',
    { expiresIn: '7d' }
  );
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    let user = null;

    if (isUsingMongoDB()) {
      user = await User.findOne({ email: email.toLowerCase().trim() });
    } else {
      const store = getFallbackDb();
      user = store.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = generateToken(user);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        businessName: user.businessName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, businessName, state } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const hashedPassword = await bcrypt.hash(password, 10);

    if (isUsingMongoDB()) {
      const existing = await User.findOne({ email: normalizedEmail });
      if (existing) {
        return res.status(400).json({ success: false, message: 'User with this email already exists.' });
      }

      const newUser = await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        phone: phone || '',
        businessName: businessName || '',
        state: state || '',
        role: 'customer'
      });

      const token = generateToken(newUser);
      return res.status(201).json({
        success: true,
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          phone: newUser.phone,
          businessName: newUser.businessName
        }
      });
    } else {
      const store = getFallbackDb();
      if (store.users.some(u => u.email.toLowerCase() === normalizedEmail)) {
        return res.status(400).json({ success: false, message: 'User with this email already exists.' });
      }

      const newUser = {
        _id: 'user_' + Date.now(),
        name,
        email: normalizedEmail,
        password: hashedPassword,
        phone: phone || '',
        businessName: businessName || '',
        state: state || '',
        role: 'customer',
        createdAt: new Date()
      };

      store.users.push(newUser);
      saveFallbackDb(store);

      const token = generateToken(newUser);
      return res.status(201).json({
        success: true,
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          phone: newUser.phone,
          businessName: newUser.businessName
        }
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

// Simulated OTP generation for passwordless Indian mobile phone / email authentication
const otpCache = new Map();

export const requestOTP = async (req, res) => {
  try {
    const { contact } = req.body; // Phone or Email
    if (!contact) {
      return res.status(400).json({ success: false, message: 'Phone number or email is required.' });
    }

    const testOtp = '123456'; // Standard test OTP for quick seamless testing
    otpCache.set(contact.trim(), {
      otp: testOtp,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    console.log(`[OTP] Generated OTP for ${contact}: ${testOtp}`);
    res.json({
      success: true,
      message: `OTP sent successfully. (Demo OTP is 123456)`,
      contact: contact.trim()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to generate OTP.' });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { contact, otp, name, businessName, state } = req.body;
    if (!contact || !otp) {
      return res.status(400).json({ success: false, message: 'Contact and OTP are required.' });
    }

    const cached = otpCache.get(contact.trim());
    if (!cached || cached.otp !== otp || Date.now() > cached.expiresAt) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP. (Try 123456)' });
    }

    // Clear used OTP
    otpCache.delete(contact.trim());

    // Check or create customer user
    const isEmail = contact.includes('@');
    const email = isEmail ? contact.toLowerCase().trim() : `${contact.replace(/\D/g, '')}@client.raghavfoodprocessingmachines.com`;
    const phone = !isEmail ? contact.trim() : '';

    let user = null;
    if (isUsingMongoDB()) {
      user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name: name || 'Valued Client',
          email,
          phone,
          password: await bcrypt.hash('OtpLogin@2026', 10),
          businessName: businessName || '',
          state: state || '',
          role: 'customer'
        });
      }
    } else {
      const store = getFallbackDb();
      user = store.users.find(u => u.email === email);
      if (!user) {
        user = {
          _id: 'user_otp_' + Date.now(),
          name: name || 'Valued Client',
          email,
          phone,
          password: bcrypt.hashSync('OtpLogin@2026', 10),
          businessName: businessName || '',
          state: state || '',
          role: 'customer',
          createdAt: new Date()
        };
        store.users.push(user);
        saveFallbackDb(store);
      }
    }

    const token = generateToken(user);
    res.json({
      success: true,
      message: 'Verified successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        businessName: user.businessName
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP.' });
  }
};

export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    let user = null;
    if (isUsingMongoDB()) {
      user = await User.findById(req.user.id).select('-password');
    } else {
      const store = getFallbackDb();
      user = store.users.find(u => u._id === req.user.id);
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        businessName: user.businessName,
        state: user.state
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user profile.' });
  }
};

