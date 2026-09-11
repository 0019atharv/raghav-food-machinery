import { cloudinary } from '../config/cloudinary.js';

/**
 * Image Upload Controller
 * Supports dual modes:
 * - Simple local upload (Active by default for zero-setup local testing)
 * - Cloudinary direct/SDK upload (Commented ready for production)
 */
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select an image to upload.' });
    }

    // 1. Cloudinary upload result (via multer-storage-cloudinary or direct upload)
    if (req.file.path && (req.file.path.startsWith('http://') || req.file.path.startsWith('https://'))) {
      return res.json({
        success: true,
        message: 'Image uploaded to Cloudinary CDN successfully!',
        imageUrl: req.file.path,
        publicId: req.file.filename
      });
    }

    // 2. Simple Local storage fallback
    const serverUrl = process.env.BACKEND_PUBLIC_URL || `${req.protocol}://${req.get('host')}`;
    const localImageUrl = `${serverUrl}/uploads/${req.file.filename}`;

    return res.json({
      success: true,
      message: 'Image uploaded successfully (Local Storage)!',
      imageUrl: localImageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ success: false, message: error.message || 'Image upload failed.' });
  }
};

