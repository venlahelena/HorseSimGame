const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    console.log('JWT_SECRET in middleware:', process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded userId:', decoded.userId);
    req.user = await User.findById(decoded.userId).select('-password');
    console.log('Found user:', req.user);
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (err) {
    console.log('JWT error:', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};