const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  age: {
    type: Number,
    required: [true, 'Please add age']
  },
  date: {
    type: Date,
    required: [true, 'Please add a date']
  },
  timeSlot: {
    type: String,
    required: [true, 'Please add a time slot']
  },
  healthDetails: {
    type: String,
    required: [true, 'Please add health details']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed'],
    default: 'pending'
  },
  confirmationId: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate a short 8-char confirmation ID on save
AppointmentSchema.pre('save', async function (next) {
  if (!this.confirmationId) {
    let code = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Simple checks can be added if collision is a concern, but for 8 chars of 36 options (2.8 trillion combinations) it is highly unique
    this.confirmationId = code;
  }
  next();
});

// Compound indexes for query optimization, sorting, and slot checking
AppointmentSchema.index({ date: 1, timeSlot: 1, status: 1 });
AppointmentSchema.index({ phone: 1, status: 1 });

module.exports = mongoose.model('Appointment', AppointmentSchema);
