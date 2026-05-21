import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Calendar, User, Phone, Info, Clock, CheckCircle2, Copy, FileText } from 'lucide-react';

import "react-datepicker/dist/react-datepicker.css";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    timeSlot: '',
    healthDetails: ''
  });
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null); // Will hold response data

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { name, phone, age, timeSlot, healthDetails } = formData;
    
    if (!name.trim()) return "Please enter your name";
    
    // 10-digit validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.trim())) return "Phone number must be a valid 10-digit numeric number";
    
    const parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) return "Please enter a valid age (1 - 120)";
    
    if (!appointmentDate) return "Please select an appointment date";
    
    if (!timeSlot) return "Please select a preferred time slot";
    
    if (healthDetails.trim().length < 20) return "Health details must be at least 20 characters long";
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errorMsg = validateForm();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Reserving slot...");

    try {
      const payload = {
        ...formData,
        age: parseInt(formData.age),
        date: appointmentDate,
      };

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${apiUrl}/appointments`, payload);

      if (response.data.success) {
        toast.success("Appointment booked successfully!", { id: toastId });
        setBookingSuccess(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to book appointment", { id: toastId });
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(
        error.response?.data?.message || "Server connection failed. Please try again.",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  const copyConfirmationId = () => {
    if (bookingSuccess?.confirmationId) {
      navigator.clipboard.writeText(bookingSuccess.confirmationId);
      toast.success("Confirmation code copied to clipboard!");
    }
  };

  // SUCCESS SCREEN
  if (bookingSuccess) {
    const formattedDate = new Date(bookingSuccess.date).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
      <div className="text-center bg-white p-8 md:p-12 rounded-3xl border border-primary/10 shadow-xl max-w-lg mx-auto animate-fade-up relative overflow-hidden">
        {/* Leafy floating details */}
        <div className="absolute -left-12 -top-12 opacity-5 text-primary pointer-events-none">
          <svg width="150" height="150" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 8C8 10 7 20 7 20s10-1 12-10c.8-3.6-1.4-5.6-2-2z" />
          </svg>
        </div>

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-cream text-primary rounded-full flex items-center justify-center border border-primary/10">
            <CheckCircle2 size={40} className="text-primary" />
          </div>
        </div>

        <span className="font-accent text-sm text-gold tracking-widest uppercase block mb-1">
          Booking Confirmed
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-textDark mb-2">
          Your Session is Reserved
        </h2>
        <div className="w-12 h-[1px] bg-gold mx-auto mb-6" />

        {/* Info Card */}
        <div className="bg-cream/40 p-5 rounded-2xl border border-primary/5 text-left space-y-3 font-body text-sm text-textDark/90 mb-8">
          <p className="flex justify-between">
            <span className="text-textMuted">Confirmation ID:</span>
            <span className="font-bold flex items-center space-x-1">
              <span>{bookingSuccess.confirmationId}</span>
              <button onClick={copyConfirmationId} className="text-primary hover:text-primary-light ml-1" title="Copy code">
                <Copy size={14} />
              </button>
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-textMuted">Patient Name:</span>
            <span className="font-semibold">{bookingSuccess.name}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-textMuted">Date:</span>
            <span className="font-semibold">{formattedDate}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-textMuted">Time Slot:</span>
            <span className="font-semibold text-primary">{bookingSuccess.timeSlot}</span>
          </p>
        </div>

        <p className="font-body text-xs text-textMuted leading-relaxed mb-6">
          A confirmation alert has been triggered for the clinic director. We will reach out to you if there is any adjustment needed. Thank you for choosing Samedha Ayurvedics.
        </p>

        <button
          onClick={() => {
            setBookingSuccess(null);
            setFormData({ name: '', phone: '', age: '', timeSlot: '', healthDetails: '' });
            setAppointmentDate(null);
          }}
          className="bg-primary hover:bg-primary-light text-white text-sm font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  // BOOKING FORM
  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl border border-primary/5 shadow-lg max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Two cols for Name and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-textDark flex items-center gap-1.5">
              <User size={14} className="text-primary" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full px-4 py-2.5 rounded-xl border border-cream focus:outline-none focus:border-primary text-sm font-body bg-cream/10"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-textDark flex items-center gap-1.5">
              <Phone size={14} className="text-primary" />
              <span>Phone Number *</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit number"
              className="w-full px-4 py-2.5 rounded-xl border border-cream focus:outline-none focus:border-primary text-sm font-body bg-cream/10"
              required
            />
          </div>
        </div>

        {/* Two cols for Age and Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Age */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-textDark flex items-center gap-1.5">
              <Info size={14} className="text-primary" />
              <span>Age *</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 28"
              className="w-full px-4 py-2.5 rounded-xl border border-cream focus:outline-none focus:border-primary text-sm font-body bg-cream/10"
              min="1"
              max="120"
              required
            />
          </div>

          {/* Date Picker */}
          <div className="space-y-1.5 flex flex-col">
            <label className="text-xs font-bold text-textDark flex items-center gap-1.5 mb-1.5">
              <Calendar size={14} className="text-primary" />
              <span>Date of Appointment *</span>
            </label>
            <DatePicker
              selected={appointmentDate}
              onChange={(date) => setAppointmentDate(date)}
              minDate={new Date()}
              placeholderText="Select a date"
              className="w-full px-4 py-2.5 rounded-xl border border-cream focus:outline-none focus:border-primary text-sm font-body bg-cream/10"
              required
            />
          </div>
        </div>

        {/* Time Slot Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-textDark flex items-center gap-1.5">
            <Clock size={14} className="text-primary" />
            <span>Time Slot *</span>
          </label>
          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-cream focus:outline-none focus:border-primary text-sm font-body bg-cream/10"
            required
          >
            <option value="">Select a preferred hour slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Cause / Health Details */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-textDark flex items-center gap-1.5">
            <FileText size={14} className="text-primary" />
            <span>Cause / Health Details *</span>
          </label>
          <textarea
            name="healthDetails"
            rows="4"
            value={formData.healthDetails}
            onChange={handleChange}
            placeholder="Please detail your symptoms, duration, and health goals... (Minimum 20 characters)"
            className="w-full px-4 py-2.5 rounded-xl border border-cream focus:outline-none focus:border-primary text-sm font-body bg-cream/10 resize-none"
            required
          />
          <div className="flex justify-between items-center text-[10px] text-textMuted px-1">
            <span>Minimum 20 characters</span>
            <span className={formData.healthDetails.length >= 20 ? 'text-primary font-bold' : 'text-red-500'}>
              {formData.healthDetails.length} characters
            </span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-light text-white font-body font-semibold py-3.5 px-6 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Calendar size={16} />
          <span>{loading ? 'Processing Request...' : 'Book Scheduled Session'}</span>
        </button>

      </form>
    </div>
  );
};

export default AppointmentForm;
