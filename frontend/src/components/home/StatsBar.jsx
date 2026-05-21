import React, { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import { ShieldCheck, Users, Trophy } from 'lucide-react';

const StatsBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger animation only once
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      id: 1,
      icon: <ShieldCheck className="w-8 h-8 text-gold" />,
      endVal: 100,
      suffix: "%",
      label: "Natural Products",
      desc: "Pure herbal extracts & organic formulas"
    },
    {
      id: 2,
      icon: <Users className="w-8 h-8 text-gold" />,
      endVal: 15000,
      suffix: "+",
      label: "Happy Customers",
      desc: "Trust and holistic healing for women"
    },
    {
      id: 3,
      icon: <Trophy className="w-8 h-8 text-gold" />,
      endVal: 8,
      suffix: "+",
      label: "Years Experience",
      desc: "Dedicated clinical excellence & care"
    }
  ];

  return (
    <div
      ref={sectionRef}
      className="bg-primary text-white py-12 relative overflow-hidden border-y border-gold/20"
    >
      {/* Background SVG mesh */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center justify-center p-4 transition-all duration-700 delay-[${i * 200}ms] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="mb-3 bg-white/5 p-3 rounded-full border border-white/10">
                {stat.icon}
              </div>
              
              <div className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-1">
                {isVisible ? (
                  <CountUp start={0} end={stat.endVal} duration={3} separator="," />
                ) : (
                  '0'
                )}
                {stat.suffix}
              </div>
              
              <h3 className="font-body text-base font-semibold text-gold tracking-wide uppercase mt-1">
                {stat.label}
              </h3>
              
              <p className="font-body text-xs text-accent/80 mt-1 max-w-[200px]">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
