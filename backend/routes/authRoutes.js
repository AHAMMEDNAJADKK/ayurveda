const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendOTP, verifyOTP } = require('../controllers/authController');
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

// @route   POST /api/auth/send-otp
// @desc    Send OTP to phone
// @access  Public (Rate limited)
router.post(
  '/send-otp',
  otpRateLimiter,
  [
    body('phone')
      .notEmpty()
      .withMessage('Phone number is required')
      .matches(/^\+?\d{10,15}$/)
      .withMessage('Please enter a valid phone number (10 to 15 digits)')
  ],
  validate,
  sendOTP
);

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and authenticate
// @access  Public
router.post(
  '/verify-otp',
  [
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('otp')
      .notEmpty()
      .withMessage('OTP is required')
      .isLength({ min: 6, max: 6 })
      .withMessage('OTP must be exactly 6 digits')
  ],
  validate,
  verifyOTP
);

module.exports = router;
