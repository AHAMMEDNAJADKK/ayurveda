import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Compass } from 'lucide-react';
import logo from '../../assets/logo.png';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-cream/40 py-20">
      
      {/* ── Parallax Background Image ────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-75 ease-out scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1920')",
          transform: `translateY(${scrollY * 0.35}px)`,
        }}
      >
        {/* Soft forest green gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-cream/80 to-white/95 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
      </div>

      {/* ── Animated Floating Herb/Leaf SVG Particles ───────────────── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Leaf 1 */}
        <svg
          className="absolute text-accent/25 animate-leaf-1 w-8 h-8"
          style={{ top: '15%', left: '10%', animationDelay: '0s' }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17 8C8 10 7 20 7 20s10-1 12-10c.8-3.6-1.4-5.6-2-2zM9 18c.9-1.8 2.7-3.6 5-5-2.3 2.3-4.1 5-5 5z" />
        </svg>
        {/* Leaf 2 */}
        <svg
          className="absolute text-primary/15 animate-leaf-2 w-12 h-12"
          style={{ top: '65%', left: '15%', animationDelay: '1.5s' }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17 8C8 10 7 20 7 20s10-1 12-10c.8-3.6-1.4-5.6-2-2zM9 18c.9-1.8 2.7-3.6 5-5-2.3 2.3-4.1 5-5 5z" />
        </svg>
        {/* Leaf 3 */}
        <svg
          className="absolute text-gold/20 animate-leaf-1 w-10 h-10"
          style={{ top: '25%', right: '12%', animationDelay: '3s' }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17 8C8 10 7 20 7 20s10-1 12-10c.8-3.6-1.4-5.6-2-2zM9 18c.9-1.8 2.7-3.6 5-5-2.3 2.3-4.1 5-5 5z" />
        </svg>
        {/* Leaf 4 */}
        <svg
          className="absolute text-accent/20 animate-leaf-2 w-7 h-7"
          style={{ top: '75%', right: '18%', animationDelay: '0.5s' }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17 8C8 10 7 20 7 20s10-1 12-10c.8-3.6-1.4-5.6-2-2zM9 18c.9-1.8 2.7-3.6 5-5-2.3 2.3-4.1 5-5 5z" />
        </svg>
      </div>

      {/* ── Rotating vertical text - Left Margin ───────────────────── */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex items-center space-x-2 text-textMuted/60 z-20">
        <span className="h-12 w-[1px] bg-accent/30" />
        <p className="writing-mode-vertical-rl text-xs font-body uppercase tracking-[0.3em] select-none">
          Natural Balance · Ayurveda
        </p>
      </div>

      {/* ── Rotating vertical text - Right Margin ──────────────────── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex items-center space-x-2 text-textMuted/60 z-20">
        <p className="writing-mode-vertical-rl text-xs font-body uppercase tracking-[0.3em] select-none">
          Nourish Roots · Radiant Beauty
        </p>
        <span className="h-12 w-[1px] bg-accent/30" />
      </div>

      {/* ── Center Shield Card ─────────────────────────────────────── */}
      <div className="relative z-20 max-w-xl w-full mx-4 animate-fade-up">
        <div className="glass-panel brand-shield-shape p-10 md:p-14 text-center border-t-2 border-gold/30">
          
          {/* Logo Monogram */}
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Health Care Ayurveda"
              className="logo-fade-in-effect max-h-[100px] w-auto object-contain"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>

          {/* Sub-tagline */}
          <span className="inline-block font-accent text-sm md:text-base text-gold tracking-widest uppercase mb-3">
            Health Care Ayurveda
          </span>

          {/* Main Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-textDark tracking-wide leading-tight mb-2">
            Heal. Restore. Thrive.
          </h1>
          
          <p className="font-body text-sm md:text-base text-textMuted max-w-sm mx-auto mb-8 leading-relaxed">
            Discover a sanctuary of authentic healing, specialized Ayurvedic therapies, and natural rejuvenation for every individual — men, women, and families.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/appointment"
              className="flex items-center justify-center space-x-2 w-full sm:w-auto bg-primary hover:bg-primary-light text-white font-body font-medium px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-primary/20"
            >
              <Calendar size={18} />
              <span>Book Appointment</span>
            </Link>
            <Link
              to="/products"
              className="flex items-center justify-center space-x-2 w-full sm:w-auto bg-white hover:bg-cream text-primary hover:text-textDark font-body font-medium px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm border border-primary/10 hover:-translate-y-0.5"
            >
              <Compass size={18} />
              <span>Explore Treatments</span>
            </Link>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default HeroSection;
