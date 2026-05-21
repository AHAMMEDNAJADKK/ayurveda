const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/adminController');
const {
  getAppointments,
  updateAppointmentStatus,
  exportAppointmentsCSV
} = require('../controllers/appointmentController');
const { protect, admin } = require('../middleware/auth');

// Auth route
router.post('/login', loginAdmin);

// Protected appointment dashboard routes
router.get('/appointments', protect, admin, getAppointments);
router.get('/appointments/export', protect, admin, exportAppointmentsCSV);
router.patch('/appointments/:id', protect, admin, updateAppointmentStatus);

module.exports = router;
