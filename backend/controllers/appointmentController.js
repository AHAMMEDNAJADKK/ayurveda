const Appointment = require('../models/Appointment');

// Standard JSON response wrapper
const respond = (res, statusCode, success, message, data = null, extra = {}) => {
  return res.status(statusCode).json({
    success,
    message,
    ...(data !== null && { data }),
    ...extra
  });
};

// Helper to format date as DD/MM/YYYY
const formatDate = (date) => {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = async (req, res) => {
  const { name, phone, age, date, timeSlot, healthDetails } = req.body;

  if (!name || !phone || !age || !date || !timeSlot || !healthDetails) {
    return respond(res, 400, false, 'Please provide all required fields');
  }



  try {
    // Normalize date to 00:00:00 local time to prevent timezone offsets causing double booking or slot conflicts
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    // Check for Slot Conflict: Status 'pending' or 'confirmed' for same date & timeSlot
    const slotConflict = await Appointment.findOne({
      date: normalizedDate,
      timeSlot,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (slotConflict) {
      return respond(res, 409, false, 'This slot is already booked. Please select another time or date.');
    }

    const appointment = new Appointment({
      name,
      phone,
      age,
      date: normalizedDate,
      timeSlot,
      healthDetails
    });

    await appointment.save();

    // Trigger WhatsApp notification template for HCA rebranding
    const formattedDate = formatDate(normalizedDate);
    const messageText = `
🌿 *New Appointment — Health Care Ayurveda*
━━━━━━━━━━━━━━━━
👤 Name: ${name}
📞 Phone: ${phone}
🎂 Age: ${age}
📅 Date: ${formattedDate} at ${timeSlot}
🩺 Health Details: ${healthDetails}
━━━━━━━━━━━━━━━━
Please confirm this appointment in the admin dashboard.
`;

    // Log booking notification in console for development/admin alerts
    console.log('\n--- NEW APPOINTMENT BOOKING NOTIFICATION ---');
    console.log(messageText.trim());
    console.log('--------------------------------------------\n');

    return respond(res, 201, true, 'Appointment booked successfully', {
      id: appointment._id,
      confirmationId: appointment.confirmationId,
      name: appointment.name,
      date: appointment.date,
      timeSlot: appointment.timeSlot,
      status: appointment.status
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    return respond(res, 500, false, 'Server error booking appointment');
  }
};

// @desc    Get all appointments (paginated + filtered + search)
// @route   GET /api/admin/appointments
// @access  Private (Admin)
const getAppointments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { status, search, startDate, endDate } = req.query;

    // Build query filter
    const query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        query.date.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.date.$lte = end;
      }
    }

    // Run query with pagination
    const appointments = await Appointment.find(query)
      .sort({ date: 1, timeSlot: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Appointment.countDocuments(query);

    // Calculate Admin Dashboard Stats
    const totalCount = await Appointment.countDocuments();
    const pendingCount = await Appointment.countDocuments({ status: 'pending' });
    const confirmedCount = await Appointment.countDocuments({ status: 'confirmed' });

    // Today's appointments (start and end of today)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const todayCount = await Appointment.countDocuments({
      date: { $gte: startOfToday, $lte: endOfToday }
    });

    return respond(res, 200, true, 'Appointments retrieved successfully', appointments, {
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      },
      stats: {
        total: totalCount,
        today: todayCount,
        pending: pendingCount,
        confirmed: confirmedCount
      }
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    return respond(res, 500, false, 'Server error retrieving appointments');
  }
};

// @desc    Update appointment status
// @route   PATCH /api/admin/appointments/:id
// @access  Private (Admin)
const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;

  if (!status || !['pending', 'confirmed', 'completed'].includes(status)) {
    return respond(res, 400, false, 'Please provide a valid status');
  }

  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return respond(res, 404, false, 'Appointment not found');
    }

    appointment.status = status;
    await appointment.save();

    return respond(res, 200, true, `Appointment status updated to ${status}`, appointment);
  } catch (error) {
    console.error('Update status error:', error);
    return respond(res, 500, false, 'Server error updating appointment status');
  }
};

// @desc    Export appointments to CSV
// @route   GET /api/admin/appointments/export
// @access  Private (Admin)
const exportAppointmentsCSV = async (req, res) => {
  try {
    const { status, search, startDate, endDate } = req.query;

    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        query.date.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.date.$lte = end;
      }
    }

    const appointments = await Appointment.find(query).sort({ date: 1, timeSlot: 1 });

    let csvContent = 'Confirmation ID,Name,Phone,Age,Date,Time Slot,Health Details,Status,Booked At\r\n';

    appointments.forEach((app) => {
      const escapedDetails = app.healthDetails ? app.healthDetails.replace(/"/g, '""') : '';
      const formattedAppDate = app.date ? app.date.toISOString().split('T')[0] : '';
      const formattedCreated = app.createdAt ? app.createdAt.toISOString() : '';

      csvContent += `"${app.confirmationId || ''}","${app.name || ''}","${app.phone || ''}",${app.age || 0},"${formattedAppDate}","${app.timeSlot || ''}","${escapedDetails}","${app.status || ''}","${formattedCreated}"\r\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=hca_appointments.csv');
    return res.status(200).send(csvContent);
  } catch (error) {
    console.error('CSV export error:', error);
    return res.status(500).json({ success: false, message: 'Server error exporting CSV data' });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  exportAppointmentsCSV
};
