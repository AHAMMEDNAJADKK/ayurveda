import { Link } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';

const TreatmentsSection = () => {
  const treatments = [
    {
      id: 1,
      title: "Rejuvenation Therapy",
      tagline: "Rasayana Chikitsa",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
      desc: "Revitalize body cells, boost immunity, and slow down biological aging through customized herbal steam baths, traditional oil massages, and nutrient-dense formulations.",
      benefits: ["Restores cellular energy", "Purifies blood circulation", "Calms the nervous system"]
    },
    {
      id: 2,
      title: "Postnatal Care",
      tagline: "Sutika Paricharya",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600",
      desc: "Gentle restorative therapies, customized firming herbal wraps, and specialized tonics to restore pelvic health, tone abdominal muscles, and aid recovery for new mothers.",
      benefits: ["Accelerates tissue healing", "Relieves postpartum fatigue", "Enhances breastmilk quality"]
    },
    {
      id: 3,
      title: "Ayurvedic Skin Treatment",
      tagline: "Mukha Lepa & Soundarya",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
      desc: "Therapeutic custom face packs (Lepa) and herbal oil treatments targeted at hormonal acne, melasma, and hyperpigmentation, restoring your natural radiant glow from deep within.",
      benefits: ["Balances skin sebum", "Reduces deep pigmentation", "100% chemicals-free glow"]
    },
    {
      id: 4,
      title: "Stress Management",
      tagline: "Manovaha Shanti",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
      desc: "Harmonize the mind-body connection with Shirodhara (warm oil stream over head), soothing massages, and herbal adaptogens designed to combat burnout, anxiety, and insomnia.",
      benefits: ["Regulates cortisol levels", "Soothes chronic anxiety", "Improves sleep cycles"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex justify-center mb-3">
            <span className="p-2 bg-cream text-primary rounded-full">
              <Leaf size={20} />
            </span>
          </div>
          <span className="font-accent text-sm text-gold tracking-widest uppercase italic">
            Empowering Women's Health
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-textDark tracking-wide mt-2">
            Specialized Healing Paths
          </h2>
          <div className="w-12 h-[2px] bg-gold mx-auto mt-4" />
          <p className="font-body text-sm md:text-base text-textMuted mt-4 leading-relaxed">
            Every therapy at Samedha is customized to respect and align with the unique rhythms, stages, and requirements of a woman's body.
          </p>
        </div>

        {/* 3D Flip Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {treatments.map((treatment) => (
            <div key={treatment.id} className="flip-card h-[400px] w-full rounded-2xl cursor-pointer">
              <div className="flip-card-inner h-full w-full">
                
                {/* CARD FRONT */}
                <div className="flip-card-front rounded-2xl overflow-hidden shadow-md flex flex-col justify-end p-6 text-white relative">
                  {/* Background Image */}
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 hover:scale-105"
                  />
                  {/* Dark overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-textDark/90 via-textDark/45 to-transparent z-10" />
                  
                  {/* Text Details */}
                  <div className="relative z-20">
                    <span className="font-accent text-xs text-accent italic tracking-wide block mb-1">
                      {treatment.tagline}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-semibold tracking-wide leading-tight">
                      {treatment.title}
                    </h3>
                    
                    {/* Hover indicator */}
                    <div className="mt-4 flex items-center space-x-1.5 text-xs text-gold/80 font-medium">
                      <span>Hover to reveal</span>
                      <ArrowRight size={12} className="animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* CARD BACK */}
                <div className="flip-card-back rounded-2xl bg-cream border border-primary/10 shadow-lg flex flex-col justify-between p-6 text-left relative overflow-hidden">
                  {/* Subtle leafy background watermark */}
                  <div className="absolute -right-8 -bottom-8 opacity-5 text-primary pointer-events-none">
                    <Leaf size={120} />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="font-accent text-xs text-gold tracking-widest uppercase block">
                        {treatment.tagline}
                      </span>
                      <h3 className="font-display text-lg font-bold text-textDark mt-0.5">
                        {treatment.title}
                      </h3>
                    </div>
                    
                    <p className="font-body text-xs text-textMuted leading-relaxed">
                      {treatment.desc}
                    </p>
                    
                    <div className="space-y-2">
                      <span className="font-body text-[10px] font-bold uppercase tracking-wider text-primary block">
                        Key Benefits:
                      </span>
                      <ul className="space-y-1">
                        {treatment.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-center space-x-1.5 text-xs text-textDark/80">
                            <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    to="/appointment"
                    className="flex items-center justify-between text-xs text-primary font-bold hover:text-primary-light transition-colors py-2 border-t border-primary/10 mt-2"
                  >
                    <span>Book Healing Session</span>
                    <ArrowRight size={14} />
                  </Link>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TreatmentsSection;
