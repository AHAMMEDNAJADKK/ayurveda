import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsBar from '../components/home/StatsBar';
import TreatmentsSection from '../components/home/TreatmentsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import { Leaf, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    // Apply scroll reveal animations
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-0">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Stats Counter Bar */}
      <div className="reveal-on-scroll">
        <StatsBar />
      </div>

      {/* 3. Treatments Section */}
      <div className="reveal-on-scroll">
        <TreatmentsSection />
      </div>

      {/* 4. Brand Philosophy callout (Aesthetic mid-page block) */}
      <section className="reveal-on-scroll py-20 bg-cream/20 border-y border-cream/50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-10 md:p-16 rounded-3xl text-center border-t-2 border-gold/20 shadow-sm relative z-10">
            <span className="font-accent text-sm text-gold tracking-widest uppercase italic block mb-3">
              The Samedha Promise
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-textDark tracking-wide mb-6">
              A Sanctuary Crafted Exclusively for Women
            </h2>
            <p className="font-body text-sm md:text-base text-textMuted max-w-2xl mx-auto leading-relaxed mb-8">
              In Ayurveda, a woman's health is the foundation of family and society. Our clinic honors this truth by providing specialized, chemical-free therapies that treat the root causes of hormonal fluctuations, stress, fertility, and skin health.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/about"
                className="flex items-center space-x-1.5 text-sm font-semibold text-primary hover:text-primary-light transition-colors py-2"
              >
                <span>Read Our Philosophy</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Carousel */}
      <div className="reveal-on-scroll">
        <TestimonialsSection />
      </div>

      {/* 6. Direct CTA Banner */}
      <section className="reveal-on-scroll py-16 bg-textDark text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(#8AB87A_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <Leaf className="w-10 h-10 text-accent mx-auto animate-pulse" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-wide">
            Ready to Begin Your Healing Journey?
          </h2>
          <p className="font-body text-sm text-white/70 max-w-md mx-auto leading-relaxed">
            Schedule a personalized pulse diagnosis and health consultation with our expert Ayurvedic doctors today.
          </p>
          <div className="pt-4">
            <Link
              to="/appointment"
              className="inline-flex items-center space-x-2 bg-accent hover:bg-accent/80 text-textDark font-body font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Calendar size={18} />
              <span>Book Appointment Now</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
