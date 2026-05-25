import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { Phone, ShieldCheck, ArrowRight, ArrowLeft, RefreshCw, Leaf } from 'lucide-react';
import api from '../services/api';
import { auth } from '../config/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = Phone Input, 2 = OTP Input
  const [phone, setPhone] = useState('');
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const inputRefs = useRef([]);
  const recaptchaVerifierRef = useRef(null);
  const confirmationResultRef = useRef(null);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/appointments');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  // Clean up reCAPTCHA verifier on unmount
  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/[^\d]/g, '');
    if (cleanPhone.length < 10) {
      toast.error('Please enter a valid phone number (at least 10 digits)');
      return;
    }

    setIsLoading(true);
    try {
      if (!recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          'expired-callback': () => {
            toast.error('reCAPTCHA expired, please try again.');
            if (recaptchaVerifierRef.current) {
              recaptchaVerifierRef.current.clear();
              recaptchaVerifierRef.current = null;
            }
          }
        });
      }

      const formattedPhone = `+91${cleanPhone}`;
      const appVerifier = recaptchaVerifierRef.current;
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      confirmationResultRef.current = confirmationResult;

      toast.success('Verification code sent to your phone!');
      setStep(2);
      setTimer(30); // 30s resend cooldown
      // Focus first OTP field on transition
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);
    } catch (error) {
      console.error('Send OTP error:', error);
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
      const errMsg = error.message || 'Failed to send verification code. Please try again.';
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e?.preventDefault();
    const otpCode = otpDigits.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter the full 6-digit OTP code');
      return;
    }

    setIsLoading(true);
    try {
      if (!confirmationResultRef.current) {
        throw new Error('No active verification session. Please go back and request a new code.');
      }

      const userCredential = await confirmationResultRef.current.confirm(otpCode);
      const firebaseUser = userCredential.user;
      const idToken = await firebaseUser.getIdToken();

      const cleanPhone = phone.replace(/[^\d]/g, '');
      const response = await api.post('/auth/firebase-login', {
        idToken,
        phone: cleanPhone
      });

      if (response.data.success) {
        toast.success('Authentication successful!');
        const { token, user: userData } = response.data;
        login({ token, role: userData.role, phone: userData.phone });
        
        // Redirect based on role
        if (userData.role === 'admin') {
          navigate('/admin/appointments');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      let errMsg = 'Failed to verify OTP. Please try again.';
      if (error.code === 'auth/invalid-verification-code') {
        errMsg = 'Invalid OTP code. Please enter the correct code.';
      } else if (error.code === 'auth/code-expired') {
        errMsg = 'The OTP code has expired. Please request a new one.';
      } else if (error.cleanedMessage) {
        errMsg = error.cleanedMessage;
      } else if (error.response?.data?.message) {
        errMsg = error.response.data.message;
      } else if (error.message) {
        errMsg = error.message;
      }
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    const val = value.replace(/[^\d]/g, '');
    if (!val) {
      const newDigits = [...otpDigits];
      newDigits[index] = '';
      setOtpDigits(newDigits);
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = val.substring(val.length - 1);
    setOtpDigits(newDigits);

    // Focus next field
    if (index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        const newDigits = [...otpDigits];
        newDigits[index - 1] = '';
        setOtpDigits(newDigits);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^\d]/g, '');
    if (pastedData.length === 6) {
      const digits = pastedData.split('');
      setOtpDigits(digits);
      inputRefs.current[5].focus();
      
      setTimeout(async () => {
        setIsLoading(true);
        try {
          if (!confirmationResultRef.current) {
            throw new Error('No active verification session. Please request a new code.');
          }
          const userCredential = await confirmationResultRef.current.confirm(pastedData);
          const firebaseUser = userCredential.user;
          const idToken = await firebaseUser.getIdToken();
          
          const cleanPhone = phone.replace(/[^\d]/g, '');
          const response = await api.post('/auth/firebase-login', {
            idToken,
            phone: cleanPhone
          });
          
          if (response.data.success) {
            toast.success('Authentication successful!');
            const { token, user: userData } = response.data;
            login({ token, role: userData.role, phone: userData.phone });
            if (userData.role === 'admin') {
              navigate('/admin/appointments');
            } else {
              navigate('/');
            }
          }
        } catch (err) {
          console.error('Verify OTP error (paste):', err);
          let errMsg = 'Failed to verify OTP. Please try again.';
          if (err.code === 'auth/invalid-verification-code') {
            errMsg = 'Invalid OTP code. Please enter the correct code.';
          } else if (err.code === 'auth/code-expired') {
            errMsg = 'The OTP code has expired. Please request a new one.';
          } else if (err.cleanedMessage) {
            errMsg = err.cleanedMessage;
          } else if (err.response?.data?.message) {
            errMsg = err.response.data.message;
          } else if (err.message) {
            errMsg = err.message;
          }
          toast.error(errMsg);
        } finally {
          setIsLoading(false);
        }
      }, 100);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setIsLoading(true);
    try {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }

      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        'expired-callback': () => {
          toast.error('reCAPTCHA expired, please try again.');
          if (recaptchaVerifierRef.current) {
            recaptchaVerifierRef.current.clear();
            recaptchaVerifierRef.current = null;
          }
        }
      });

      const cleanPhone = phone.replace(/[^\d]/g, '');
      const formattedPhone = `+91${cleanPhone}`;
      const appVerifier = recaptchaVerifierRef.current;
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      confirmationResultRef.current = confirmationResult;
      
      toast.success('A new OTP has been sent to your phone');
      setOtpDigits(Array(6).fill(''));
      setTimer(30);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
      const errMsg = error.message || 'Failed to resend OTP. Please try again.';
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center bg-cream/20 py-20 px-4 overflow-hidden">
      {/* Invisible reCAPTCHA Container */}
      <div id="recaptcha-container"></div>
      
      {/* Aesthetic Background Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Floating leaves */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="absolute text-accent animate-leaf-1 w-6 h-6" style={{ top: '15%', left: '10%' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 7 20 7 20s10-1 12-10c.8-3.6-1.4-5.6-2-2z" />
        </svg>
        <svg className="absolute text-primary animate-leaf-2 w-8 h-8" style={{ top: '70%', right: '15%' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 7 20 7 20s10-1 12-10c.8-3.6-1.4-5.6-2-2z" />
        </svg>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-up">
        {/* Glassmorphic Container */}
        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-primary/10 shadow-green text-center">
          
          {/* Brand Logo Monogram */}
          <div className="flex justify-center mb-6">
            <div className="p-2.5 bg-white rounded-full shadow-sm border border-primary/5">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
          </div>

          {step === 1 ? (
            // STEP 1: PHONE NUMBER INPUT
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="font-display font-bold text-2xl md:text-3xl text-textDark">
                  Welcome to HCA
                </h2>
                <p className="font-body text-xs md:text-sm text-textMuted max-w-xs mx-auto">
                  Enter your phone number to receive a secure one-time verification passcode.
                </p>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-textDark flex items-center gap-1.5">
                    <Phone size={14} className="text-primary" />
                    <span>Phone Number</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-textMuted font-semibold text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
                      placeholder="99999 99999"
                      maxLength={10}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-cream focus:outline-none focus:border-primary text-sm font-body bg-cream/10 font-medium"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || phone.length < 10}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light disabled:bg-primary/50 text-white font-body font-medium py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP Code'}
                  {!isLoading && <ArrowRight size={16} />}
                </button>
              </form>
            </div>
          ) : (
            // STEP 2: 6-DIGIT OTP INPUT
            <div className="space-y-6">
              <div className="space-y-2">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline mb-2"
                >
                  <ArrowLeft size={12} />
                  <span>Change phone number</span>
                </button>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-textDark">
                  Verify Passcode
                </h2>
                <p className="font-body text-xs md:text-sm text-textMuted max-w-xs mx-auto">
                  We've sent a 6-digit OTP to <strong className="text-textDark">+91 {phone}</strong>.
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                {/* 6 Digit Input Row */}
                <div className="flex justify-between gap-2 max-w-xs mx-auto" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (inputRefs.current[idx] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-11 h-12 text-center rounded-xl border border-cream focus:outline-none focus:border-primary text-lg font-bold font-serif bg-cream/10 focus:ring-1 focus:ring-primary"
                      disabled={isLoading}
                      required
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isLoading || otpDigits.some(d => !d)}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light disabled:bg-primary/50 text-white font-body font-medium py-3.5 rounded-xl transition-all shadow-md"
                  >
                    <ShieldCheck size={18} />
                    <span>{isLoading ? 'Verifying...' : 'Verify & Login'}</span>
                  </button>

                  <div className="text-center font-body text-xs">
                    {timer > 0 ? (
                      <p className="text-textMuted">
                        Resend OTP code in <span className="font-bold text-primary">{timer}s</span>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={isLoading}
                        className="inline-flex items-center gap-1.5 text-primary hover:text-primary-light font-bold hover:underline"
                      >
                        <RefreshCw size={12} />
                        <span>Resend OTP Code</span>
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          )}

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

export default Login;
