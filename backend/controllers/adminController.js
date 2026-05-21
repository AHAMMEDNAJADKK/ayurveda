const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@samedha.com';
  const adminPasswordHash = process.env.ADMIN_PASSWORD;

  if (email.toLowerCase() !== adminEmail.toLowerCase()) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  try {
    // If no password hash is provided in env, default back to hashed 'SamedhaAdmin2026!'
    // Hash: $2a$10$Wqj4xK6E2F6b7Q/KkO/5Nu3Jt.51oIeM1zJ864w/sVuxFh94a28n.
    const hashToCompare = adminPasswordHash || '$2a$10$Wqj4xK6E2F6b7Q/KkO/5Nu3Jt.51oIeM1zJ864w/sVuxFh94a28n.';
    const isMatch = await bcrypt.compare(password, hashToCompare);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: adminEmail },
      process.env.JWT_SECRET || 'super_secret_samedha_key_2026_987654321',
      { expiresIn: '30d' }
    );

    return res.status(200).json({
      success: true,
      token,
      email: adminEmail
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { loginAdmin };
