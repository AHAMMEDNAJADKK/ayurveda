const express = require('express');
const { body, validationResult } = require('express-validator');
const { firebaseLogin } = require('../controllers/authController');
const otpRateLimiter = require('../middleware/otpRateLimit');

const router = express.Router();

// Middleware to format/check express-validator validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array()
    });
  }
  next();
};

// @route   POST /api/auth/firebase-login
// @desc    Verify Firebase ID Token and authenticate
// @access  Public (Rate limited)
router.post(
  '/firebase-login',
  otpRateLimiter,
  [
    body('idToken').notEmpty().withMessage('Firebase ID token is required'),
    body('phone').notEmpty().withMessage('Phone number is required')
  ],
  validate,
  firebaseLogin
);

module.exports = router;
