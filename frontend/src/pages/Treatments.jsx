import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const TREATMENTS = [
  {
    id: 1,
    title: "Rejuvenation Therapy",
    tagline: "Rasayana Chikitsa",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    desc: "Revitalize body cells, boost immunity, and slow down biological aging through customized herbal steam baths, traditional oil massages, and nutrient-dense formulations.",
    benefits: ["Restores cellular energy", "Purifies blood circulation", "Calms the nervous system"],
    duration: "60 - 90 Mins",
    suitability: "Recommended for fatigue, low immunity, and overall body revitalization."
  },
  {
    id: 2,
    title: "Postnatal Care",
    tagline: "Sutika Paricharya",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600",
    desc: "Gentle restorative therapies, customized firming herbal wraps, and specialized tonics to restore pelvic health, tone abdominal muscles, and aid recovery for new mothers.",
    benefits: ["Accelerates tissue healing", "Relieves postpartum fatigue", "Enhances breastmilk quality"],
    duration: "75 - 90 Mins",
    suitability: "Designed specifically for mothers from 2 weeks to 6 months postpartum."
  },
  {
    id: 3,
    title: "Ayurvedic Skin Treatment",
    tagline: "Mukha Lepa & Soundarya",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    desc: "Therapeutic custom face packs (Lepa) and herbal oil treatments targeted at hormonal acne, melasma, and hyperpigmentation, restoring your natural radiant glow from deep within.",
    benefits: ["Balances skin sebum", "Reduces deep pigmentation", "100% chemicals-free glow"],
    duration: "45 - 60 Mins",
    suitability: "Ideal for acne-prone skin, tan removal, and long-term skin health."
  },
  {
    id: 4,
    title: "Stress Management",
    tagline: "Manovaha Shanti",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
    desc: "Harmonize the mind-body connection with Shirodhara (warm oil stream over head), soothing massages, and herbal adaptogens designed to combat burnout, anxiety, and insomnia.",
    benefits: ["Regulates cortisol levels", "Soothes chronic anxiety", "Improves sleep cycles"],
    duration: "60 - 75 Mins",
    suitability: "Highly beneficial for chronic stress, anxiety, mental fatigue, and sleep disorders."
  }
];

const Treatments = () => {
  return (
    <div className="min-h-screen bg-cream/10 pb-24">
      {/* Header Banner */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        {/* Subtle decorative radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#8AB87A_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="flex justify-center">
            <span className="p-2.5 bg-white/10 rounded-full text-gold backdrop-blur-sm animate-pulse">
              <Leaf className="w-6 h-6" />
            </span>
          </div>
          <span className="font-accent-heading text-sm text-gold tracking-widest uppercase block mt-1">
            Holistic Kerala Therapies
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide !text-white">
            Our Ayurvedic Treatments
          </h1>
          <div className="w-16 h-[2px] bg-gold mx-auto" />
          <p className="font-body text-sm md:text-base !text-white/85 max-w-2xl mx-auto leading-relaxed">
            Experience traditional, time-honoured healing paths customized precisely to restore balance, vigor, and peace to your life.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        
        {/* Intro Tagline */}
        <div className="text-center mb-16 max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full text-primary font-accent text-xs tracking-widest uppercase">
            <Sparkles size={12} className="text-gold" />
            <span>Personalized Healing</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-textDark">
            Specialized Healing Paths
          </h2>
          <p className="font-body text-sm text-textMuted leading-relaxed">
            Every therapy at Health Care Ayurveda is designed to target root causes, respecting the natural constitution of your body (Prakriti) for sustainable, authentic wellness.
          </p>
        </div>

        {/* Treatment Display Grid - Premium layout where elements are fully visible */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {TREATMENTS.map((t) => (
            <div 
              key={t.id} 
              className="bg-white rounded-3xl border border-primary/5 shadow-md hover:shadow-green overflow-hidden transition-all duration-300 flex flex-col md:flex-row group hover:-translate-y-1"
            >
              {/* Left Column: Image wrapper */}
              <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden shrink-0">
                <img 
                  src={t.image} 
                  alt={t.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-textDark/80 to-transparent opacity-60 md:opacity-40" />
                <span className="absolute top-4 left-4 bg-primary/95 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                  {t.duration}
                </span>
              </div>

              {/* Right Column: Text and Details */}
              <div className="p-8 flex flex-col justify-between flex-grow space-y-6">
                <div className="space-y-3">
                  <div>
                    <span className="font-accent text-xs text-gold tracking-widest uppercase block font-semibold">
                      {t.tagline}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-textDark mt-0.5 group-hover:text-primary transition-colors duration-250">
                      {t.title}
                    </h3>
                  </div>
                  
                  <p className="font-body text-xs text-textDark/85 leading-relaxed">
                    {t.desc}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-1.5 pt-2">
                    <span className="font-body text-[10px] font-bold uppercase tracking-wider text-primary block">
                      Key Benefits:
                    </span>
                    <div className="grid grid-cols-1 gap-1.5">
                      {t.benefits.map((b, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-textDark/80">
                          <CheckCircle2 size={13} className="text-accent shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Area */}
                <div className="pt-4 border-t border-cream flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-[11px] font-body text-textMuted italic max-w-[200px]">
                    {t.suitability}
                  </div>
                  
                  <Link
                    to="/appointment"
                    className="inline-flex items-center justify-center space-x-1.5 bg-primary hover:bg-primary-light text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-md shrink-0"
                  >
                    <span>Book Session</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA Banner at Bottom */}
        <div className="mt-20 bg-primary text-white rounded-3xl p-10 md:p-14 text-center relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(#8AB87A_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Leaf className="w-10 h-10 text-white mx-auto animate-pulse" />
            <h3 className="font-display text-3xl font-semibold tracking-wide !text-white">
              Not Sure Which Treatment You Need?
            </h3>
            <p className="font-body text-sm text-white/90 leading-relaxed">
              Schedule a personalized pulse diagnosis and holistic health consultation with our expert Ayurvedic doctors. We will create a custom therapy plan aligned with your body rhythms.
            </p>
            <div className="pt-2">
              <Link
                to="/appointment"
                className="inline-flex items-center space-x-2 bg-white hover:bg-white/90 text-primary font-body font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Book Doctor Consultation</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Treatments;
