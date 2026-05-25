import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ShoppingBag, ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SHOWCASE_PRODUCTS = [
  {
    id: 1,
    name: "Hormone Balance Syrup",
    category: "General Wellness",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Supports hormonal balance, regulates metabolism, and relieves symptoms of hormonal imbalance naturally.",
    benefits: ["Regulates hormone levels", "Relieves bloating & fatigue"],
    price: 380,
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Stress Relief Capsules",
    category: "Mental Wellness",
    image: "https://images.unsplash.com/photo-1611070973770-b1a60b268471?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Potent blend of adaptogenic herbs like Ashwagandha and Brahmi to combat mental fatigue, stress, and anxiety.",
    benefits: ["Lowers cortisol levels", "Promotes restful sleep"],
    price: 450,
    badge: "New"
  },
  {
    id: 3,
    name: "Postnatal Recovery Oil",
    category: "Postnatal Care",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Traditional oil blend specifically curated for postpartum moms to restore muscle tone, firm skin, and relieve joint pain.",
    benefits: ["Restores core muscle tone", "Soothes back & pelvic pain"],
    price: 620,
    badge: "Bestseller"
  },
  {
    id: 4,
    name: "Radiance Ubtan Face Pack",
    category: "Skin Care",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Traditional recipe containing turmeric, saffron, and sandalwood to gently exfoliate, remove tan, and brighten tired skin.",
    benefits: ["Evens skin tone", "Deep herbal brightness & radiance"],
    price: 290,
    badge: "Bestseller"
  },
  {
    id: 5,
    name: "Ashwagandha Vitality Tonic",
    category: "Immunity",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Daily tonic to boost stamina, build immune response, and supply essential botanical micro-nutrients for everyone.",
    benefits: ["Enhances daily energy levels", "Strengthens immune defense"],
    price: 340,
    badge: "Organic"
  },
  {
    id: 6,
    name: "Digestive Herbal Churna",
    category: "Digestion",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Synergistic powder combination of Haritaki, Pippali, and Ginger to stimulate appetite and improve gut metabolism.",
    benefits: ["Enhances digestive fire (Agni)", "Relieves gas and acidity"],
    price: 240,
    badge: "100% Pure"
  }
];

// Reusable Custom Magnetic Button
const MagneticBuyButton = ({ productName, price }) => {
  const buttonRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    // Calculate relative cursor position from center of button
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    // Apply magnetic pull (0.35 factor)
    setCoords({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  const handlePurchase = () => {
    toast.success(`"${productName}" added to order enquiry! Proceed to checkout or contact us via WhatsApp to complete purchase.`, {
      style: {
        border: '1px solid #61aa45',
        padding: '16px',
        color: '#1a3d10',
        backgroundColor: '#edf7e8',
      },
      iconTheme: {
        primary: '#61aa45',
        secondary: '#edf7e8',
      },
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handlePurchase}
      style={{
        transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
        transition: coords.x === 0 && coords.y === 0 ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
      }}
      className="relative overflow-hidden w-full py-3 px-6 bg-primary hover:bg-primary-light text-white text-sm font-body font-semibold rounded-xl shadow-md hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center space-x-2 transition-all duration-300 transform active:scale-95 group-hover:bg-primary/95"
    >
      {/* Glinting/Glow layer */}
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <ShoppingBag size={15} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
      <span>Buy Now</span>
    </button>
  );
};

const ProductShowcase = () => {
  return (
    <section className="py-24 bg-cream/10 border-y border-cream/50 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full text-primary font-accent text-xs tracking-widest uppercase">
            <Sparkles size={12} className="text-gold" />
            <span>Botanical Formulations</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-textDark tracking-wide">
            Signature Ayurvedic Products
          </h2>
          <p className="font-body text-sm md:text-base text-textMuted leading-relaxed">
            Nourish your body and mind with our premium, clinically refined apothecary items. Crafted with handpicked herbs in strict accordance with classical traditions.
          </p>
        </div>

        {/* Carousel Slider Wrapper */}
        <div className="relative px-4 sm:px-12">
          
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnHover: true
            }}
            pagination={{ 
              clickable: true,
              el: '.product-swiper-pagination-custom',
            }}
            navigation={{
              nextEl: '.product-swiper-button-next-custom',
              prevEl: '.product-swiper-button-prev-custom',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.3,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40
              }
            }}
            className="product-showcase-slider !pb-16"
          >
            {SHOWCASE_PRODUCTS.map((product) => (
              <SwiperSlide key={product.id} className="py-4">
                {/* Product Card Container */}
                <div className="luxury-card shimmer-border shine-hover rounded-3xl p-6 flex flex-col justify-between h-[560px] relative overflow-hidden group">
                  
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-4 left-4 z-20 bg-gold/90 backdrop-blur-sm text-white font-body text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm">
                      {product.badge}
                    </span>
                  )}

                  {/* Product Image Wrapper */}
                  <div className="relative rounded-2xl overflow-hidden bg-cream/30 aspect-[4/3] flex items-center justify-center shrink-0">
                    {/* Glowing circular backdrop for image */}
                    <div className="absolute w-32 h-32 bg-primary/10 rounded-full blur-xl opacity-70 group-hover:scale-125 transition-transform duration-700" />
                    
                    <img
                      src={product.image}
                      alt={product.name}
                      className="animate-float-image w-36 h-36 object-contain relative z-10 drop-shadow-[0_8px_16px_rgba(43,82,25,0.15)] group-hover:drop-shadow-[0_12px_24px_rgba(43,82,25,0.25)] transition-all duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Content Details */}
                  <div className="mt-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-body font-semibold tracking-widest text-gold uppercase block">
                        {product.category}
                      </span>
                      <h3 className="font-display text-xl font-bold text-textDark group-hover:text-primary transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="font-body text-xs text-textMuted leading-relaxed line-clamp-2">
                        {product.shortDesc}
                      </p>
                      
                      {/* Product Benefits list */}
                      <div className="pt-2 flex flex-col gap-1.5">
                        {product.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-[11px] text-textDark/80">
                            <Check size={11} className="text-accent shrink-0" />
                            <span className="line-clamp-1">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Row: Price & Buy Now */}
                    <div className="pt-4 border-t border-cream flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] text-textMuted block font-body uppercase tracking-wider">Price</span>
                        <span className="font-display text-lg font-bold text-primary block leading-none mt-1">
                          ₹{product.price}
                        </span>
                      </div>
                      
                      {/* Magnetic Buy Now button */}
                      <div className="w-[140px] shrink-0">
                        <MagneticBuyButton productName={product.name} price={product.price} />
                      </div>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button
            className="product-swiper-button-prev-custom absolute left-0 top-[45%] -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-cream border border-primary/10 hover:border-gold/50 rounded-full flex items-center justify-center text-primary hover:text-gold shadow-md hover:shadow-lg transition-all duration-300 -translate-x-2 sm:-translate-x-6 cursor-pointer focus:outline-none"
            aria-label="Previous Product"
          >
            <ArrowLeft size={18} />
          </button>
          
          <button
            className="product-swiper-button-next-custom absolute right-0 top-[45%] -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-cream border border-primary/10 hover:border-gold/50 rounded-full flex items-center justify-center text-primary hover:text-gold shadow-md hover:shadow-lg transition-all duration-300 translate-x-2 sm:translate-x-6 cursor-pointer focus:outline-none"
            aria-label="Next Product"
          >
            <ArrowRight size={18} />
          </button>

          {/* Custom Pagination Bullets */}
          <div className="product-swiper-pagination-custom flex justify-center gap-2 mt-8 z-20" />

        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors border-b border-primary/30 pb-0.5"
          >
            <span>View all botanical products</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ProductShowcase;
