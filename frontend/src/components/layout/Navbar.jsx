import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, Key } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm border-b border-primary/10'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <svg
              className="w-12 h-12 text-primary transition-transform duration-500 group-hover:rotate-12"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Premium botanical circle */}
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-70" />
              <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
              
              {/* Monogram S leaf shape */}
              <path
                d="M52 28C52 28 35 28 35 43C35 55 52 52 52 64C52 74 41 74 38 74"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
                className="transition-colors duration-300 group-hover:text-primary-light"
              />
              <path
                d="M48 26C48 26 65 26 65 41C65 53 48 50 48 62C48 72 59 72 62 72"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="1 3"
                className="opacity-80"
              />
              {/* Elegant organic leaves sprouting */}
              <path
                d="M52 28C55 20 48 16 42 22C38 26 44 32 52 28Z"
                fill="currentColor"
                fillOpacity="0.2"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M48 72C45 80 52 84 58 78C62 74 56 68 48 72Z"
                fill="currentColor"
                fillOpacity="0.2"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            <div>
              <span className="font-display text-2xl font-semibold tracking-wide text-primary block leading-none">
                SAMEDHA
              </span>
              <span className="font-accent text-[10px] tracking-widest text-gold uppercase block mt-1 leading-none">
                Ayurvedics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-body text-sm font-medium tracking-wide transition-colors duration-300 relative py-1 ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-textMuted hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/admin"
              className="p-2 text-textMuted hover:text-primary transition-colors duration-300"
              title="Admin Dashboard"
            >
              <Key size={18} />
            </Link>
            <Link
              to="/appointment"
              className="flex items-center space-x-2 bg-primary hover:bg-primary-light text-white font-body text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border border-primary/20 hover:-translate-y-0.5"
            >
              <Calendar size={16} />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              to="/admin"
              className="p-2 text-textMuted hover:text-primary"
              title="Admin Dashboard"
            >
              <Key size={18} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-primary hover:bg-cream transition-colors duration-200 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-cream shadow-xl transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-3 py-2 rounded-md font-body text-base font-medium transition-colors duration-200 ${
                isActive(link.path)
                  ? 'bg-cream text-primary'
                  : 'text-textMuted hover:bg-white/50 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-cream">
            <Link
              to="/appointment"
              className="flex items-center justify-center space-x-2 w-full bg-primary hover:bg-primary-light text-white font-body text-base font-medium px-5 py-3 rounded-full shadow-md transition-all duration-200"
            >
              <Calendar size={18} />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
