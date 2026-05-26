import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';
import api from '../services/api';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin/appointments');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Pre-validation check for requested credentials
    if (email.toLowerCase() !== 'najadahammed34@gmail.com' || password !== '787878') {
      setErrorMsg('Invalid email or password');
      return;
    }

    setIsLoading(true);
    try {
      // Authenticate with the backend admin login endpoint to retrieve a valid JWT
      const response = await api.post('/admin/login', {
        email: email,
        password: password
      });

      if (response.data.success) {
        toast.success('Login successful! Welcome to dashboard.');
        login({
          token: response.data.token,
          role: 'admin',
          phone: 'admin'
        });
        navigate('/admin/appointments');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      const msg = error.response?.data?.message || error.cleanedMessage || 'Invalid email or password';
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cream/20 py-20 px-4 overflow-hidden font-body">
      {/* Aesthetic Background Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo centered above the login form */}
        <div className="flex justify-center mb-8">
          <LinkToHome>
            <div className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 inline-block">
              <img
                src={logo}
                alt="Health Care Ayurveda"
                className="logo-fade-in-effect max-h-[80px] w-auto object-contain"
                style={{ mixBlendMode: 'normal' }}
              />
            </div>
          </LinkToHome>
        </div>

        {/* Glassmorphic Container Card */}
        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-primary/10 shadow-green">
          <div className="space-y-2 text-center mb-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-textDark">
              Admin Portal
            </h2>
            <p className="text-xs md:text-sm text-textMuted max-w-xs mx-auto">
              Please log in using your administrative credentials to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-textDark flex items-center gap-1.5">
                <User size={14} className="text-primary" />
                <span>Email</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full px-4 py-3 rounded-xl border border-cream focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-body bg-cream/10 font-medium"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-textDark flex items-center gap-1.5">
                <Lock size={14} className="text-primary" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-cream focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-body bg-cream/10 font-medium"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-textMuted hover:text-primary transition-colors focus:outline-none"
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Button with Branded colors: primary #61aa45, hover darkens to #4b8e30 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#61aa45] hover:bg-[#4b8e30] disabled:bg-[#61aa45]/50 text-white font-body font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#61aa45]/40"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>

            {/* Error Message: red below the button */}
            {errorMsg && (
              <div className="flex items-center gap-1.5 text-red-600 text-xs font-medium mt-3 bg-red-50 p-3 rounded-xl border border-red-100">
                <AlertCircle size={14} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </form>

          {/* Muted Placeholder link */}
          <div className="text-center mt-6">
            <a
              href="#forgot-password"
              onClick={(e) => {
                e.preventDefault();
                toast('Password reset link is not configured. Please contact root system admin.');
              }}
              className="text-xs font-medium text-textMuted hover:text-primary transition-colors hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-cream/50 text-center">
            <span className="text-[10px] font-bold text-gold tracking-widest uppercase font-body block">
              Health Care Ayurveda
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for Logo Link to site homepage
const LinkToHome = ({ children }) => {
  return (
    <a href="/" className="flex items-center">
      {children}
    </a>
  );
};

export default AdminLogin;
