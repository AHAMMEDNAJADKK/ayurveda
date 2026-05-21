import React from 'react';
import AppointmentForm from '../components/appointment/AppointmentForm';
import { Leaf } from 'lucide-react';

const Appointment = () => {
  return (
    <div className="min-h-screen bg-cream/10 py-16 relative overflow-hidden">
      
      {/* Organic Background SVGs */}
      <div className="absolute left-0 top-1/4 text-accent/10 opacity-30 pointer-events-none transform -translate-x-12">
        <svg width="250" height="250" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 8C8 10 7 20 7 20s10-1 12-10c.8-3.6-1.4-5.6-2-2z" />
        </svg>
      </div>
      <div className="absolute right-0 bottom-1/4 text-accent/10 opacity-30 pointer-events-none transform translate-x-12">
        <svg width="200" height="200" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 8C8 10 7 20 7 20s10-1 12-10c.8-3.6-1.4-5.6-2-2z" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header Block */}
        <div className="text-center mb-12 space-y-2">
          <div className="flex justify-center">
            <span className="p-2 bg-white text-primary rounded-full shadow-sm">
              <Leaf className="w-6 h-6" />
            </span>
          </div>
          <span className="font-accent text-sm text-gold tracking-widest uppercase italic block">
            Begin your restoration
          </span>
          <h1 className="font-display text-4xl font-bold text-textDark tracking-wide">
            Schedule a Consultation
          </h1>
          <div className="w-12 h-[1.5px] bg-gold mx-auto" />
          <p className="font-body text-sm text-textMuted max-w-md mx-auto leading-relaxed pt-2">
            Secure your slot for a customized body analysis, pulse diagnostic, and wellness formulation.
          </p>
        </div>

        {/* Form Element */}
        <AppointmentForm />
      </div>

    </div>
  );
};

export default Appointment;
