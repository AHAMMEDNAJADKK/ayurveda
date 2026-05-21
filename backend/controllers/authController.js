const jwt = require('jsonwebtoken');
const OTP = require('../models/OTP');
const { sendOTPMessage } = require('../services/whatsappService');

// Helper to normalize phone number to digits only
const cleanPhoneNumber = (phone) => {
  return phone.replace(/[^\d]/g, '');
};

// @desc    Send OTP code to user phone
// @route   POST /api/auth/send-otp
// @access  Public
const sendOTP = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ success: false, message: 'Please provide a phone number' });
  }

  const cleanedPhone = cleanPhoneNumber(phone);
  if (cleanedPhone.length < 10) {
    return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit phone number' });
  }

  try {
    // Generate 6-digit OTP code
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiry (default 5 minutes)
    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES) || 5;
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    // Remove any existing OTP for this phone number
    await OTP.deleteMany({ phone: cleanedPhone });

    // Save new OTP
    const otpDoc = new OTP({
      phone: cleanedPhone,
      otp: generatedOTP,
      expiresAt,
      attempts: 0
    });
    await otpDoc.save();

    // Send the OTP asynchronously
    await sendOTPMessage(phone, generatedOTP);

    // CRITICAL: NEVER return the OTP code in the response payload.
    return res.status(200).json({
      success: true,
      message: 'OTP verification code sent successfully'
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return res.status(500).json({ success: false, message: 'Server error generating OTP' });
  }
};

// @desc    Verify OTP and return JWT
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ success: false, message: 'Please provide phone and OTP' });
  }

  const cleanedPhone = cleanPhoneNumber(phone);

  try {
    // Find OTP record
    const otpRecord = await OTP.findOne({ phone: cleanedPhone });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'OTP expired or not found. Please request a new one.' });
    }

    const maxAttempts = parseInt(process.env.MAX_OTP_ATTEMPTS) || 5;

    // Check attempts limit
    if (otpRecord.attempts >= maxAttempts) {
      await OTP.deleteMany({ phone: cleanedPhone });
      return res.status(400).json({ success: false, message: 'Max attempts exceeded. Please request a new OTP.' });
    }

    // Increment attempts
    otpRecord.attempts += 1;
    await otpRecord.save();

    // Compare code
    if (otpRecord.otp !== otp.toString().trim()) {
      return res.status(400).json({ success: false, message: 'Invalid OTP code. Please try again.' });
    }

    // Correct OTP, delete record
    await OTP.deleteMany({ phone: cleanedPhone });

    // Determine Role by checking if phone matches any admin phone
    const adminPhonesEnv = process.env.ADMIN_PHONES || '';
    const adminPhones = adminPhonesEnv.split(',').map(num => cleanPhoneNumber(num.trim()));
    
    // Check if current cleaned phone is an admin number
    const isAdmin = adminPhones.includes(cleanedPhone);
    const role = isAdmin ? 'admin' : 'user';

    // Sign JWT Token
    // Expiry: 8h for admin, 24h for normal user
    const expiresIn = isAdmin ? '8h' : '24h';
    const token = jwt.sign(
      { phone: cleanedPhone, role },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    return res.status(200).json({
      success: true,
      message: 'Authentication successful',
      token,
      user: {
        phone: cleanedPhone,
        role
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({ success: false, message: 'Server error verifying OTP' });
  }
};

module.exports = {
  sendOTP,
  verifyOTP
};
