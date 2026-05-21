const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    trim: true
  },
  otp: {
    type: String,
    required: [true, 'Please add an OTP code']
  },
  attempts: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

// TTL index to automatically remove expired OTP documents
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
// Index phone for fast searches
OTPSchema.index({ phone: 1 });

module.exports = mongoose.model('OTP', OTPSchema);
