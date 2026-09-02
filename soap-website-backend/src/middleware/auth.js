// src/middleware/auth.js

const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // 1. Try Supabase Auth verification
    if (supabase) {
      try {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (user && !error) {
          // Attempt to fetch profile for role metadata
          let role = user.user_metadata?.role || 'customer';
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role, name, phone')
              .eq('id', user.id)
              .single();
            if (profile?.role) role = profile.role;
          } catch (pErr) {
            // Non-critical profile query error
          }

          req.user = {
            id: user.id,
            userId: user.id,
            email: user.email,
            name: user.user_metadata?.name || 'Customer',
            role,
          };
          return next();
        }
      } catch (sbErr) {
        // Fallback to local JWT check below
      }
    }

    // 2. Fallback to standard JWT verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_personalized_soap_jwt_key_2026');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (token) {
        if (supabase) {
          try {
            const { data: { user } } = await supabase.auth.getUser(token);
            if (user) {
              req.user = {
                id: user.id,
                userId: user.id,
                email: user.email,
                name: user.user_metadata?.name || 'Customer',
                role: user.user_metadata?.role || 'customer',
              };
              return next();
            }
          } catch {}
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_personalized_soap_jwt_key_2026');
        req.user = decoded;
      }
    }
  } catch (err) {
    // Ignore invalid token for optional auth
  }
  next();
};

const adminMiddleware = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  });
};

module.exports = {
  authMiddleware,
  authenticate: authMiddleware,
  optionalAuth,
  adminMiddleware
};
