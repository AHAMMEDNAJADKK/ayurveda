const rateLimit = require('express-rate-limit');

const otpRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each phone number to 3 OTP requests per windowMs
  message: {
    success: false,
    message: 'Too many OTP requests for this phone number. Please try again after 15 minutes.'
  },
  keyGenerator: (req) => {
    // Group and limit by the phone number in the body, fallback to static key if missing
    return req.body.phone ? req.body.phone.toString().trim() : 'anonymous';
  },
  standardHeaders: true, // Return rate limit info in standard headers
  legacyHeaders: false, // Disable legacy headers
});

module.exports = otpRateLimiter;
