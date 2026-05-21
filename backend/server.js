const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const connectDB = require('./config/db');
const appointmentRoutes = require('./routes/appointmentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

// Contact Form Endpoint (Nodemailer)
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  try {
    // Configure Transporter
    let transporter;
    const smtpHost = process.env.SMTP_HOST || 'smtp.ethereal.email';
    const smtpPort = parseInt(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.CONTACT_RECEIVER_EMAIL || 'admin@healthcareayurveda.com',
        subject: `🌿 Contact Inquiry: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return res.status(200).json({ success: true, message: 'Message sent successfully' });
    } else {
      // Dev mode console logger
      console.log('\n--- DEVELOPMENT SIMULATED EMAIL ---');
      console.log(`From: ${name} <${email}>`);
      console.log(`Phone: ${phone}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log('-----------------------------------\n');
      return res.status(200).json({
        success: true,
        message: 'Inquiry received successfully (development log simulated)'
      });
    }
  } catch (error) {
    console.error('Mail dispatch error:', error);
    return res.status(500).json({ success: false, message: 'Server failed to dispatch contact message' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Health Care Ayurveda API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
