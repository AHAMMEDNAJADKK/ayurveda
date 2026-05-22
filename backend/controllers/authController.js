const jwt = require('jsonwebtoken');
const admin = require('../config/firebaseAdmin');
const User = require('../models/User');

// Helper to normalize phone number to digits only
const cleanPhoneNumber = (phone) => {
  let cleaned = phone.replace(/[^\d]/g, '');
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  return cleaned;
};

// @desc    Verify Firebase ID Token and Authenticate User
// @route   POST /api/auth/firebase-login
// @access  Public
const firebaseLogin = async (req, res) => {
  const { idToken, phone } = req.body;

  if (!idToken || !phone) {
    return res.status(400).json({ success: false, message: 'Please provide ID token and phone number' });
  }

  const cleanedPhone = cleanPhoneNumber(phone);

  try {
    // 1. Verify the ID Token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // 2. Extract and clean phone number from token
    const firebasePhone = decodedToken.phone_number;
    if (!firebasePhone) {
      return res.status(400).json({ success: false, message: 'Firebase token does not contain a phone number' });
    }

    const cleanedFirebasePhone = cleanPhoneNumber(firebasePhone);

    // 3. Secure validation: Verify that the token's phone number matches the request phone number
    if (cleanedPhone !== cleanedFirebasePhone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number mismatch. Token verification failed.' 
      });
    }

    // 4. Determine user role based on ADMIN_PHONES configuration
    const adminPhonesEnv = process.env.ADMIN_PHONES || '';
    const adminPhones = adminPhonesEnv.split(',').map(num => cleanPhoneNumber(num.trim()));
    const isAdmin = adminPhones.includes(cleanedPhone);
    const role = isAdmin ? 'admin' : 'user';

    // 5. Register or update the user in MongoDB
    let user = await User.findOne({ phone: cleanedPhone });
    if (!user) {
      user = new User({
        phone: cleanedPhone,
        role
      });
    } else {
      // Keep role updated in case environment configs changed
      user.role = role;
    }
    user.lastLogin = new Date();
    await user.save();

    // 6. Sign our local JWT token
    const expiresIn = isAdmin ? '8h' : '24h';
    const token = jwt.sign(
      { userId: user._id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    return res.status(200).json({
      success: true,
      message: 'Authentication successful',
      token,
      user: {
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Firebase authentication error:', error);
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized. Invalid or expired Firebase token.' 
    });
  }
};

module.exports = {
  firebaseLogin
};
