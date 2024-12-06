// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get the token from Bearer

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log decoded token for debugging
    console.log('Decoded token:', decoded);

    if (!decoded.id) {
      return res.status(401).json({ message: 'Invalid token payload: User ID missing' });
    }

    req.user = decoded; // Attach user information to the request
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;
