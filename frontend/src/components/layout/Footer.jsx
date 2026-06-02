import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Link to="/" className="inline-block transition-all duration-300 hover:opacity-85">
                <img
                  src={logo}
                  alt="Health Care Ayurveda"
                  className="logo-fade-in-effect max-h-[110px] w-auto object-contain"
                />
              </Link>
            </div>
            <p className="font-body text-sm text-white/80 leading-relaxed max-w-xs">
              Dedicated to holistic wellness for everyone — restoring balance, vitality, and natural beauty through authentic Ayurvedic practice.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5 font-body text-sm">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors duration-250">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-white/80 hover:text-white transition-colors duration-250">Herbal Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors duration-250">Our Story & Philosophy</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors duration-250">Contact & Location</Link>
              </li>
              <li>
                <Link to="/appointment" className="text-white/80 hover:text-white transition-colors duration-250">Book an Appointment</Link>
              </li>
            </ul>
          </div>

          {/* Operational Hours */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold tracking-wider text-white">
              Working Hours
            </h3>
            <div className="space-y-3 font-body text-sm text-white/80">
              <div className="flex items-start space-x-2.5">
                <Clock size={16} className="text-white mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Monday – Sunday</p>
                  <p className="text-xs mt-0.5 text-white/70">09:00 AM – 06:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold tracking-wider text-white">
              Get in Touch
            </h3>
            <ul className="space-y-3 font-body text-sm text-white/80">
              <li className="flex items-start space-x-2.5">
                <MapPin size={16} className="text-white mt-1 shrink-0" />
                <span className="leading-relaxed">
                  Health Care Ayurveda Clinic, Kochi, Kerala, India - 682016
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone size={16} className="text-white shrink-0" />
                <span>+91 9539 691 757</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail size={16} className="text-white shrink-0" />
                <span>contact@healthcareayurveda.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/50 font-body">
          <p>© {new Date().getFullYear()} Health Care Ayurveda. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-white/70 font-accent italic">Empowering Health Naturally for All</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
