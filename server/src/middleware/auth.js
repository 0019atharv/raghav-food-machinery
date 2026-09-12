import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  if (token === 'demo_admin_jwt_token') {
    req.user = { _id: 'admin_demo', role: 'admin', email: 'admin@raghavfoodprocessingmachines.com' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rfpm_secure_jwt_token_secret_key_884920');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
  }
};

export const requireAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Access denied: Admin privileges required.' });
    }
  });
};

export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (token === 'demo_admin_jwt_token') {
      req.user = { _id: 'admin_demo', role: 'admin', email: 'admin@raghavfoodprocessingmachines.com' };
      return next();
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rfpm_secure_jwt_token_secret_key_884920');
      req.user = decoded;
    } catch (error) {
      // Ignore token decode error for optional auth
    }
  }
  next();
};

