const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  const isHardcodedAdmin = (email.toLowerCase() === 'najadahammed34@gmail.com' && password === '787878');
  let isMatch = false;
  let finalEmail = email.toLowerCase();

  // 1. Try to find the admin user in the MongoDB 'admins' collection
  try {
    const adminsCollection = mongoose.connection.db.collection('admins');
    const dbAdmin = await adminsCollection.findOne({ email: email.toLowerCase() });
    
    if (dbAdmin) {
      // Use the password field and compare with bcrypt
      isMatch = await bcrypt.compare(password, dbAdmin.password);
      if (isMatch) {
        finalEmail = dbAdmin.email;
      }
    }
  } catch (err) {
    console.error('Database admin query or compare error:', err);
  }

  // 2. Fallback to hardcoded credentials or environment variable config
  if (!isMatch) {
    if (isHardcodedAdmin) {
      isMatch = true;
      finalEmail = 'najadahammed34@gmail.com';
    } else {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@healthcareayurveda.com';
      const adminPasswordHash = process.env.ADMIN_PASSWORD;

      if (email.toLowerCase() === adminEmail.toLowerCase()) {
        try {
          const hashToCompare = adminPasswordHash || '$2a$10$dwHG4o3J1rl3/Pflx/rsFe4Q9X3I0XgUVVNaz1FyvxAEnEEnLjt/q';
          isMatch = await bcrypt.compare(password, hashToCompare);
          if (isMatch) {
            finalEmail = adminEmail;
          }
        } catch (err) {
          console.error('Bcrypt compare error:', err);
        }
      }
    }
  }

  // If credentials do not match, return 401 with standard response payload
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  try {
    const token = jwt.sign(
      { email: finalEmail, role: 'admin' },
      process.env.JWT_SECRET || 'super_secret_hca_key_2026_987654321',
      { expiresIn: '30d' }
    );

    return res.status(200).json({
      success: true,
      token,
      email: finalEmail,
      role: 'admin',
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { loginAdmin };
