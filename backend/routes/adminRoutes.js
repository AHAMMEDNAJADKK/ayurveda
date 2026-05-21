const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/adminController');
const {
  getAppointments,
  updateAppointmentStatus,
  exportAppointmentsCSV
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/auth');

// Auth route
router.post('/login', loginAdmin);

// Protected appointment dashboard routes
router.get('/appointments', protect, getAppointments);
router.get('/appointments/export', protect, exportAppointmentsCSV);
router.patch('/appointments/:id', protect, updateAppointmentStatus);

module.exports = router;
