import { useState } from 'react';
import { X, Calendar, MapPin, Eye } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    title: "Ayurvedic Panchakarma Therapy",
    category: "Therapy Sessions",
    description: "Traditional detoxification and rejuvenation therapies conducted by expert therapists using herb-infused organic oils.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    date: "May 2026",
    location: "Kochi Main Center"
  },
  {
    id: 2,
    title: "Traditional Herb Grinding",
    category: "Herbal Preparation",
    description: "Hand-milling raw forest botanicals and active herbs using traditional stone mortars to maintain pure potency.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
    date: "April 2026",
    location: "Apothecary Laboratory"
  },
  {
    id: 3,
    title: "Women's Wellness Camp",
    category: "Wellness Camps",
    description: "A free community health initiative providing medical checkups, pulse diagnosis, and health guidance to local women.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    date: "March 2026",
    location: "Vyttila Community Hall"
  },
  {
    id: 4,
    title: "Personal Pulse Diagnosis (Nadi Pariksha)",
    category: "Consultations",
    description: "Senior physicians identifying bodily imbalances and custom-tailoring treatment courses for clients.",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800",
    date: "May 2026",
    location: "Kochi Main Center"
  },
  {
    id: 5,
    title: "Medicated Steam Bath Session",
    category: "Therapy Sessions",
    description: "Svedana session utilizing steam from boiled herbal decoctions to open micro-channels and sweat out toxins.",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800",
    date: "April 2026",
    location: "Kochi Main Center"
  },
  {
    id: 6,
    title: "Decoction Boiling & Oil Potency Infusion",
    category: "Herbal Preparation",
    description: "Boiling active decoctions (Kashayams) over woodfire stoves, following exact recipes from classical scriptures.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800",
    date: "Feb 2026",
    location: "Apothecary Laboratory"
  }
];

const categories = ["All", "Therapy Sessions", "Herbal Preparation", "Wellness Camps", "Consultations"];

const EventsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section className="py-24 bg-off-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-gold font-serif italic text-lg block">Samedha Ayurvedics Moments</span>
          <h2 className="font-display text-3xl md:text-5xl text-primary font-bold tracking-wide">
            Healing Chronicles
          </h2>
          <div className="w-24 h-0.5 bg-gold/30 mx-auto"></div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-body tracking-wider uppercase transition-all duration-300 border ${
                selectedCategory === cat
                  ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                  : 'bg-white text-textMuted border-cream hover:text-primary hover:border-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-primary/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with Hover Zoom & Overlay Icon */}
              <div
                className="h-64 overflow-hidden relative cursor-pointer"
                onClick={() => setLightboxImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover img-hover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/90 p-3 rounded-full text-primary shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye size={20} />
                  </div>
                </div>
              </div>

              {/* Text Description */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-widest text-accent uppercase block font-body">
                    {item.category}
                  </span>
                  <h3 className="font-display font-bold text-textDark text-lg md:text-xl leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-textMuted font-body text-xs md:text-sm line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex justify-between items-center text-[11px] font-body text-textMuted border-t border-cream pt-4 mt-auto">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-gold" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-gold" />
                    {item.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-dark/85 backdrop-blur-md transition-all duration-300">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]">
              {/* Image side */}
              <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  className="w-full h-full object-cover max-h-[40vh] md:max-h-[80vh]"
                />
              </div>

              {/* Text detail side */}
              <div className="p-8 md:w-2/5 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  <span className="text-xs font-bold tracking-widest text-accent uppercase block font-body">
                    {lightboxImage.category}
                  </span>
                  <h3 className="font-display font-bold text-textDark text-2xl leading-tight">
                    {lightboxImage.title}
                  </h3>
                  <div className="w-12 h-0.5 bg-gold/50"></div>
                  <p className="text-textMuted font-body text-sm leading-relaxed">
                    {lightboxImage.description}
                  </p>
                </div>

                <div className="space-y-2 pt-6 border-t border-cream mt-8 text-xs font-body text-textMuted">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gold" />
                    <span><strong>Event Date:</strong> {lightboxImage.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gold" />
                    <span><strong>Location:</strong> {lightboxImage.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default EventsSection;
