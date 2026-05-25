import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout, isAdmin } = useContext(AuthContext);

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

  const leftLinks = [
    { name: 'Story', path: '/about' },
    { name: 'Treatments', path: '/treatments' },
    { name: 'Products', path: '/products' }
  ];

  const rightLinks = [
    { name: 'Contact', path: '/contact' }
  ];

  const allLinks = [...leftLinks, ...rightLinks];
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm border-b border-primary/10'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Brand Area (Left Aligned for all pages) */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Health Care Ayurveda" className="nav-logo-effect h-12 w-auto" />
            </Link>
          </div>

          {/* Navigation Links Column (Desktop Center) */}
          <div className="hidden md:flex items-center space-x-8">
            {allLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-body text-sm font-medium tracking-wide transition-colors duration-300 relative py-1 ${
                  isActive(link.path)
                    ? 'text-primary font-semibold'
                    : 'text-textMuted hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Action Buttons Column (Desktop Right) */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Auth Link / Status */}
            {!user ? (
              <Link
                to="/login"
                className="font-body text-sm font-semibold text-textMuted hover:text-primary transition-colors py-2 px-3 border border-transparent hover:border-primary/10 rounded-full"
              >
                Log In
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="font-body text-sm font-bold text-primary hover:text-primary-light transition-colors"
                  >
                    Admin
                  </Link>
                ) : (
                  <span className="font-body text-xs text-textMuted font-medium">
                    +91 {user.phone.substring(user.phone.length - 10)}
                  </span>
                )}
                <button
                  onClick={logout}
                  className="font-body text-xs font-semibold bg-cream text-textDark hover:bg-red-50 hover:text-red-600 px-3.5 py-1.5 rounded-full transition-all border border-primary/5 hover:border-red-100"
                >
                  Logout
                </button>
              </div>
            )}

            <Link
              to="/appointment"
              className="flex items-center space-x-2 bg-primary hover:bg-primary-light text-white font-body text-xs font-medium px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border border-primary/20 hover:-translate-y-0.5"
            >
              <Calendar size={14} />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-primary hover:bg-cream transition-colors duration-200 focus:outline-none"
              aria-label="Toggle Menu"
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
          {allLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md font-body text-base font-medium transition-colors duration-200 ${
                isActive(link.path)
                  ? 'bg-cream text-primary font-bold'
                  : 'text-textMuted hover:bg-white/50 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-cream flex flex-col space-y-3">
            {!user ? (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center font-body text-base font-semibold text-textMuted hover:text-primary transition-colors py-2"
              >
                Log In
              </Link>
            ) : (
              <div className="flex flex-col items-center space-y-2 py-1">
                <span className="font-body text-sm text-textMuted font-semibold">
                  {isAdmin ? 'Logged in as Admin' : `Phone: +91 ${user.phone.substring(user.phone.length - 10)}`}
                </span>
                <div className="flex space-x-3 w-full">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 text-center font-body text-sm font-bold text-white bg-accent hover:bg-accent/95 py-2.5 rounded-full"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex-grow font-body text-sm font-semibold bg-cream text-textDark hover:bg-red-50 hover:text-red-600 py-2.5 rounded-full transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            <Link
              to="/appointment"
              onClick={() => setIsOpen(false)}
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
