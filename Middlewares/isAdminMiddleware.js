const User = require("../Models/User");
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const ApiError = require('../Shared/ApiError');
exports.isAdmin = asyncHandler(async (req, res, next) => {
  const authToken = req.headers.authorization?.split(' ')[1];

  if (!authToken) {
    return res.status(401).json({ message: 'Unauthorized User' });
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_KEY);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found with the provided token' });
    }

    const authorizedRoles = ['admin']; // You can modify this array as needed
    if (authorizedRoles.includes(user.role)) {
      return next();
    }

    return res.status(401).json({ message: 'Only authorized users can complete this action. You are not authorized.' });
  } catch (err) {
    console.error(err);

    // Consider creating custom error classes for specific errors
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});
