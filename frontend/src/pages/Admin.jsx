import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AppointmentList from '../components/admin/AppointmentList';
import { Lock, Mail, Key } from 'lucide-react';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('samedha_admin_token') || null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Authenticating credentials...');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${apiUrl}/admin/login`, { email, password });

      if (response.data.success && response.data.token) {
        localStorage.setItem('samedha_admin_token', response.data.token);
        setToken(response.data.token);
        toast.success('Access granted! Welcome to dashboard.', { id: toastId });
      } else {
        toast.error(response.data.message || 'Login failed', { id: toastId });
      }
    } catch (error) {
      console.error('Login request failed:', error);
      toast.error(
        error.response?.data?.message || 'Invalid email or password',
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('samedha_admin_token');
    setToken(null);
    setEmail('');
    setPassword('');
    toast.success('Signed out successfully.');
  };

  // Logged-in Dashboard
  if (token) {
    return (
      <div className="min-h-screen bg-cream/20 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AppointmentList token={token} onLogout={handleLogout} />
        </div>
      </div>
    );
  }

  // Not Logged-in Login Screen
  return (
    <div className="min-h-screen bg-cream/40 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative leaf SVGs */}
      <div className="absolute left-10 top-10 text-primary/10 animate-leaf-1 w-20 h-20">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 7 20 7 20s10-1 12-10c.8-3.6-1.4-5.6-2-2z" />
        </svg>
      </div>
      <div className="absolute right-10 bottom-10 text-primary/10 animate-leaf-2 w-28 h-28">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 7 20 7 20s10-1 12-10c.8-3.6-1.4-5.6-2-2z" />
        </svg>
      </div>

      <div className="max-w-md w-full z-10">
        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-primary/5 shadow-xl space-y-6">
          {/* Brand header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-2.5 bg-white rounded-full shadow-sm border border-primary/5">
                <svg
                  className="w-10 h-10 text-primary"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M52 28C52 28 35 28 35 43C35 55 52 52 52 64C52 74 41 74 38 74" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <path d="M52 28C55 20 48 16 42 22C38 26 44 32 52 28Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <h2 className="font-display text-2xl font-bold text-textDark">
              Admin Gateway
            </h2>
            <p className="font-body text-xs text-textMuted mt-1.5 leading-relaxed">
              Log in to confirm, complete, and export clinical appointments.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-textDark flex items-center gap-1.5">
                <Mail size={13} className="text-primary" />
                <span>Admin Email</span>
              </label>
              <input
                type="email"
                placeholder="admin@samedha.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream focus:outline-none focus:border-primary text-xs font-body bg-cream/10"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-textDark flex items-center gap-1.5">
                <Lock size={13} className="text-primary" />
                <span>Security Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream focus:outline-none focus:border-primary text-xs font-body bg-cream/10"
                required
              />
            </div>

            {/* Submit btn */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-light text-white text-xs font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-350 flex items-center justify-center space-x-2 disabled:opacity-50 mt-4"
            >
              <Key size={13} />
              <span>{loading ? 'Authenticating...' : 'Sign In To Dashboard'}</span>
            </button>
          </form>

          {/* Dummy hints */}
          <div className="bg-cream/40 p-4 rounded-xl border border-primary/5 text-[10px] text-textMuted leading-relaxed space-y-1">
            <span className="font-bold text-textDark block mb-1">Local Testing Credentials:</span>
            <p>Email: <span className="font-mono font-bold text-textDark">admin@samedha.com</span></p>
            <p>Password: <span className="font-mono font-bold text-textDark">SamedhaAdmin2026!</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
