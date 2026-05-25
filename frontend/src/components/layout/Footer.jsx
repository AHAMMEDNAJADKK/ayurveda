import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-textDark text-white/90 pt-16 pb-8 border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <svg
                className="w-10 h-10 text-accent"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M52 28C52 28 35 28 35 43C35 55 52 52 52 64C52 74 41 74 38 74" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M52 28C55 20 48 16 42 22C38 26 44 32 52 28Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
              </svg>
              <div>
                <span className="font-display text-xl font-bold tracking-wider text-white block leading-none">
                  HEALTH CARE
                </span>
                <span className="font-accent text-[9px] tracking-widest text-gold uppercase block mt-1 leading-none">
                  Ayurveda
                </span>
              </div>
            </div>
            <p className="font-body text-sm text-textMuted leading-relaxed max-w-xs">
              Dedicated to holistic wellness for everyone — restoring balance, vitality, and natural beauty through authentic Ayurvedic practice.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold tracking-wider text-gold">
              Quick Links
            </h3>
            <ul className="space-y-2.5 font-body text-sm">
              <li>
                <Link to="/" className="text-white/70 hover:text-accent transition-colors duration-250">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-white/70 hover:text-accent transition-colors duration-250">Herbal Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-accent transition-colors duration-250">Our Story & Philosophy</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-accent transition-colors duration-250">Contact & Location</Link>
              </li>
              <li>
                <Link to="/appointment" className="text-white/70 hover:text-accent transition-colors duration-250">Book an Appointment</Link>
              </li>
            </ul>
          </div>

          {/* Operational Hours */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold tracking-wider text-gold">
              Working Hours
            </h3>
            <div className="space-y-3 font-body text-sm text-white/70">
              <div className="flex items-start space-x-2.5">
                <Clock size={16} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white/90">Monday – Saturday</p>
                  <p className="text-xs mt-0.5 text-white/60">09:00 AM – 06:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <Clock size={16} className="text-red-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-red-400">Sunday</p>
                  <p className="text-xs mt-0.5 text-red-400/70">Closed / Weekly Holiday</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold tracking-wider text-gold">
              Get in Touch
            </h3>
            <ul className="space-y-3 font-body text-sm text-white/70">
              <li className="flex items-start space-x-2.5">
                <MapPin size={16} className="text-accent mt-1 shrink-0" />
                <span className="leading-relaxed">
                  Health Care Ayurveda Clinic, Kochi, Kerala, India - 682016
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone size={16} className="text-accent shrink-0" />
                <span>+91 9539 691 757</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail size={16} className="text-accent shrink-0" />
                <span>contact@healthcareayurveda.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 font-body">
          <p>© {new Date().getFullYear()} Health Care Ayurveda. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-gold/60 font-accent italic">Empowering Health Naturally for All</span>
            <span>·</span>
            <Link to="/admin" className="hover:text-accent transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
