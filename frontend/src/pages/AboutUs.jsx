import React from 'react';
import { Heart, Activity, ShieldAlert, Award } from 'lucide-react';

const AboutUs = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Arundhati Nair",
      qualifications: "B.A.M.S, M.D. (Ayurveda)",
      role: "Senior Physician & Founder",
      desc: "With over 12 years of clinical experience, Dr. Nair specializes in gynecological disorders, pulse diagnosis (Nadi Pariksha), and natural hormone regulation.",
      avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 2,
      name: "Dr. Vasundhara Sen",
      qualifications: "B.A.M.S",
      role: "Postnatal Care Consultant",
      desc: "Dr. Sen is dedicated to postpartum maternal restoration, core muscle therapy, and tailored infant care guidance utilizing traditional guidelines.",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300"
    }
  ];

  const philosophy = [
    {
      id: 1,
      icon: <Award className="w-6 h-6 text-gold" />,
      title: "Authentic Ayurveda",
      desc: "Strict adherence to classical texts, utilizing unmodified traditional processes and organic herbal extractions."
    },
    {
      id: 2,
      icon: <Heart className="w-6 h-6 text-gold" />,
      title: "Women-Focused",
      desc: "Therapies specifically engineered to balance and nurture the complex hormonal stages of a woman’s life."
    },
    {
      id: 3,
      icon: <Activity className="w-6 h-6 text-gold" />,
      title: "Holistic Healing",
      desc: "Restoring natural balance by integrating pulse diagnosis, herbal medicine, custom diet, and lifestyle shifts."
    }
  ];

  const certs = [
    "AYUSH Standard Certified", "100% Organic Sourced", "NABH Accredited Clinic", 
    "WHO-GMP Compliant Labs", "Eco-Friendly Packaging", "Cruelty-Free Tested"
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Hero Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#8AB87A_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-4">
          <span className="font-accent text-sm text-gold tracking-widest uppercase italic">
            Rooted in Wisdom, Blossoming in Health
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wide">
            Our Story & Legacy
          </h1>
          <div className="w-16 h-[1.5px] bg-gold mx-auto" />
        </div>
      </div>

      {/* 2. Our Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6">
            <span className="font-accent text-sm text-gold tracking-widest uppercase italic block">
              Est. 2018
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-textDark tracking-wide leading-tight">
              Honoring the Ancient Heritage of Healing
            </h2>
            <p className="font-body text-sm md:text-base text-textMuted leading-relaxed">
              Samedha Ayurvedics was founded with a singular, vital mission: to create a clinical sanctuary where women could access pure, uncompromised Ayurvedic treatment customized to their biological needs.
            </p>
            <p className="font-body text-sm text-textMuted leading-relaxed">
              Our name, **Samedha**, translates to "Growth and Strength" in Sanskrit. We believe that true health does not come from synthetic suppression of symptoms, but from nourishing the roots of the body. By combining pulse analysis (Nadi Pariksha) with highly specialized, chemical-free herbal preparations, we guide women back to their natural state of vibrant equilibrium.
            </p>
          </div>
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg h-[400px] border border-primary/5">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"
              alt="Ayurvedic Treatment Room"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* 3. Philosophy */}
      <section className="py-16 bg-cream/30 border-y border-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-bold text-textDark tracking-wide">
              Our Core Philosophy
            </h2>
            <div className="w-10 h-[1.5px] bg-gold mx-auto mt-3" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophy.map((item) => (
              <div key={item.id} className="bg-white p-8 rounded-2xl border border-primary/5 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-textDark">
                  {item.title}
                </h3>
                <p className="font-body text-xs md:text-sm text-textMuted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Team Doctors */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-bold text-textDark tracking-wide">
            Our Specialized Doctors
          </h2>
          <div className="w-10 h-[1.5px] bg-gold mx-auto mt-3" />
          <p className="font-body text-xs md:text-sm text-textMuted mt-4">
            Consult with certified BAMS medical practitioners dedicated to women's care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {doctors.map((doc) => (
            <div key={doc.id} className="glass-panel p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 border border-primary/5">
              <img
                src={doc.avatar}
                alt={doc.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-gold/40 shadow-md shrink-0"
              />
              <div className="space-y-2 text-center md:text-left">
                <div>
                  <h3 className="font-display text-xl font-bold text-textDark leading-none">
                    {doc.name}
                  </h3>
                  <span className="font-body text-[10px] text-gold font-bold tracking-wider uppercase mt-1 block">
                    {doc.qualifications}
                  </span>
                </div>
                <p className="font-body text-xs text-primary font-semibold">
                  {doc.role}
                </p>
                <p className="font-body text-xs text-textMuted leading-relaxed">
                  {doc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Certifications Marquee */}
      <section className="py-8 bg-textDark overflow-hidden border-t border-gold/20">
        <div className="relative w-full flex items-center overflow-x-hidden">
          {/* Scroll block */}
          <div className="flex space-x-12 animate-marquee whitespace-nowrap text-white font-body text-xs uppercase tracking-widest">
            {/* Set 1 */}
            {certs.map((cert, idx) => (
              <div key={idx} className="flex items-center space-x-2 shrink-0">
                <span className="w-2 h-2 bg-gold rounded-full" />
                <span>{cert}</span>
              </div>
            ))}
            {/* Set 2 (duplicates for loop wrapping) */}
            {certs.map((cert, idx) => (
              <div key={`dup-${idx}`} className="flex items-center space-x-2 shrink-0">
                <span className="w-2 h-2 bg-gold rounded-full" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
